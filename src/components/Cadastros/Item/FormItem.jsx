import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { api } from 'src/configs/api'
import { Alert, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Loading from 'src/components/Loading'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import Icon from 'src/@core/components/icon'
import Check from 'src/components/Form/Check'
import { AuthContext } from 'src/context/AuthContext'
import ListOptions from './ListOptions'
import useLoad from 'src/hooks/useLoad'
import ModelsWithItem from './ModelsWithItem'
import ListOptionsAnexo from './ListOptionsAnexo'

const FormItem = ({
    id,
    btnClose,
    handleModalClose,
    setNewChange,
    newChange,
    outsideID,
    modal,
    handleConfirmNew,
    manualUrl
}) => {
    const [open, setOpen] = useState(false)
    const [openInactivate, setOpenInactivate] = useState(false)
    const [openActivate, setOpenActivate] = useState(false)
    const [change, setChange] = useState(false)
    const [data, setData] = useState(null)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { setId } = useContext(RouteContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const { startLoading, stopLoading } = useLoad()
    const formType = router.pathname.split('/')[3] ?? 'item' //? novo, item, fornecedor, recebimento-mp, limpeza, ...

    console.log('🚀 ~ formType:', formType)
    const form = useForm({ mode: 'onChange' })

    //? Envia dados para a api
    const onSubmit = async data => {
        startLoading()
        const values = {
            ...data,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID
        }

        try {
            if (type === 'new') {
                await api.post(`cadastros/item/new/insertData`, values).then(response => {
                    if (outsideID) {
                        setId(outsideID)
                        handleConfirmNew(response.data)
                    } else {
                        router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                        setId(response.data)
                    }
                    toast.success(toastMessage.successNew)
                })
            } else if (type === 'edit') {
                await api.post(`/cadastros/item/updateData/${id}`, values)
                toast.success(toastMessage.successUpdate)
                getData()
            }
            setSavingForm(!savingForm)
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.errorRepeated)
            } else {
                console.log(error)
            }
        } finally {
            stopLoading()
        }
    }

    //? Deleta os dados
    const handleClickDelete = async () => {
        try {
            await api.delete(`cadastros/item/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`)
            setId(null)
            setOpen(false)
            toast.success(toastMessage.successDelete)
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.pendingDelete)
                setOpen(false)
            } else {
                console.log(error)
            }
        }
    }

    const handleClickInactivate = async () => {
        try {
            await api.post(`cadastros/item/inactivate/${id}`, {
                usuarioID: user.usuarioID,
                unidadeID: loggedUnity.unidadeID
            })
            setOpenInactivate(false)
            toast.success('Dado inativado com sucesso!')
        } catch (error) {
            console.log(error)
        } finally {
            setChange(!change)
        }
    }

    const handleClickActivate = async () => {
        try {
            await api.post(`cadastros/item/activate/${id}`, {
                usuarioID: user.usuarioID,
                unidadeID: loggedUnity.unidadeID
            })
            setOpenActivate(false)
            toast.success('Dado ativado com sucesso!')
        } catch (error) {
            console.log(error)
        } finally {
            setChange(!change)
        }
    }

    //? Dados iniciais ao carregar página
    const getData = async () => {
        try {
            const route = type === 'new' ? 'cadastros/item/new/getData' : `cadastros/item/getData/${id}`
            await api
                .post(route, {
                    type: formType
                })
                .then(response => {
                    console.log('🚀 ~ getData:', response.data)
                    setData(response.data)
                    console.log('🚀 ~ getData:', response.data)
                    form.reset(response.data) //* Insere os dados no formulário
                })
        } catch (error) {
            console.log(error)
        }
    }

    const addAnexo = index => {
        const copyAnexos = [...form.getValues(`fields.opcoes`)]
        copyAnexos[index].anexos.push({
            nome: '',
            obrigatorio: false
        })
        const newData = {
            ...data,
            fields: {
                ...data.fields,
                opcoes: copyAnexos
            }
        }
        setData(newData)
        form.setValue(`fields.opcoes`, copyAnexos)
    }

    const refreshAlternatives = async value => {
        try {
            const response = await api.post(`cadastros/item/getAlternatives`, {
                alternativa: value
            })
            if (response.data) {
                form.setValue('fields.opcoes', response.data)
                setData({ ...data, fields: { ...data.fields, opcoes: response.data } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveAnexo = (value, index, indexAnexo) => {
        let copyAnexos = [...form.getValues(`fields.opcoes`)]

        // remover anexo do array
        copyAnexos[index].anexos.splice(indexAnexo, 1)

        // remover anexo do banco
        const newData = {
            ...data,
            fields: {
                ...data.fields,
                opcoes: copyAnexos
            }
        }
        setData(newData)
        form.setValue(`fields.opcoes`, copyAnexos)
        setChange(!change)
    }

    //? Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id, change])

    useEffect(() => {
        if (newChange) handleSubmit(onSubmit)()
    }, [newChange])

    return (
        <>
            {!data && <Loading />}
            {data && (
                <>
                    <form onSubmit={form.handleSubmit(onSubmit)} id='formItem'>
                        <FormHeader
                            btnCancel
                            btnNew
                            btnSave
                            manualUrl={manualUrl}
                            btnClose={btnClose}
                            handleModalClose={handleModalClose}
                            handleSubmit={() => form.handleSubmit(onSubmit)}
                            btnDelete={type === 'edit' && !data.fields.pending ? true : false}
                            onclickDelete={() => setOpen(true)}
                            type={type}
                            modal={modal}
                            outsideID={outsideID}
                            btnInactivate={
                                type === 'edit' && data.fields.pending && data.fields.status === 1 ? true : false
                            }
                            onClickInactivate={() => setOpenInactivate(true)}
                            btnActivate={type === 'edit' && data.fields.status === 0 ? true : false}
                            onClickActivate={() => setOpenActivate(true)}
                        />
                        <Card>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Select
                                        xs={12}
                                        md={12}
                                        title='Formulários'
                                        name='fields.formulario'
                                        value={data?.fields?.formulario}
                                        required
                                        options={data?.fields?.opcoesForm}
                                        disabled={(formType !== 'novo' && formType !== 'item') || data.fields.pending}
                                        form={form}
                                    />
                                    <Input
                                        xs={12}
                                        md={12}
                                        title='Nome'
                                        name='fields.nome'
                                        required
                                        disabled={data.fields.pending}
                                        form={form}
                                    />
                                    <Select
                                        xs={12}
                                        md={12}
                                        title='Alternativa'
                                        name='fields.alternativa'
                                        value={data?.fields?.alternativa}
                                        onChange={refreshAlternatives}
                                        required
                                        options={data?.fields?.alternativa?.opcoes}
                                        disabled={data.fields.pending}
                                        form={form}
                                    />
                                    <Input
                                        xs={12}
                                        md={12}
                                        multiline
                                        rows={3}
                                        title='Ajuda do item (mostrado em [?])'
                                        name='fields.ajuda'
                                        form={form}
                                    />
                                    <Divider />
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>

                    <ListOptions
                        key={change}
                        data={data?.fields?.opcoes}
                        handleRemoveAnexo={handleRemoveAnexo}
                        addAnexo={addAnexo}
                        form={form}
                    />

                    <ModelsWithItem data={data.fields.models} />
                </>
            )}

            <DialogForm
                text='Tem certeza que deseja excluir?'
                title={'Excluir ' + title.title}
                openModal={open}
                handleClose={() => setOpen(false)}
                handleSubmit={handleClickDelete}
                btnCancel
                btnConfirm
            />

            <DialogForm
                title={'Inativar ' + title.title}
                text={`<span class="text-red-500">Este item está presente em ${data?.fields?.models?.length} ${
                    data?.fields?.models?.length === 1 ? 'modelo' : 'modelos'
                }.</span><br/> Tem certeza que deseja inativar?`}
                openModal={openInactivate}
                handleClose={() => setOpenInactivate(false)}
                handleSubmit={handleClickInactivate}
                btnCancel
                btnConfirm
            />

            <DialogForm
                title={'Ativar ' + title.title}
                text='Tem certeza que deseja ativar?'
                openModal={openActivate}
                handleClose={() => setOpenActivate(false)}
                handleSubmit={handleClickActivate}
                btnCancel
                btnConfirm
                btnConfirmColor='primary'
            />
        </>
    )
}

export default FormItem

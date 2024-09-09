import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { api } from 'src/configs/api'
import { Card, CardContent, Divider, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Loading from 'src/components/Loading'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import Check from 'src/components/Form/Check'
import { AuthContext } from 'src/context/AuthContext'
import ListOptions from './ListOptions'
import useLoad from 'src/hooks/useLoad'

const FormItem = ({
    id,
    btnClose,
    handleModalClose,
    setNewChange,
    newChange,
    outsideID,
    handleConfirmNew,
    manualUrl
}) => {
    const [open, setOpen] = useState(false)
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
            await api.delete(`${staticUrl}/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`)
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

    //? Dados iniciais ao carregar página
    const getData = async () => {
        try {
            const route = type === 'new' ? 'cadastros/item/new/getData' : `cadastros/item/getData/${id}`
            await api
                .post(route, {
                    type: formType
                })
                .then(response => {
                    console.log('🚀 ~ formType response.data:', response.data)
                    setData(response.data)
                    form.reset(response.data) //* Insere os dados no formulário
                })
        } catch (error) {
            console.log(error)
        }
    }

    const addAnexo = index => {
        const copyAnexos = [...getValues(`fields.opcoes`)]
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
                setChange(!change)
                form.setValue('fields.opcoes', response.data)
                setData({ ...data, fields: { ...data.fields, opcoes: response.data } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveAnexo = (value, index, indexAnexo) => {
        let copyAnexos = [...getValues(`fields.opcoes`)]

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
    }, [id])

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
                            disabled={data.fields.pending}
                            manualUrl={manualUrl}
                            btnClose={btnClose}
                            handleModalClose={handleModalClose}
                            handleSubmit={() => form.handleSubmit(onSubmit)}
                            btnDelete={type === 'edit' ? true : false}
                            onclickDelete={() => setOpen(true)}
                            type={type}
                            outsideID={outsideID}
                        />
                        <Card>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Select
                                        xs={12}
                                        md={11}
                                        title='Formulários'
                                        name='fields.formulario'
                                        value={data?.fields?.formulario}
                                        required
                                        options={data?.fields?.opcoesForm}
                                        disabled={formType !== 'novo' && formType !== 'item'}
                                        register={form.register}
                                        setValue={form.setValue}
                                        control={form.control}
                                        clearErrors={form.clearErrors}
                                        setError={form.setError}
                                        errors={form.formState?.errors?.fields?.formulario}
                                    />
                                    <Check
                                        xs={1}
                                        md={1}
                                        title='Ativo'
                                        name='fields.status'
                                        value={data?.fields?.status}
                                        typePage={type}
                                        register={form.register}
                                    />
                                    <Input
                                        xs={12}
                                        md={12}
                                        title='Nome'
                                        name='fields.nome'
                                        required
                                        control={form.control}
                                        errors={form.formState?.errors?.fields?.nome}
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
                                        register={form.register}
                                        setValue={form.setValue}
                                        control={form.control}
                                        clearErrors={form.clearErrors}
                                        setError={form.setError}
                                        errors={form.formState?.errors?.fields?.alternativa}
                                    />
                                    <Input
                                        xs={12}
                                        md={12}
                                        multiline
                                        rows={4}
                                        title='Ajuda do item (mostrado em (?))'
                                        name='fields.ajuda'
                                        control={form.control}
                                        errors={form.formState?.errors?.fields?.ajuda}
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
                        register={form.register}
                        control={form.control}
                        errors={form.formState?.errors}
                        getValues={form.getValues}
                        addAnexo={addAnexo}
                        watch={form.watch}
                    />
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
        </>
    )
}

export default FormItem

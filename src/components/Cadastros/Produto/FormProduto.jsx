import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { api } from 'src/configs/api'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
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
import Icon from 'src/@core/components/icon'
import AnexosList from './AnexosList'
import useLoad from 'src/hooks/useLoad'

const FormProduto = ({ id, btnClose, handleConfirmNew, handleModalClose, newChange, manualUrl, outsideID }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { setId } = useContext(RouteContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const [removedItems, setRemovedItems] = useState([])
    const [change, setChange] = useState(false)
    const { startLoading, stopLoading } = useLoad()

    const {
        trigger,
        handleSubmit,
        setValue,
        reset,
        control,
        getValues,
        formState: { errors },
        register
    } = useForm()

    // Envia dados para a API
    const onSubmit = async data => {
        startLoading()
        const values = {
            ...data,
            unidadeID: loggedUnity.unidadeID,
            usuarioID: user.usuarioID,
            removedItems
        }
        console.log(values)
        // return

        try {
            if (type === 'new') {
                await api.post(`cadastros/produto/new/insertData`, values).then(response => {
                    if (handleConfirmNew) {
                        handleConfirmNew(response.data, 'produtos')
                    } else {
                        router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                        setId(response.data.id)
                    }
                    toast.success(toastMessage.successNew)
                })
            } else if (type === 'edit') {
                await api.post(`${staticUrl}/updateData/${id}`, values)
                toast.success(toastMessage.successUpdate)
            }
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

    // Deleta os dados
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

    // Dados iniciais ao carregar a página
    const getData = async () => {
        try {
            const route = type === 'new' ? `cadastros/produto/new/getData` : `${staticUrl}/getData/${id}`
            await api.post(route).then(response => {
                console.log('🚀 ~ getData:', response.data)
                setData(response.data)
                reset(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Remove anexo
    const removeAnexo = (value, index) => {
        if (value.produtoAnexoID) {
            setRemovedItems([...removedItems, value.produtoAnexoID])
        }

        const newAnexos = getValues('anexos').filter((_, i) => i !== index)
        setValue('anexos', newAnexos)
        setChange(!change)
    }

    // Adiciona um novo anexo
    const addAnexo = () => {
        const newAnexo = {
            nome: '',
            obrigatorio: 1,
            status: 1,
            descricao: '',
            observacao: ''
        }

        const updatedDataAnexos = [...getValues('anexos'), newAnexo]
        setValue('anexos', updatedDataAnexos)
        setChange(!change)
    }

    // Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    useEffect(() => {
        getData()

        // Seta error nos campos obrigatórios
        if (type === 'new') {
            setTimeout(() => {
                trigger()
            }, 300)
        }
    }, [id])

    useEffect(() => {
        if (newChange) handleSubmit(onSubmit)()
    }, [newChange])

    return (
        <>
            {!data && <Loading />}
            {data && (
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
                    <FormHeader
                        btnCancel
                        btnNew={handleConfirmNew ? false : true}
                        btnSave
                        btnClose={btnClose}
                        manualUrl={manualUrl}
                        handleModalClose={handleModalClose}
                        handleSubmit={() => handleSubmit(onSubmit)}
                        btnDelete={type === 'edit' ? true : false}
                        onclickDelete={() => setOpen(true)}
                        type={type}
                        outsideID={outsideID}
                    />
                    <Card>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Input
                                    xs={11}
                                    md={6}
                                    title='Nome'
                                    name='fields.nome'
                                    required={true}
                                    control={control}
                                    errors={errors?.fields?.nome}
                                />
                                <Select
                                    xs={12}
                                    md={4}
                                    title='Unidade de medida'
                                    name='unidadeMedida.fields'
                                    value={data?.unidadeMedida.fields}
                                    required={true}
                                    options={data.unidadeMedida.options}
                                    register={register}
                                    setValue={setValue}
                                    control={control}
                                    errors={errors?.unidadeMedida?.fields}
                                    helpText='Selecione a unidade de medida'
                                />
                                <Check
                                    xs={1}
                                    md={1}
                                    title='Ativo'
                                    name='fields.status'
                                    value={data.fields.status}
                                    typePage={type}
                                    register={register}
                                />
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader title='Anexos' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <AnexosList
                                    key={change}
                                    getValues={getValues}
                                    removeAnexo={removeAnexo}
                                    setValue={setValue}
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    type={type}
                                />
                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        sx={{ mt: 1 }}
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                        onClick={() => {
                                            addAnexo()
                                        }}
                                    >
                                        Inserir Anexo
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
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

export default FormProduto

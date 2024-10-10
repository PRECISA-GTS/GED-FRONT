import Router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { Button, Card, CardContent, Grid, IconButton } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import { useContext } from 'react'
import Input from 'src/components/Form/Input'
import Icon from 'src/@core/components/icon'
import useLoad from 'src/hooks/useLoad'
import DateField from 'src/components/Form/DateField'
import CheckLabel from 'src/components/Form/CheckLabel'
import Select from 'src/components/Form/Select'
import Photo from './Photo'
import Loading from 'src/components/Loading'
import Limpeza from './Limpeza'

const FormEquipamento = ({
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
    const [data, setData] = useState(null)
    const [setores, setSetores] = useState(null)
    const [change, setChange] = useState(false)
    const { setId } = useContext(RouteContext)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const { startLoading, stopLoading } = useLoad()

    const form = useForm({
        mode: 'onChange',
        defaultValues: {
            fields: {
                limpeza: {
                    itens: [{}]
                }
            }
        }
    })

    //? Envia dados para a api
    const onSubmit = async data => {
        // startLoading()
        const values = {
            ...data,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID
        }
        try {
            if (type === 'new') {
                await api.post(`cadastros/equipamento/new/insertData`, values).then(response => {
                    if (outsideID) {
                        setId(outsideID)
                        handleConfirmNew(response.data.value)
                        // stopLoading()
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

    const getData = async () => {
        try {
            if (type === 'edit') {
                await api.post(`${staticUrl}/getData/${id}`, { id }).then(response => {
                    console.log('🚀 ~ getData: ', response.data)
                    setData(response.data)
                    form.reset(response.data) //* Insere os dados no formulário
                })
            } else {
                setData({
                    fields: {
                        nome: '',
                        status: 1
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSetores = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/cadastros/setor/getSetores`, { unidadeID: loggedUnity.unidadeID })
            setSetores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        getSetores()

        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id, loggedUnity, change])

    console.log('🚀 ~ data?.fields?.dataCompra:', data?.fields?.dataCompra)

    return (
        <>
            {!data && <Loading />}
            {data && (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormHeader
                        btnCancel
                        btnNew={handleConfirmNew ? false : true}
                        btnSave
                        manualUrl={manualUrl}
                        btnClose={btnClose}
                        handleModalClose={handleModalClose}
                        handleSubmit={() => form.handleSubmit(onSubmit)}
                        btnDelete={type === 'edit' ? true : false}
                        onclickDelete={() => setOpen(true)}
                        type={type}
                        outsideID={outsideID}
                    />
                    <div className='flex flex-col gap-3'>
                        <Card>
                            <CardContent>
                                <Grid container spacing={5}>
                                    {/* Esquerda */}
                                    {type === 'edit' && (
                                        <Grid item xs={12} md={2}>
                                            <Grid container spacing={5}>
                                                <Photo
                                                    id={id}
                                                    photo={data.fields.foto}
                                                    change={change}
                                                    setChange={setChange}
                                                />
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Direita */}
                                    <Grid item xs={12} md={type == 'edit' ? 10 : 12}>
                                        <Grid container spacing={5}>
                                            <Input
                                                xs={11}
                                                md={4}
                                                title='Nome'
                                                name='fields.nome'
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={11}
                                                md={4}
                                                title='Tipo de material (inox, metal, plástico, vidro, etc)'
                                                name='fields.tipo'
                                                form={form}
                                            />
                                            <Input
                                                xs={11}
                                                md={4}
                                                title='Nº Série'
                                                name='fields.numeroSerie'
                                                form={form}
                                            />
                                            <Input
                                                xs={11}
                                                md={4}
                                                title='Cód. Inventário'
                                                name='fields.codigoInventario'
                                                form={form}
                                            />
                                            <Input xs={11} md={4} title='Marca' name='fields.marca' form={form} />
                                            <Input xs={11} md={4} title='Modelo' name='fields.modelo' form={form} />
                                            <DateField
                                                xs={12}
                                                md={4}
                                                title='Data compra'
                                                name={`fields.dataCompra`}
                                                value={data?.fields?.dataCompra}
                                                form={form}
                                            />
                                            <Input
                                                xs={11}
                                                md={4}
                                                title='Fornecedor'
                                                name='fields.fornecedor'
                                                form={form}
                                            />
                                            <Select
                                                xs={12}
                                                md={4}
                                                title='Setor'
                                                name={`fields.setor`}
                                                value={data?.fields?.setor}
                                                options={setores ?? []}
                                                form={form}
                                            />
                                            <Grid item xs={12} md={8}>
                                                <p>ANEXOS</p>
                                            </Grid>
                                            <Grid item xs={12} md={4}></Grid>
                                            <CheckLabel
                                                xs={6}
                                                md={2}
                                                title='Realiza Limpeza'
                                                name={`fields.realizaLimpeza`}
                                                value={data.fields.realizaLimpeza}
                                                form={form}
                                                helpText='Este equipamento será listado no formulário de limpeza e higienização'
                                            />
                                            <CheckLabel
                                                xs={6}
                                                md={3}
                                                title='Realiza Manutenção e Calibração'
                                                name={`fields.realizaManutencao`}
                                                value={data.fields.realizaManutencao}
                                                form={form}
                                                helpText='Este equipamento será listado no formulário de Manutenção e Calibração'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Realiza Limpeza */}
                        <Limpeza form={form} />

                        {/* Realiza Manutenção */}
                    </div>
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

export default FormEquipamento

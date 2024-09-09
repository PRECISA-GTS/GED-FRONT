import Router from 'next/router'
import { useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { Card, CardContent, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
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
import Check from 'src/components/Form/Check'
import useLoad from 'src/hooks/useLoad'

const FormTransportador = ({
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
    const { setId } = useContext(RouteContext)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const { startLoading, stopLoading } = useLoad()

    const form = useForm({ mode: 'onChange' })

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
                await api.post(`cadastros/transportador/new/insertData`, values).then(response => {
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

    //? Função que deleta os dados
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
            if (type === 'edit') {
                await api.post(`${staticUrl}/getData/${id}`, { id }).then(response => {
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

    //? Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id])

    return (
        <>
            {/* {!data && <Loading />} */}
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
                    <Card>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Input
                                    xs={11}
                                    md={11}
                                    title='Nome'
                                    name='fields.nome'
                                    required={true}
                                    control={form.control}
                                    errors={form.formState?.errors?.fields?.nome}
                                />
                                <Check
                                    xs={1}
                                    md={1}
                                    title='Ativo'
                                    name='fields.status'
                                    value={data?.fields.status}
                                    typePage={type}
                                    register={form.register}
                                />
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

export default FormTransportador

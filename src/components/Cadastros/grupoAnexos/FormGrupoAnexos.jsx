import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import { api } from 'src/configs/api'
import { Card, CardContent, Grid, Typography, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import Loading from 'src/components/Loading'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import useLoad from 'src/hooks/useLoad'

//* Custom components
import Select from 'src/components/Form/Select'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import GrupoAnexoList from './GrupoAnexoList.jsx'

const FormGrupoAnexos = ({ id, btnClose, handleConfirmNew, handleModalClose, newChange, manualUrl, outsideID }) => {
    const { setId } = useContext(RouteContext)
    const router = Router
    const [data, setData] = useState(null)
    const [openDelete, setOpenDelete] = useState(false) //? Dialog de confirmação de exclusão
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const [savingForm, setSavingForm] = useState(false)
    const [removedItems, setRemovedItems] = useState([]) //? Itens removidos do formulário
    const [change, setChange] = useState(false)
    const { startLoading, stopLoading } = useLoad()

    const {
        trigger,
        handleSubmit,
        setValue,
        reset,
        getValues,
        control,
        setError,
        clearErrors,
        formState: { errors },
        register
    } = useForm({ mode: 'onChange' })

    const getData = async () => {
        try {
            const route = type === 'new' ? `cadastros/grupo-anexos/new/getData` : `${staticUrl}/getData/${id}`
            await api.post(route, { unidadeID: loggedUnity.unidadeID }).then(response => {
                setData(response.data)
                reset(response.data) //* Insere os dados no formulário
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addItem = () => {
        const newValue = {
            nome: '',
            descricao: '',
            status: true,
            obrigatorio: true
        }

        const updatedData = [...getValues('items'), newValue]
        setValue('items', updatedData)
        setChange(!change)
    }

    const removeItem = (value, index) => {
        if (data.items.length === 1) {
            toast.error('É necessário ter pelo menos um item!')
            return
        }

        //* Adiciona item removido ao array
        if (value.id) {
            setRemovedItems([...removedItems, value.id])
        }

        const newValue = getValues('items').filter((_, i) => i !== index)
        setValue(`items`, newValue) //* Remove item do formulário
        setChange(!change)
    }

    const onSubmit = async data => {
        const values = {
            ...data,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID
        }
        startLoading()
        //* Valores auxiliares
        values['removedItems'] = removedItems
        values['unidade'] = loggedUnity.unidadeID

        try {
            if (type === 'new') {
                await api.post(`cadastros/grupo-anexos/new/insertData`, values).then(response => {
                    if (handleConfirmNew) {
                        handleConfirmNew(response.data, 'gruposAnexo')
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

    //! Função que deleta os dados
    const handleDelete = async () => {
        try {
            await api.delete(`${staticUrl}/deleteData/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`)
            setId(null)
            setOpen(false)
            toast.success(toastMessage.successDelete)
            console.log('entrou')
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.pendingDelete)
                setOpenDelete(false)
            } else {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            trigger()
        }, 300)
    }, [id])

    useEffect(() => {
        if (newChange) handleSubmit(onSubmit)()
    }, [newChange])

    return (
        <>
            {!data && <Loading />}
            {data && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Botões cabeçalho */}
                    <FormHeader
                        btnCancel
                        btnNew={handleConfirmNew ? false : true}
                        btnSave
                        manualUrl={manualUrl}
                        btnClose={btnClose}
                        handleModalClose={handleModalClose}
                        handleSubmit={() => handleSubmit(onSubmit)}
                        btnDelete={type === 'edit' ? true : false}
                        onclickDelete={() => setOpenDelete(true)}
                        type={type}
                        outsideID={outsideID}
                    />

                    {/* Formulário */}
                    <Card>
                        {data && (
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Input
                                        xs={11}
                                        md={11}
                                        title='Nome'
                                        name='fields.nome'
                                        required={true}
                                        control={control}
                                        errors={errors?.fields?.nome}
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

                                    <Input
                                        xs={12}
                                        md={12}
                                        title='Descrição'
                                        name='fields.descricao'
                                        required={false}
                                        control={control}
                                        errors={errors?.fields?.descricao}
                                    />

                                    <Select
                                        xs={12}
                                        md={12}
                                        title='Formulários'
                                        name='formulario.fields'
                                        value={data?.formulario.fields ?? null}
                                        multiple={true}
                                        limitTags={5}
                                        required={true}
                                        options={data.formulario.options}
                                        register={register}
                                        setValue={setValue}
                                        clearErrors={clearErrors}
                                        setError={setError}
                                        control={control}
                                        errors={errors?.formulario?.fields}
                                    />
                                </Grid>
                            </CardContent>
                        )}
                    </Card>

                    <Card sx={{ mt: 4 }}>
                        <CardContent>
                            <Typography sx={{ mb: 5 }}>Itens</Typography>
                            <Grid container spacing={3}>
                                <GrupoAnexoList
                                    key={change}
                                    getValues={getValues}
                                    removeItem={removeItem}
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    type={type}
                                />
                            </Grid>
                            <Button
                                variant='outlined'
                                color='primary'
                                sx={{ mt: 4 }}
                                startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                onClick={() => {
                                    addItem()
                                }}
                            >
                                Inserir item
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            )}

            {/* Modal excluir */}
            <DialogForm
                text='Tem certeza que deseja excluir?'
                title={'Excluir ' + title.title}
                openModal={openDelete}
                handleClose={() => setOpenDelete(false)}
                handleSubmit={handleDelete}
                btnCancel
                btnConfirm
            />
        </>
    )
}

export default FormGrupoAnexos

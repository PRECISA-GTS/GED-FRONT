import Router from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { Card, CardContent, Grid, IconButton, Button } from '@mui/material'
import { useForm, useFieldArray } from 'react-hook-form'
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
import DateField from 'src/components/Form/DateField'
import useLoad from 'src/hooks/useLoad'
import Icon from 'src/@core/components/icon'
import Check from 'src/components/Form/Check'
import Select from 'src/components/Form/Select'

const FormSetor = ({ id }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const { setId } = useContext(RouteContext)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const { startLoading, stopLoading } = useLoad()
    const [profissionais, setProfissionais] = useState([])
    const today = new Date().toISOString().substring(0, 10)

    const {
        trigger,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
        register
    } = useForm({ mode: 'onChange' })

    //? Envia dados para a api
    const onSubmit = async data => {
        const values = {
            ...data,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID
        }

        if (!validateUniqueEntry(data)) {
            toast.error('Não é permitido repetir profissional ativo em um setor!')
            return
        }

        try {
            if (type === 'new') {
                await api.post(`cadastros/setor/new/insertData`, values).then(response => {
                    router.push(`${backRoute(staticUrl)}`)
                    setId(response.data.id)
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

    //?  Não pode repetir as pessoas
    const validateUniqueEntry = data => {
        let unique = true

        if (data.fields.profissionais.length > 1) {
            data.fields.profissionais.map((row1, index1) => {
                data.fields.profissionais.map((row2, index2) => {
                    if (index1 !== index2) {
                        if (row1.profissional.id === row2.profissional.id && !row1.dataFim && !row2.dataFim) {
                            unique = false
                        }
                    }
                })
            })
        }

        return unique
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
                const response = await api.post(`${staticUrl}/getData/${id}`, { id })
                setData(response.data)
                reset(response.data)
            } else {
                setData({
                    fields: {
                        nome: '',
                        status: 1,
                        profissionais: []
                    }
                })
                // Setar data de hoje no campo de data
                reset({
                    ...data,
                    fields: {
                        ...data.fields
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getProfissionais = async () => {
        const result = await api.get(
            `/cadastros/profissional?unidadeID=${loggedUnity.unidadeID}&papelID=${loggedUnity.papelID}`
        )
        const profissionaisAtivos = result.data.filter(row => row.statusID === 1)
        setProfissionais(profissionaisAtivos)
    }

    useEffect(() => {
        getData()
        getProfissionais()

        setTimeout(() => {
            trigger()
        }, 300)
    }, [id])

    //? Gerencia o array de profissionais
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields.profissionais'
    })

    return (
        <>
            {data && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader
                        btnCancel
                        btnNew={true}
                        btnSave
                        handleSubmit={() => handleSubmit(onSubmit)}
                        btnDelete={type === 'edit' ? true : false}
                        onclickDelete={() => setOpen(true)}
                        type={type}
                    />
                    <Card>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Input
                                    xs={12}
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
                                    value={data?.fields?.status}
                                    typePage={type}
                                    register={register}
                                />

                                <Grid item xs={12}>
                                    <div className='flex items-center gap-2 pb-1 pt-2'>
                                        <div className=''>
                                            <Icon icon='material-symbols:engineering-outline' className='text-3xl' />
                                        </div>
                                        <div className='flex flex-col gap-0'>
                                            <p className='text-xl'>Profissionais</p>
                                        </div>
                                    </div>
                                </Grid>

                                {fields.map((item, index) => (
                                    <Fragment key={item.id}>
                                        <input
                                            type='hidden'
                                            name={`fields.profissionais[${index}].id`}
                                            value={item.id}
                                        />

                                        <Select
                                            xs={12}
                                            md={7}
                                            title='Profissional'
                                            name={`fields.profissionais[${index}].profissional`}
                                            value={data?.fields?.profissionais?.[index]?.profissional}
                                            required
                                            options={profissionais ?? []}
                                            register={register}
                                            setValue={setValue}
                                            control={control}
                                            errors={errors?.fields?.profissionais?.[index]?.profissional}
                                        />

                                        <DateField
                                            xs={12}
                                            md={2}
                                            title='Data Início'
                                            name={`fields.profissionais[${index}].dataInicio`}
                                            value={data?.fields?.profissionais?.[index]?.dataInicio ?? today}
                                            required
                                            register={register}
                                            control={control}
                                            errors={errors?.fields?.profissionais?.[index]?.dataInicio}
                                        />

                                        <DateField
                                            xs={12}
                                            md={2}
                                            title='Data Fim'
                                            name={`fields.profissionais[${index}].dataFim`}
                                            value={data?.fields?.profissionais?.[index]?.dataFim}
                                            register={register}
                                            control={control}
                                        />

                                        <Grid item xs={12} md={1} className='flex items-center'>
                                            <IconButton color='error' size='small' onClick={() => remove(index)}>
                                                <Icon icon={'tabler:trash-filled'} />
                                            </IconButton>
                                        </Grid>
                                    </Fragment>
                                ))}

                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={() => {
                                            append({
                                                id: null,
                                                dataInicio: new Date()
                                            })
                                            trigger()
                                        }}
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                    >
                                        Inserir Profissional
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

export default FormSetor

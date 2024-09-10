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
import { Add, Remove } from '@mui/icons-material'
import useLoad from 'src/hooks/useLoad'
import Icon from 'src/@core/components/icon'

const FormVersao = ({ id }) => {
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
        const values = {
            ...data,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID
        }

        try {
            if (type === 'new') {
                await api.post(`configuracoes/versao/new/insertData`, values).then(response => {
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
                    form.reset(response.data)
                })
            } else {
                const today = new Date().toISOString().substring(0, 10)
                setData({
                    fields: {
                        nome: '',
                        data: today,
                        items: []
                    }
                })
                // Setar data de hoje no campo de data
                form.reset({
                    ...data,
                    fields: {
                        ...data.fields,
                        data: today
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        append({
            versaoItemID: null,
            descricao: '',
            link: ''
        })

        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id])

    //? Gerencia o array de itens (descrição e link)
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields.items'
    })

    const handleRemove = index => {
        if (fields.length === 1) {
            toast.error('A versão deve conter pelo menos um item!')
            return
        }

        remove(index)
    }

    return (
        <>
            {data && (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormHeader
                        btnCancel
                        btnNew={true}
                        btnSave
                        handleSubmit={() => form.handleSubmit(onSubmit)}
                        btnDelete={type === 'edit' ? true : false}
                        onclickDelete={() => setOpen(true)}
                        type={type}
                    />
                    <Card>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Input xs={12} md={8} title='Nome' name='fields.nome' required={true} form={form} />

                                <DateField
                                    xs={12}
                                    md={4}
                                    title='Data'
                                    name={`fields.data`}
                                    value={data?.fields.data}
                                    form={form}
                                />

                                <Grid item xs={12}>
                                    <div className='flex items-center gap-2 pb-1 pt-2'>
                                        <div className=''>
                                            <Icon icon='ph:code-bold' className='text-3xl' />
                                        </div>
                                        <div className='flex flex-col gap-0'>
                                            <p className='text-xl'>Itens da versão</p>
                                            <p className='opacity-50'>
                                                Descreva abaixo as implementações, correções e melhorias realizadas,
                                                opcionalmente é possível inserir links para uma melhor demonstração.
                                                Estas descrições ficarão disponíveis para todos os clientes.
                                            </p>
                                        </div>
                                    </div>
                                </Grid>

                                {fields.map((item, index) => (
                                    <Fragment key={item.id}>
                                        {/* Input hidden enviando versaoItemID */}
                                        <input
                                            type='hidden'
                                            name={`fields.items[${index}].versaoItemID`}
                                            value={item.versaoItemID}
                                        />

                                        <Input
                                            xs={12}
                                            md={8}
                                            title='Descrição'
                                            name={`fields.items[${index}].descricao`}
                                            required
                                            form={form}
                                        />
                                        <Input
                                            xs={12}
                                            md={3}
                                            title='Link (opcional)'
                                            name={`fields.items[${index}].link`}
                                            form={form}
                                        />
                                        <Grid item xs={12} md={1} className='flex items-center'>
                                            <IconButton color='error' size='small' onClick={() => handleRemove(index)}>
                                                <Icon icon={'tabler:trash-filled'} />
                                            </IconButton>
                                        </Grid>
                                    </Fragment>
                                ))}

                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={() => append({ descricao: '', link: '' })}
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                    >
                                        Inserir Item
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

export default FormVersao

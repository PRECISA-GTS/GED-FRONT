import { Button, Card, CardContent, Grid, IconButton } from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import toast from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const Limpeza = ({ form }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [itens, setItens] = useState(null)

    //? Itens da limpeza
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields.limpeza'
    })

    const getItemsLimpeza = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post('/cadastros/item/getItems', {
                parFormularioID: 4, // limpeza
                unidadeID: loggedUnity.unidadeID
            })

            setItens(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItemsLimpeza()
    }, [form])

    useEffect(() => {
        if (form.watch('fields.realizaLimpeza') && fields.length === 0) {
            append({ item: null })
        }
    }, [form.watch('fields.realizaLimpeza')])

    return (
        form.watch('fields.realizaLimpeza') && (
            <Card>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <div className='flex items-center gap-2 pb-1 pt-2'>
                                <div className=''>
                                    <Icon icon='carbon:clean' className='text-3xl' />
                                </div>
                                <div className='flex flex-col gap-0'>
                                    <p className='text-xl'>Limpeza</p>
                                </div>
                            </div>
                        </Grid>

                        <Input
                            xs={12}
                            md={4}
                            title='Frequência (dias)'
                            name='fields.frequenciaLimpeza'
                            form={form}
                            helpText='Prazo para notificação da próxima limpeza do equipamento (calendário)'
                        />

                        <Input
                            xs={12}
                            md={12}
                            title='Orientações da limpeza'
                            name='fields.orientacoesLimpeza'
                            form={form}
                            multiline
                            rows={3}
                        />

                        <Grid item xs={12}>
                            <div className='flex items-center gap-2 pb-1 pt-2'>
                                <div className=''>
                                    <Icon icon='material-symbols:format-list-bulleted-rounded' className='text-3xl' />
                                </div>
                                <div className='flex flex-col gap-0'>
                                    <p className='text-xl'>Itens</p>
                                </div>
                            </div>
                        </Grid>

                        {fields.map((item, index) => (
                            <Fragment key={item.id}>
                                <Select
                                    xs={12}
                                    md={11}
                                    title='Item'
                                    name={`fields.limpeza[${index}]`}
                                    required
                                    options={itens ?? []}
                                    form={form}
                                />

                                <Grid item xs={12} md={1} className='flex items-center'>
                                    <IconButton
                                        color='error'
                                        size='small'
                                        onClick={() => {
                                            if (fields.length == 1) {
                                                toast.error('É necessário possuir pelo menos um item!')
                                                return
                                            }
                                            remove(index)
                                        }}
                                    >
                                        <Icon icon={'tabler:trash-filled'} />
                                    </IconButton>
                                </Grid>
                            </Fragment>
                        ))}

                        <Grid item xs={12}>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() =>
                                    append({
                                        item: null
                                    })
                                }
                                startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                            >
                                Inserir
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    )
}

export default Limpeza

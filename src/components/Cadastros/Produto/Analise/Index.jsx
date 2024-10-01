import { Button, Card, CardContent, Grid, IconButton, Tooltip } from '@mui/material'
import Check from 'src/components/Form/Check'
import Input from 'src/components/Form/Input'
import Icon from 'src/@core/components/icon'
import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'

const Analise = ({ form, data }) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields.analises'
    })

    const watchFields = index => ({
        minimo: form.watch(`fields.analises[${index}].minimo`),
        maximo: form.watch(`fields.analises[${index}].maximo`)
    })

    const handleStatus = index => {
        form.setValue(`fields.analises[${index}].status`, form.watch(`fields.analises[${index}].status`) === 1 ? 0 : 1)
    }

    return (
        form.watch('fields.usaLaboratorio') && (
            <Card>
                <CardContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <div className='flex items-center gap-2 pb-1 pt-2'>
                                <div className=''>
                                    <Icon icon='entypo:lab-flask' className='text-3xl' />
                                </div>
                                <div className='flex flex-col gap-0'>
                                    <p className='text-xl'>Análises</p>
                                </div>
                            </div>
                        </Grid>

                        {fields.map((item, index) => {
                            const { minimo, maximo } = watchFields(index)

                            return (
                                <Fragment key={item.id}>
                                    <input type='hidden' name={`fields.analises[${index}].id`} value={item.id} />

                                    <Input
                                        xs={12}
                                        md={3}
                                        title='Nome'
                                        name={`fields.analises[${index}].nome`}
                                        required
                                        form={form}
                                        opacity={form.getValues('fields.analises')[index].status === 0 ? true : false}
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Unidade'
                                        name={`fields.analises[${index}].unidade`}
                                        required
                                        form={form}
                                        helpText='%, UI/g'
                                        opacity={form.getValues('fields.analises')[index].status === 0 ? true : false}
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Mínimo'
                                        name={`fields.analises[${index}].minimo`}
                                        required={!form.watch(`fields.analises[${index}].maximo`) ? true : false}
                                        form={form}
                                        errorText={
                                            parseFloat(form.watch(`fields.analises[${index}].minimo`)) >=
                                                parseFloat(form.watch(`fields.analises[${index}].maximo`)) &&
                                            'O mínimo deve ser menor que o máximo'
                                        }
                                        opacity={form.getValues('fields.analises')[index].status === 0 ? true : false}
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Máximo'
                                        name={`fields.analises[${index}].maximo`}
                                        required={!form.watch(`fields.analises[${index}].minimo`) ? true : false}
                                        form={form}
                                        errorText={
                                            parseFloat(form.watch(`fields.analises[${index}].minimo`)) >=
                                                parseFloat(form.watch(`fields.analises[${index}].maximo`)) &&
                                            'O máximo deve ser maior que o mínimo'
                                        }
                                        opacity={form.getValues('fields.analises')[index].status === 0 ? true : false}
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Ajuda/Dica/Método'
                                        name={`fields.analises[${index}].ajuda`}
                                        form={form}
                                        opacity={form.getValues('fields.analises')[index].status === 0 ? true : false}
                                    />

                                    <Grid item xs={12} md={1} className='flex items-center'>
                                        <Tooltip
                                            title={
                                                form.getValues(`fields.analises[${index}].status`) === 1
                                                    ? 'Desativar item'
                                                    : 'Ativar item'
                                            }
                                            placement='top'
                                        >
                                            <IconButton
                                                color={
                                                    form.getValues(`fields.analises[${index}].status`) === 1
                                                        ? 'error'
                                                        : 'primary'
                                                }
                                                size='small'
                                                onClick={() => handleStatus(index)}
                                            >
                                                <Icon
                                                    icon={
                                                        form.getValues(`fields.analises[${index}].status`) === 1
                                                            ? 'heroicons-outline:ban'
                                                            : 'tabler:check'
                                                    }
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title='Remover item' placement='top'>
                                            <IconButton color='error' size='small' onClick={() => remove(index)}>
                                                <Icon icon={'tabler:trash-filled'} />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Fragment>
                            )
                        })}

                        <Grid item xs={12}>
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => {
                                    append({
                                        id: null,
                                        nome: '',
                                        unidade: '',
                                        minimo: '',
                                        maximo: '',
                                        ajuda: ''
                                    })
                                    form.trigger()
                                }}
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

export default Analise

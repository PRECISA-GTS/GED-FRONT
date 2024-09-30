import { Button, Card, CardContent, Grid, IconButton } from '@mui/material'
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
                            console.log('🚀 ~ minimo, maximo:', minimo, maximo)

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
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Unidade'
                                        name={`fields.analises[${index}].unidade`}
                                        required
                                        form={form}
                                        helpText='%, UI/g'
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Mínimo'
                                        name={`fields.analises[${index}].minimo`}
                                        required={!form.watch(`fields.analises[${index}].maximo`) ? true : false}
                                        form={form}
                                        errorText={
                                            minimo &&
                                            maximo &&
                                            parseFloat(form.watch(`fields.analises[${index}].minimo`)) >=
                                                parseFloat(form.watch(`fields.analises[${index}].maximo`)) &&
                                            'O mínimo deve ser menor que o máximo'
                                        }
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Máximo'
                                        name={`fields.analises[${index}].maximo`}
                                        required={!form.watch(`fields.analises[${index}].minimo`) ? true : false}
                                        form={form}
                                        errorText={
                                            minimo &&
                                            maximo &&
                                            parseFloat(form.watch(`fields.analises[${index}].minimo`)) >=
                                                parseFloat(form.watch(`fields.analises[${index}].maximo`)) &&
                                            'O máximo deve ser maior que o mínimo'
                                        }
                                    />
                                    <Input
                                        xs={12}
                                        md={2}
                                        title='Ajuda/Dica/Método'
                                        name={`fields.analises[${index}].ajuda`}
                                        form={form}
                                    />

                                    <Grid item xs={12} md={1} className='flex items-center'>
                                        <IconButton color='error' size='small' title='Inativar'>
                                            <Icon icon='heroicons-outline:ban' />
                                        </IconButton>
                                        <IconButton
                                            color='error'
                                            size='small'
                                            onClick={() => remove(index)}
                                            title='Remover'
                                        >
                                            <Icon icon={'tabler:trash-filled'} />
                                        </IconButton>
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

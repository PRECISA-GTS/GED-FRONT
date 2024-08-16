import { Button, Card, CardContent, CardHeader, Grid, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Fragment, useContext, useEffect, useState } from 'react'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const Setor = ({
    data,
    getValues,
    setValue,
    control,
    register,
    errors,
    removeItem,
    key,
    trigger,
    fields,
    append,
    remove
}) => {
    const { loggedUnity } = useContext(AuthContext)

    const [setores, setSetores] = useState([])
    const today = new Date().toISOString().substring(0, 10)

    console.log('🚀 ~ fields:', fields)
    console.log('🚀 ~ setores:', setores)
    console.log('🚀 ~ today:', today)

    const getSetores = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post('/cadastros/setor', { unidadeID: loggedUnity.unidadeID })
            setSetores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSetores()
    }, [])

    return (
        <Card>
            <CardHeader title='Setores' />
            <CardContent>
                <Grid container spacing={5}>
                    {fields.map((item, index) => (
                        <Fragment key={item.id}>
                            <input type='hidden' name={`fields.setores[${index}].id`} value={item.id} />

                            <Select
                                xs={12}
                                md={7}
                                title='Setor'
                                name={`fields.setores[${index}].setor`}
                                value={data?.fields?.setores?.[index]?.setor}
                                required
                                options={setores ?? []}
                                register={register}
                                setValue={setValue}
                                control={control}
                                errors={errors?.fields?.setores?.[index]?.setor}
                            />

                            <DateField
                                xs={12}
                                md={2}
                                title='Data Início'
                                name={`fields.setores[${index}].dataInicio`}
                                value={data?.fields?.setores?.[index]?.dataInicio ?? today}
                                required
                                register={register}
                                control={control}
                                errors={errors?.fields?.setores?.[index]?.dataInicio}
                            />

                            <DateField
                                xs={12}
                                md={2}
                                title='Data Fim'
                                name={`fields.setores[${index}].dataFim`}
                                value={data?.fields?.setores?.[index]?.dataFim}
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
                                    dataInicio: today
                                })
                                trigger()
                            }}
                            startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                        >
                            Inserir Setor
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Setor

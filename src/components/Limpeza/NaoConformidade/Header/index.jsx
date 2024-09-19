import { Card, CardContent, Grid } from '@mui/material'
import WhoFills from './WhoFills'
import NcType from './NcType'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import CustomFields from 'src/components/Defaults/Formularios/CustomFields'
import InfoDepartamentos from 'src/components/Defaults/Formularios/InfoDepartamentos'
import { useEffect } from 'react'

const Header = ({ form, data, disabled }) => {
    if (!data) return

    const calculateValidDate = () => {
        const initialDate = form.getValues('header.data')
        const days = parseInt(form.getValues('header.prazoSolucao'), 10)
        if (!initialDate || isNaN(days)) return '--'
        const date = new Date(initialDate + 'T00:00:00')
        date.setDate(date.getDate() + days)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        const dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date)
        const dateFormatted = `${day}/${month}/${year} (${dayOfWeek})`
        return dateFormatted
    }

    useEffect(() => {
        calculateValidDate()
    }, [form.watch('header.data'), form.watch('header.prazoSolucao')])

    return (
        <Card>
            <CardContent>
                <Grid container spacing={6} className='items-center'>
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                        <InfoDepartamentos data={data?.departamentosPreenchimento ?? []} />
                    </Grid>

                    <DateField
                        xs={12}
                        md={3}
                        title='Data'
                        type='date'
                        required
                        name={`header.data`}
                        value={data.data}
                        disabled={disabled}
                        typeValidation='dataPassado'
                        daysValidation={999999}
                        form={form}
                    />
                    <Input
                        xs={12}
                        md={3}
                        title='Hora'
                        name={`header.hora`}
                        type='time'
                        required
                        disabled={disabled}
                        form={form}
                    />
                    <Input
                        xs={12}
                        md={3}
                        title='Prazo para a solução (em dias)'
                        name={`header.prazoSolucao`}
                        disabled={disabled}
                        type='number'
                        form={form}
                        helpText='Informe o prazo pra solução da não conformidade. Será gerado um alerta no vencimento do prazo.'
                    />

                    <Grid item xs={12} md={3}>
                        <label className='opacity-60'>Vencimento</label>
                        <p>{calculateValidDate()}</p>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <WhoFills form={form} data={data} disabled={disabled} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <p>Não Conformidade do Recebimento:</p>
                        <Grid container item xs={12} md={12}>
                            <NcType form={form} data={data} disabled={disabled} />
                        </Grid>
                    </Grid>

                    {/* Fields dinamicos */}
                    <CustomFields form={form} fields={data.fields} disabled={disabled} />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Header

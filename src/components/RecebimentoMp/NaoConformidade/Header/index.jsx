import { Card, CardContent, Grid } from '@mui/material'
import WhoFills from './WhoFills'
import NcType from './NcType'
import Input from 'src/components/Form/Input'
import Model from './Model'
import DateField from 'src/components/Form/DateField'
import CustomFields from 'src/components/Defaults/Formularios/CustomFields'

const Header = ({ form, data }) => {
    if (!data) return

    return (
        <Card>
            <CardContent className='space-y-4'>
                <Grid container spacing={4} className='items-center'>
                    <DateField
                        xs={12}
                        md={2}
                        title='Data'
                        type='date'
                        required
                        name={`header.data`}
                        register={form.register}
                        control={form.control}
                        value={data.data}
                        typeValidation='dataPassado'
                        daysValidation={999999}
                        errors={form.errors?.header?.data}
                    />
                    <Input
                        xs={12}
                        md={2}
                        title='Hora'
                        name={`header.hora`}
                        type='time'
                        register={form.register}
                        control={form.control}
                        errors={form.errors?.header?.hora}
                    />
                    <Model form={form} data={data} />
                    <Input
                        xs={12}
                        md={4}
                        title='Prazo para a solução (em dias)'
                        name={`header.prazoSolucao`}
                        required
                        type='number'
                        control={form.control}
                        helpText='Informe o prazo pra solução da não conformidade. Será gerado um alerta no vencimento do prazo.'
                    />

                    <Grid item xs={12} md={12}>
                        <WhoFills form={form} data={data} />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <p>Não Conformidade do Recebimento:</p>
                        <Grid container item xs={12} md={12}>
                            <NcType form={form} data={data} />
                        </Grid>
                    </Grid>

                    {/* Fields dinamicos */}
                    <CustomFields form={form} fields={data.fields} disabled={false} />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Header

import { Card, CardContent, Grid } from '@mui/material'
import WhoFills from './WhoFills'
import NcType from './NcType'
import Input from 'src/components/Form/Input'
import Model from './Model'

const Header = ({ form, data }) => {
    return (
        <Card>
            <CardContent className='space-y-4'>
                <WhoFills form={form} data={data} />
                <NcType form={form} data={data} />
                <Input
                    xs={12}
                    md={12}
                    title='Descrição da não conformidade (ação/demanda)'
                    name={`header.descricao`}
                    required
                    multiline
                    rows={8}
                    control={form.control}
                />

                <Grid container spacing={4}>
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
                    <Model form={form} data={data} />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Header

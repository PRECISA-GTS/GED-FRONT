import { Card, CardContent, Grid } from '@mui/material'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

const RecebimentoMpInfo = ({ data }) => {
    if (!data) return

    return (
        <Card>
            <CardContent className='space-y-2 '>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <label className='opacity-60'>Fornecedor</label>
                        <div className='flex items-center gap-2'>
                            <Icon icon='mdi:truck-fast-outline' />
                            <p>{data.fornecedor}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <label className='opacity-60'>Data e hora do recebimento</label>
                        <div className='flex items-center gap-2'>
                            <Icon icon='tabler:calendar-check' />
                            <p>{`${data.dataRecebimentoMp} ${data.horaRecebimentoMp}`}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <label className='opacity-60'>NF</label>
                        <div className='flex items-center gap-2 '>
                            <Icon icon='ion:document-text-outline' />
                            <p>{data.nfRecebimentoMp}</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <label className='opacity-60'>Status do recebimento</label>
                        <div>
                            <CustomChip
                                skin='light'
                                label='Reprovado'
                                color={'error'}
                                sx={{ height: 28, fontSize: '0.75rem' }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RecebimentoMpInfo

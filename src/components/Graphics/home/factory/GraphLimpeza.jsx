// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CustomAvatar from 'src/@core/components/mui/avatar'
import AnalyticsOverview from 'src/views/dashboards/analytics/AnalyticsOverview'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Grid } from '@mui/material'

const GraphLimpeza = ({ data }) => {
    console.log('🚀 ~ GraphLimpeza: ', data)
    return (
        <Card>
            {data &&
                data.map(row => (
                    <>
                        <CardContent>
                            <Grid container className='flex items-center' spacing={2}>
                                <Grid item xs={12}>
                                    <div className='flex items-center gap-4'>
                                        <CustomAvatar skin='light' variant='rounded' color='primary'>
                                            <Icon icon='carbon:clean' className='text-base text-[#35553B]' />
                                        </CustomAvatar>
                                        <Typography variant='body1' className='font-bold'>
                                            {row.nome} ({row.ciclo} {row.ciclo > 1 ? 'dias' : 'dia'})
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <div className='relative flex justify-center items-center h-full'>
                                        <Typography variant='h4' className='absolute font-bold top-[35%]'>
                                            {row.diasRestantes}
                                        </Typography>
                                        <Typography variant='caption' className='absolute bottom-[22%]'>
                                            {row.diasRestantes == 1 ? 'dia' : 'dias'}
                                        </Typography>
                                        <AnalyticsOverview percent={row.porcentagem} />
                                    </div>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Box display='flex' alignItems='center' sx={{ gap: 8 }}>
                                        <Box display='flex' flexDirection='column' sx={{ gap: 2 }}>
                                            <Box>
                                                <Typography variant='caption'>Último</Typography>
                                                <Typography variant='body2'>{row.ultimo}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant='caption'>Limite</Typography>
                                                <Typography variant='body2'>{row.limite}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider sx={{ my: '0 !important' }} />
                    </>
                ))}
        </Card>
    )
}
export default GraphLimpeza

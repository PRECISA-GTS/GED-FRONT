import Grid from '@mui/material/Grid'
import Icon from 'src/@core/components/icon'
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from 'src/views/dashboards/crm/CrmTotalProfit'
import CrmWeeklyOverview from 'src/views/dashboards/crm/CrmWeeklyOverview'
import CrmOrganicSessions from 'src/views/dashboards/crm/CrmOrganicSessions'
import CrmProjectTimeline from 'src/views/dashboards/crm/CrmProjectTimeline'
import { Alert, Card, CardContent, CardHeader, Tooltip, Typography } from '@mui/material'
import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Router from 'next/router'
import CrmExternalLinks from 'src/views/dashboards/crm/CrmExternalLinks'
import CrmAward from 'src/views/dashboards/crm/CrmAward'
import CrmSocialNetworkVisits from 'src/views/dashboards/crm/CrmSocialNetworkVisits'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import EcommerceSalesOverview from 'src/views/dashboards/ecommerce/EcommerceSalesOverview'
import AnalyticsOverview from 'src/views/dashboards/analytics/AnalyticsOverview'
import GraphLimpeza from 'src/components/Graphics/home/factory/GraphLimpeza'
import AppCalendar from 'src/components/Calendar/index'
import SupplierNonCompliance from './SupplierNonCompliance'
import CustomAvatar from 'src/@core/components/mui/avatar'
import EventsPerDay from './EventsPerDay'

const Factory = () => {
    const { loggedUnity } = useContext(AuthContext)
    const [dataFornecedor, setDataFornecedor] = useState(null)
    const [dataRecebimentoNC, setDataRecebimentoNC] = useState(null)
    const [limpeza, setLimpeza] = useState(null)
    const [dataSupplierNonCompliance, setDataSupplierNonCompliance] = useState(null)
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const today_ = today.split('-').reverse().join('/') // DD/MM/YYYY

    // Dia da semana hoje em português
    const dayOfWeek = new Date().getDay()
    const weekDay = new Date().toLocaleDateString('pt-BR', { weekday: 'long' })

    const getData = async () => {
        try {
            const response = await api.get(`dashboard/fabrica/getData/${loggedUnity.unidadeID}`)
            setDataFornecedor(response.data.fornecedorPorStatus)
            setDataRecebimentoNC(response.data.totalRecebimentoNC)
            setLimpeza(response.data.limpeza)
            setDataSupplierNonCompliance(response.data.supplierNonCompliance)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        dataFornecedor && (
            <ApexChartWrapper>
                <Grid container spacing={6}>
                    {/* Calendário */}
                    <Grid item xs={12} md={6}>
                        <AppCalendar />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={6} className='match-height'>
                            <Grid item xs={12} md={12}>
                                <Card>
                                    <CardContent className='space-y-4'>
                                        <div className='flex items-center gap-4'>
                                            <CustomAvatar skin='light' variant='rounded' color='warning'>
                                                <Icon icon='mage:calendar-check-fill' className='text-base' />
                                            </CustomAvatar>
                                            <Typography variant='body1'>{`Hoje, ${today_} (${weekDay})`}</Typography>
                                        </div>
                                        <EventsPerDay eventDate={today} />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <SupplierNonCompliance data={dataSupplierNonCompliance} />
                            </Grid>
                            <Grid item xs={6}>
                                <CrmWeeklyOverview data={dataRecebimentoNC} />
                            </Grid>
                            <Grid item xs={6}>
                                <GraphLimpeza data={limpeza} />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={6} >
                        {dataFornecedor.map((row, index) => (
                            <Grid item xs={12} md={3}>
                                <CardStatisticsVertical
                                    stats={row.stats}
                                    color={row.color}
                                    title={row.title ?? '0'}
                                    chipText='Last 4 Month'
                                    icon={<Icon icon='mdi:truck-fast-outline' />}
                                />
                            </Grid>
                        ))}
                    </Grid> */}
                </Grid>
            </ApexChartWrapper>
        )
    )
}

export default Factory

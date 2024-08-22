import Grid from '@mui/material/Grid'
import Icon from 'src/@core/components/icon'
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTotalProfit from 'src/views/dashboards/crm/CrmTotalProfit'
import CrmWeeklyOverview from 'src/views/dashboards/crm/CrmWeeklyOverview'
import CrmOrganicSessions from 'src/views/dashboards/crm/CrmOrganicSessions'
import CrmProjectTimeline from 'src/views/dashboards/crm/CrmProjectTimeline'
import { Alert, Card, CardContent } from '@mui/material'
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
import LastForms from './LastForms'
import CardMyData from './CardMyData'
import DefaultSkeleton from 'src/components/Skeleton/DefaultSkeleton'
import useLoad from 'src/hooks/useLoad'

const Supplier = () => {
    const { loggedUnity } = useContext(AuthContext)
    const { isLoading, startLoading, stopLoading } = useLoad()
    const [lastForms, seLastForms] = useState(null)

    const getData = async () => {
        const data = {
            cnpj: loggedUnity.cnpj
        }
        startLoading()
        try {
            const response = await api.post(`dashboard/fornecedor/getData`, data)
            seLastForms(response.data.lastForms)
        } catch (err) {
            console.log(err)
        } finally {
            stopLoading()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <DefaultSkeleton type='dashboard' show={isLoading} />
            {!isLoading && lastForms && (
                <ApexChartWrapper>
                    <Grid container spacing={6} className='match-height'>
                        <Grid item xs={12} md={3}>
                            <CardMyData />
                        </Grid>
                        {/* Blocos com os principais formularios, ordenado por status */}
                        {lastForms &&
                            lastForms.map((row, index) => {
                                console.log('🚀 ~ row:', row)
                                return (
                                    <Grid item xs={12} md={3} key={index}>
                                        <LastForms row={row} icon={<Icon icon='mdi:truck-fast-outline' />} />
                                    </Grid>
                                )
                            })}

                        {/* Tudo em uma bloco */}
                        {/* <Grid item xs={12} md={12}>
                        <EcommerceSalesOverview title='Fornecedor' data={dataFornecedor} />
                    </Grid> */}

                        {/* Recebimento MP e Não Conformidade */}
                        {/* <Grid item xs={12} md={9}>
                        <CrmWeeklyOverview data={dataRecebimentoNC} />
                    </Grid> */}

                        {/* Limpeza e Higienização */}
                        {/* <Grid item xs={12} md={3}>
                        <GraphLimpeza data={limpeza} />
                    </Grid> */}

                        {/* <Grid item xs={12} md={12}>
                        <CrmProjectTimeline />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CrmOrganicSessions data={data} />
                    </Grid>
                    <Grid item xs={6} sm={3} md={6}>
                        <CrmTotalProfit />
                    </Grid>
                    <Grid item xs={6} sm={3} md={6}>
                        <CrmTotalGrowth />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CrmWeeklyOverview />
                    </Grid> */}
                    </Grid>
                </ApexChartWrapper>
            )}
        </>
    )
}

export default Supplier

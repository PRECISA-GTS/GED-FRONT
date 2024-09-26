import Grid from '@mui/material/Grid'
import Icon from 'src/@core/components/icon'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CrmWeeklyOverview from 'src/views/dashboards/crm/CrmWeeklyOverview'
import { Card, CardContent, Typography } from '@mui/material'
import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import AppCalendar from 'src/components/Calendar/index'
import SupplierNonCompliance from './SupplierNonCompliance'
import CustomAvatar from 'src/@core/components/mui/avatar'
import EventsPerDay from './EventsPerDay'
import PendingSuppliers from './PendingSuppliers'
import useLoad from 'src/hooks/useLoad'
import DefaultSkeleton from 'src/components/Skeleton/DefaultSkeleton'

const Factory = () => {
    const { loggedUnity } = useContext(AuthContext)
    const [dataFornecedor, setDataFornecedor] = useState(null)
    const [pendingSuppliersNumbers, setPendingSuppliersNumbers] = useState(null)
    const { isLoading, startLoading, stopLoading } = useLoad()
    const [dataRecebimentoNC, setDataRecebimentoNC] = useState(null)
    const [dataSupplierNonCompliance, setDataSupplierNonCompliance] = useState(null)
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const today_ = today.split('-').reverse().join('/') // DD/MM/YYYY
    const weekDay = new Date().toLocaleDateString('pt-BR', { weekday: 'long' })

    const getData = async () => {
        startLoading()
        try {
            const response = await api.get(`dashboard/fabrica/getData/${loggedUnity.unidadeID}`)
            setDataFornecedor(response.data.fornecedorPorStatus)
            setDataRecebimentoNC(response.data.totalRecebimentoNC)
            setDataSupplierNonCompliance(response.data.supplierNonCompliance)
            setPendingSuppliersNumbers(response.data.pendingSuppliers)
        } catch (err) {
            console.log(err)
        } finally {
            stopLoading()
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log('🚀 ~ pendingSuppliersNumbers:', pendingSuppliersNumbers)

    return (
        <>
            <DefaultSkeleton type='dashboard' show={isLoading} />

            {!isLoading && dataFornecedor && (
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
                                    {/* ERRO  */}
                                    <CrmWeeklyOverview data={dataRecebimentoNC} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PendingSuppliers data={pendingSuppliersNumbers} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </ApexChartWrapper>
            )}
        </>
    )
}

export default Factory

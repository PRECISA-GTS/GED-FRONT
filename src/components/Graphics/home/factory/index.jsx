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

const Factory = () => {
    const { loggedUnity } = useContext(AuthContext)
    const [dataFornecedor, setDataFornecedor] = useState(null)
    const [dataRecebimentoNC, setDataRecebimentoNC] = useState(null)
    const [limpeza, setLimpeza] = useState(null)
    const [fotoBinaria, setFotoBinaria] = useState([])

    const getData = async () => {
        try {
            const response = await api.get(`dashboard/fabrica/getData/${loggedUnity.unidadeID}`)
            setDataFornecedor(response.data.fornecedorPorStatus)
            console.log('🚀 ~ response:', response)
            setDataRecebimentoNC(response.data.totalRecebimentoNC)
            setLimpeza(response.data.limpeza)
        } catch (err) {
            console.log(err)
        }
    }

    const getFoto = async () => {
        try {
            console.log('busca foto....')
            await api.post(`login/testeFoto/`).then(response => {
                console.log('fotos:', response.data)
                setFotoBinaria(response.data)
            })
            // setFotoBinaria(response.data.foto64)
            // console.log('foto:', response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const sendFoto = async event => {
        try {
            const selectedFiles = event.target.files
            console.log('🚀 ~ selectedFiles:', selectedFiles.length)

            const formData = new FormData()
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('files[]', selectedFiles[i])
                console.log('🚀 ~ selectedFiles[i]:', selectedFiles[i])
            }

            console.log('🚀 ~ enviando foto pro backend: ', formData)
            const response = await api.post(`login/enviaFoto/`, formData)
            getFoto()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
        getFoto()
    }, [])

    return (
        dataFornecedor && (
            <ApexChartWrapper>
                {/* {fotoBinaria &&
                    fotoBinaria.map(foto => {
                        return foto.tipo === 'image/jpeg' ? (
                            <a href={foto.url} target='_blank' className='bg-blue-600 p-4 rounded-md text-white '>
                                <img src={foto.url} alt='Imagem' />
                            </a>
                        ) : (
                            <p>
                                <a href={foto.url} target='_blank' className='bg-green-600 p-4 rounded-md text-white '>
                                    Abrir documento
                                </a>
                            </p>
                        )
                    })} */}

                {/* <input
                    type='file'
                    multiple
                    onChange={e => {
                        sendFoto(e)
                    }}
                /> */}

                <Grid container spacing={6} className='match-height'>
                    {/* Por estatus em blocos separadosç */}
                    {dataFornecedor.map(row => (
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

                    {/* Tudo em uma bloco */}
                    {/* <Grid item xs={12} md={12}>
                        <EcommerceSalesOverview title='Fornecedor' data={dataFornecedor} />
                    </Grid> */}

                    {/* Recebimento MP e Não Conformidade */}
                    <Grid item xs={12} md={9}>
                        <CrmWeeklyOverview data={dataRecebimentoNC} />
                    </Grid>

                    {/* Limpeza e Higienização */}
                    <Grid item xs={12} md={3}>
                        <GraphLimpeza data={limpeza} />
                    </Grid>

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
        )
    )
}

export default Factory

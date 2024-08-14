import { Card, CardContent, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

const SupplierNonCompliance = ({ data }) => {
    if (!data) return

    const theme = useTheme()
    console.log('🚀 ~ theme:', theme.palette.mode)
    const series = [
        {
            name: 'Total',
            data: data.percents //? [45, 26, 18, 10, 9.6]
        }
    ]

    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                barHeight: '70%',
                horizontal: true,
                distributed: true,
                startingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return `${val}%`
            },
            offsetY: 8,
            style: {
                fontWeight: 600,
                fontSize: '0.875rem',
                // colors: [theme.palette.text.default]
                colors: [theme.palette.warning.light]
            }
        },
        grid: {
            strokeDashArray: 8,
            borderColor: theme.palette.divider,
            xaxis: {
                lines: { show: true }
            },
            yaxis: {
                lines: { show: false }
            },
            padding: {
                top: -18,
                left: 21,
                right: 33,
                bottom: 10
            }
        },
        colors: [theme.palette.mode === 'dark' ? '#49483A' : '#F7E8CC'],
        legend: { show: false },
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        xaxis: {
            axisTicks: { show: false },
            axisBorder: { show: false },
            categories: data.suppliers, //? ['Cerealista Xaxim', 'Produmix', 'Grão Mais', 'Soma', 'Aurora'],
            labels: {
                formatter: val => `${Number(val)}%`,
                style: {
                    fontSize: '0.875rem',
                    colors: theme.palette.text.disabled
                }
            }
        },
        yaxis: {
            labels: {
                align: theme.direction === 'rtl' ? 'right' : 'left',
                style: {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    colors: theme.palette.text.primary
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${val}%`
                }
            }
        }
    }

    return (
        <Card>
            <CardContent>
                <div className='flex items-center gap-4'>
                    <CustomAvatar skin='light' variant='rounded' color='warning'>
                        <Icon icon='typcn:warning' className='text-base' />
                    </CustomAvatar>
                    <Typography variant='body1'>Não Conformidades por Fornecedor nos últimos 365 dias</Typography>
                </div>

                <ReactApexcharts type='bar' height={294} series={series} options={options} />
            </CardContent>
        </Card>
    )
}

export default SupplierNonCompliance

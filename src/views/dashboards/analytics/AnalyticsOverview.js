// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const AnalyticsOverview = ({ percent }) => {
    console.log("🚀 ~ percent:", percent)
    // ** Hook
    const theme = useTheme()

    const options = {
        chart: {
            sparkline: { enabled: true }
        },
        stroke: { lineCap: 'round' },
        colors: [
            hexToRGBA(
                percent >= 100 ? theme.palette.error.main : percent > 80 ? theme.palette.warning.main : theme.palette.info.main
                , 1)
        ],
        plotOptions: {
            radialBar: {
                hollow: { size: '55%' },
                track: {
                    background: '#e1e1e1'
                },
                dataLabels: {
                    name: { show: false },
                    value: {
                        show: false,
                        offsetY: 5,
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: theme.palette.text.primary
                    }
                }
            }
        },
        grid: {
            padding: {
                bottom: -12
            }
        },
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        }
    }

    return (
        <ReactApexcharts type='radialBar' height={119} series={[percent > 0 ? percent : 100]} options={options} />
    )
}

export default AnalyticsOverview

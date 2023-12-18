import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import Router from 'next/router'

const renderStats = (data) => {

    const router = Router

    const handleFilterStatus = (sale) => {
        router.push(`/formularios/fornecedor/?s=${sale.title}`)
    }

    return data.map((sale, index) => (
        <Grid item xs={6} sm={3} key={index}>
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleFilterStatus(sale)} className='cursor-pointer'>
                <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
                    <Icon icon={sale.icon} />
                </CustomAvatar>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h4' sx={{ fontWeight: 600 }}>
                        {sale.stats}
                    </Typography>
                    <Typography variant='body2'>{sale.title}</Typography>
                </Box>
            </Box>
        </Grid>
    ))
}

const EcommerceSalesOverview = ({ title, subTitle, data }) => {
    return (
        <Card>
            <CardHeader
                sx={{ pb: 3.25 }}
                title={title}
                titleTypographyProps={{ variant: 'h6' }}
                action={
                    <OptionsMenu
                        options={['Last 28 Days', 'Last Month', 'Last Year']}
                        iconButtonProps={{ size: 'small', className: 'card-more-options' }}
                    />
                }
                subheader={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, '& svg': { color: 'success.main' } }}>
                        <Typography variant='caption2' sx={{ mr: 1.5 }}>
                            {subTitle}
                        </Typography>
                        {/* <Icon icon='mdi:chevron-up' fontSize={20} /> */}
                    </Box>
                }
            />
            <CardContent>
                <Grid container spacing={6}>
                    {renderStats(data)}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default EcommerceSalesOverview

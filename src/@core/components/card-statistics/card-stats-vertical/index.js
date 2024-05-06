import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Router from 'next/router'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'
import { useFilter } from 'src/context/FilterContext'

const CardStatsVertical = props => {
    const { title, color, icon, stats = 'positive' } = props
    const router = Router
    const theme = useTheme()
    const { setSearchText } = useFilter()

    const handleFilterStatus = () => {
        setSearchText(title)
        router.push(`/formularios/fornecedor`)
    }

    return (
        <Card
            sx={{
                "&:hover": {
                    backgroundColor: theme.palette.action.hover
                }
            }}

            onClick={handleFilterStatus}
            className={`cursor-pointer  shadow-xl transition-all`}
        >
            <CardContent>
                <div className=' space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <CustomAvatar skin='light' variant='rounded' color={color}>
                                {icon}
                            </CustomAvatar>
                            <Typography variant='body1'>{title}</Typography>
                        </div>
                        <div>
                            <Icon icon='uil:external-link-alt' className='text-base' />
                        </div>
                    </div>
                    <div className={`w-full flex justify-center`}>
                        <Typography variant='h2' sx={{ fontWeight: 600 }}>
                            {stats}
                        </Typography>

                    </div>
                </div>
            </CardContent>
        </Card >
    )
}

export default CardStatsVertical
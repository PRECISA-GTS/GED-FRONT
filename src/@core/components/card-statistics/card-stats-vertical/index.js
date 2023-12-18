import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Router from 'next/router'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useContext } from 'react'

const CardStatsVertical = props => {
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode
    const { title, color, icon, stats = 'positive' } = props
    const router = Router

    const handleFilterStatus = () => {
        router.push(`/formularios/fornecedor/?s=${props.title}`)
    }

    return (
        <Card onClick={handleFilterStatus} className={`cursor-pointer ${mode == 'dark' ? 'hover:bg-[#232327]' : 'hover:bg-[#EEEEF1]'}  shadow-xl transition-all`}>
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
                            <Icon icon='uil:external-link-alt' className='text-base text-[#35553B]' />
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
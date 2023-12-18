import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Router from 'next/router'
import Icon from 'src/@core/components/icon'
import { SettingsContext } from 'src/@core/context/settingsContext'
import CustomChip from 'src/@core/components/mui/chip'
import { Avatar } from '@mui/material'
import { RouteContext } from 'src/context/RouteContext'
import { useContext } from 'react'

const LastForms = ({ row }) => {
    const { settings } = useContext(SettingsContext)
    const { setId } = useContext(RouteContext)
    const mode = settings.mode
    const router = Router

    const handleFilterStatus = () => {
        setId(row.fornecedorID)
        router.push(`/formularios/fornecedor`)
    }

    return (
        <Card
            onClick={handleFilterStatus}
            className={`cursor-pointer ${
                mode === 'dark' ? 'hover:bg-[#232327]' : 'hover:bg-[#EEEEF1]'
            }  shadow-xl transition-all`}
        >
            <CardContent>
                <div className='space-y-4 p-1'>
                    <div className='flex  justify-between'>
                        <div className='flex gap-4'>
                            <Avatar
                                variant='rounded'
                                sx={{ width: 70, height: 70 }}
                                className={`${row.logo ? 'p-1' : 'p-0'}  ${
                                    mode === 'dark' ? '!bg-[#e0e0e0]' : '!bg-[#f5f5f5]'
                                }`}
                            >
                                <img src={row.logo ?? '/imageDefault/factory.svg'} alt='Imagem da logo da fábrica' />
                            </Avatar>
                            <div className='space-y-2'>
                                <CustomChip
                                    size='small'
                                    skin='light'
                                    color={row.cor}
                                    label={row.status}
                                    sx={{
                                        mx: 2,
                                        '& .MuiChip-label': { textTransform: 'capitalize' }
                                    }}
                                />
                                <div className='leading-4'>
                                    <Typography variant='body2'>Aberto em {row.dataCriacao_formatada}</Typography>
                                    <Typography variant='caption'>há {row.quantidadeDias} dias</Typography>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Icon icon='uil:external-link-alt' className='text-base text-[#35553B]' />
                        </div>
                    </div>
                    <div className='w-full flex justify-between'>
                        <Typography variant='body1' className='!font-medium'>
                            {row.fabrica}
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default LastForms

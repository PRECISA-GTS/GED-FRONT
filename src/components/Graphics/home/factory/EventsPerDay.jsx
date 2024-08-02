import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { api } from 'src/configs/api'
import { useTheme } from '@mui/material/styles'
import { RouteContext } from 'src/context/RouteContext'

const EventsPerDay = ({ eventDate }) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [events, setEvents] = useState([])
    const { setId } = useContext(RouteContext)
    const theme = useTheme()
    const router = useRouter()

    const getIcon = tipo => {
        const icon =
            tipo === 'Fornecedor'
                ? 'mdi:truck-fast-outline'
                : tipo === 'Recebimento de MP'
                ? 'icon-park-outline:receive'
                : tipo === 'Limpeza'
                ? 'carbon:clean'
                : 'ph:bell'
        return icon
    }

    const handleClick = event => {
        if (!event.origemID) return

        router.push(`${event.rota}`)
        setId(event.origemID)
    }

    const getEventsOfDay = async () => {
        if (!eventDate) return

        const params = {
            eventDate: eventDate,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID,
            papelID: user.papelID,
            admin: user.admin
        }

        try {
            const response = await api.post('calendario/getEventsOfDay', params)
            setEvents(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEventsOfDay()
    }, [])

    return (
        <div className='flex flex-col gap-2'>
            {events.length > 0 &&
                events.map((event, index) => (
                    <div
                        key={index}
                        className={`flex justify-between py-6 px-5 rounded-lg border ${
                            theme.palette.mode === 'dark'
                                ? 'border-[#2f363f] hover:bg-[#2f363f]'
                                : 'border-[##F5F5F5] hover:bg-[#F5F5F5]'
                        }  ${event.origemID > 0 ? 'cursor-pointer' : ''}`}
                        onClick={() => handleClick(event)}
                    >
                        <div>
                            <div className='flex items-center gap-2'>
                                <Typography variant='body1' fontWeight='bold'>
                                    {event.titulo}
                                </Typography>
                                {event.origemID > 0 && <Icon icon='tabler:external-link' />}
                            </div>

                            <Typography variant='body2'>{event.descricao}</Typography>
                            <Typography variant='body2' className='opacity-50'>
                                Farelo de soja, Milho
                            </Typography>
                        </div>

                        <div className='flex items-center gap-2'>
                            <Typography variant='body1'>{event.tipo}</Typography>
                            <CustomAvatar skin='light' variant='rounded' color={event.variant}>
                                <Icon icon={getIcon(event.tipo)} className='text-base' />
                            </CustomAvatar>
                        </div>
                    </div>
                ))}

            {events.length === 0 && <Typography variant='body1'>Nenhum evento pra hoje!</Typography>}
        </div>
    )
}

export default EventsPerDay

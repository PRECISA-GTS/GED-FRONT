import { useRouter } from 'next/router'
import { Grid, Typography } from "@mui/material"
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/AuthContext"
import { api } from "src/configs/api"
import { useTheme } from '@mui/material/styles'
import { RouteContext } from 'src/context/RouteContext'

const Event = ({ values }) => {
  const { user, loggedUnity } = useContext(AuthContext)
  const { setId } = useContext(RouteContext)
  const [events, setEvents] = useState([])
  const theme = useTheme()
  const router = useRouter()

  const data = {
    ...values._def.extendedProps,
    title: values._def.title,
    eventDate: values?._def?.extendedProps?.eventDate
  }

  const getIcon = (tipo) => {
    const icon = tipo === 'Fornecedor' ? 'mdi:truck-fast-outline' : tipo === 'Recebimento de MP' ? 'icon-park-outline:receive' : tipo === 'Limpeza' ? 'carbon:clean' : 'ph:bell'
    return icon
  }

  const getEventsOfDay = async () => {
    if (!data.eventDate) return

    const params = {
      eventDate: data.eventDate,
      usuarioID: user.usuarioID,
      unidadeID: loggedUnity.unidadeID,
      papelID: user.papelID,
      admin: user.admin
    }

    try {
      const response = await api.post('calendario/getEventsOfDay', params);
      setEvents(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (event) => {
    if (!event.origemID) return

    router.push(`${event.rota}`)
    setId(event.origemID)
  }

  useEffect(() => {
    getEventsOfDay()
  }, [])

  return (

    <Grid container spacing={4}>
      <Grid item xs={6} md={12} >
        <div className="flex flex-col gap-2">
          {events.length > 0 && events.map((event, index) => (
            <div
              key={index}
              className={`flex justify-between py-6 px-5 rounded-lg border ${theme.palette.mode === 'dark' ? 'border-[#2f363f] hover:bg-[#2f363f]' : 'border-[##F5F5F5] hover:bg-[#F5F5F5]'}  ${event.origemID > 0 ? 'cursor-pointer' : ''}`}
              onClick={() => handleClick(event)}
            >
              <div>
                <div className="flex items-center gap-2">
                  <Typography variant="body1" fontWeight="bold">
                    {event.titulo} - {event.variant}
                  </Typography>
                  {event.origemID > 0 && (
                    <Icon icon="tabler:external-link" />
                  )}
                </div>

                <Typography variant="body2">
                  {event.descricao}
                </Typography>
                <Typography variant="body2">
                  {event.hora}
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
        </div>
      </Grid>
    </Grid>
  )
}

export default Event

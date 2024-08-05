import { AuthContext } from 'src/context/AuthContext'
import { useContext, useEffect, useState } from 'react'
// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'
import { api } from 'src/configs/api'
import ptBr from '@fullcalendar/core/locales/pt-br'
// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'
import Legend from './Legend'
import DialogActs from '../Defaults/Dialogs/DialogActs'
import Event from './Event'

const Calendar = () => {
  const { user, loggedUnity } = useContext(AuthContext)
  const [events, setEvents] = useState([])
  const [open, setOpen] = useState(false)
  const [event, setEvent] = useState(null)

  const getEvents = async () => {
    const data = {
      usuarioID: user.usuarioID,
      unidadeID: loggedUnity.unidadeID,
      papelID: user.papelID,
      admin: user.admin
    }
    try {
      const response = await api.post('calendario/getEvents', data);
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  // ** calendarOptions
  const calendarOptions = {
    events: events.length ? events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'today,dayGridMonth,timeGridWeek,dayGridDay,listMonth'
    },
    views: {
      week: {
        titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
      }
    },
    /* Enable dragging and resizing event */
    editable: false,
    /* Enable resizing event from start */
    eventResizableFromStart: true,
    locale: ptBr,
    /* Automatically scroll the scroll-containers during event drag-and-drop and date selecting */
    dragScroll: true,
    /* Max number of events within a given day */
    dayMaxEvents: 10,
    /* Determines if day names and week names are clickable*/
    navLinks: true,
    eventContent({ event: calendarEvent }) {
      const colorVariant = calendarEvent._def.extendedProps.variant
      const color = colorVariant == 'info' ? `text-[#26C6F9]` : colorVariant == 'error' ? `text-[#FF4D49]` : colorVariant == 'warning' ? `text-[#FDB528]` : `text-[#6D788D]`
      let styles = `cursor-pointer text-center p-2 ${color}`;

      const htmlEvent = `
            <div class="${styles}">
                <div class="font-bold text-3xl">
                    ${calendarEvent.title}
                </div>
            </div>
            `

      return { html: htmlEvent }
    },
    eventClick({ event: clickedEvent }) {
      setOpen(true)
      setEvent(clickedEvent)
    },
    dateClick(info) {
      console.log('dateClick')
    },
    eventDrop({ event: droppedEvent }) {
      console.log('eventDrop')
    },
    eventResize({ event: resizedEvent }) {
      console.log('eventResize')
    }
  }

  // @ts-ignore
  return (
    <>
      <FullCalendar {...calendarOptions} />
      <Legend />
      {/* Modal pra ver o evento */}
      <DialogActs
        title={`${event?._def?.title} ${event?._def?.title == 1 ? 'evento' : 'eventos'} em ${event?._def?.extendedProps?.eventDate_} (${event?._def?.extendedProps?.dayWeek})`}
        setOpenModal={setOpen}
        openModal={open}
        size='md'
      >
        <Event values={event} />
      </DialogActs>
    </>
  )
}

export default Calendar

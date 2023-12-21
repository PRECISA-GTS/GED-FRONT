import Router from 'next/router'
import { RouteContext } from 'src/context/RouteContext'

// ** React Import
import { useContext, useEffect, useRef, useState } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'
import { api } from 'src/configs/api'

import { useSettings } from 'src/@core/hooks/useSettings'

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'
import Legend from './Legend'
import DialogActs from '../Defaults/Dialogs/DialogActs'
import Event from './Event'

const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
        calendar: '',
        guests: [],
        location: '',
        description: ''
    }
}

const Calendar = props => {
    // ** Props
    const {
        store,
        dispatch,
        direction,
        updateEvent,
        calendarApi,
        CalendarColor,
        setCalendarApi,
        handleSelectEvent,
        handleLeftSidebarToggle,
        handleAddEventSidebarToggle
    } = props

    const router = Router
    const { setId } = useContext(RouteContext)
    const { settings } = useSettings()
    const [events, setEvents] = useState([])
    const [open, setOpen] = useState(false)
    const [modalEvent, setModalEvent] = useState(null)

    // ** Refs
    const calendarRef = useRef()
    useEffect(() => {
        if (calendarApi === null) {
            // @ts-ignore
            setCalendarApi(calendarRef.current?.getApi())
        }
    }, [calendarApi, setCalendarApi])
    if (store) {
        console.log("🚀 ~ store:", store)

        const getEvents = async () => {
            const data = {
                usuarioID: 2,
                unidadeID: 1,
                papelID: 1
            }
            try {
                const response = await api.post('calendario/getEvents', data);
                setEvents(response.data);
                console.log("🚀 ~ getEvents response: ", response.data)
            } catch (error) {
                console.error('Erro ao buscar eventos:', error);
            }
        }

        const handleEventLink = () => {
            const { rota, id } = modalEvent._def.extendedProps.link
            console.log("🚀 ~ rota, rotaID:", rota, id)

            router.push(rota)
            setId(id)

        }

        useEffect(() => {
            getEvents()
        }, [])

        // ** calendarOptions(Props)
        const calendarOptions = {
            events: events.length ? events : [],
            plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
                start: 'sidebarToggle, prev, next, title',
                end: 'today,dayGridMonth,timeGridWeek,listMonth'
            },
            views: {
                week: {
                    titleFormat: { year: 'numeric', month: 'long', day: 'numeric' }
                }
            },

            // height: 'auto',

            /*
            Enable dragging and resizing event
            ? Docs: https://fullcalendar.io/docs/editable
            */
            editable: true,

            /*
            Enable resizing event from start
            ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
            */
            eventResizableFromStart: true,

            locale: 'pt-br',

            /*
            Automatically scroll the scroll-containers during event drag-and-drop and date selecting
            ? Docs: https://fullcalendar.io/docs/dragScroll
            */
            dragScroll: true,

            /*
            Max number of events within a given day
            ? Docs: https://fullcalendar.io/docs/dayMaxEvents
            */
            dayMaxEvents: 10,

            /*
            Determines if day names and week names are clickable
            ? Docs: https://fullcalendar.io/docs/navLinks
            */
            navLinks: true,
            eventClassNames({ event: calendarEvent }) {
                // @ts-ignore
                const colorName = CalendarColor[calendarEvent._def.extendedProps.calendar]

                return [
                    // Background Color transparent
                    // `bg-${colorName}`

                ]
            },
            eventContent({ event: calendarEvent }) {
                // const colorName = calendarEvent._def.ui.backgroundColor
                const colorVariant = calendarEvent._def.extendedProps.variant
                const colorHex = CalendarColor[colorVariant]

                const colorLight = colorVariant == 'info' ? `text-[#26C6F9]` : colorVariant == 'error' ? `text-[#FF4D49]` : colorVariant == 'warning' ? `text-[#FDB528]` : `text-[#6D788D]`

                console.log("🚀 ~ color:", colorVariant, colorHex, colorLight)

                let styles = `font-bold p-2 ${colorLight}`;
                return { html: `<div class="${styles}">${calendarEvent.title}</div>` }
            },
            eventClick({ event: clickedEvent }) {
                setOpen(true)
                setModalEvent(clickedEvent)

                // dispatch(handleSelectEvent(clickedEvent))
                // handleAddEventSidebarToggle()

                // * Only grab required field otherwise it goes in infinity loop
                // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
                // event.value = grabEventDataFromEventApi(clickedEvent)
                // isAddNewEventSidebarActive.value = true
            },
            // customButtons: {
            //     sidebarToggle: {
            //         icon: 'bi bi-list',
            //         click() {
            //             handleLeftSidebarToggle()
            //         }
            //     }
            // },
            dateClick(info) {
                const ev = { ...blankEvent }
                ev.start = info.date
                ev.end = info.date
                ev.allDay = true

                // @ts-ignore
                dispatch(handleSelectEvent(ev))
                handleAddEventSidebarToggle()
            },

            /*
            Handle event drop (Also include dragged event)
            ? Docs: https://fullcalendar.io/docs/eventDrop
            ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
            */
            eventDrop({ event: droppedEvent }) {
                dispatch(updateEvent(droppedEvent))
            },

            /*
            Handle event resize
            ? Docs: https://fullcalendar.io/docs/eventResize
            */
            eventResize({ event: resizedEvent }) {
                dispatch(updateEvent(resizedEvent))
            },
            ref: calendarRef,

            // Get direction from app state (store)
            direction,
        }

        // @ts-ignore
        return <>
            <FullCalendar {...calendarOptions} />
            <Legend />
            {/* Modal pra ver o evento */}
            <DialogActs
                title='Calendário'
                setOpenModal={setOpen}
                openModal={open}
                size='sm'
                handleLink={handleEventLink}
            >
                <Event values={modalEvent} />
            </DialogActs>
        </>
    } else {
        return null
    }
}

export default Calendar

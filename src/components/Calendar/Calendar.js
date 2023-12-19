// ** React Import
import { useEffect, useRef } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import interactionPlugin from '@fullcalendar/interaction'

// ** Third Party Style Import
import 'bootstrap-icons/font/bootstrap-icons.css'

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
    console.log("🚀 ~ CalendarColor:", CalendarColor.Personal)

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


        // Transforma o hex em rgba como alpha de 0.2
        const hexToRgb = (hex, alpha = 0.2) => {
            hex = hex.replace(/^#/, '');

            let bigint = parseInt(hex, 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;

            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };

        const events = [
            {
                id: 1,
                title: 'Fornecedor Mais Frango',
                start: '2023-12-21',
                end: '2023-12-21',
                color: hexToRgb(CalendarColor.info),
            },
            {
                id: 2,
                title: 'Fornecedor Soma',
                start: '2023-12-22',
                end: '2023-12-22',
                color: hexToRgb(CalendarColor.info),
            },
            {
                id: 3,
                title: 'Limpeza da Sala Dona Jura',
                start: '2023-12-18',
                end: '2023-12-18',
                color: hexToRgb(CalendarColor.error),
            },
            {
                id: 4,
                title: 'Limpeza do Silo Cleomar',
                start: '2023-12-21',
                end: '2023-12-21',
                color: hexToRgb(CalendarColor.warning),
            },
            {
                id: 5,
                title: 'Limpeza do Silo Cleomar',
                start: '2023-12-21',
                end: '2023-12-21',
                color: hexToRgb(CalendarColor.secondary),
            },
            {
                id: 6,
                title: 'Limpeza do Silo Cleomar',
                start: '2023-12-20',
                end: '2023-12-20',
                color: hexToRgb(CalendarColor.info),
            },
            {
                id: 7,
                title: 'Limpeza do Silo Cleomar',
                start: '2023-12-21',
                end: '2023-12-21',
                color: hexToRgb(CalendarColor.secondary),
            },
            {
                id: 8,
                title: 'Limpeza do Silo Cleomar',
                start: '2023-12-21',
                end: '2023-12-21',
                color: hexToRgb(CalendarColor.info),
            },
            {
                id: 9,
                title: 'Limpeza do Silo Cleomar',
                start: '2023-12-21',
                end: '2023-12-21',
                color: hexToRgb(CalendarColor.info),
            },
        ];


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

            height: 'auto',

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
                const colorName = calendarEvent._def.ui.backgroundColor

                const color = colorName == 'rgba(38, 198, 249, 0.2)' ? 'text-blue-500' : colorName == 'rgba(255, 77, 73, 0.2)' ? 'text-red-500' : colorName == 'rgba(253, 181, 40, 0.2)' ? 'text-yellow-500' : 'text-black';

                let styles = `font-bold p-1 ${color}`;
                return { html: `<div class="${styles}">${calendarEvent.title}</div>` }
            },
            eventClick({ event: clickedEvent }) {
                dispatch(handleSelectEvent(clickedEvent))
                handleAddEventSidebarToggle()

                // * Only grab required field otherwise it goes in infinity loop
                // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
                // event.value = grabEventDataFromEventApi(clickedEvent)
                // isAddNewEventSidebarActive.value = true
            },
            customButtons: {
                sidebarToggle: {
                    icon: 'bi bi-list',
                    click() {
                        handleLeftSidebarToggle()
                    }
                }
            },
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
        return <FullCalendar {...calendarOptions} />
    } else {
        return null
    }
}

export default Calendar

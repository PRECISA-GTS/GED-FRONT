// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

import { useTheme } from '@mui/material/styles'

// ** FullCalendar & App Components Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from './AddEventSidebar'

// ** Actions
import {
    addEvent,
    fetchEvents,
    deleteEvent,
    updateEvent,
    handleSelectEvent,
    handleAllCalendars,
    handleCalendarsUpdate
} from 'src/store/apps/calendar'
import DialogActs from '../Defaults/Dialogs/DialogActs'

const AppCalendar = () => {

    // ** States
    const [calendarApi, setCalendarApi] = useState(null)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)

    // ** Hooks
    const { settings } = useSettings()
    const dispatch = useDispatch()
    const store = useSelector(state => state.calendar)
    const theme = useTheme()

    // ** Vars
    const leftSidebarWidth = 260
    const addEventSidebarWidth = 400
    const { skin, direction } = settings
    const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))

    // ** SidebarColors
    const SidebarLeftColor = {
        Personal: 'error',
        Business: 'primary',
        Family: 'warning',
        Holiday: 'success',
        ETC: 'info'
    }
    // ** CalendarColors
    const CalendarColor = {
        error: theme.palette.error.main,
        primary: theme.palette.primary.main,
        warning: theme.palette.warning.main,
        success: theme.palette.success.main,
        info: theme.palette.info.main,
        secondary: theme.palette.secondary.main
    }

    useEffect(() => {
        dispatch(fetchEvents(store.selectedCalendars))
        console.log('index chamando funçao fetchEvents', store.events)
    }, [dispatch, store.selectedCalendars])
    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

    return (
        <>
            <CalendarWrapper
                className='app-calendar'
                sx={{
                    padding: 4,
                    backgroundColor: settings.mode == 'dark' ? '#27272A' : '#FFF',
                    boxShadow: skin === 'bordered' ? 0 : 6,
                    ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
                }}
            >
                {/* <SidebarLeft
                    store={store}
                    mdAbove={mdAbove}
                    dispatch={dispatch}
                    SidebarLeftColor={SidebarLeftColor}
                    leftSidebarOpen={leftSidebarOpen}
                    leftSidebarWidth={leftSidebarWidth}
                    handleSelectEvent={handleSelectEvent}
                    handleAllCalendars={handleAllCalendars}
                    handleCalendarsUpdate={handleCalendarsUpdate}
                    handleLeftSidebarToggle={handleLeftSidebarToggle}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                /> */}
                <Box
                    sx={{
                        px: 5,
                        pt: 3.75,
                        flexGrow: 1,
                        borderRadius: 1,
                        boxShadow: 'none',
                        backgroundColor: 'background.paper',
                        ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
                    }}
                >
                    <Calendar
                        store={store}
                        dispatch={dispatch}
                        direction={direction}
                        updateEvent={updateEvent}
                        calendarApi={calendarApi}
                        CalendarColor={CalendarColor}
                        setCalendarApi={setCalendarApi}
                        handleSelectEvent={handleSelectEvent}
                        handleLeftSidebarToggle={handleLeftSidebarToggle}
                        handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                    />
                </Box>
                <AddEventSidebar
                    store={store}
                    dispatch={dispatch}
                    addEvent={addEvent}
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                    calendarApi={calendarApi}
                    drawerWidth={addEventSidebarWidth}
                    handleSelectEvent={handleSelectEvent}
                    addEventSidebarOpen={addEventSidebarOpen}
                    handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                />
            </CalendarWrapper>
        </>
    )
}

export default AppCalendar

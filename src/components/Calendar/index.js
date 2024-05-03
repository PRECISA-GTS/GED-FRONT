// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'
import { useTheme } from '@mui/material/styles'

// ** FullCalendar & App Components Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

const AppCalendar = () => {
    // ** Hooks
    const { settings } = useSettings()
    const theme = useTheme()


    // ** Vars
    const { skin } = settings
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

    return (
        <>
            <CalendarWrapper
                className='app-calendar'
                sx={{
                    padding: 4,
                    backgroundColor: settings.mode == 'dark' ? '#212b36' : '#FFF',
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
                    <Calendar />
                </Box>
            </CalendarWrapper>
        </>
    )
}

export default AppCalendar

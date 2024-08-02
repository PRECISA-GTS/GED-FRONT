import { Grid } from "@mui/material"
import EventsPerDay from '../Graphics/home/factory/EventsPerDay'

const Event = ({ values }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={12} >
        <EventsPerDay eventDate={values?._def?.extendedProps?.eventDate} />
      </Grid>
    </Grid>
  )
}

export default Event

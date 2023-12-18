import { Grid, Typography, Box, FormControlLabel, Checkbox } from '@mui/material'

const Check = ({ xs, md, title, index, name, typePage, value, edit, register, setValue, className }) => {
    return (
        <Grid item xs={xs} md={md} className={className}>
            <Box height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography variant='caption'>{!index || index == 0 ? title : ''}</Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            size='small'
                            sx={{ ml: 4 }}
                            {...register(name)}
                            defaultChecked={value == true || value == 1 || typePage == 'new'}
                            onChange={e => {
                                edit ? setValue(edit, true) : null
                            }}
                        />
                    }
                />
            </Box>
        </Grid>
    )
}

export default Check

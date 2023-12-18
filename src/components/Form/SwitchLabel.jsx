import { Grid, Box, FormControlLabel, Switch } from '@mui/material'

const SwitchLabel = ({ xs, md, title, index, name, typePage, value, disabled, register, ...props }) => {
    return (
        <Grid item xs={xs} md={md}>
            <Box display='flex' flexDirection='column' alignItems='start'>
                <FormControlLabel
                    control={
                        <Switch
                            {...props}
                            name={name}
                            {...register(name)}
                            defaultChecked={value}
                            disabled={disabled}
                            onChange={e => {
                                if (props.onChange) props.onChange(e.target.checked, index, name, typePage)
                            }}
                        />
                    }
                    label={title}
                    size='small'
                    sx={{
                        '&:hover': {
                            '& .MuiFormControlLabel-label': {
                                color: 'primary.main'
                            }
                        }
                    }}
                />
            </Box>
        </Grid>
    )
}

export default SwitchLabel

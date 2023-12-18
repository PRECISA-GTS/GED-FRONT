import { Grid, Typography, Box, FormControlLabel, Checkbox, ListItem, ListItemButton } from '@mui/material'
import HelpText from '../Defaults/HelpText'

const CheckLabel = ({
    xs,
    md,
    title,
    index,
    name,
    typePage,
    value,
    disabled,
    register,
    onClick,
    helpText,
    helpTextPosition
}) => {
    console.log('🚀 ~ CheckLabel:', value)

    return (
        <Grid item xs={xs ?? '12'} md={md ?? '12'}>
            <Box display='flex' alignItems='center' justifyContent='start' sx={{ gap: 0 }}>
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={name}
                                onClick={onClick}
                                {...register(name)}
                                defaultChecked={value}
                                disabled={disabled}
                            />
                        }
                        label={title}
                        size='small'
                        sx={{
                            marginRight: '4px', // Define a margem como 0 para reduzir o espaçamento
                            '&:hover': {
                                '& .MuiFormControlLabel-label': {
                                    color: 'primary.main'
                                }
                            }
                        }}
                    />
                    {helpText && <HelpText text={helpText} position={helpTextPosition ?? 'top'} />}
                </>
            </Box>
        </Grid>
    )
}

export default CheckLabel

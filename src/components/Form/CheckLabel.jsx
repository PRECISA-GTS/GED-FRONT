import { Grid, Box, FormControlLabel, Checkbox } from '@mui/material'
import HelpText from '../Defaults/HelpText'
import { useEffect } from 'react'

const CheckLabel = ({ form, xs, md, title, name, value, disabled, onClick, helpText, helpTextPosition }) => {
    // Define o valor do checkbox no form, mesmo quando desabilitado
    useEffect(() => {
        if (disabled) {
            form.setValue(name, value)
        }
    }, [disabled, value, form, name])

    return (
        <Grid item xs={xs ?? '12'} md={md ?? '12'}>
            <Box display='flex' alignItems='center' justifyContent='start' sx={{ gap: 0 }}>
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name={name}
                                onClick={onClick}
                                {...form.register(name)}
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
                    {helpText && (
                        <HelpText text={helpText} position={helpTextPosition ?? 'top'} className='relative top-[2px]' />
                    )}
                </>
            </Box>
        </Grid>
    )
}

export default CheckLabel

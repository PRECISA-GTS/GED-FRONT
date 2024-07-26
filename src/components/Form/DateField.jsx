import { Grid, FormControl, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { useState } from 'react'
import { dateConfig } from 'src/configs/defaultConfigs'

const DateField = ({
    xs,
    md,
    title,
    required,
    disabled,
    type,
    value,
    name,
    typeValidation,
    daysValidation,
    errors,
    alertRequired,
    control // Add 'control' prop to receive the react-hook-form control object
}) => {
    const theme = useTheme()
    const [dateStatus, setDateStatus] = useState({})

    const formatDate = dateString => {
        const date = new Date(dateString)
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
    }

    const setDateFormat = (type, name, value, numDays) => {
        const newDate = new Date(value)
        const status = dateConfig(type, newDate, numDays)
        setDateStatus(prevState => ({
            ...prevState,
            [name]: status
        }))
    }

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }}>
            <FormControl fullWidth>
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: required }}
                    render={({ field }) => (
                        <TextField
                            type={type ?? 'date'}
                            size='small'
                            label={title}
                            disabled={disabled ? true : false}
                            defaultValue={value ? formatDate(value) : ''}
                            error={errors}
                            onChange={e => {
                                field.onChange(e) // Manually update the field value
                                if (typeValidation) setDateFormat(typeValidation, type, e.target.value, daysValidation)
                            }}
                            variant='outlined'
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                min: dateStatus?.[type]?.dataIni,
                                max: dateStatus?.[type]?.dataFim
                            }}
                            sx={{
                                ...(alertRequired &&
                                    !field?.value && {
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: theme.palette.error.main
                                            },
                                            '&:hover fieldset': {
                                                borderColor: theme.palette.error.main
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: theme.palette.error.main
                                            }
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: theme.palette.error.main
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: theme.palette.error.main
                                        }
                                    })
                            }}
                        />
                    )}
                />
            </FormControl>
        </Grid>
    )
}

export default DateField

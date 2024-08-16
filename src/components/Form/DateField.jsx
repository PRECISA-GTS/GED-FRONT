import { Grid, FormControl, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react'
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
    errors,
    alertRequired,
    control,
    opacity
}) => {
    const theme = useTheme()
    const [dateStatus, setDateStatus] = useState({})
    const [inputError, setInputError] = useState(null)

    useEffect(() => {
        if (typeValidation && value) {
            setDateFormat(typeValidation, name, value)
        }
    }, [typeValidation, value, name])

    const formatDate = dateString => {
        const date = new Date(dateString + 'T00:00:00')
        const day = date.getUTCDate().toString().padStart(2, '0')
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
        const year = date.getUTCFullYear()
        return `${year}-${month}-${day}`
    }

    const setDateFormat = (type, name, value, numDays) => {
        const newDate = new Date(value + 'T00:00:00')
        const status = dateConfig(type, newDate, numDays)
        setDateStatus(prevState => ({
            ...prevState,
            [name]: status
        }))
    }

    const validateDate = dateValue => {
        const currentDate = new Date()
        const selectedDate = new Date(dateValue + 'T00:00:00')

        if (typeValidation === 'dataAtual' && selectedDate.toDateString() !== currentDate.toDateString()) {
            setInputError('A data deve ser a data atual')
            return false
        } else if (typeValidation === 'dataPassado' && selectedDate >= currentDate) {
            setInputError('A data deve ser do passado')
            return false
        } else if (typeValidation === 'dataFutura' && selectedDate <= currentDate) {
            setInputError('A data deve ser do futuro')
            return false
        } else {
            setInputError(null)
            return true
        }
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
                            error={!!errors || !!inputError}
                            helperText={inputError}
                            onChange={e => {
                                const dateValue = e.target.value
                                if (validateDate(dateValue)) {
                                    field.onChange(dateValue)
                                    if (typeValidation) setDateFormat(typeValidation, name, dateValue)
                                }
                            }}
                            variant='outlined'
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                min:
                                    typeValidation === 'dataFutura'
                                        ? new Date().toISOString().split('T')[0]
                                        : undefined,

                                max:
                                    typeValidation === 'dataPassado'
                                        ? new Date().toISOString().split('T')[0]
                                        : new Date(new Date().setFullYear(new Date().getFullYear() + 50))
                                              .toISOString()
                                              .split('T')[0]
                            }}
                            sx={{
                                opacity: opacity ? 0.4 : 1,
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

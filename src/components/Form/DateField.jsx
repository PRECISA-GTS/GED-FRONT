import { Grid, FormControl, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { get } from 'react-hook-form'
import { dateConfig } from 'src/configs/defaultConfigs'

const DateField = ({
    form,
    xs,
    md,
    title,
    required,
    disabled,
    type,
    value,
    name,
    typeValidation,
    alertRequired,
    opacity
}) => {
    const theme = useTheme()
    const [dateStatus, setDateStatus] = useState({})
    const [inputError, setInputError] = useState(null)

    // Valida erro a partir de form
    const hasError = Boolean(get(form.formState.errors, name))

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
            return 'A data deve ser a data atual'
        } else if (typeValidation === 'dataPassado' && selectedDate >= currentDate) {
            return 'A data deve ser do passado'
        } else if (typeValidation === 'dataFutura' && selectedDate <= currentDate) {
            return 'A data deve ser do futuro'
        } else {
            return null
        }
    }

    const handleChange = async e => {
        const dateValue = e.target.value
        const error = validateDate(dateValue)
        setInputError(error)

        if (!error) {
            form.setValue(name, dateValue) // Atualiza o valor no formulário
            if (typeValidation) setDateFormat(typeValidation, name, dateValue)
        }

        // Força a validação do campo após a alteração
        await form.trigger(name)
    }

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }}>
            <FormControl fullWidth>
                <TextField
                    type={type ?? 'date'}
                    size='small'
                    label={title}
                    disabled={disabled}
                    defaultValue={value ? formatDate(value) : ''}
                    error={hasError || !!inputError}
                    helperText={inputError}
                    onChange={handleChange}
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                        shrink: true
                    }}
                    inputProps={{
                        min: typeValidation === 'dataFutura' ? new Date().toISOString().split('T')[0] : undefined,
                        max:
                            typeValidation === 'dataPassado'
                                ? new Date().toISOString().split('T')[0]
                                : new Date(new Date().setFullYear(new Date().getFullYear() + 50))
                                      .toISOString()
                                      .split('T')[0]
                    }}
                    sx={{
                        opacity: opacity ? 0.4 : 1,
                        '& .MuiInputBase-input': {
                            padding: '10px 14px' // Ajuste o valor conforme necessário
                        },
                        ...((required || alertRequired) &&
                            (hasError || !!inputError) && {
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
                    {...form.register(name, { required })}
                />
            </FormControl>
        </Grid>
    )
}

export default DateField

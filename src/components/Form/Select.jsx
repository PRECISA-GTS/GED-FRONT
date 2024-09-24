import { Grid, FormControl, Autocomplete, TextField, Paper } from '@mui/material'
import HelpText from '../Defaults/HelpText'
import { useTheme } from '@mui/material/styles'
import { useSettings } from 'src/@core/hooks/useSettings'
import { useEffect } from 'react'

const Select = ({
    xs,
    md,
    title,
    options,
    name,
    limitTags,
    required,
    disabled,
    multiple,
    onChange,
    className,
    createNew,
    helpText,
    alertRequired,
    helpTextPosition,
    opacity,
    form
}) => {
    const {
        setValue,
        getValues,
        setError,
        clearErrors,
        formState: { errors }
    } = form
    const theme = useTheme()
    const { settings } = useSettings()

    const optionsWithNovo = createNew ? [{ nome: '-- Novo --' }, ...(options ?? [])] : options

    const handleChange = (e, newValue) => {
        if (newValue && e.target.innerText == '-- Novo --') {
            createNew()
        } else {
            setValue(name, newValue)
            onChange && onChange(newValue)

            console.log('🚀 ~ newValue:', newValue)

            if (required && (!newValue || (multiple && newValue.length === 0))) {
                setError(name, {
                    type: 'required',
                    message: `${title} é obrigatório`
                })
            } else {
                clearErrors(name)
            }
        }
    }

    //? Função que verifica se há apenas 1 opção pra seleção, se sim, já seta a opção como selecionada
    const onlyOneOption = () => {
        if (optionsWithNovo.length === 1) {
            setValue(name, optionsWithNovo[0])
            onChange && onChange(optionsWithNovo[0])
        }
    }

    useEffect(() => {
        onlyOneOption()
    }, [])

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth>
                    <Autocomplete
                        multiple={multiple}
                        limitTags={limitTags}
                        size='small'
                        options={optionsWithNovo}
                        getOptionLabel={option => option?.nome || ''}
                        value={multiple ? getValues(name) || [] : getValues(name) || null}
                        disabled={disabled}
                        onChange={handleChange}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label={title}
                                placeholder={title}
                                sx={{
                                    opacity: opacity ? 0.4 : 1,
                                    '& .MuiInputBase-input': {
                                        padding: '4px 14px !important'
                                    },
                                    ...((required || alertRequired) &&
                                        (multiple
                                            ? !getValues(name) || getValues(name)?.length === 0
                                            : !getValues(name)) && {
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
                        PaperComponent={({ children }) => (
                            <Paper
                                sx={{
                                    '& ul': {
                                        border:
                                            settings.mode === 'dark'
                                                ? `1px solid rgba(${theme.palette.customColors.main}, 0.32)`
                                                : `null`,
                                        borderRadius: '8px'
                                    }
                                }}
                            >
                                {children}
                            </Paper>
                        )}
                        noOptionsText='Sem opções'
                    />
                </FormControl>
                {helpText && (
                    <div className='absolute right-[60px] top-[12px]'>
                        <HelpText text={helpText} position={helpTextPosition ?? 'top'} />
                    </div>
                )}
            </div>
        </Grid>
    )
}

export default Select

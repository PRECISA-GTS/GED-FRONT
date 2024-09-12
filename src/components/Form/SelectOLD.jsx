import { Grid, FormControl, Autocomplete, TextField, Paper } from '@mui/material'
import { Controller } from 'react-hook-form'
import HelpText from '../Defaults/HelpText'
import { useTheme } from '@mui/material/styles'
import { useSettings } from 'src/@core/hooks/useSettings'

const Select = ({
    form,
    xs,
    md,
    title,
    options,
    name,
    limitTags,
    value,
    required,
    disabled,
    multiple,
    onChange,
    className,
    createNew,
    helpText,
    alertRequired,
    helpTextPosition,
    opacity
}) => {
    const theme = useTheme()
    const { settings } = useSettings()
    let optionsWithNovo = createNew ? [{ nome: '-- Novo --' }, ...(options ?? [])] : options
    console.log('🚀 ~ optionsWithNovo:', optionsWithNovo)

    const errorPath = name.split('.').reduce((obj, key) => obj?.[key], form?.formState?.errors)
    const hasError = Boolean(errorPath)

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth>
                    <Controller
                        name={name}
                        control={form.control}
                        defaultValue={value}
                        rules={{ required }}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                multiple={multiple}
                                limitTags={limitTags}
                                size='small'
                                options={optionsWithNovo}
                                getOptionLabel={option => option?.nome}
                                value={
                                    multiple && field.value && field.value.length > 0
                                        ? field.value.map(item => options.find(option => option.id === item.id))
                                        : field.value ?? { nome: '' }
                                }
                                disabled={disabled}
                                onChange={(e, newValue) => {
                                    if (newValue && e.target.innerText == '-- Novo --') {
                                        createNew()
                                    } else {
                                        // Use field.onChange para garantir que o valor esteja sendo controlado corretamente
                                        field.onChange(newValue)
                                        onChange && onChange(newValue)

                                        if (newValue) {
                                            form.clearErrors(name)
                                        } else {
                                            form.setError(name, {
                                                type: 'required',
                                                message: `${title} é obrigatório`
                                            })
                                        }
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={title}
                                        placeholder={title}
                                        // error={form.formState?.errors ? true : false}
                                        error={hasError}
                                        sx={{
                                            opacity: opacity ? 0.4 : 1,
                                            '& .MuiInputBase-input': {
                                                padding: '4px 14px !important' // Ajuste o valor conforme necessário
                                            },
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
                                PaperComponent={({ children }) => (
                                    <Paper
                                        sx={{
                                            '& ul': {
                                                border:
                                                    settings.mode == 'dark'
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
                        )}
                    />
                </FormControl>
                {helpText && (
                    <div className='absolute right-[60px] top-[12px] '>
                        <HelpText text={helpText} position={helpTextPosition ?? 'top'} />
                    </div>
                )}
            </div>
        </Grid>
    )
}

export default Select

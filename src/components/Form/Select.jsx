import { Grid, FormControl, Autocomplete, TextField, Paper } from '@mui/material'
import { Controller } from 'react-hook-form'
import HelpText from '../Defaults/HelpText'
import { useTheme } from '@mui/material/styles'
import { useSettings } from 'src/@core/hooks/useSettings'

const Select = ({
    xs,
    md,
    title,
    options,
    name,
    type,
    limitTags,
    value,
    required,
    control,
    disabled,
    multiple,
    setValue,
    errors,
    onChange,
    className,
    createNew,
    handleRegistroEstabelecimento,
    helpText,
    alertRequired,
    helpTextPosition,
    opacity
}) => {
    const theme = useTheme()
    const { settings } = useSettings()
    const { mode } = settings
    let optionsWithNovo = createNew ? [{ nome: '-- Novo --' }, ...(options ?? [])] : options

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth>
                    <Controller
                        name={name}
                        control={control}
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
                                        onChange && onChange(newValue)
                                        setValue(name, newValue)
                                        // type === 'registroestabelecimento'
                                        //     ? handleRegistroEstabelecimento(newValue ? newValue.id : null)
                                        //     : null
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={title}
                                        placeholder={title}
                                        error={errors ? true : false}
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

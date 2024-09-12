import { FormControl, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import {
    cnpjMask,
    cellPhoneMask,
    cepMask,
    ufMask,
    cpfMask,
    rgMask,
    currencyMask,
    fractioned3Mask
} from 'src/configs/masks'
import { useTheme } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import HelpText from '../Defaults/HelpText'
import { get } from 'react-hook-form'

const Input = ({
    form,
    xs,
    md,
    title,
    name,
    rows,
    type,
    mask,
    getAddressByCep,
    multiline,
    disabled,
    required,
    onChange,
    className,
    clearField,
    helpText,
    helpTextPosition,
    alertRequired,
    opacity,
    errorText,
    error,
    ...props
}) => {
    const theme = useTheme()

    //? Valida erro a partir de form
    const hasError = Boolean(get(form.formState.errors, name))

    // Aplica a máscara e define o valor
    const handleMaskedChange = e => {
        let value = e.target.value

        switch (mask) {
            case 'cnpj':
                value = cnpjMask(value)
                break
            case 'cep':
                value = cepMask(value)
                getAddressByCep && getAddressByCep(value)
                break
            case 'telefone':
                value = cellPhoneMask(value)
                break
            case 'estado':
                value = ufMask(value)
                break
            case 'cpf':
                value = cpfMask(value)
                break
            case 'rg':
                value = rgMask(value)
                break
            case 'currency':
                value = currencyMask(value)
                break
            case 'fractioned3':
                value = fractioned3Mask(value)
                break
            default:
                break
        }

        form.setValue(name, value) // Atualiza o valor mascarado no form
        if (onChange) {
            onChange(value) // Chama o onChange se fornecido
        }
    }

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth sx={{ position: 'relative' }}>
                    <TextField
                        {...form.register(name, {
                            required: required,
                            onChange: handleMaskedChange
                        })}
                        multiline={multiline}
                        label={title}
                        placeholder={title}
                        rows={rows}
                        type={type ?? 'text'}
                        size='small'
                        disabled={disabled}
                        aria-describedby='validation-schema-nome'
                        error={hasError}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={
                            mask === 'cnpj'
                                ? {
                                      maxLength: 18,
                                      type: 'tel',
                                      inputMode: 'numeric'
                                  }
                                : mask === 'cep'
                                ? {
                                      maxLength: 9,
                                      type: 'tel',
                                      inputMode: 'numeric'
                                  }
                                : mask === 'telefone'
                                ? {
                                      maxLength: 15
                                  }
                                : mask === 'cpf'
                                ? {
                                      maxLength: 14
                                  }
                                : mask === 'rg'
                                ? {
                                      maxLength: 11
                                  }
                                : mask === 'estado'
                                ? { maxLength: 2 }
                                : {}
                        }
                        // Adicione o botão de limpar como InputAdornment
                        InputProps={{
                            endAdornment: clearField && (
                                <InputAdornment position='end'>
                                    <IconButton onClick={clearField}>
                                        <Icon icon='clarity:close-line' fontSize={20} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            opacity: opacity ? 0.4 : 1,
                            '& .MuiInputBase-input': {
                                padding: '10px 14px' // Ajuste o valor conforme necessário
                            },
                            ...(alertRequired &&
                                hasError && {
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
                </FormControl>
                {helpText && (
                    <div className={`absolute ${type === 'number' ? 'right-10' : 'right-4'} top-[12px]`}>
                        <HelpText text={helpText} position={helpTextPosition ?? 'top'} />
                    </div>
                )}
                {errorText && <p className='pt-1 text-xs text-red-500'>{errorText}</p>}
            </div>
        </Grid>
    )
}

export default Input

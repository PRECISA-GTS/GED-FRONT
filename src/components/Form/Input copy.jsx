import { Controller } from 'react-hook-form'
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

const Input = ({
    form,
    xs,
    md,
    title,
    name,
    rows,
    value,
    type,
    mask,
    getAddressByCep,
    multiline,
    disabled,
    required,
    onChange,
    className,
    help,
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
    const errorPath = name.split('.').reduce((obj, key) => obj?.[key], form?.formState?.errors)
    const hasError = Boolean(errorPath)

    const aplicarMascara = (mask, value, getAddressByCep) => {
        switch (mask) {
            case 'cnpj':
                return cnpjMask(value)
            case 'cep':
                getAddressByCep(value)
                return cepMask(value)
            case 'telefone':
                return cellPhoneMask(value)
            case 'cpf':
                return cpfMask(value)
            // Adicione outras máscaras
            default:
                return value
        }
    }

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth sx={{ position: 'relative' }}>
                    <Controller
                        name={name}
                        control={form.control}
                        rules={{ required: required }}
                        render={({ field }) => (
                            <>
                                <TextField
                                    {...props}
                                    multiline={multiline}
                                    value={field?.value}
                                    label={title}
                                    placeholder={title}
                                    rows={rows}
                                    type={type ?? 'text'}
                                    size='small'
                                    disabled={disabled}
                                    aria-describedby='validation-schema-nome'
                                    error={hasError}
                                    onChange={e => {
                                        let value = e.target.value

                                        mask === 'cnpj'
                                            ? (value = cnpjMask(value))
                                            : mask === 'cep'
                                            ? ((value = cepMask(value)), getAddressByCep(value))
                                            : mask === 'cep2'
                                            ? (value = cepMask(value))
                                            : mask === 'telefone'
                                            ? (value = cellPhoneMask(value))
                                            : mask === 'estado'
                                            ? (value = ufMask(value))
                                            : mask === 'cpf'
                                            ? (value = cpfMask(value))
                                            : mask === 'rg'
                                            ? (value = rgMask(value))
                                            : mask === 'currency'
                                            ? (value = currencyMask(value))
                                            : mask === 'fractioned3'
                                            ? (value = fractioned3Mask(value))
                                            : null

                                        field.onChange(value)

                                        if (onChange) {
                                            onChange(value)
                                        }
                                    }}
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
                                            : mask === 'cep' || mask === 'cep2'
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
                            </>
                        )}
                    />
                </FormControl>
                {helpText && (
                    <div className={`absolute ${type == 'number' ? 'right-10' : 'right-4'}  top-[12px]`}>
                        <HelpText text={helpText} position={helpTextPosition ?? 'top'} />
                    </div>
                )}
                {errorText && <p className='pt-1 text-xs text-red-500'>{errorText}</p>}
            </div>
        </Grid>
    )
}

export default Input
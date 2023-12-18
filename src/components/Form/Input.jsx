import { Controller } from 'react-hook-form'
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import { cnpjMask, cellPhoneMask, cepMask, ufMask, cpfMask, rgMask } from 'src/configs/masks'
import Icon from 'src/@core/components/icon'
import HelpText from '../Defaults/HelpText'

const Input = ({
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
    control,
    errors,
    onChange,
    className,
    help,
    clearField,
    helpText,
    helpTextPosition,
    ...props
}) => {
    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth sx={{ position: 'relative' }}>
                    <Controller
                        name={name}
                        control={control}
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
                                    error={errors}
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
            </div>
        </Grid>
    )
}

export default Input

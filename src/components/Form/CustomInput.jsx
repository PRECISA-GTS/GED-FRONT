import { Controller } from 'react-hook-form'
import { FormControl, Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import { cnpjMask, cellPhoneMask, cepMask, ufMask, cpfMask, rgMask } from 'src/configs/masks'
import Icon from 'src/@core/components/icon'
import HelpText from '../Defaults/HelpText'

const CustomInput = ({
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
    form,
    helpTextPosition,
    ...props
}) => {
    const onChangeInput = value => {
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
        return value
    }

    const getInputProps = mask => {
        switch (mask) {
            case 'cnpj':
                return {
                    maxLength: 18,
                    type: 'tel',
                    inputMode: 'numeric'
                }
            case 'cep':
            case 'cep2':
                return {
                    maxLength: 9,
                    type: 'tel',
                    inputMode: 'numeric'
                }
            case 'telefone':
                return {
                    maxLength: 15
                }
            case 'cpf':
                return {
                    maxLength: 14
                }
            case 'rg':
                return {
                    maxLength: 11
                }
            case 'estado':
                return {
                    maxLength: 2
                }
            default:
                return {}
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
                                    error={form.formState.errors[name] ? true : false}
                                    onChange={e => {
                                        let value = e.target.value
                                        value = onChangeInput(value)
                                        field.onChange(value)
                                        if (onChange) {
                                            onChange(value)
                                        }
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    inputProps={getInputProps(mask)}
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
                                        '& .MuiInputBase-input': {
                                            padding: '8px 14px' // Ajuste o valor conforme necessário
                                        }
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

export default CustomInput

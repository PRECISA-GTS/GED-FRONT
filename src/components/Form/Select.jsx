import { Grid, FormControl, Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import HelpText from '../Defaults/HelpText'

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
    helpTextPosition
}) => {
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
                                getOptionLabel={option =>
                                    option?.cnpj ? `${option.cnpj} - ${option.nome}` : option?.nome
                                }
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
                                        type === 'registroestabelecimento'
                                            ? handleRegistroEstabelecimento(newValue ? newValue.id : null)
                                            : null
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={title}
                                        placeholder={title}
                                        error={errors ? true : false}
                                    />
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

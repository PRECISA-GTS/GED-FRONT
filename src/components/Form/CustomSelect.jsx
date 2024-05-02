import { Grid, FormControl, Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import HelpText from '../Defaults/HelpText'
import { useEffect, useState } from 'react'
import { useFilter } from 'src/context/FilterContext'

const CustomSelect = ({
    xs,
    md,
    title,
    options,
    form,
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
    helpTextPosition
}) => {
    const { handleClear } = useFilter()
    const [currentValue, setCurrentValue] = useState(value ?? null)

    let optionsWithNew = createNew ? [{ id: null, name: '-- Novo --' }, ...(options ?? [])] : options

    useEffect(() => {
        setCurrentValue(null)
    }, [handleClear])

    return (
        <Grid item xs={xs} md={md} sx={{ my: 1 }} className={className}>
            <div className='relative'>
                <FormControl fullWidth>
                    <Controller
                        name={name}
                        control={form.control}
                        rules={{ required }}
                        render={({ field }) => (
                            <Autocomplete
                                options={optionsWithNew.map(option => option.name)}
                                value={currentValue}
                                // setar em setValue o id do item selecionado
                                onChange={(event, newValue) => {
                                    const selectedOption = optionsWithNew.find(option => option.name === newValue)
                                    form.setValue(name, selectedOption ?? null)
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        size='small'
                                        label={title}
                                        placeholder={title}
                                        error={form.formState.errors[name] ? true : false}
                                        helperText={form.formState.errors[name]?.message}
                                    />
                                )}
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

export default CustomSelect

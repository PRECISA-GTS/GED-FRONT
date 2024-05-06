import { Grid, FormControl, Autocomplete, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import HelpText from '../Defaults/HelpText'
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
    keyProps,
    createNew,
    helpText,
    helpTextPosition
}) => {
    let optionsWithNew = createNew ? [{ id: null, name: '-- Novo --' }, ...(options ?? [])] : options
    const { key } = useFilter()

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
                                key={keyProps || key}
                                options={optionsWithNew.map(option => option.name)}
                                // setar em setValue o id do item selecionado
                                value={value}
                                onChange={(event, newValue) => {
                                    const selectedOption = optionsWithNew.find(option => option.name === newValue)
                                    form.setValue(name, selectedOption ?? null)
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        id='customSelect'
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

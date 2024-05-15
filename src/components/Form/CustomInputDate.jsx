import { Controller } from 'react-hook-form'
import { FormControl, Grid, TextField } from '@mui/material'

const CustomInputDate = ({ xs, md, title, name, disabled, required, form, onChange }) => {
    return (
        <Grid item xs={xs} md={md}>
            <div>
                <FormControl fullWidth>
                    <Controller
                        name={name}
                        control={form.control}
                        rules={{ required: required }}
                        render={({ field }) => (
                            <TextField
                                label={title}
                                value={field?.value}
                                placeholder={title}
                                type='date'
                                size='small'
                                aria-describedby='validation-schema-nome'
                                disabled={disabled}
                                error={form.formState.errors[name] ? true : false}
                                onChange={e => {
                                    let value = e.target.value
                                    field.onChange(value)
                                    if (onChange) {
                                        onChange(value)
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    min: '1900-01-01',
                                    max: '2100-01-01'
                                }}
                            />
                        )}
                    />
                </FormControl>
            </div>
        </Grid>
    )
}

export default CustomInputDate

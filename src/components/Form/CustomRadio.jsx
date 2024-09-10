import { FormControlLabel, Radio } from '@mui/material'

const CustomRadio = ({ value, label, disabled = false, errors = false }) => {
    return (
        <FormControlLabel
            value={value}
            control={<Radio disabled={disabled} error={errors ? true : false} />}
            label={label}
            fullWidth
            sx={{
                '& .MuiFormControlLabel-label': {
                    color: 'text.secondary'
                },
                '&:hover': {
                    '& .MuiFormControlLabel-label': {
                        color: 'primary.main'
                    }
                }
            }}
        />
    )
}

export default CustomRadio

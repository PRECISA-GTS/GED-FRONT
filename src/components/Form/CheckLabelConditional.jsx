import { Grid, Box, FormControlLabel, Checkbox } from '@mui/material'
import { useState } from 'react'

/*
Esse componente é um checkbox que pode ser desmarcado se o valor for diferente do valor passado no valueChecked, caso contrário o checkbox fica fixo e habilitado, se valueChecked for igual a 50, por exemplo, o checkbox não pode ser desmarcado. Utilizado pra manter fixa a não conformidade se for marcado Reprovado, por exedmplo.
 */
const CheckLabelConditional = ({ form, xs, md, title, name, value, valueChecked }) => {
    const [checked, setChecked] = useState(true) // Set the initial state to the value prop

    const handleChange = () => {
        if (value != valueChecked) {
            //? Se não for Reprovado, pode alterar status da não conformidade
            setChecked(!checked)
        }
    }

    return (
        <Grid item xs={xs} md={md}>
            <Box display='flex' flexDirection='column' alignItems='start'>
                <FormControlLabel
                    control={
                        <Checkbox
                            size='small'
                            name={name}
                            {...form.register(name)}
                            checked={checked || value == valueChecked}
                            onChange={handleChange}
                        />
                    }
                    label={title}
                    sx={{
                        '&:hover': {
                            '& .MuiFormControlLabel-label': {
                                color: 'primary.main'
                            }
                        }
                    }}
                />
            </Box>
        </Grid>
    )
}

export default CheckLabelConditional

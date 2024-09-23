import {
    Autocomplete,
    Box,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@mui/material'

import CheckLabel from 'src/components/Form/CheckLabel'
import CheckLabelConditional from 'src/components/Form/CheckLabelConditional'

const Result = ({ form, title, name, value, papelID, setResult, options, hasNaoConformidade }) => {
    return (
        <Grid container spacing={2}>
            {/* Somente fábrica */}
            {papelID && papelID == 1 && (
                <>
                    {/* Resultado */}
                    <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                            <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
                                {title}
                            </Typography>

                            <Box display='flex' gap={8}>
                                <RadioGroup
                                    row
                                    aria-label='colored'
                                    name='colored'
                                    value={value.status}
                                    onChange={(e, newValue) => {
                                        setResult({
                                            ...value,
                                            status: newValue
                                        })
                                    }}
                                >
                                    {options &&
                                        options.map((option, index) => (
                                            <FormControlLabel
                                                value={option.value}
                                                name={name}
                                                control={<Radio color={option.color} />}
                                                label={option.label}
                                                disabled={option.disabled}
                                            />
                                        ))}
                                </RadioGroup>
                            </Box>
                        </FormControl>
                    </Grid>

                    {/* Gerar não conformidade */}
                    {hasNaoConformidade && value.status && (value.status == 50 || value.status == 60) && (
                        <CheckLabelConditional
                            xs={12}
                            md={12}
                            title='Gerar não conformidade'
                            name={`info.naoConformidade`}
                            value={value.status}
                            valueChecked={50} // Se o valor for 50, não pode ser alterado
                            form={form}
                        />
                    )}
                </>
            )}

            {/* Obs de conclusão */}
            <Grid item xs={12} md={12}>
                <FormControl fullWidth>
                    <TextField
                        label='Observação de conclusão (opcional)'
                        placeholder='Observação de conclusão (opcional)'
                        defaultValue={value.obsConclusao}
                        multiline
                        rows={4}
                        onChange={(e, newValue) => {
                            setResult({
                                ...value,
                                obsConclusao: e.target.value
                            })
                        }}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default Result

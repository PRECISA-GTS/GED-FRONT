import { Grid, Checkbox, FormControlLabel } from '@mui/material'
import Input from 'src/components/Form/Input'

const Equipments = ({ form, index, value, handleCheck, disabled, change }) => {
    return (
        <Grid container sx={{ pb: 2 }}>
            <input
                type='hidden'
                value={value.equipamentoID}
                name={`header.equipamentos[${index}].equipamentoID`}
                {...form.register(`header.equipamentos[${index}].equipamentoID`)}
            />
            {/* Checkbox com value */}
            <Grid item xs={12} md={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onClick={e => handleCheck(e, index)}
                            checked={value.checked_ ? true : false}
                            disabled={disabled}
                        />
                    }
                    label={`${value.nome}`}
                    size='small'
                    sx={{
                        marginRight: '4px',
                        '&:hover': {
                            '& .MuiFormControlLabel-label': {
                                color: 'primary.main'
                            }
                        }
                    }}
                />
            </Grid>

            {/* Conteúdo */}
            {value.checked_ && (
                <Grid container spacing={4} sx={{ py: 2 }}>
                    <Input
                        xs={12}
                        md={12}
                        title='Descrição da Não Conformidade do equipamento'
                        name={`header.equipamentos[${index}].descricao`}
                        form={form}
                        multiline
                        rows={3}
                    />
                </Grid>
            )}
        </Grid>
    )
}

export default Equipments

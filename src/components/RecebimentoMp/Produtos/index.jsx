import { Grid, Checkbox, FormControlLabel } from '@mui/material'
import FieldsProdutos from './FieldsProdutos'

const RecebimentoMpProdutos = ({ form, index, produto, handleCheck, disabled, apresentacoes }) => {
    return (
        <>
            <Grid container spacing={4} sx={{ pb: 2 }}>
                <input
                    type='hidden'
                    value={produto.produtoID}
                    name={`produtos[${index}].produtoID`}
                    {...form.register(`produtos[${index}].produtoID`)}
                />
                {/* Checkbox com produto */}
                <Grid item xs={12} md={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={e => handleCheck(e, index)}
                                checked={produto.checked_ ? true : false}
                                disabled={disabled}
                            />
                        }
                        label={produto.nome}
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

                {/* Informações do produto */}
                {/* <Grid item xs={12} md={6}>
                    <Box display='flex' alignItems='center' justifyContent='end' sx={{ gap: 4, mt: 3 }}>
                        <Typography variant='body2'>Última avaliação: {produto.ultimaAvaliacao}</Typography>
                    </Box>
                </Grid> */}

                {/* Conteúdo */}
                {produto.checked_ && (
                    <FieldsProdutos index={index} disabled={disabled} form={form} apresentacoes={apresentacoes} />
                )}
            </Grid>
        </>
    )
}

export default RecebimentoMpProdutos

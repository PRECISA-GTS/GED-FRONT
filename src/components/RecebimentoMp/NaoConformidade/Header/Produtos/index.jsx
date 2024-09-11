import { Grid, Checkbox, FormControlLabel } from '@mui/material'
import { api } from 'src/configs/api'
import { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo'

const RecebimentoMpProdutos = ({ form, index, produto, handleCheck, disabled, change }) => {
    const [apresentacoes, setApresentacoes] = useState([])

    const getApresentacoes = async () => {
        try {
            const response = await api.get(`/cadastros/apresentacao`)
            setApresentacoes(response.data)
        } catch (error) {
            console.log('🚀 ~ error:', error)
        }
    }

    useEffect(() => {
        getApresentacoes()
    }, [])

    return (
        <Grid container sx={{ pb: 2 }}>
            <input
                type='hidden'
                value={produto.produtoID}
                name={`header.produtos[${index}].produtoID`}
                {...form.register(`header.produtos[${index}].produtoID`)}
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
                    label={`${produto.nome} ${produto.lote ? ` - Lote: ${produto.lote}` : ' - Lote não informado'}`}
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
            {produto.checked_ && (
                <Grid container spacing={4} sx={{ pb: 2 }}>
                    <ProductInfo value={produto} />
                </Grid>
            )}
        </Grid>
    )
}

export default RecebimentoMpProdutos

import { Grid, Checkbox, FormControlLabel } from '@mui/material'
import { api } from 'src/configs/api'
import { useEffect, useState } from 'react'
import ProductInfo from './ProductInfo'

const RecebimentoMpProdutos = ({
    index,
    produto,
    handleCheck,
    setValue,
    register,
    control,
    errors,
    disabled,
    change
}) => {
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
                {...register(`header.produtos[${index}].produtoID`)}
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
                        marginRight: '4px', // Define a margem como 0 para reduzir o espaçamento
                        '&:hover': {
                            '& .MuiFormControlLabel-label': {
                                color: 'primary.main'
                            }
                        }
                    }}
                />
            </Grid>

            {/* Conteúdo */}
            {produto.checked_ && <ProductInfo value={produto} />}
        </Grid>
    )
}

export default RecebimentoMpProdutos

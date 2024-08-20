import { Box, Button, Grid, Typography, Divider, Checkbox, FormControlLabel } from '@mui/material'
import { api } from 'src/configs/api'
import Input from 'src/components/Form/Input'
import CheckLabel from 'src/components/Form/CheckLabel'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import FieldsProdutos from './FieldsProdutos'

const RecebimentoMpProdutos = ({
    index,
    produto,
    setProdutos,
    handleCheck,
    getValues,
    setValue,
    register,
    control,
    errors,
    disabled
}) => {
    console.log('🚀 ~ produto:', produto)
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
        <>
            <Grid container spacing={4} sx={{ pb: 2 }}>
                <input
                    type='hidden'
                    value={produto.produtoID}
                    name={`produtos[${index}].produtoID`}
                    {...register(`produtos[${index}].produtoID`)}
                />
                {/* Checkbox com produto */}
                <Grid item xs={12} md={4}>
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

                {/* Informações do produto */}
                <Grid item xs={12} md={8}>
                    <Box display='flex' alignItems='center' justifyContent='end' sx={{ gap: 4, mt: 3 }}>
                        <Typography variant='body2'>Última avaliação: {produto.ultimaAvaliacao}</Typography>
                    </Box>
                </Grid>

                {/* Conteúdo */}
                {produto.checked_ && (
                    <FieldsProdutos
                        key={produto.produtoID} // Alterado para usar produtoID
                        value={produto}
                        apresentacoes={apresentacoes}
                        index={index}
                        setValue={setValue}
                        register={register}
                        control={control}
                        errors={errors}
                        disabled={disabled}
                    />
                )}
            </Grid>
        </>
    )
}

export default RecebimentoMpProdutos

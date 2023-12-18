import { Box, Button, Grid, Typography, Divider, Checkbox, FormControlLabel } from '@mui/material'
import { api } from 'src/configs/api'
import Input from 'src/components/Form/Input'
import CheckLabel from 'src/components/Form/CheckLabel'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import Icon from 'src/@core/components/icon'
import { useEffect, useState } from 'react'
import FieldsProdutos from './FieldsProdutos'

const RecebimentoMpProdutos = ({ produtos, setProdutos, getValues, setValue, register, control, errors, disabled }) => {
    const [apresentacoes, setApresentacoes] = useState([])

    const getApresentacoes = async () => {
        try {
            const response = await api.get(`/cadastros/apresentacao`)
            setApresentacoes(response.data)
        } catch (error) {
            console.log('🚀 ~ error:', error)
        }
    }

    const handleCheck = (e, index) => {
        const { checked } = e.target
        setValue(`produtos[${index}].checked_`, checked)
        const copyProducts = [...produtos]
        copyProducts[index].checked_ = checked
        setProdutos(copyProducts)
    }

    useEffect(() => {
        getApresentacoes()
    }, [])

    return (
        <>
            <Typography color='primary' variant='subtitle1' sx={{ fontWeight: 700, mb: 2 }}>
                Produtos aprovados do fornecedor
            </Typography>

            {produtos && produtos.length == 0 && (
                <Typography color='warning' variant='subtitle1' className='italic'>
                    <Box display='flex' alignItems='center' sx={{ gap: 1 }}>
                        <Icon icon='typcn:warning' color='#FFC107' />
                        <p>Nenhum fornecedor selecionado!</p>
                    </Box>
                </Typography>
            )}

            {/* Listagem dos produtos */}
            {produtos &&
                produtos.length > 0 &&
                produtos.map((produto, index) => (
                    <div key={index}>
                        <input
                            type='hidden'
                            value={produto.produtoID}
                            name={`produtos[${index}].produtoID`}
                            {...register(`produtos[${index}].produtoID`)}
                        />

                        <Grid container spacing={4} sx={{ pb: 2 }}>
                            {/* Checkbox com produto */}
                            <Grid item xs={12} md={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onClick={e => handleCheck(e, index)}
                                            defaultChecked={produto.checked_}
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
                                    <Typography variant='body2'>
                                        Próxima avaliação: {produto.proximaAvialacao} (
                                        {produto.diasRestantes == 1
                                            ? `${produto.diasRestantes} dia`
                                            : `${produto.diasRestantes} dias`}
                                        )
                                    </Typography>
                                    <Button variant='outlined' size='small'>
                                        <Box display='flex' alignItems='center' sx={{ gap: 1 }}>
                                            <Icon icon='fluent:form-new-20-regular' width={18} height={18} />
                                            Nova avaliação
                                        </Box>
                                    </Button>
                                    <Button variant='outlined' size='small'>
                                        <Box display='flex' alignItems='center' sx={{ gap: 1 }}>
                                            <Icon icon='raphael:lab' width={18} height={18} />
                                            Laboratório (dev)
                                        </Box>
                                    </Button>
                                </Box>
                            </Grid>

                            {produto && produto.checked_ && (
                                <FieldsProdutos
                                    key={index}
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

                        {index < produtos.length - 1 && <Divider />}
                    </div>
                ))}
        </>
    )
}

export default RecebimentoMpProdutos

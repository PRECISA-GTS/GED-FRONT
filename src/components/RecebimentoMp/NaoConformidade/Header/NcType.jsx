import { Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckLabel from 'src/components/Form/CheckLabel'
import RecebimentoMpProdutos from './Produtos'
import Icon from 'src/@core/components/icon'

const NcType = ({ form, data, disabled }) => {
    if (!data) return

    const [produtos, setProdutos] = useState(data.produtos)

    const handleCheck = (e, index) => {
        const { checked } = e.target
        form.setValue(`header.produtos[${index}].checked_`, checked)
        const updatedProducts = produtos.map((produto, i) =>
            i === index ? { ...produto, checked_: checked } : produto
        )
        console.log('🚀 ~ updatedProducts:', updatedProducts)
        setProdutos(updatedProducts)
        form.setValue('header.produtos', updatedProducts)
    }

    return (
        <>
            <Grid item xs={12} md={2}>
                <CheckLabel
                    title='Transporte'
                    name={`header.transporte`}
                    value={data.transporte}
                    form={form}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <CheckLabel
                    title='Produto'
                    name={`header.produto`}
                    value={data.produto}
                    form={form}
                    disabled={disabled}
                />
            </Grid>

            {/* Se marcado produto */}
            {form.watch('header.produto') && (
                <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <Typography
                            color='primary'
                            variant='subtitle1'
                            sx={{ fontWeight: 700 }}
                            className='flex items-center gap-1'
                        >
                            <Icon icon='ph:plant' className='text-primary' />
                            Selecione os produtos com Não Conformidade
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        {produtos &&
                            produtos.map((produto, index) => (
                                <>
                                    <RecebimentoMpProdutos
                                        key={index}
                                        index={index}
                                        produto={produto}
                                        setProdutos={setProdutos}
                                        handleCheck={handleCheck}
                                        disabled={disabled}
                                        form={form}
                                    />
                                    {index < produtos.length - 1 && <Divider />}
                                </>
                            ))}
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default NcType

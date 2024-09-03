import { Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckLabel from 'src/components/Form/CheckLabel'
import RecebimentoMpProdutos from './Produtos'

const NcType = ({ form, data, disabled }) => {
    if (!data) return

    const [produtos, setProdutos] = useState(data.produtos)

    const handleCheck = (e, index) => {
        const { checked } = e.target
        form.setValue(`header.produtos[${index}].checked_`, checked)
        const updatedProducts = produtos.map((produto, i) =>
            i === index ? { ...produto, checked_: checked } : produto
        )
        setProdutos(updatedProducts)
    }

    return (
        <>
            <Grid item xs={12} md={2}>
                <CheckLabel
                    title='Transporte'
                    name={`header.transporte`}
                    value={data.transporte}
                    register={form.register}
                    disabled={disabled}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <CheckLabel
                    title='Produto'
                    name={`header.produto`}
                    value={data.produto}
                    register={form.register}
                    disabled={disabled}
                />
            </Grid>

            {/* Se marcado produto */}
            {form.watch('header.produto') && (
                <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={12}>
                        <Typography color='primary' variant='subtitle1' sx={{ fontWeight: 700 }}>
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
                                        getValues={form.getValues}
                                        setValue={form.setValue}
                                        register={form.register}
                                        control={form.control}
                                        errors={form.errors}
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

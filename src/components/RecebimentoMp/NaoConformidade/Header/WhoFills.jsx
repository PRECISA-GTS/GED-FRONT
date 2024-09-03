import { Grid, RadioGroup } from '@mui/material'
import React from 'react'
import CheckLabel from 'src/components/Form/CheckLabel'
import CustomRadio from 'src/components/Form/CustomRadio'

const WhoFills = ({ form, data, disabled }) => {
    if (!data) return

    const handleChange = e => {
        form.setValue('header.quemPreenche', e.target.value)
    }

    return (
        <RadioGroup row name='header.quemPreenche' defaultValue={data.quemPreenche} onChange={handleChange}>
            <p>Quem irá preencher a não conformidade?</p>
            <Grid container spacing={4}>
                <Grid item xs={12} md={2}>
                    <CustomRadio value='1' label='Fábrica' disabled={disabled} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <CustomRadio value='2' label='Fornecedor' disabled={disabled} />
                </Grid>
                {/* Se marcado Fornecedor */}
                {form.watch('header.quemPreenche') == 2 && (
                    <Grid item xs={12} md={8}>
                        <CheckLabel
                            title='Fornecedor acessa o Recebimento?'
                            name={`header.fornecedorAcessaRecebimento`}
                            value={data.fornecedorAcessaRecebimento}
                            register={form.register}
                            disabled={disabled}
                            helpText='Se marcado, fornecesor poderá visualizar o formulário de recebimento vinculado a esta não conformidade.'
                        />
                    </Grid>
                )}
            </Grid>
        </RadioGroup>
    )
}

export default WhoFills

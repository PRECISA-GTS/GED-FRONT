import { Grid } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CheckLabel from 'src/components/Form/CheckLabel'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const NcType = ({ form, data }) => {
    if (!data) return

    const { loggedUnity } = useContext(AuthContext)
    const [produtos, setProdutos] = useState([])

    const getProdutos = async () => {
        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/getProdutosRecebimento`, {
                recebimentoMpID: data.recebimentoMpID,
                unidadeID: loggedUnity.unidadeID
            })

            setProdutos(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProdutos()
    }, [data])

    return (
        <>
            <Grid item xs={12} md={2}>
                <CheckLabel
                    title='Transporte'
                    name={`header.transporte`}
                    value={data.transporte}
                    register={form.register}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <CheckLabel title='Produto' name={`header.produto`} value={data.produto} register={form.register} />
            </Grid>
            {/* Se marcado produto */}
            {form.watch('header.produto') && (
                <Select
                    xs={12}
                    md={8}
                    multiple
                    title='Produtos'
                    name={`header.produtos`}
                    options={produtos ?? []}
                    value={data.produtos ?? []}
                    register={form.register}
                    setValue={form.setValue}
                    control={form.control}
                    helpText='Selecione um ou mais produtos referentes a esta não conformidade'
                />
            )}
        </>
    )
}

export default NcType

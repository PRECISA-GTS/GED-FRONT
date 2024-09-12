import { Divider, Grid, Typography } from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import Check from 'src/components/Form/Check'
import Input from 'src/components/Form/Input'
import { floatToFractioned, fractionedToFloat } from 'src/configs/functions'
import { AuthContext } from 'src/context/AuthContext'

const TableProductsConclusionNC = ({ data, form, setValidParams }) => {
    console.log('🚀 ~ modal data:', data)
    const [sortedData, setSortedData] = useState(null)

    const { user } = useContext(AuthContext)

    //? Ordena os dados, trazendo primeiro os itens marcados na nao conformidade (checked_ == true)
    const sortData = () => {
        if (!data) return
        const sorted = data.sort((a, b) => {
            if (a.checked_ && !b.checked_) return -1
            if (!a.checked_ && b.checked_) return 1
            return 0
        })
        setSortedData(sorted)

        sorted.map((row, index) => {
            calculateDiff(row.quantidade, row.quantidadeEntrada, index)
        })
    }

    const calculateDiff = (qtd, qtdEntrada, index) => {
        if (!qtd || !qtdEntrada) return '--'
        const formatedQtd = fractionedToFloat(qtd)
        const formatedQtdEntrada = fractionedToFloat(qtdEntrada)
        const diff = floatToFractioned(formatedQtd - formatedQtdEntrada)
        form.setValue(`productsConclude.${index}.diff`, diff)
    }

    useEffect(() => {
        sortData()
    }, [data])

    return (
        <>
            <Typography
                variant='body1'
                color='primary'
                sx={{ fontWeight: 600, mt: 6 }}
                className='flex items-center gap-1'
            >
                <Icon icon='ph:plant' className='text-primary' />
                Conferência dos produtos do Recebimento de MP
            </Typography>

            {sortedData &&
                sortedData.length > 0 &&
                sortedData.map((row, index) => (
                    <>
                        <Grid container spacing={4} sx={{ mt: 4 }} className='items-center'>
                            <Grid item md={12}>
                                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                                    {`${row.nome} ${row.lote ? ` - Lote: ${row.lote}` : ' - Lote não informado'}`}
                                </Typography>
                            </Grid>

                            <Grid item md={2}>
                                <p className='text-xs opacity-50'>Qtd. Recebimento</p>
                                <p>{row.quantidade}</p>
                            </Grid>

                            {row.checked_ ? (
                                <>
                                    <input
                                        type='hidden'
                                        name={`productsConclude.${index}.recebimentoMpProdutoID`}
                                        value={row.recebimentoMpProdutoID}
                                        {...form.register(`productsConclude.${index}.recebimentoMpProdutoID`)}
                                    />
                                    <input
                                        type='hidden'
                                        name={`productsConclude.${index}.quantidade`}
                                        value={row.quantidade}
                                        {...form.register(`productsConclude.${index}.quantidade`)}
                                    />

                                    <Input
                                        md={2}
                                        title='Qtd. Entrada'
                                        name={`productsConclude.${index}.novaQuantidade`}
                                        defaultValue={row.quantidadeEntrada}
                                        helpText='Quantidade recebida'
                                        required
                                        disabled={user.papelID != 1}
                                        form={form}
                                        mask='fractioned3'
                                        onChange={value => {
                                            fractionedToFloat(
                                                form.getValues(`productsConclude[${index}].novaQuantidade`)
                                            ) > fractionedToFloat(row.quantidade)
                                                ? setValidParams(false)
                                                : setValidParams(true)

                                            calculateDiff(row.quantidade, value, index)
                                        }}
                                        errorText={
                                            fractionedToFloat(
                                                form.getValues(`productsConclude[${index}].novaQuantidade`)
                                            ) > fractionedToFloat(row.quantidade)
                                                ? 'Quantidade excedida'
                                                : null
                                        }
                                    />
                                </>
                            ) : (
                                <Grid item md={2}>
                                    <p className='text-xs opacity-50'>Qtd. Entrada</p>
                                    <p>{row.quantidadeEntrada}</p>
                                </Grid>
                            )}
                            <Grid item md={2}>
                                <p className='text-xs opacity-50'>Diferença</p>
                                <p>{form.watch(`productsConclude.${index}.diff`)}</p>
                            </Grid>
                            <Grid item md={2}>
                                <p className='text-xs opacity-50'>Data Fabricação</p>
                                <p>{row.dataFabricacao ?? '--'}</p>
                            </Grid>
                            {/* <Grid item md={2}>
                                <p className='text-xs opacity-50'>Lote</p>
                                <p>{row.lote ?? '--'}</p>
                            </Grid> */}
                            <Grid item md={2}>
                                <p className='text-xs opacity-50'>Apresentação</p>
                                <p>{row.apresentacao?.nome ?? '--'}</p>
                            </Grid>
                            <Grid item md={2}>
                                <p className='text-xs opacity-50'>Data Validade</p>
                                <p>{row.dataValidade ?? '--'}</p>
                            </Grid>
                        </Grid>
                        {index < sortedData.length - 1 && <Divider sx={{ pt: 4 }} />}
                    </>
                ))}
        </>
    )
}

export default TableProductsConclusionNC

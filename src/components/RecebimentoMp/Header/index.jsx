import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import Fields from 'src/components/Defaults/Formularios/Fields'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import HeaderInfo from './Info'
import RecebimentoMpProdutos from '../Produtos'
import Icon from 'src/@core/components/icon'
import InfoSetores from 'src/components/Defaults/Formularios/InfoSetores'

const HeaderFields = ({
    form,
    recebimentoMpID,
    modelo,
    values,
    fields,
    disabled,
    getAddressByCep,
    nameSelected,
    setNameSelected,
    columnSelected,
    setColumnSelected,
    openModalNew,
    setOpenModalNew,
    newChange,
    setNewChange

    // setProdutos,
    // produtos
}) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [produtos, setProdutos] = useState([])
    const [profissionaisPreenchimento, setProfissionaisPreenchimento] = useState([])
    const [fornecedoresAprovados, setFornecedoresAprovados] = useState([])
    const [fornecedor, setFornecedor] = useState(null)

    // const getProfissionaisSetores = async () => {
    //     const response = await api.post(`/cadastros/setor/getProfissionaisSetoresAssinatura`, {
    //         formularioID: 2, // recebimento de MP
    //         modeloID: modelo.id,
    //         unidadeID: loggedUnity.unidadeID
    //     })
    //     setProfissionaisPreenchimento(response.data.preenche)
    //     // setDefaultProfissional(response.data.preenche)
    // }

    const getFornecedoresAprovados = async () => {
        const response = await api.post(`/formularios/fornecedor/getFornecedoresAprovados`, {
            unidadeID: loggedUnity.unidadeID,
            recebimentoMpID: recebimentoMpID,
            modelo: modelo
        })
        setFornecedoresAprovados(response.data)
        // selectFornecedor(values.fornecedor, response.data)
    }

    const getProdutosRecebimento = async () => {
        const response = await api.post(`/formularios/recebimento-mp/getProdutosRecebimento`, {
            recebimentoMpID: recebimentoMpID,
            fornecedorCnpj: values.fornecedor?.cnpj_,
            unidadeID: loggedUnity.unidadeID
        })
        console.log('🚀 ~ getProdutosRecebimento:', response.data)
        setProdutos(response.data)

        // setValue
        form.setValue('produtos', response.data)
    }

    // const setDefaultProfissional = arrProfissionais => {
    //     const profissionalID = user.profissionalID //? Profissional logado
    //     const profissional = arrProfissionais.find(profissional => profissional.id === profissionalID)
    //     if (profissional && profissional.id > 0) form.setValue('fieldsHeader.profissional', profissional)
    // }

    // const selectFornecedor = (e, fornecedoresAprovados) => {
    //     if (!e) {
    //         setFornecedor(null)
    //         setProdutos([])
    //         return
    //     }
    //     const checkedProducts = produtos.filter(row => row.checked_ === true).map(row => row.produtoID)
    //     const newProducts = fornecedoresAprovados
    //         .find(row => row.id === e.id)
    //         ?.produtos?.map(produto => {
    //             if (checkedProducts.includes(produto.produtoID)) {
    //                 return { ...produto, checked_: true }
    //             }
    //             return produto
    //         })
    //     setProdutos(newProducts)
    //     form.setValue('produtos', newProducts)
    // }

    const handleCheck = (e, index) => {
        const { checked } = e.target
        // form.setValue(`produtos[${index}].checked_`, checked)

        const updatedProducts = produtos.map((produto, i) =>
            i === index
                ? {
                      ...produto,
                      checked_: checked,
                      variacoes:
                          produto.variacoes.length > 0 ? [...produtos[index].variacoes] : [{ quantidade: '0,000' }]
                  }
                : produto
        )
        console.log('🚀 ~ updatedProducts:', updatedProducts)

        setProdutos(updatedProducts)
        form.setValue('produtos', updatedProducts)
    }

    const addProduct = index => {
        const updatedProducts = [...produtos]
        updatedProducts[index].variacoes.push({
            quantidade: '0,000'
        })
        setProdutos(updatedProducts)
    }

    const removeProduct = (indexProduct, indexVariation) => {
        const updatedProducts = [...produtos]
        updatedProducts[indexProduct].variacoes.splice(indexVariation, 1)
        setProdutos(updatedProducts)
    }

    useEffect(() => {
        getFornecedoresAprovados()
        getProdutosRecebimento()
        // getProfissionaisSetores()
    }, [values])

    return (
        <>
            <Card style={{ height: '100%' }}>
                <CardContent>
                    <Grid container alignItems='stretch' spacing={6}>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <InfoSetores data={values?.setores ?? []} />
                        </Grid>

                        {/* Data de avaliação */}
                        <DateField
                            xs={12}
                            md={2}
                            title='Data do recebimento'
                            name={`fieldsHeader.data`}
                            type='date'
                            value={values?.data ?? new Date()}
                            disabled={disabled}
                            typeValidation='dataPassado'
                            daysValidation={365}
                            alertRequired //! Apenas pinta o campo de vermelho, não valida
                            form={form}
                        />
                        {/* Hora de avaliação */}
                        <Input
                            xs={12}
                            md={2}
                            title='Hora do recebimento'
                            name={`fieldsHeader.hora`}
                            type='time'
                            disabled={disabled}
                            alertRequired //! Apenas pinta o campo de vermelho, não valida
                            form={form}
                        />

                        {/* Fornecedor */}
                        <Select
                            xs={12}
                            md={8}
                            title='Fornecedor'
                            name={`fieldsHeader.fornecedor`}
                            type='string'
                            options={fornecedoresAprovados ?? []}
                            // onChange={e => selectFornecedor(e, fornecedoresAprovados)}
                            value={values?.fornecedor}
                            disabled={disabled}
                            form={form}
                            alertRequired //! Apenas pinta o campo de vermelho, não valida
                        />
                        {/* Fields dinâmicos */}
                        <Fields
                            fields={fields}
                            values={fields}
                            getAddressByCep={getAddressByCep}
                            disabled={disabled}
                            nameSelected={nameSelected}
                            setNameSelected={setNameSelected}
                            columnSelected={columnSelected}
                            setColumnSelected={setColumnSelected}
                            openModalNew={openModalNew}
                            setOpenModalNew={setOpenModalNew}
                            newChange={newChange}
                            setNewChange={setNewChange}
                            form={form}
                        />
                    </Grid>

                    {/* Produtos */}
                    <Grid container alignItems='stretch' spacing={6} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <Typography
                                color='primary'
                                variant='subtitle1'
                                sx={{ fontWeight: 700 }}
                                className='flex items-center gap-1'
                            >
                                <Icon icon='ph:plant' className='text-primary' />
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
                        </Grid>

                        <Grid item xs={12}>
                            {produtos &&
                                produtos.length > 0 &&
                                produtos.map((produto, index) => (
                                    <>
                                        <RecebimentoMpProdutos
                                            key={index}
                                            index={index}
                                            produto={produto}
                                            setProdutos={setProdutos}
                                            handleCheck={handleCheck}
                                            addProduct={addProduct}
                                            removeProduct={removeProduct}
                                            disabled={disabled}
                                            form={form}
                                        />
                                        {index < produtos.length - 1 && <Divider />}
                                    </>
                                ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default HeaderFields

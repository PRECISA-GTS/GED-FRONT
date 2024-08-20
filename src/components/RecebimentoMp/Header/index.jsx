import { Card, CardContent, Grid } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import Fields from 'src/components/Defaults/Formularios/Fields'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import HeaderInfo from './Info'
import RecebimentoMpProdutos from '../Produtos'
import InfoSetores from 'src/components/Defaults/Formularios/InfoSetores'

const HeaderFields = ({
    recebimentoMpID,
    modelo,
    values,
    produtosRecebimento,
    fields,
    disabled,
    register,
    errors,
    getValues,
    setValue,
    control,
    getAddressByCep,
    nameSelected,
    setNameSelected,
    columnSelected,
    setColumnSelected,
    openModalNew,
    setOpenModalNew,
    newChange,
    setNewChange
}) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [profissionaisPreenchimento, setProfissionaisPreenchimento] = useState([])
    const [fornecedoresAprovados, setFornecedoresAprovados] = useState([])
    const [fornecedor, setFornecedor] = useState(null)
    const [produtos, setProdutos] = useState([])
    const [change, setChange] = useState(false)

    const getProfissionaisSetores = async () => {
        const response = await api.post(`/cadastros/setor/getProfissionaisSetoresAssinatura`, {
            formularioID: 2, // recebimento de MP
            modeloID: modelo.id,
            unidadeID: loggedUnity.unidadeID
        })
        setProfissionaisPreenchimento(response.data.preenche)
        setDefaultProfissional(response.data.preenche)
    }

    const getFornecedoresAprovados = async () => {
        const response = await api.post(`/formularios/fornecedor/getFornecedoresAprovados`, {
            unidadeID: loggedUnity.unidadeID,
            recebimentoMpID: recebimentoMpID,
            modelo: modelo
        })
        setFornecedoresAprovados(response.data)
        selectFornecedor(values.fornecedor, response.data, false)
    }

    const setDefaultProfissional = arrProfissionais => {
        const profissionalID = user.profissionalID //? Profissional logado
        const profissional = arrProfissionais.find(profissional => profissional.id === profissionalID)
        if (profissional && profissional.id > 0) setValue('fieldsHeader.profissional', profissional)
    }

    const selectFornecedor = (e, fornecedoresAprovados, clearChecks) => {
        setChange(!change)

        if (!e) {
            setFornecedor(null)
            setProdutos([])
            return
        }

        fornecedoresAprovados &&
            fornecedoresAprovados.forEach(fornecedor => {
                if (fornecedor.id === e.id) {
                    if (!clearChecks) {
                        //? Carregou a página, marca os produtos que estão no recebimento e no fornecedor
                        produtosRecebimento &&
                            produtosRecebimento.length > 0 &&
                            produtosRecebimento.map(produtoRecebimento => {
                                fornecedor.produtos.forEach(produto => {
                                    if (produto.produtoID === produtoRecebimento.produto.id) {
                                        produto.checked_ = true
                                    }
                                })
                            })
                    }

                    if (clearChecks) {
                        //? Trocou o fornecedor
                        fornecedor.produtos.forEach(produto => {
                            produto.checked_ = false
                        })
                    }
                    setFornecedor(fornecedor)
                    setProdutos(fornecedor.produtos)
                }
            })
    }

    useEffect(() => {
        getFornecedoresAprovados()
        getProfissionaisSetores()
    }, [])

    return (
        <>
            <Card style={{ height: '100%' }}>
                <CardContent>
                    <Grid container alignItems='stretch' spacing={6}>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <InfoSetores data={values?.setores ?? []} />
                        </Grid>

                        {/* Bloco esquerda (cabeçalho) */}
                        <Grid item xs={12} md={10}>
                            {/* Header */}
                            <Grid container spacing={4}>
                                {/* Inputs fixos */}
                                {/* Data de abertura */}
                                <DateField
                                    xs={12}
                                    md={2}
                                    title='Data da abertura'
                                    name={`fieldsHeader.abertoPor.dataInicio`}
                                    type='date'
                                    value={values?.abertoPor?.dataInicio}
                                    disabled
                                    control={control}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                                {/* Hora de Abertura */}
                                <Input
                                    xs={12}
                                    md={2}
                                    title='Hora da abertura'
                                    name={`fieldsHeader.abertoPor.horaInicio`}
                                    type='time'
                                    disabled
                                    register={register}
                                    control={control}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                                {/* Profissional que abriu */}
                                <Input
                                    xs={12}
                                    md={8}
                                    title='Profissional que abriu'
                                    name={`fieldsHeader.abertoPor.profissional.nome`}
                                    value={values?.abertoPor?.profissional?.nome}
                                    disabled
                                    register={register}
                                    control={control}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                                {/* Inputs com preenchimento */}
                                {/* Data de avaliação */}
                                <DateField
                                    xs={12}
                                    md={2}
                                    title='Data da avaliação'
                                    name={`fieldsHeader.data`}
                                    type='date'
                                    value={values?.data ?? new Date()}
                                    disabled={disabled}
                                    register={register}
                                    control={control}
                                    typeValidation='dataPassado'
                                    daysValidation={365}
                                    errors={errors?.fieldsHeader?.['data']}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                                {/* Hora de avaliação */}
                                <Input
                                    xs={12}
                                    md={2}
                                    title='Hora da avaliação'
                                    name={`fieldsHeader.hora`}
                                    type='time'
                                    disabled={disabled}
                                    register={register}
                                    control={control}
                                    errors={errors?.fieldsHeader?.['hora']}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                                {/* Profissional que preenche */}
                                <Select
                                    xs={12}
                                    md={4}
                                    title='Profissional preenchimento'
                                    name={`fieldsHeader.profissional`}
                                    type='string'
                                    options={profissionaisPreenchimento}
                                    disabled={disabled}
                                    register={register}
                                    setValue={setValue}
                                    control={control}
                                    errors={errors?.fieldsHeader?.['profissional']}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                                {/* Fields dinâmicos */}
                                <Fields
                                    register={register}
                                    errors={errors}
                                    setValue={setValue}
                                    control={control}
                                    fields={fields}
                                    values={fields}
                                    getAddressByCep={getAddressByCep}
                                    disabled={disabled}
                                    nameSelected={nameSelected}
                                    setNameSelected={setNameSelected}
                                    getValues={getValues}
                                    columnSelected={columnSelected}
                                    setColumnSelected={setColumnSelected}
                                    openModalNew={openModalNew}
                                    setOpenModalNew={setOpenModalNew}
                                    newChange={newChange}
                                    setNewChange={setNewChange}
                                />
                                {/* Fornecedor */}
                                <Select
                                    xs={12}
                                    md={12}
                                    title='Fornecedor'
                                    name={`fieldsHeader.fornecedor`}
                                    type='string'
                                    options={fornecedoresAprovados}
                                    onChange={e => selectFornecedor(e, fornecedoresAprovados, true)}
                                    value={values?.fornecedor}
                                    disabled={disabled}
                                    register={register}
                                    setValue={setValue}
                                    control={control}
                                    errors={errors?.fieldsHeader?.['fornecedor']}
                                    alertRequired //! Apenas pinta o campo de vermelho, não valida
                                />
                            </Grid>
                        </Grid>

                        {/* Bloco direita (informações do fornecedor) */}
                        <Grid item xs={12} md={2}>
                            <HeaderInfo value={fornecedor} />
                        </Grid>
                    </Grid>

                    {/* Produtos */}
                    <Grid container alignItems='stretch' spacing={6} sx={{ mt: 2 }}>
                        <Grid item xs={12}>
                            <RecebimentoMpProdutos
                                key={change}
                                produtos={produtos}
                                setProdutos={setProdutos}
                                getValues={getValues}
                                setValue={setValue}
                                register={register}
                                control={control}
                                errors={errors}
                                disabled={disabled}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default HeaderFields

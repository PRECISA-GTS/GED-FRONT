import { Card, CardContent, Grid } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import Fields from 'src/components/Defaults/Formularios/Fields'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { dateConfig } from 'src/configs/defaultConfigs'
import { api } from 'src/configs/api'
import { SettingsContext } from 'src/@core/context/settingsContext'
import Router from 'next/router'
import { RouteContext } from 'src/context/RouteContext'
import HeaderInfo from './Info'
import RecebimentoMpProdutos from '../Produtos'

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
    const [dateStatus, setDateStatus] = useState({})
    const [profissionaisPreenchimento, setProfissionaisPreenchimento] = useState([])
    const [fornecedoresAprovados, setFornecedoresAprovados] = useState([])
    const [fornecedor, setFornecedor] = useState(null)
    const [produtos, setProdutos] = useState([])
    const [change, setChange] = useState(false)

    const { settings } = useContext(SettingsContext)
    const mode = settings.mode
    const router = Router
    const { setId } = useContext(RouteContext)

    const setDateFormat = (type, name, value, numDays) => {
        const newDate = new Date(value)
        const status = dateConfig(type, newDate, numDays)
        setDateStatus(prevState => ({
            ...prevState,
            [name]: status
        }))
    }

    const getProfissionais = async () => {
        const response = await api.post(`/cadastros/profissional/getProfissionaisAssinatura`, {
            formularioID: 2, // recebimento de MP
            modeloID: modelo.id
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

    // Função que envia para o formulario do fornecedor selecionado
    const handleGoToSupplier = () => {
        setId(fornecedor.id)
        router.push('/formularios/fornecedor/')
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
        getProfissionais()
    }, [])

    return (
        <>
            <Grid container alignItems='stretch' spacing={6}>
                {/* Bloco esquerda (cabeçalho) */}
                <Grid item xs={12} md={9}>
                    <Card style={{ height: '100%' }}>
                        {/* Header */}
                        <CardContent>
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
                                    setDateFormat={setDateFormat}
                                    typeValidation='dataPassado'
                                    daysValidation={365}
                                    dateStatus={dateStatus}
                                    errors={errors?.fieldsHeader?.['data']}
                                />
                                {/* Hora de avaliação */}
                                <Input
                                    xs={12}
                                    md={2}
                                    title='Hora da avaliação'
                                    name={`fieldsHeader.hora`}
                                    type='time'
                                    // value={values?.hora ?? '10:20'}
                                    disabled={disabled}
                                    register={register}
                                    control={control}
                                    errors={errors?.fieldsHeader?.['hora']}
                                />
                                {/* Profissional que preenche */}
                                <Select
                                    xs={12}
                                    md={4}
                                    title='Profissional preenchimento'
                                    name={`fieldsHeader.profissional`}
                                    type='string'
                                    options={profissionaisPreenchimento}
                                    // value={profissionaisPreenchimento[1]}
                                    disabled={disabled}
                                    register={register}
                                    setValue={setValue}
                                    control={control}
                                    errors={errors?.fieldsHeader?.['profissional']}
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
                                />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bloco direita (informações do fornecedor) */}
                <Grid item xs={12} md={3}>
                    <HeaderInfo value={fornecedor} />
                </Grid>
            </Grid>

            {/* Produtos */}
            <Card>
                <CardContent>
                    {/* Listagem dos produtos selecionados pra esse fornecedor */}
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
                </CardContent>
            </Card>
        </>
    )
}

export default HeaderFields

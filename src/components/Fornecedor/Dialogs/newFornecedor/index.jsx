import DialogContentText from '@mui/material/DialogContentText'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { validationCNPJ, validationCPF } from '../../../../configs/validations'
import { api } from 'src/configs/api'
import FormNewFornecedor from './FormNewFornecedor'
import { cnpjMask } from 'src/configs/masks'
import MapaSipeAgro from './MapaSipeAgro'
import { FornecedorContext } from 'src/context/FornecedorContext'

const NewFornecedor = ({ form, cnpj, setIsNotFactory, isNotFactory }) => {
    const [change, setChange] = useState(false)
    const { loggedUnity } = useContext(AuthContext)
    const [fields, setFields] = useState(null)
    const [params, setParams] = useState(null)
    const [sipeAgro, setSipeAgro] = useState(null)
    const [validationCnpj, setValidationCnpj] = useState(null)
    const { isCpf, setIsCpf } = useContext(FornecedorContext)

    const handleCnpjCpf = (cnpj, isCpf) => {
        //? CPF ou CNPJ
        if ((isCpf && cnpj.length == 14) || (!isCpf && cnpj.length == 18)) {
            if (isCpf ? validationCPF(cnpj) : validationCNPJ(cnpj)) {
                setValidationCnpj(true)
                getFornecedorByCnpj(cnpj, isCpf)
                if (!isCpf) getMapaSipeAgro(cnpj)
            } else {
                setValidationCnpj(false)
            }
        } else {
            setValidationCnpj(null)
            setFields(null)
        }
    }

    const getMapaSipeAgro = async cnpj => {
        try {
            const response = await api.post('/formularios/fornecedor/mapaSipeAgro', {
                cnpj: cnpj
            })
            setSipeAgro(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    //? Copia dados da unidade
    const getFornecedorByCnpj = async (cnpj, isCpf) => {
        try {
            const responseLastForm = await api.post(`/formularios/fornecedor/cnpj`, {
                type: isCpf ? 'cpf' : 'cnpj',
                unidadeID: loggedUnity.unidadeID,
                cnpj: cnpj
            })

            //? Seta informações do último preenchimento desse fornecedor
            const lastForm = {
                new: responseLastForm.data.new,
                fornecedorID: responseLastForm.data.fornecedorID,
                data: responseLastForm.data.dataAvaliacao,
                modelo: responseLastForm.data.modelo.nome,
                produtos: responseLastForm.data.produtos,
                gruposAnexo: responseLastForm.data.gruposAnexo
            }

            //? Chama função pra obter dados da API e preencher as informações do fornecedor
            let resultAPI = ''
            if (lastForm.new) {
                resultAPI = await getFornecedorAPIData(cnpj)
            }

            //? Seta informações do fornecedor
            setFields({
                ...fields,
                cnpj: lastForm.new ? cnpjMask(resultAPI.data['CNPJ']) : cnpj,
                status: lastForm.new ? resultAPI.data['STATUS'] : '',
                dataAbertura: lastForm.new ? resultAPI.data['DATA ABERTURA'] : '',
                telefone: lastForm.new ? resultAPI.data['DDD'] + ' ' + resultAPI.data['TELEFONE'] : '',
                razaoSocial: lastForm.new ? resultAPI.data['RAZAO SOCIAL'] : responseLastForm.data.fields.razaoSocial,
                nomeFantasia: lastForm.new
                    ? resultAPI.data['NOME FANTASIA']
                    : responseLastForm.data.fields.nomeFantasia,
                email: lastForm.new ? resultAPI.data['EMAIL'] : responseLastForm.data.fields.email,
                cidade: lastForm.new ? resultAPI.data['MUNICIPIO'] + '/' + resultAPI.data['UF'] : '',
                preenchimento: lastForm,

                telefone: responseLastForm.data.fields.telefone,
                cep: responseLastForm.data.fields.cep,
                logradouro: responseLastForm.data.fields.logradouro,
                numero: responseLastForm.data.fields.numero,
                complemento: responseLastForm.data.fields.complemento,
                bairro: responseLastForm.data.fields.bairro,
                cidade: responseLastForm.data.fields.cidade,
                estado: responseLastForm.data.fields.estado,
                pais: responseLastForm.data.fields.pais,
                ie: responseLastForm.data.fields.ie,
                principaisClientes: responseLastForm.data.fields.principaisClientes,
                registroSipeagro: responseLastForm.data.fields.registroSipeagro,
                categoria: responseLastForm.data.fields.categoria,
                risco: responseLastForm.data.fields.risco
            })

            //? Seta informações do formulário
            form.setValue('fields.cnpj', cnpj)
            form.setValue(
                'fields.razaoSocial',
                lastForm.new ? resultAPI.data['RAZAO SOCIAL'] : responseLastForm.data.fields.razaoSocial
            )
            form.setValue(
                'fields.nomeFantasia',
                lastForm.new ? resultAPI.data['NOME FANTASIA'] : responseLastForm.data.fields.nomeFantasia
            )
            form.setValue('fields.nome', lastForm.new ? resultAPI.data['NOME FANTASIA'] : '')
            form.setValue('fields.email', lastForm.new ? resultAPI.data['EMAIL'] : responseLastForm.data.fields.email)
            form.setValue('fields.modelo', responseLastForm.data.modelo.id > 0 ? responseLastForm.data.modelo : null)
            form.setValue('fields.gruposAnexo', responseLastForm.data.gruposAnexo)
            form.setValue('fields.produtos', responseLastForm.data.produtos)

            form.setValue('fields.telefone', responseLastForm.data.fields.telefone)
            form.setValue('fields.cep', responseLastForm.data.fields.cep)
            form.setValue('fields.logradouro', responseLastForm.data.fields.logradouro)
            form.setValue('fields.numero', responseLastForm.data.fields.numero)
            form.setValue('fields.complemento', responseLastForm.data.fields.complemento)
            form.setValue('fields.bairro', responseLastForm.data.fields.bairro)
            form.setValue('fields.cidade', responseLastForm.data.fields.cidade)
            form.setValue('fields.estado', responseLastForm.data.fields.estado)
            form.setValue('fields.pais', responseLastForm.data.fields.pais)
            form.setValue('fields.ie', responseLastForm.data.fields.ie)
            form.setValue('fields.principaisClientes', responseLastForm.data.fields.principaisClientes)
            form.setValue('fields.registroSipeagro', responseLastForm.data.fields.registroSipeagro)
            form.setValue('fields.categoria', responseLastForm.data.fields.categoria)
            form.setValue('fields.risco', responseLastForm.data.fields.risco)

            //? Atualiza campos pra remover erro de preenchimento
            if (getValues('fields.razaoSocial')) form.clearErrors('fields.razaoSocial')
            if (getValues('fields.nomeFantasia')) form.clearErrors('fields.nomeFantasia')
            if (getValues('fields.email')) form.clearErrors('fields.email')
            // if (getValues('fields.categoria')) form.clearErrors('fields.categoria')
            if (getValues('fields.risco')) form.clearErrors('fields.risco')
            if (getValues('fields.produtos')) form.clearErrors('fields.produtos')
        } catch (err) {
            console.error(err)
        }
    }

    const getFornecedorAPIData = async cnpj => {
        const cnpjNumber = cnpj.replace(/\D/g, '')

        //* Requisição a API
        const result = await api.get(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjNumber}`)
        return result
    }

    // Verifica quem preenche o formulario / fabrica ou fornecedor / Se resultado igual a 1 mostra opções
    // Parametros gerais do modal
    const getParams = async () => {
        const data = {
            unidadeID: loggedUnity.unidadeID
        }
        try {
            const response = await api.post('/formularios/fornecedor/paramsNewFornecedor', data)
            setParams(response.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setChange(!change)
        // setIsCpf(false)
        if (cnpj && cnpj.length > 0) handleCnpjCpf(cnpj)
    }, [])

    useEffect(() => {
        getParams()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [])

    return (
        <>
            <DialogContentText>
                <Grid container spacing={4}>
                    {/* Esquerda */}
                    <Grid item xs={12} md={6}>
                        <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
                            <FormNewFornecedor
                                form={form}
                                key={change}
                                setFields={setFields}
                                fields={fields ?? null}
                                params={params}
                                handleCnpjCpf={handleCnpjCpf}
                                validCnpj={validationCnpj}
                                setIsNotFactory={setIsNotFactory}
                                isNotFactory={isNotFactory}
                            />
                        </Box>

                        <Card sx={{ mt: 4 }}>
                            <CardContent>
                                <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
                                    <Typography variant='body2'>
                                        <strong>Dados do último formulário deste fornecedor</strong>
                                    </Typography>
                                    {fields?.preenchimento?.new ? (
                                        <Typography variant='body2' color='primary'>
                                            <strong>Novo fornecedor</strong>
                                        </Typography>
                                    ) : (
                                        <>
                                            <Typography variant='caption'>
                                                <strong>ID: </strong> {fields?.preenchimento?.fornecedorID}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Data de preenchimento:</strong> {fields?.preenchimento?.data}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Modelo:</strong> {fields?.preenchimento?.modelo}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Grupos de anexo: </strong>
                                                {fields?.preenchimento?.gruposAnexo.map(
                                                    (grupo, index) =>
                                                        `${grupo.nome}${
                                                            index < fields?.preenchimento?.gruposAnexo.length - 1
                                                                ? ', '
                                                                : ''
                                                        }`
                                                )}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Produtos: </strong>
                                                {fields?.preenchimento?.produtos.map(
                                                    (produto, index) =>
                                                        `${produto.nome}${
                                                            index < fields?.preenchimento?.produtos.length - 1
                                                                ? ', '
                                                                : ''
                                                        }`
                                                )}
                                            </Typography>
                                        </>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Direita */}
                    <Grid item xs={12} md={6}>
                        {!isCpf ? (
                            <>
                                {/* Dados MAPA (importação tabela) */}
                                <MapaSipeAgro key={sipeAgro} sipeAgro={sipeAgro} />

                                {/* Dados receita federal */}
                                <Card sx={{ mt: 4 }}>
                                    <CardContent>
                                        <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
                                            <Typography variant='body2'>
                                                <strong>Dados consultados da Receita Federal</strong>
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Razão Social:</strong> {fields?.razaoSocial}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Nome Fantasia:</strong> {fields?.nomeFantasia}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>CNPJ:</strong> {fields?.cnpj}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Status:</strong> {fields?.status}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Data Abertura:</strong> {fields?.dataAbertura}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Telefone:</strong> {fields?.telefone}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>E-mail:</strong> {fields?.email}
                                            </Typography>
                                            <Typography variant='caption'>
                                                <strong>Cidade:</strong> {fields?.cidade}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <div className='flex items-start justify-center mt-24'>
                                <Typography variant='body1'>Sem dados a serem consultados</Typography>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </DialogContentText>
        </>
    )
}

export default NewFornecedor

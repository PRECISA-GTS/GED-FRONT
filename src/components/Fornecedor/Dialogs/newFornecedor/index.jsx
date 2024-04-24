import DialogContentText from '@mui/material/DialogContentText'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { validationCNPJ } from '../../../../configs/validations'
import { api } from 'src/configs/api'
import FormNewFornecedor from './FormNewFornecedor'
import { cnpjMask } from 'src/configs/masks'

const NewFornecedor = ({ cnpj, control, setValue, register, errors, reset, getValues }) => {
    const [change, setChange] = useState(false)
    const { loggedUnity } = useContext(AuthContext)
    const [fields, setFields] = useState(null)
    const [params, setParams] = useState(null)
    const [validationCnpj, setValidationCnpj] = useState(null)

    const handleCnpj = cnpj => {
        if (cnpj.length == 18) {
            if (validationCNPJ(cnpj)) {
                setValidationCnpj(true)
                getFornecedorByCnpj(cnpj)
            } else {
                setValidationCnpj(false)
            }
        } else {
            setValidationCnpj(null)
            setFields(null)
        }
    }

    // Verifica se o CNPJ já em fornecedor cadastrado no sistema
    const getFornecedorByCnpj = async cnpj => {
        try {
            const responseLastForm = await api.post(`/formularios/fornecedor/cnpj`, {
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
                preenchimento: lastForm
            })

            //? Seta informações do formulário
            setValue('fields.cnpj', cnpj)
            setValue(
                'fields.razaoSocial',
                lastForm.new ? resultAPI.data['RAZAO SOCIAL'] : responseLastForm.data.fields.razaoSocial
            )
            setValue(
                'fields.nomeFantasia',
                lastForm.new ? resultAPI.data['NOME FANTASIA'] : responseLastForm.data.fields.nomeFantasia
            )
            setValue('fields.nome', lastForm.new ? resultAPI.data['NOME FANTASIA'] : '')
            setValue('fields.email', lastForm.new ? resultAPI.data['EMAIL'] : responseLastForm.data.fields.email)
            setValue('fields.modelo', responseLastForm.data.modelo.id > 0 ? responseLastForm.data.modelo : null)
            setValue('fields.gruposAnexo', responseLastForm.data.gruposAnexo)
            setValue('fields.produtos', responseLastForm.data.produtos)
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
        if (cnpj && cnpj.length > 0) handleCnpj(cnpj)
    }, [])

    useEffect(() => {
        getParams()
    }, [])

    return (
        <>
            <DialogContentText>
                <Grid container spacing={4}>
                    {/* Esquerda */}
                    <Grid item xs={12} md={6}>
                        <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
                            <FormNewFornecedor
                                key={change}
                                setFields={setFields}
                                fields={fields ?? null}
                                params={params}
                                control={control}
                                errors={errors}
                                reset={reset}
                                setValue={setValue}
                                getValues={getValues}
                                register={register}
                                handleCnpj={handleCnpj}
                                validCnpj={validationCnpj}
                                // isNotFactory={isNotFactory}
                                // setIsNotFactory={setIsNotFactory}
                            />
                        </Box>
                    </Grid>

                    {/* Direita */}
                    <Grid item xs={12} md={6}>
                        <Card>
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
                </Grid>
            </DialogContentText>
        </>
    )
}

export default NewFornecedor

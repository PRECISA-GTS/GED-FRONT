import { useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import DialogNewCreate from 'src/components/Defaults/Dialogs/DialogNewCreate'
import FormGrupoAnexos from 'src/components/Cadastros/grupoAnexos/FormGrupoAnexos'
import FormProduto from 'src/components/Cadastros/Produto/FormProduto'
import ToggleButtonLabel from 'src/components/Form/ToggleButtonLabel'
import { validationCNPJ, validationCPF } from 'src/configs/validations'
import { FornecedorContext } from 'src/context/FornecedorContext'

const FormNewFornecedor = ({
    form,
    fields,
    params,
    setFields,
    handleCnpjCpf,
    validCnpj,
    setIsNotFactory,
    isNotFactory
}) => {
    const { loggedUnity } = useContext(AuthContext)
    const [models, setModels] = useState([])
    const [products, setProducts] = useState([])
    const [gruposAnexo, setGruposAnexo] = useState([])
    const [newChange, setNewChange] = useState(false)
    const [openModalNew, setOpenModalNew] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [componetSelect, setComponetSelect] = useState(null)
    const [categories, setCategories] = useState([])
    const [risks, setRisks] = useState([])
    const [isValidCnpjCpf, setIsValidCnpjCpf] = useState(false)
    const { isCpf, setIsCpf } = useContext(FornecedorContext)

    const getModels = async () => {
        const result = await api.post(`/formularios/fornecedor/getModels`, { unidadeID: loggedUnity.unidadeID })
        setModels(result.data)
    }

    const getProducts = async () => {
        const result = await api.post(`/formularios/fornecedor/getProducts`, { unidadeID: loggedUnity.unidadeID })
        setProducts(result.data)
    }

    const getGruposAnexo = async () => {
        const result = await api.post(`/formularios/fornecedor/getGruposAnexo`, { unidadeID: loggedUnity.unidadeID })
        setGruposAnexo(result.data)
    }

    const getCategories = async () => {
        const result = await api.post(`/configuracoes/formularios/fornecedor/getCategories`, {
            unidadeID: loggedUnity.unidadeID
        })
        updateRisks(result.data, form.getValues('fields.categoria')?.id)
        setCategories(result.data)
    }

    const updateRisks = (categories, categoriaID) => {
        const arrRisks = categories.find(row => row.id == categoriaID)?.riscos
        setRisks(arrRisks)
    }

    const copyNameToNickname = () => {
        if (isCpf && (!form.getValues('fields.nomeFantasia') || form.getValues('fields.nomeFantasia') == '')) {
            setValue('fields.nomeFantasia', form.getValues('fields.razaoSocial'))
            setFields({
                ...fields,
                nomeFantasia: form.getValues('fields.razaoSocial')
            })
        }
    }

    const clearCnpj = () => {
        setFields(null)
        form.setValue('fields.cnpj', '')
        form.setValue('fields.razaoSocial', '')
        form.setValue('fields.nomeFantasia', '')
        form.setValue('fields.email', '')
        form.setValue('fields.categoria', null)
        form.setValue('fields.risco', null)
        form.setValue('fields.modelo', null)
        form.setValue('fields.gruposAnexo', [])
        form.setValue('fields.produtos', [])
    }

    const handleCnpjChange = async e => {
        handleCnpjCpf(e, isCpf)
        await getCategories()
    }

    useEffect(() => {
        form.reset()
        getModels()
        getProducts()
        // getGruposAnexo()
        getCategories()
    }, [])

    useEffect(() => {
        // Atualiza os riscos quando categories ou categoria mudam
        if (categories.length > 0 && form.getValues('fields.categoria')) {
            updateRisks(categories, form.getValues('fields.categoria').id)
        }
    }, [categories, form.getValues('fields?.categoria')])

    useEffect(() => {
        // Revalida o campo 'fields.cnpj' quando 'isCpf' muda
        form.setValue('fields.cnpj', '')
        form.trigger('fields.cnpj')
    }, [isCpf, form.trigger])

    const handleConfirmNew = async (data, name) => {
        setOpenModalNew(false)
        if (name == 'gruposAnexo') {
            setGruposAnexo(prevGrupoAnexo => [...prevGrupoAnexo, data])
            const prevGruposAnexo = [...form.getValues('fields.gruposAnexo')]
            prevGruposAnexo.push(data)
            form.setValue('fields.gruposAnexo', prevGruposAnexo)
        } else if (name == 'produtos') {
            setProducts(prevProduto => [...prevProduto, data])
            const prevProdutos = [...form.getValues('fields.produtos')]
            prevProdutos.push(data)
            form.setValue('fields.produtos', prevProdutos)
        }

        setNewChange(!newChange)
    }

    const createNew = async name => {
        setOpenModalNew(true)
        if (name == 'gruposAnexo') {
            setTitleModal('Novo grupo de anexos')
            setComponetSelect(
                <FormGrupoAnexos
                    manualUrl='/cadastros/grupo-anexos'
                    btnClose
                    handleModalClose={() => setOpenModalNew(false)}
                    newChange={newChange}
                    handleConfirmNew={handleConfirmNew}
                    outsideID={true}
                />
            )
        } else if (name == 'produtos') {
            setTitleModal('Novo produto')
            setComponetSelect(
                <FormProduto
                    manualUrl='/cadastros/produto'
                    btnClose
                    handleModalClose={() => setOpenModalNew(false)}
                    newChange={newChange}
                    handleConfirmNew={handleConfirmNew}
                    outsideID={true}
                />
            )
        }
    }

    const handleSave = async data => {
        setOpenModalNew(false)
    }

    useEffect(() => {
        const cnpjCpf = form.watch('fields.cnpj')
        const tempValid = isCpf ? validationCPF(cnpjCpf) : validationCNPJ(cnpjCpf)
        setIsValidCnpjCpf(tempValid)
    }, [isCpf, form.getValues('fields.cnpj')])

    return (
        models &&
        products && (
            <>
                <Box>
                    {params?.habilitaQuemPreencheFormFornecedor && (
                        <div className='mb-6'>
                            <ToggleButtonLabel
                                xs={12}
                                md={12}
                                name='habilitaQuemPreencheFormFornecedor'
                                setIsNotFactory={setIsNotFactory}
                                form={form}
                            />
                        </div>
                    )}
                    <div className='flex items-center'>
                        <div className='w-full'>
                            <Input
                                xs={12}
                                md={12}
                                title={isCpf ? 'CPF' : 'CNPJ'}
                                name='fields.cnpj'
                                value={fields?.cnpj}
                                onChange={e => {
                                    handleCnpjChange(e)
                                }}
                                clearField={form.getValues('fields.cnpj') ? clearCnpj : null}
                                mask={isCpf ? 'cpf' : 'cnpj'}
                                required
                                form={form}
                            />
                            {!isValidCnpjCpf && (
                                <Typography variant='body2' color='error'>
                                    {isCpf ? 'CPF Inválido' : 'CNPJ Inválido'}
                                </Typography>
                            )}
                        </div>
                        <FormControlLabel
                            label='CPF'
                            labelPlacement='top'
                            control={
                                <Checkbox
                                    checked={isCpf}
                                    onChange={e => {
                                        setIsCpf(e.target.checked)
                                        handleCnpjCpf(form.getValues('fields.cnpj'), e.target.checked)
                                    }}
                                />
                            }
                            sx={{ position: 'relative', top: -10 }}
                        />
                    </div>
                </Box>
                <Input
                    xs={12}
                    md={12}
                    title={isCpf ? 'Nome' : 'Razão Social'}
                    name='fields.razaoSocial'
                    value={fields?.razaoSocial}
                    onBlur={copyNameToNickname}
                    disabled={!validCnpj}
                    required
                    form={form}
                />
                <Input
                    xs={12}
                    md={12}
                    title={isCpf ? 'Apelido' : 'Nome Fantasia'}
                    name='fields.nomeFantasia'
                    value={fields?.nomeFantasia}
                    disabled={!validCnpj}
                    required
                    form={form}
                />
                {isNotFactory && (
                    <Input
                        xs={12}
                        md={12}
                        type='email'
                        title='E-mail'
                        name='fields.email'
                        value={fields?.email}
                        disabled={!validCnpj}
                        required
                        form={form}
                    />
                )}
                {!isNotFactory && (
                    <>
                        <Select
                            xs={12}
                            md={12}
                            title='Categoria'
                            name='fields.categoria'
                            value={fields?.categoria}
                            disabled={!validCnpj}
                            onChange={newValue => {
                                form.setValue('fields.categoria', newValue)
                                form.setValue('fields.risco', null)
                                updateRisks(categories, newValue ? newValue.id : null)
                            }}
                            required
                            options={categories ?? []}
                            form={form}
                        />
                        <Select
                            xs={12}
                            md={12}
                            disabled={form.getValues('fields.categoria') == null}
                            title='Risco'
                            name='fields.risco'
                            value={fields?.risco}
                            required
                            options={risks ?? []}
                            form={form}
                        />
                    </>
                )}
                {/* <Select
                    xs={12}
                    md={12}
                    title='Modelo de Formulário'
                    name={`fields.modelo`}
                    options={models}
                    required
                    value={fields?.modelo}
                    disabled={!validCnpj}
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={errors?.fields?.modelo}
                /> */}
                {/* <Select
                    xs={12}
                    md={12}
                    title='Grupos de Anexo'
                    multiple
                    createNew={() => {
                        createNew('gruposAnexo')
                    }}
                    name={`fields.gruposAnexo`}
                    value={fields?.gruposAnexo ?? []}
                    disabled={!validCnpj}
                    options={gruposAnexo ?? []}
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={errors?.fields?.gruposAnexo}
                /> */}
                <Select
                    xs={12}
                    md={12}
                    title='Produtos'
                    name='fields.produtos'
                    value={fields?.produtos ?? []}
                    disabled={!validCnpj}
                    multiple
                    createNew={() => createNew('produtos')}
                    required={params?.obrigatorioProdutoFornecedor}
                    options={products ?? []}
                    form={form}
                />

                {/* Modal para criação de novo grupo de anexo ou  */}
                <DialogNewCreate
                    title={titleModal}
                    size='md'
                    openModal={openModalNew}
                    setOpenModal={setOpenModalNew}
                    handleSave={handleSave}
                >
                    {componetSelect}
                </DialogNewCreate>
            </>
        )
    )
}

export default FormNewFornecedor

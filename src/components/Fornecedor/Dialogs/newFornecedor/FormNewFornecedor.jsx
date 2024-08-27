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

const FormNewFornecedor = ({
    fields,
    params,
    habilitaQuemPreencheFormFornecedor,
    setFields,
    handleCnpjCpf,
    validCnpj,
    getValues,
    control,
    errors,
    setValue,
    register,
    watch,
    trigger,
    reset,
    setIsNotFactory,
    isNotFactory,

    setIsCpf,
    isCpf
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
        updateRisks(result.data, getValues('fields.categoria')?.id)
        setCategories(result.data)
    }

    const updateRisks = (categories, categoriaID) => {
        const arrRisks = categories.find(row => row.id == categoriaID)?.riscos
        setRisks(arrRisks)
    }

    const copyNameToNickname = () => {
        if (isCpf && (!getValues('fields.nomeFantasia') || getValues('fields.nomeFantasia') == '')) {
            setValue('fields.nomeFantasia', getValues('fields.razaoSocial'))
            setFields({
                ...fields,
                nomeFantasia: getValues('fields.razaoSocial')
            })
        }
    }

    const clearCnpj = () => {
        setFields(null)
        setValue('fields.cnpj', '')
        setValue('fields.razaoSocial', '')
        setValue('fields.nomeFantasia', '')
        setValue('fields.email', '')
        setValue('fields.categoria', null)
        setValue('fields.risco', null)
        setValue('fields.modelo', null)
        setValue('fields.gruposAnexo', [])
        setValue('fields.produtos', [])
    }

    const handleCnpjChange = async e => {
        handleCnpjCpf(e, isCpf)
        await getCategories()
    }

    useEffect(() => {
        reset()
        getModels()
        getProducts()
        // getGruposAnexo()
        getCategories()
    }, [])

    useEffect(() => {
        // Atualiza os riscos quando categories ou categoria mudam
        if (categories.length > 0 && getValues('fields.categoria')) {
            updateRisks(categories, getValues('fields.categoria').id)
        }
    }, [categories, getValues('fields.categoria')])

    useEffect(() => {
        // Revalida o campo 'fields.cnpj' quando 'isCpf' muda
        setValue('fields.cnpj', '')
        trigger('fields.cnpj')
    }, [isCpf, trigger])

    const handleConfirmNew = async (data, name) => {
        setOpenModalNew(false)
        if (name == 'gruposAnexo') {
            setGruposAnexo(prevGrupoAnexo => [...prevGrupoAnexo, data])
            const prevGruposAnexo = [...getValues('fields.gruposAnexo')]
            prevGruposAnexo.push(data)
            setValue('fields.gruposAnexo', prevGruposAnexo)
        } else if (name == 'produtos') {
            setProducts(prevProduto => [...prevProduto, data])
            const prevProdutos = [...getValues('fields.produtos')]
            prevProdutos.push(data)
            setValue('fields.produtos', prevProdutos)
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
        const cnpjCpf = watch('fields.cnpj')
        const tempValid = isCpf ? validationCPF(cnpjCpf) : validationCNPJ(cnpjCpf)
        setIsValidCnpjCpf(tempValid)
    }, [isCpf, getValues('fields.cnpj')])

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
                                register={register}
                                name='habilitaQuemPreencheFormFornecedor'
                                setValue={setValue}
                                setIsNotFactory={setIsNotFactory}
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
                                clearField={getValues('fields.cnpj') ? clearCnpj : null}
                                mask={isCpf ? 'cpf' : 'cnpj'}
                                required
                                control={control}
                                errors={errors?.fields?.cnpj}
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
                                        handleCnpjCpf(getValues('fields.cnpj'), e.target.checked)
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
                    control={control}
                    errors={errors?.fields?.razaoSocial}
                />
                <Input
                    xs={12}
                    md={12}
                    title={isCpf ? 'Apelido' : 'Nome Fantasia'}
                    name='fields.nomeFantasia'
                    value={fields?.nomeFantasia}
                    disabled={!validCnpj}
                    required
                    control={control}
                    errors={errors?.fields?.nomeFantasia}
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
                        control={control}
                        errors={errors?.fields?.email}
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
                                setValue('fields.categoria', newValue)
                                setValue('fields.risco', null)
                                updateRisks(categories, newValue ? newValue.id : null)
                            }}
                            required
                            options={categories ?? []}
                            register={register}
                            setValue={setValue}
                            control={control}
                            errors={errors?.fields?.categoria}
                        />
                        <Select
                            xs={12}
                            md={12}
                            disabled={getValues('fields.categoria') == null}
                            title='Risco'
                            name='fields.risco'
                            value={fields?.risco}
                            required
                            options={risks ?? []}
                            register={register}
                            setValue={setValue}
                            control={control}
                            errors={errors?.fields?.risco}
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
                    register={register}
                    setValue={setValue}
                    control={control}
                    errors={errors?.fields?.produtos}
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

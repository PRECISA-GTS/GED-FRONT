import { useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import { Box, Typography } from '@mui/material'
import DialogNewCreate from 'src/components/Defaults/Dialogs/DialogNewCreate'
import FormGrupoAnexos from 'src/components/Cadastros/grupoAnexos/FormGrupoAnexos'
import FormProduto from 'src/components/Cadastros/Produto/FormProduto'
import ToggleButtonLabel from 'src/components/Form/ToggleButtonLabel'

const FormNewFornecedor = ({
    fields,
    params,
    habilitaQuemPreencheFormFornecedor,
    setFields,
    handleCnpj,
    validCnpj,
    getValues,
    control,
    errors,
    setValue,
    register,
    watch,
    reset,
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

    const clearCnpj = () => {
        setFields(null)
        setValue('fields.cnpj', '')
        setValue('fields.razaoSocial', '')
        setValue('fields.email', '')
        setValue('fields.modelo', null)
        setValue('fields.gruposAnexo', [])
        setValue('fields.produtos', [])
    }

    const handleCnpjChange = async e => {
        handleCnpj(e)
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
                    <Input
                        xs={12}
                        md={12}
                        title='CNPJ'
                        name='fields.cnpj'
                        value={fields?.cnpj}
                        onChange={e => {
                            handleCnpjChange(e)
                            // handleCnpj(e)
                            // getCategories()
                        }}
                        clearField={getValues('fields.cnpj') ? clearCnpj : null}
                        mask='cnpj'
                        required
                        control={control}
                        errors={errors?.fields?.cnpj}
                    />
                    {validCnpj == false && (
                        <Typography variant='body2' color='error'>
                            CNPJ inválido!
                        </Typography>
                    )}
                </Box>
                <Input
                    xs={12}
                    md={12}
                    title='Razão Social'
                    name='fields.razaoSocial'
                    value={fields?.razaoSocial}
                    disabled={!validCnpj}
                    required
                    control={control}
                    errors={errors?.fields?.razaoSocial}
                />
                <Input
                    xs={12}
                    md={12}
                    title='Nome Fantasia'
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

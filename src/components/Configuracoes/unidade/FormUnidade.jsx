import Router from 'next/router'
import { useEffect, useState, useContext, useRef } from 'react'
import { api } from 'src/configs/api'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { RouteContext } from 'src/context/RouteContext'
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
    Tooltip,
    IconButton,
    FormControl
} from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import Loading from 'src/components/Loading'
import toast from 'react-hot-toast'
import FormHeader from '../../Defaults/FormHeader'
import { toastMessage } from 'src/configs/defaultConfigs'
import { formatDate } from 'src/configs/conversions'
import { backRoute } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import CheckLabel from 'src/components/Form/CheckLabel'
import { validationCNPJ, validationCPF } from 'src/configs/validations'
import NewPassword from './NewPassword'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'

const FormUnidade = ({ id }) => {
    const { user, setUser, loggedUnity, setLoggedUnity } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)
    id = user.papelID === 1 ? id : loggedUnity.unidadeID

    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [fileCurrent, setFileCurrent] = useState()
    const [photoProfile, setPhotoProfile] = useState(null)
    const [openModalDeleted, setOpenModalDeleted] = useState(false)
    //* Componente é chamado na tela da unidade e Meus dados do fornecedor
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = user.papelID === 1 ? router.pathname : '/configuracoes/unidade'
    const fileInputRef = useRef(null)
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode
    const [categories, setCategories] = useState([])

    const form = useForm({ mode: 'onChange' })

    //? Função que busca o CEP
    const handleCep = async cep => {
        if (cep.length == 9) {
            //? Obter apenas núemros da string
            const cepNumber = cep.replace(/\D/g, '')
            api.get('https://viacep.com.br/ws/' + cepNumber + '/json/').then(response => {
                if (response.data.localidade) {
                    form.setValue('fields.logradouro', response.data.logradouro)
                    form.setValue('fields.bairro', response.data.bairro)
                    form.setValue('fields.cidade', response.data.localidade)
                    form.setValue('fields.uf', response.data.uf)
                    toast.success('Endereço encontrado!')
                } else {
                    toast.error('Endereço não encontrado!')
                }
            })
        }
    }

    // Função que atualiza os dados ou cria novo dependendo do tipo da rota
    const onSubmit = async datas => {
        // Verifica se o CNPJ é válido se ele for envalido retorna erro e retorna
        const cnpjCpfValidation =
            datas.fields.cpf === 1 ? validationCPF(datas.fields.cnpj) : validationCNPJ(datas.fields.cnpj)
        if (!cnpjCpfValidation) {
            form.setError('fields.cnpj', {
                type: 'required',
                message: datas.fields.cpf === 1 ? 'CPF inválido' : 'CNPJ inválido'
            })
            return
        }

        const data = {
            ...datas,
            usuarioID: user.usuarioID,
            unidadeID: loggedUnity.unidadeID,
            fields: {
                ...datas.fields,
                fornecedorCategoriaID: datas.fields.categoria.id,
                fornecedorCategoriaRiscoID: datas.fields.risco.id,
                dataCadastro: new Date().toISOString().substring(0, 10),
                dataAtualizacao: new Date().toISOString().substring(0, 10)
            }
        }

        delete data.cabecalhoRelatorioTitle
        delete data.cabecalhoRelatorio
        delete data.fields.riscoID
        delete data.fields.categoriaID
        delete data.fields.categoria
        delete data.fields.risco
        delete data.fields.categoriaNome
        delete data.fields.riscoNome

        try {
            if (type === 'new') {
                await api.post(`${backRoute(staticUrl)}/new/insertData`, data).then(response => {
                    router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                    setId(response.data)
                    toast.success(toastMessage.successNew)
                })
            } else if (type === 'edit') {
                await api.post(`${staticUrl}/updateData/${id}`, data)
                toast.success(toastMessage.successUpdate)
                setShowNewPassword(false)
                getData()
            }

            //? Se for fornecedor, atualiza os dados do usuário logado
            if (user.papelID === 2) {
                setLoggedUnity({
                    ...loggedUnity,
                    nomeFantasia: datas.fields.nomeFantasia,
                    complemento: datas.fields.complemento,
                    razaoSocial: datas.fields.razaoSocial,
                    responsavel: datas.fields.responsavel,
                    email: datas.fields.email,
                    telefone1: datas.fields.telefone1,
                    telefone2: datas.fields.telefone2,
                    cep: datas.fields.cep,
                    logradouro: datas.fields.logradouro,
                    numero: datas.fields.numero,
                    complemento: datas.fields.complemento,
                    bairro: datas.fields.bairro,
                    cidade: datas.fields.cidade,
                    uf: datas.fields.uf
                })
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.errorRepeated)
            } else {
                console.log(error)
            }
        } finally {
            atualizaLocalStorage()
        }
    }

    const atualizaLocalStorage = async () => {
        localStorage.removeItem('loggedUnity')
        localStorage.setItem('loggedUnity', JSON.stringify(loggedUnity))
    }
    const getCategories = async () => {
        const result = await api.post(`/configuracoes/formularios/fornecedor/getCategories`, {
            unidadeID: loggedUnity.unidadeID,
            allRisks: true
        })
        setCategories(result.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    //? Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    const getData = async () => {
        if (type == 'edit') {
            try {
                const response = await api.get(`${staticUrl}/${id}`)
                form.reset(response.data)
                setData(response.data)
                setFileCurrent(response.data.fields.cabecalhoRelatorioTitle)
                setPhotoProfile(response.data?.fields?.cabecalhoRelatorio)
            } catch (error) {
                console.log(error)
            }
        } else {
            setData({}) //? Sair loading
            form.reset({
                //Todo: Pra não bugar campos quando carrega endereço pelo CEP
                fields: {
                    logradouro: '--',
                    bairro: '--',
                    cidade: '--',
                    uf: '--'
                }
            })
        }

        setTimeout(() => {
            form.trigger()
        }, 300)
    }
    useEffect(() => {
        getData()
    }, [id])

    //! Crud imagem cabeçalho relatórios
    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    console.log('Foto atual', photoProfile)

    // Ao selecionar a foto, ela é enviada para o servidor e salva no banco de dados, como resposta atualiza a foto atual
    const handleFileSelect = async event => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            const formData = new FormData()
            formData.append('files[]', selectedFile)
            formData.append(`usuarioID`, user.usuarioID)

            //? Verifica se o arquivo é uma imagem
            const isImage = selectedFile.type.includes('image')
            if (!isImage) {
                toast.error('O arquivo selecionado não é uma imagem!')
                return
            }

            await api
                .post(`${staticUrl}/updateData/report/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`, formData)
                .then(response => {
                    setPhotoProfile(response.data)
                    toast.success('Foto atualizada com sucesso!')

                    //? Atualiza localstorage
                    const userData = JSON.parse(localStorage.getItem('userData'))
                    userData.imagem = response.data
                    localStorage.setItem('userData', JSON.stringify(userData))
                    //? Atualiza contexto
                    setUser(userData)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar foto de perfil, tente novamente!')
                })
        }
    }

    // Remove a imagen
    const handleDeleteImage = async () => {
        try {
            await api.delete(`${staticUrl}/fileReport/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`)
            setPhotoProfile(null)
            toast.success('Foto removida com sucesso!')
        } catch (error) {
            console.log(error)
            toast.error('Erro ao remover foto, tente novamente!')
        }
    }

    return (
        <>
            {!data && <Loading />}
            {data && (
                <>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormHeader
                            btnCancel={user.papelID === 1 ? true : false}
                            btnSave
                            handleSubmit={() => form.handleSubmit(onSubmit)}
                            btnDelete={type === 'edit' && user.papelID === 1 ? true : false}
                            onclickDelete={() => setOpenModalDeleted(true)}
                            type={type}
                        />

                        <Card>
                            <DialogDelete
                                title='Excluir Unidade'
                                description='Tem certeza que deseja exluir a unidade?'
                                params={{
                                    route: `configuracoes/unidade/${id}`,
                                    messageSucceded: 'Unidade excluída com sucesso!',
                                    MessageError: 'Dado possui pendência!'
                                }}
                                open={openModalDeleted}
                                handleClose={() => setOpenModalDeleted(false)}
                            />
                            <CardContent>
                                <Grid container spacing={4}>
                                    {type == 'edit' && (
                                        <Grid item xs={12} md={2}>
                                            <Grid
                                                item
                                                xs={12}
                                                md={12}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    height: '140px',
                                                    position: 'relative',
                                                    border: `${
                                                        mode === 'dark' ? '1px solid #65656E' : '1px solid #C5C6CD'
                                                    }`,
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                {photoProfile && (
                                                    <Tooltip title='Apagar foto do perfil' placement='top'>
                                                        <IconButton
                                                            size='small'
                                                            sx={{
                                                                position: 'absolute',
                                                                top: '8px',
                                                                right: '8px',
                                                                zIndex: '20',
                                                                color: 'white',
                                                                opacity: '0.8',
                                                                backgroundColor: '#FF4D49',
                                                                '&:hover': {
                                                                    backgroundColor: '#FF4D49',
                                                                    opacity: '1'
                                                                }
                                                            }}
                                                            onClick={handleDeleteImage}
                                                        >
                                                            <Icon icon='material-symbols:delete-outline' />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}

                                                <Tooltip
                                                    title={photoProfile ? 'Alterar foto' : 'Inserir foto'}
                                                    placement='top'
                                                >
                                                    <FormControl
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        <input
                                                            type='file'
                                                            ref={fileInputRef}
                                                            style={{ display: 'none' }}
                                                            onChange={handleFileSelect}
                                                        />
                                                        <Avatar
                                                            variant='rounded'
                                                            alt='Imagem do cabeçalho do relatório'
                                                            sx={{
                                                                width: '100%',
                                                                height: '100%',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={handleFileClick}
                                                            src={
                                                                photoProfile ??
                                                                'https://gedagro.com.br/images/report.png'
                                                            }
                                                        />
                                                    </FormControl>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid item xs={12} md={type == 'new' ? 12 : 10}>
                                        <Grid container spacing={4}>
                                            <Input
                                                xs={12}
                                                md={4}
                                                title={data.fields.cpf === 1 ? 'Nome' : 'Razão Social'}
                                                name='fields.razaoSocial'
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title={data.fields.cpf === 1 ? 'Apelido' : 'Nome Fantasia'}
                                                name='fields.nomeFantasia'
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title={data.fields.cpf === 1 ? 'CPF' : 'CNPJ'}
                                                name='fields.cnpj'
                                                mask={data.fields.cpf === 1 ? 'cpf' : 'cnpj'}
                                                required
                                                disabled={user.papelID !== 1}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Responsável'
                                                name='fields.responsavel'
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='E-mail'
                                                name='fields.email'
                                                type='email'
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Telefone 1'
                                                name='fields.telefone1'
                                                mask='telefone'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Telefone 2'
                                                name='fields.telefone2'
                                                mask='telefone'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='CEP'
                                                name='fields.cep'
                                                getAddressByCep={handleCep}
                                                mask='cep'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Rua'
                                                name='fields.logradouro'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Número'
                                                name='fields.numero'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Complemento'
                                                name='fields.complemento'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Bairro'
                                                name='fields.bairro'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Cidade'
                                                name='fields.cidade'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='UF'
                                                name='fields.uf'
                                                mask='estado'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Pais'
                                                name='fields.pais'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Principais Clientes'
                                                name='fields.principaisClientes'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Resgistro de Sipeagro'
                                                name='fields.registroSipeagro'
                                                required={false}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='IE'
                                                name='fields.ie'
                                                required={false}
                                                form={form}
                                            />
                                            <Select
                                                xs={12}
                                                md={4}
                                                title='Categoria'
                                                name='fields.categoria'
                                                value={form.getValues('fields.categoria')}
                                                onChange={newValue => {
                                                    form.setValue('fields.risco', null)
                                                    form.setValue('fields.categoria', newValue)
                                                    form.watch('fields.categoria')
                                                }}
                                                required
                                                options={categories ?? []}
                                                form={form}
                                            />
                                            <Select
                                                xs={12}
                                                md={4}
                                                title='Risco'
                                                name='fields.risco'
                                                value={data?.fields?.risco}
                                                required
                                                options={
                                                    (form.getValues('fields.categoria')?.riscos ||
                                                        categories.filter(cat => cat.id == data?.fields?.categoriaID)[0]
                                                            ?.riscos) ??
                                                    []
                                                }
                                                form={form}
                                            />
                                            <Grid item xs={12} md={4}></Grid>
                                            {/* Editar a senha | Trocar senha */}
                                            {type == 'edit' && user.papelID == 2 && (
                                                <>
                                                    <NewPassword
                                                        register={form.register}
                                                        errors={form.formState?.errors}
                                                        showNewPassword={showNewPassword}
                                                        setShowNewPassword={setShowNewPassword}
                                                        watch={form.watch}
                                                    />
                                                </>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>

                    {/* Parâmetros da unidade */}
                    {type == 'edit' && user.papelID == 1 && (
                        <Card sx={{ mt: 4 }}>
                            <CardHeader title='Parâmetros' />
                            <CardContent>
                                <Grid container spacing={8}>
                                    <Grid item xs={12} md={12}>
                                        <Grid container spacing={4}>
                                            <Input
                                                xs={12}
                                                md={12}
                                                title='Título do relatório'
                                                name='fields.tituloRelatorio'
                                                required={false}
                                                form={form}
                                                helpText='Título que aparecerá no cabeçalho dos relatórios'
                                            />

                                            <Select
                                                xs={12}
                                                md={8}
                                                multiple
                                                title='Extensões de Arquivos Permitidas'
                                                name={`fields.extensoes`}
                                                options={data.fields.allExtensions}
                                                value={data.fields.extensoes}
                                                form={form}
                                            />

                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Tamanho máximo dos anexos (MB)'
                                                name='fields.anexosTamanhoMaximo'
                                                required={true}
                                                form={form}
                                            />

                                            <CheckLabel
                                                title='Obrigatório o produto no formulário de qualificação do fornecedor'
                                                name={`fields.obrigatorioProdutoFornecedor`}
                                                value={data.fields.obrigatorioProdutoFornecedor}
                                                form={form}
                                                helpText='Com esta opção marcada, será obrigatório selecionar um ou mais produtos no formulário de qualificação do fornecedor.'
                                            />
                                        </Grid>

                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={12}>
                                                <CheckLabel
                                                    title='Habilita quem preenche o formulário de qualificação do fornecedor (Fábrica ou Fornecedor)'
                                                    name={`fields.habilitaQuemPreencheFormFornecedor`}
                                                    value={data.fields.habilitaQuemPreencheFormFornecedor}
                                                    form={form}
                                                    helpText='Com esta opção marcada, será definido quem preenche o formulário de qualificação do fornecedor na criação de um novo formulário, caso contrário somente o fornecedor poderá preencher.'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                    {type === 'edit' && data && (
                        <Typography variant='caption' sx={{ display: 'flex', justifyContent: 'end', p: 4 }}>
                            Data de cadastro: {formatDate(data.fields.dataCadastro, 'DD/MM/YYYY')}
                        </Typography>
                    )}
                </>
            )}
        </>
    )
}

export default FormUnidade

// 579

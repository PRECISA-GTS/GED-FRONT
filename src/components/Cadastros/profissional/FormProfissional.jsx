import Router from 'next/router'
import { useEffect, useState, useContext, useRef } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { api, BACKEND_FOLDER, URL_UPLOAD } from 'src/configs/api'
import Icon from 'src/@core/components/icon'
import { Card, CardContent, Grid, Button, CardHeader, Tooltip, IconButton, FormControl, Avatar } from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import CargoFuncao from './CargoFuncao'
import Fields from './Fields'
import Permissions from './Permissions'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import { ParametersContext } from 'src/context/ParametersContext'
import useLoad from 'src/hooks/useLoad'
import Select from 'src/components/Form/Select'
import Departamento from './Departamento'

const FormProfissional = ({ id }) => {
    const fileInputRef = useRef(null)
    const [open, setOpen] = useState(false)
    const { setId } = useContext(RouteContext)
    const { user, setUser, loggedUnity, routes } = useContext(AuthContext)
    const { title } = useContext(ParametersContext)
    const [data, setData] = useState(null)
    const [change, setChange] = useState(false)
    const [removedItems, setRemovedItems] = useState([]) //? Itens removidos do formulário
    const [changePermissions, setChangePermissions] = useState(false)
    const [photoProfile, setPhotoProfile] = useState(null)
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode
    const { startLoading, stopLoading } = useLoad()

    // Estado que é prencchindo com o valor da função verifyCPF, que verifica se o cpf digitado já esta vinculado a um usuario existente
    const [userExistVerifyCPF, setUserExistVerifyCPF] = useState(false)
    const [userNewVerifyCPF, setUserNewVerifyCPF] = useState(false)
    // Se usuarioID vindo no getData for maior que 0  adiciona true
    const [userExistDefault, setUserExistDefault] = useState(false)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const routeVeryfyCNP = type == 'edit' ? `${staticUrl}/verifyCPF` : `${backRoute(staticUrl)}/verifyCPF`
    const today = new Date().toISOString().substring(0, 10)

    const form = useForm({ mode: 'onChange' })

    const resetFields = () => {
        setUserNewVerifyCPF(false)
        setUserExistVerifyCPF(false)
        setUserExistDefault(false)
    }

    // Função que atualiza os dados ou cria novo dependendo do tipo da rota
    const onSubmit = async data => {
        console.log('🚀 ~ data:', data)
        startLoading()
        const values = {
            ...data,
            admin: user.admin,
            usualioLogado: user.usuarioID,
            unidadeID: loggedUnity.unidadeID,
            fields: {
                ...data.fields,
                dataNascimento: data.fields.dataNascimento.startsWith('0')
                    ? '1' + data.fields.dataNascimento.substring(1, 10)
                    : data.fields.dataNascimento.substring(0, 10),

                unidadeID: loggedUnity.unidadeID
            },
            cargosFuncoes: data.cargosFuncoes.map(cargoFuncao => ({
                ...cargoFuncao,
                data: cargoFuncao.data.substring(0, 10),
                dataInativacao: cargoFuncao.dataInativacao ? cargoFuncao.dataInativacao.substring(0, 10) : null // Substring para pegar os primeiros 10 caracteres
            })),
            removedItems
        }
        console.log('🚀 ~ onSubmit:', values)
        // return

        if (!validateUniqueEntry(values)) {
            toast.error('Não é permitido repetir departamento ativo em um profissional!')
            return
        }

        try {
            if (type === 'new') {
                const response = await api.post(`${backRoute(staticUrl)}/new/insertData`, values)
                router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                setId(response.data)
                toast.success(toastMessage.successNew)
            } else if (type === 'edit') {
                const response = await api.post(`${staticUrl}/updateData/${id}`, values)
                toast.success(toastMessage.successUpdate)
            }
            resetFields()
            getData()
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.errorRepeated)
            } else {
                console.log(error)
            }
        } finally {
            stopLoading()
        }
    }

    //?  Não pode repetir os departamentos
    const validateUniqueEntry = data => {
        let unique = true

        if (data.fields.departamentos && data.fields.departamentos.length > 1) {
            data.fields.departamentos.map((row1, index1) => {
                data.fields.departamentos.map((row2, index2) => {
                    if (index1 !== index2) {
                        if (row1.departamento.id === row2.departamento.id && !row1.dataFim && !row2.dataFim) {
                            unique = false
                        }
                    }
                })
            })
        }

        return unique
    }

    // Dados iniciais ao carregar página
    const getData = async () => {
        const route =
            type === 'new'
                ? `${backRoute(staticUrl)}/new/getData`
                : `${staticUrl}/getData/${id}?unidadeID=${loggedUnity.unidadeID}&papelID=${loggedUnity.papelID}&admin=${user.admin}`

        try {
            const response = await api.post(route)
            console.log('🚀 ~ getData:', response.data)
            form.reset(response.data)
            setPhotoProfile(response.data.imagem)
            setData(response.data)

            //? Atualiza departamentos ativos no contexto e localstorage
            if (id === user.profissionalID) {
                const activeSectors = response.data.fields.departamentos
                    .filter(row => row.status === 1)
                    .map(row => row.departamento)
                setUser({
                    ...user,
                    departamentos: activeSectors
                })
                localStorage.setItem(
                    'userData',
                    JSON.stringify({
                        ...user,
                        departamentos: activeSectors
                    })
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Deleta os dados
    const handleClickDelete = async () => {
        try {
            await api.delete(`${staticUrl}/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`)
            setId(null)
            setOpen(false)
            toast.success(toastMessage.successDelete)
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.pendingDelete)
                setOpen(false)
            } else {
                console.log(error)
            }
        }
    }

    const addDepartamento = () => {
        const newValue = {
            departamento: null,
            dataInicio: today,
            dataFim: '',
            status: true
        }
        append(newValue)
    }

    // Adiciona novo Cargo | Função
    const addItem = () => {
        const newValue = {
            conselho: '',
            data: today,
            dataInativacao: '',
            formacaoCargo: '',
            status: true
        }

        appendCargoFuncao(newValue)
    }

    // Remove Cargo | Função existente
    const removeItem = (value, index) => {
        console.log('🚀 ~ value:', value)
        if (cargosFuncoesFields.length === 1) {
            toast.error('É necessário ter pelo menos um Cargo/Função!')
            return
        }

        //* Adiciona item removido ao array
        if (value.profissionalCargoID) {
            setRemovedItems([...removedItems, value.profissionalCargoID])
        }

        removeCargoFuncao(index)
    }

    const handleFileSelect = async event => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            const formData = new FormData()
            formData.append('files[]', selectedFile)
            formData.append(`type`, 'profissional')
            formData.append(`profissionalID`, id)
            formData.append(`usuarioID`, user.usuarioID)
            formData.append('unidadeID', loggedUnity.unidadeID)
            formData.append('pathDestination', `../${BACKEND_FOLDER}/uploads/${loggedUnity.unidadeID}/profissional/`)

            //? Verifica se o arquivo é uma imagem
            const isImage = selectedFile.type.includes('image')
            if (!isImage) {
                toast.error('O arquivo selecionado não é uma imagem!')
                return
            }

            try {
                //? PHP upload files
                const response = await fetch(`${URL_UPLOAD}upload-files/`, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                })
                console.log('🚀 ~ response:', response)

                // setPhotoProfile(response.data)
                getData()
                toast.success('Foto atualizada com sucesso!')

                //? Atualiza localstorage
                // const userData = JSON.parse(localStorage.getItem('userData'))
                // userData.imagem = response.data
                // localStorage.setItem('userData', JSON.stringify(userData))
                // //? Atualiza contexto
                // setUser(userData)
            } catch (error) {
                console.log(error)
                toast.error('Erro ao atualizar foto de perfil, tente novamente!')
            }

            // await api
            //     .post(`${staticUrl}/photo-profile/${id}/${loggedUnity.unidadeID}/${user.usuarioID}`, formData)
            //     .then(response => {
            //         setPhotoProfile(response.data)
            //         toast.success('Foto atualizada com sucesso!')

            //         //? Atualiza localstorage
            //         const userData = JSON.parse(localStorage.getItem('userData'))
            //         userData.imagem = response.data
            //         localStorage.setItem('userData', JSON.stringify(userData))
            //         //? Atualiza contexto
            //         setUser(userData)
            //     })
            //     .catch(error => {
            //         toast.error(error.response?.data?.message ?? 'Erro ao atualizar foto de perfil, tente novamente!')
            //     })
        }
    }

    const handleDeleteImage = async () => {
        try {
            await api.delete(`${staticUrl}/photo-profile/${id}/${loggedUnity.unidadeID}/${user.usuarioID}`)
            setPhotoProfile(null)
            toast.success('Foto removida com sucesso!')
        } catch (error) {
            console.log(error)
            toast.error('Erro ao remover foto, tente novamente!')
        }
    }

    const handleFileClick = () => {
        fileInputRef.current.click()
    }

    //? Se copiar permissões de outro profissional, seta edit como true em todos os campos
    const setPermissionsEdit = values => {
        const menuEdit = values.map(menuGroup => ({
            ...menuGroup,
            menu: menuGroup.menu.map(menu => ({
                ...menu,
                edit: menu.rota ? true : false
            }))
        }))

        return menuEdit
    }

    // Copia dados do profissional selecionado
    const copyPermissions = async values => {
        const value = {
            usuarioID: values.usuarioID,
            unidadeID: loggedUnity.unidadeID,
            papelID: 1
        }

        try {
            const response = await api.post(`${staticUrl}/copyPermissions/`, value)
            //? Ao copiar permissões de outro profissional, seta edit como true em todos os campos pra atualizar no backend
            const permissionsEdit = setPermissionsEdit(response.data)
            //
            form.setValue('menu', permissionsEdit)
            setData({
                ...data,
                menu: permissionsEdit
            })
            setChangePermissions(!changePermissions)
            toast.success('Permissões copiadas com sucesso!')
        } catch (error) {
            console.log(error)
        }
    }

    // Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id])

    // Ao iniciar verifica se o profissional é usuario
    useEffect(() => {
        if (data && data.fields.usuarioID > 0) {
            setUserExistDefault(true)
        }
    }, [data])

    //? Gerencia o array de departamentos
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields.departamentos'
    })

    //? Gerencia o array de cargos
    const {
        fields: cargosFuncoesFields,
        append: appendCargoFuncao,
        remove: removeCargoFuncao
    } = useFieldArray({
        control: form.control,
        name: 'cargosFuncoes'
    })

    return (
        data && (
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormHeader
                    btnCancel
                    btnSave
                    btnNew
                    handleSubmit={() => form.handleSubmit(onSubmit)}
                    btnDelete={type === 'edit' ? true : false}
                    onclickDelete={() => setOpen(true)}
                    type={type}
                />

                <div className='space-y-4'>
                    <Card>
                        <CardContent>
                            <Grid container spacing={5}>
                                {/* Imagem */}
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
                                                        src={photoProfile ?? 'https://gedagro.com.br/images/report.png'}
                                                    />
                                                </FormControl>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                )}

                                {/* Fields */}
                                <Grid item xs={12} md={type == 'edit' ? 10 : 12}>
                                    <Grid container spacing={5}>
                                        <Fields
                                            data={data}
                                            userNewVerifyCPF={userNewVerifyCPF}
                                            setUserNewVerifyCPF={setUserNewVerifyCPF}
                                            userExistVerifyCPF={userExistVerifyCPF}
                                            setUserExistVerifyCPF={setUserExistVerifyCPF}
                                            resetFields={resetFields}
                                            routeVeryfyCNP={routeVeryfyCNP}
                                            userExistDefault={userExistDefault}
                                            type={type}
                                            form={form}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title='Departamentos' />
                        <CardContent>
                            <Grid container spacing={5}>
                                {fields &&
                                    fields.map((item, index) => (
                                        <Departamento
                                            form={form}
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            remove={() => remove(index)}
                                        />
                                    ))}

                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        onClick={addDepartamento}
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                    >
                                        Inserir Departamento
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title='Cargos e Funções' />
                        <CardContent>
                            <Grid container spacing={5}>
                                {/* Cargo / Função do profissonal */}
                                {cargosFuncoesFields &&
                                    cargosFuncoesFields.map((field, index) => (
                                        <CargoFuncao
                                            key={field.id}
                                            item={field}
                                            index={index}
                                            remove={() => removeItem(field, index)}
                                            form={form}
                                        />
                                    ))}

                                <Button
                                    variant='outlined'
                                    color='primary'
                                    sx={{ mt: 4, ml: 4 }}
                                    startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                    onClick={addItem}
                                >
                                    Inserir cargo
                                </Button>
                            </Grid>
                        </CardContent>
                    </Card>

                    {routes.find(route => route.rota === staticUrl && route.ler) &&
                        (userNewVerifyCPF || userExistDefault) && (
                            <Card>
                                <CardHeader title='Permissões' />
                                <CardContent>
                                    <Grid container spacing={4} className='my-3'>
                                        <Select
                                            xs={12}
                                            md={12}
                                            title='Copiar permissões do profissional'
                                            name='professional'
                                            value={null}
                                            options={data?.professionals}
                                            onChange={copyPermissions}
                                            form={form}
                                        />
                                    </Grid>
                                    <Permissions form={form} key={changePermissions} menu={data.menu} />
                                </CardContent>
                            </Card>
                        )}

                    <DialogForm
                        text='Tem certeza que deseja excluir?'
                        title={'Excluir ' + title.title}
                        openModal={open}
                        handleClose={() => setOpen(false)}
                        handleSubmit={handleClickDelete}
                        btnCancel
                        btnConfirm
                    />
                </div>
            </form>
        )
    )
}

export default FormProfissional

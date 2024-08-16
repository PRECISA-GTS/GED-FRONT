import Router from 'next/router'
import { useEffect, useState, useContext, useRef } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { api } from 'src/configs/api'
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
import Setor from './Setor'

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

    const {
        control,
        handleSubmit,
        reset,
        setError,
        setValue,
        getValues,
        watch,
        trigger,
        register,
        formState: { errors }
    } = useForm({ mode: 'onChange' })

    const resetFields = () => {
        setUserNewVerifyCPF(false)
        setUserExistVerifyCPF(false)
        setUserExistDefault(false)
    }

    // Função que atualiza os dados ou cria novo dependendo do tipo da rota
    const onSubmit = async data => {
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

        if (!validateUniqueEntry(values)) {
            toast.error('Não é permitido repetir setor ativo em um profissional!')
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

    //?  Não pode repetir os setores
    const validateUniqueEntry = data => {
        let unique = true

        if (data.fields.setores.length > 1) {
            data.fields.setores.map((row1, index1) => {
                data.fields.setores.map((row2, index2) => {
                    if (index1 !== index2) {
                        if (row1.setor.id === row2.setor.id && !row1.dataFim && !row2.dataFim) {
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
            reset(response.data)
            setPhotoProfile(response.data.imagem)
            setData(response.data)
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

    // Adiciona novo Cargo | Função
    const addItem = () => {
        const currentDate = new Date()
        const formattedDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(
            currentDate.getDate()
        ).padStart(2, '0')}/${currentDate.getFullYear()}`

        const newValue = {
            conselho: '',
            data: formattedDate,
            dataInativacao: '',
            formacaoCargo: '',
            status: true
        }

        const updatedData = [...getValues('cargosFuncoes'), newValue]
        setValue('cargosFuncoes', updatedData)
        setChange(!change)
    }

    // Remove Cargo | Função existente
    const removeItem = (value, index) => {
        if (data.cargosFuncoes.length === 1) {
            toast.error('É necessário ter pelo menos um Cargo/Função!')
            return
        }

        //* Adiciona item removido ao array
        if (value.id) {
            setRemovedItems([...removedItems, value.id])
        }

        const newValue = getValues('cargosFuncoes').filter((_, i) => i !== index)
        setValue(`cargosFuncoes`, newValue) //* Remove item do formulário
        setChange(!change)
    }

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
                .post(`${staticUrl}/photo-profile/${id}/${loggedUnity.unidadeID}/${user.usuarioID}`, formData)
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
            setValue('menu', permissionsEdit)
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
            trigger()
        }, 300)
    }, [id])

    // Ao iniciar verifica se o profissional é usuario
    useEffect(() => {
        if (data && data.fields.usuarioID > 0) {
            setUserExistDefault(true)
        }
    }, [data])

    //? Gerencia o array de setores
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'fields.setores'
    })

    return (
        data && (
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader
                    btnCancel
                    btnSave
                    btnNew
                    handleSubmit={() => handleSubmit(onSubmit)}
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
                                            control={control}
                                            errors={errors}
                                            register={register}
                                            watch={watch}
                                            getValues={getValues}
                                            setError={setError}
                                            setValue={setValue}
                                            userNewVerifyCPF={userNewVerifyCPF}
                                            setUserNewVerifyCPF={setUserNewVerifyCPF}
                                            userExistVerifyCPF={userExistVerifyCPF}
                                            setUserExistVerifyCPF={setUserExistVerifyCPF}
                                            resetFields={resetFields}
                                            routeVeryfyCNP={routeVeryfyCNP}
                                            userExistDefault={userExistDefault}
                                            type={type}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Setor
                        data={data}
                        getValues={getValues}
                        setValue={setValue}
                        control={control}
                        register={register}
                        errors={errors}
                        removeItem={removeItem}
                        trigger={trigger}
                        key={change}
                        fields={fields}
                        append={append}
                        remove={remove}
                    />

                    <Card>
                        <CardHeader title='Cargos e Funções' />
                        <CardContent>
                            <Grid container spacing={5}>
                                {/* Cargo / Função do profissonal */}
                                {data && (
                                    <CargoFuncao
                                        getValues={getValues}
                                        control={control}
                                        register={register}
                                        errors={errors}
                                        removeItem={removeItem}
                                        key={change}
                                    />
                                )}
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    sx={{ mt: 4, ml: 4 }}
                                    startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                    onClick={() => {
                                        addItem()
                                    }}
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
                                            register={register}
                                            setValue={setValue}
                                            control={control}
                                        />
                                    </Grid>
                                    <Permissions
                                        key={changePermissions}
                                        menu={data.menu}
                                        control={control}
                                        register={register}
                                        setValue={setValue}
                                        getValues={getValues}
                                    />
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

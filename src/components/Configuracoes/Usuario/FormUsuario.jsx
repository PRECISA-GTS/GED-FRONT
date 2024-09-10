import Router from 'next/router'
import { useEffect, useState, useContext, useRef } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import { api } from 'src/configs/api'
import Icon from 'src/@core/components/icon'
import Loading from 'src/components/Loading'
import { SettingsContext } from 'src/@core/context/settingsContext'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import Permissions from './Permissions'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'

import {
    Card,
    CardContent,
    Grid,
    FormControl,
    TextField,
    Button,
    Typography,
    Autocomplete,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    OutlinedInput,
    InputAdornment,
    IconButton,
    InputLabel,
    Avatar,
    Tooltip
} from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import { formType } from 'src/configs/defaultConfigs'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'

//* Date
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // import locale
import Input from 'src/components/Form/Input'
// import DateField from 'src/components/Form/DateField'

const FormUsuario = ({ id }) => {
    const { setId } = useContext(RouteContext)
    const { user, setUser, loggedUnity } = useContext(AuthContext)
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode

    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname

    const [open, setOpen] = useState(false)
    const [data, setData] = useState()

    // ** State
    const [expanded, setExpanded] = useState(false)
    const [expandedItem, setExpandedItem] = useState(false)
    const [photoProfile, setPhotoProfile] = useState(null)

    const form = useForm({})

    data &&
        data.units &&
        data.units.map((unit, index) => {
            setValue(`units[${index}].papel`, unit.papel)
            // setValue(`units[${index}].profissao`, unit.profissao)
            setValue(`units[${index}].cargo`, unit.cargos)
        })

    // ** Senha e Confirma Senha
    const [statePassword, setStatePassword] = useState({
        showPassword: false,
        showConfirmPassword: false
    })
    const handleClickShowPassword = () => {
        setStatePassword({ ...statePassword, showPassword: !statePassword.showPassword })
    }
    const handleClickShowConfirmPassword = () => {
        setStatePassword({ ...statePassword, showConfirmPassword: !statePassword.showConfirmPassword })
    }
    //? Estados validar senha e confirmação de senha
    const [changePasswords, setChangePasswords] = useState(false)

    // Função que atualiza os dados ou cria novo dependendo do tipo da rota
    const onSubmit = async values => {
        try {
            if (type === 'new') {
                await api.post(`${backRoute(staticUrl)}/new/insertData`, values).then(response => {
                    router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                    setId(response.data.id)
                    toast.success(toastMessage.successNew)
                })
            } else if (type === 'edit') {
                values['permissionUserLogged'] = user.admin
                if (!changePasswords) {
                    delete values.fields.senha
                    delete values.fields.confirmarSenha
                }

                await api.post(`${staticUrl}/updateData/${id}`, values)
                toast.success(toastMessage.successUpdate)
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.errorRepeated)
            } else {
                console.log(error)
            }
        }
    }

    // Função que deleta os dados
    const handleClickDelete = async () => {
        try {
            await api.delete(`${staticUrl}/${id}`)
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

    // Função que adiciona uma nova unidade
    const addUnity = () => {
        const newUnity = [...data.units]
        newUnity.push({
            unidade: null,
            papel: null,
            // profissao: null,
            cargos: [],
            status: true
        })
        setData({ ...data, units: newUnity })
    }

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const handleChangeItem = item => (event, isExpanded) => {
        setExpandedItem(isExpanded ? item : false)
    }

    // Quando clicar no botão de foto, o input de foto é clicado abrindo o seletor de arquivos
    const fileInputRef = useRef(null)

    const handleAvatarClick = () => {
        fileInputRef.current.click()
    }

    // Ao selecionar a foto, ela é enviada para o servidor e salva no banco de dados, como resposta atualiza a foto atual
    const handleFileSelect = async event => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            const formData = new FormData()
            formData.append('file', selectedFile)

            //? Verifica se o arquivo é uma imagem
            const isImage = selectedFile.type.includes('image')
            if (!isImage) {
                toast.error('O arquivo selecionado não é uma imagem!')
                return
            }

            await api
                .post(`${staticUrl}/photo-profile/${id}/${loggedUnity.unidadeID}`, formData)
                .then(response => {
                    console.log('Response ===> ', response)
                    setPhotoProfile(response.data)
                    if (user.usuarioID == id) {
                        setUser({ ...user, imagem: response.data })
                    }
                    toast.success('Foto de perfil atualizada com sucesso!')
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar foto de perfil, tente novamente!')
                })
        }
    }

    const handleDeleteImage = async () => {
        try {
            await api.delete(`${staticUrl}/photo-profile/${id}`)
            setPhotoProfile(null)
            if (user.usuarioID == id) {
                setUser({ ...user, imagem: null })
            }
            toast.success('Foto de perfil removida com sucesso!')
        } catch (error) {
            console.log(error)
            toast.error('Erro ao remover foto de perfil, tente novamente!')
        }
    }

    const getData = async () => {
        if (type == 'edit') {
            try {
                const route = `${staticUrl}/getData/${id}?unidadeID=${loggedUnity.unidadeID}&papelID=${loggedUnity.papelID}&admin=${user.admin}`
                await api.post(route).then(response => {
                    console.log('🚀 ~ response:', response.data)
                    setData(response.data)
                    setPhotoProfile(response.data.fields.imagem)
                    form.reset(response.data) //* Insere os dados no formulário
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            setData({}) // remove loading
        }
    }

    // Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    useEffect(() => {
        getData()
    }, [id])

    return (
        <>
            {!data && <Loading />}
            {data && (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Deixar atualizar e salvar a foto do usuário */}
                    {(type == 'new' || data) && (
                        <Card>
                            <FormHeader
                                btnCancel
                                btnSave
                                handleSubmit={() => form.handleSubmit(onSubmit)}
                                btnDelete={type === 'edit' ? true : false}
                                onclickDelete={() => setOpen(true)}
                                type={type}
                            />
                            <CardContent>
                                {/* Enviar via hidden flag indicando se usuário logado é admin */}
                                <input type='hidden' value={user.admin} name='admin' {...register(`admin`)} />
                                <input
                                    type='hidden'
                                    value={data?.usuarioUnidadeID}
                                    name='usuarioUnidadeID'
                                    {...register(`usuarioUnidadeID`)}
                                />
                                <input
                                    type='hidden'
                                    value={loggedUnity?.unidadeID}
                                    name='unidadeID'
                                    {...register(`unidadeID`)}
                                />
                                <input
                                    type='hidden'
                                    value={loggedUnity?.papelID}
                                    name='papelID'
                                    {...register(`papelID`)}
                                />

                                <Grid container spacing={5}>
                                    {/* Foto do usuário e upload */}
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
                                                    height: '250px',
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
                                                            alt='Victor Anderson'
                                                            sx={{ width: '97%', height: '97%', cursor: 'pointer' }}
                                                            src={photoProfile}
                                                            onClick={handleAvatarClick}
                                                        />
                                                    </FormControl>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    )}

                                    {/* Campos a direita */}
                                    <Grid item xs={12} md={type === 'edit' ? 10 : 12}>
                                        <Grid container spacing={5}>
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Nome'
                                                name='fields.nome'
                                                value={data?.fields?.nome}
                                                required={true}
                                                form={form}
                                            />

                                            <DateField
                                                xs={12}
                                                md={4}
                                                title='Data de Nascimento'
                                                value={data?.fields?.dataNascimento}
                                                name={`fields.dataNascimento`}
                                                form={form}
                                            />

                                            <Input
                                                xs={12}
                                                md={4}
                                                title='E-mail'
                                                name='fields.email'
                                                value={data?.fields?.email}
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='CPF'
                                                name='fields.cpf'
                                                mask='cpf'
                                                value={data?.fields?.cpf}
                                                required={true}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='RG'
                                                name='fields.rg'
                                                value={data?.fields?.rg}
                                                form={form}
                                            />
                                            <Input
                                                xs={12}
                                                md={4}
                                                title='Registro Conselho Classe'
                                                name='fields.registroConselhoClasse'
                                                value={data?.fields?.registroConselhoClasse}
                                                form={form}
                                            />

                                            {data && user.admin == 0 && (
                                                <>
                                                    {/* Profissão */}
                                                    {/* <Select
                                                        xs={12}
                                                        md={4}
                                                        title='Selecione a profissão'
                                                        options={data.profissaoOptions}
                                                        name={`profissao`}
                                                        idName={'profissaoID'}
                                                        value={data.profissao.id > 0 ? data.profissao : null}
                                                        // disabled={disabled}
                                                        register={register}
                                                        setValue={setValue}
                                                        control={control}
                                                        errors={errors?.profissao}
                                                    /> */}

                                                    {/* Cargos */}
                                                    {/* <Grid item xs={12} md={4}>
                                                        <FormControl fullWidth>
                                                            <Autocomplete
                                                                multiple
                                                                limitTags={2}
                                                                options={data.cargosOptions}
                                                                getOptionLabel={option => option.nome || ''}
                                                                defaultValue={data?.cargo ?? []}
                                                                name={`cargo[]`}
                                                                {...register(`cargo`, {
                                                                    required: false
                                                                })}
                                                                onChange={(index, value) => {
                                                                    const newDataCargos = value
                                                                        ? value.map(item => {
                                                                              return {
                                                                                  id: item?.id,
                                                                                  nome: item?.nome,
                                                                                  edit: true
                                                                              }
                                                                          })
                                                                        : []
                                                                    setValue(`cargo`, newDataCargos)
                                                                }}
                                                                renderInput={params => (
                                                                    <TextField
                                                                        {...params}
                                                                        label='Cargos'
                                                                        placeholder='Cargos'
                                                                        error={errors?.cargo}
                                                                    />
                                                                )}
                                                            />
                                                        </FormControl>
                                                    </Grid> */}
                                                </>
                                            )}

                                            {/* Botão alterar senha */}
                                            {data && type == 'edit' && (
                                                <Grid item xs={12} md={4}>
                                                    <FormControl fullWidth>
                                                        <Button
                                                            variant='outlined'
                                                            startIcon={<Icon icon='mdi:lock-reset' />}
                                                            onClick={() => {
                                                                // alterar estado do botão e limpar senha do register se estado for false
                                                                setChangePasswords(!changePasswords)
                                                                if (changePasswords) {
                                                                    setValue('senha', null)
                                                                    setValue('confirmarSenha', null)
                                                                }
                                                            }}
                                                            // altura do botao igual aos demais campos texfield
                                                            sx={{ height: '56px' }}
                                                        >
                                                            Alterar Senha
                                                        </Button>
                                                    </FormControl>
                                                </Grid>
                                            )}

                                            {(type == 'new' || changePasswords) && (
                                                <>
                                                    {/* Senha */}
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl fullWidth>
                                                            <InputLabel htmlFor='input-confirm-password'>
                                                                Senha
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                label='Senha'
                                                                id='input-password'
                                                                type={statePassword.showPassword ? 'text' : 'password'}
                                                                name={`fields.senha`}
                                                                {...register(`fields.senha`, {
                                                                    required: type == 'new' ? true : false
                                                                })}
                                                                error={form.formState?.errors?.fields?.senha}
                                                                endAdornment={
                                                                    <InputAdornment position='end'>
                                                                        <IconButton
                                                                            edge='end'
                                                                            onClick={handleClickShowPassword}
                                                                        >
                                                                            <Icon
                                                                                icon={
                                                                                    statePassword.showPassword
                                                                                        ? 'mdi:eye-outline'
                                                                                        : 'mdi:eye-off-outline'
                                                                                }
                                                                            />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </Grid>

                                                    {/* Confirma senha */}
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl fullWidth>
                                                            <InputLabel
                                                                htmlFor='input-confirm-password'
                                                                color={
                                                                    form.formState?.errors.confirmarSenha?.message
                                                                        ? 'error'
                                                                        : ''
                                                                }
                                                            >
                                                                Confirmar Senha
                                                            </InputLabel>
                                                            <OutlinedInput
                                                                label='Confirmar Senha'
                                                                id='input-password'
                                                                type={
                                                                    statePassword.showConfirmPassword
                                                                        ? 'text'
                                                                        : 'password'
                                                                }
                                                                name={`fields.confirmarSenha`}
                                                                {...register(`fields.confirmarSenha`, {
                                                                    required: type == 'new' ? true : false,
                                                                    // validar senha e confirmação de senha somente se houver valor em senha
                                                                    validate: value =>
                                                                        value === watch('fields.senha') ||
                                                                        'As senhas não conferem.'
                                                                })}
                                                                error={form.formState?.errors.confirmarSenha}
                                                                endAdornment={
                                                                    <InputAdornment position='end'>
                                                                        <IconButton
                                                                            edge='end'
                                                                            onClick={handleClickShowConfirmPassword}
                                                                        >
                                                                            <Icon
                                                                                icon={
                                                                                    statePassword.showConfirmPassword
                                                                                        ? 'mdi:eye-outline'
                                                                                        : 'mdi:eye-off-outline'
                                                                                }
                                                                            />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                            {form.formState?.errors.confirmarSenha?.message && (
                                                                <Typography variant='body2' color='error'>
                                                                    {form.formState?.errors.confirmarSenha?.message}
                                                                </Typography>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                </>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}

                    {data && user.admin == 1 && type === 'edit' && (
                        <>
                            {/* Lista as unidades do usuario */}
                            {data.units &&
                                data.units.map((unit, indexUnit) => (
                                    <>
                                        {/* Cada unidade */}
                                        <input
                                            type='hidden'
                                            value={unit.usuarioUnidadeID}
                                            name={`units[${indexUnit}].usuarioUnidadeID`}
                                            {...register(`units[${indexUnit}].usuarioUnidadeID`)}
                                        />

                                        <Card sx={{ mt: 4 }}>
                                            <CardContent>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                                    {unit.unidade ? unit.unidade.nome : 'Nova Unidade'}
                                                    {unit.unidade?.id === loggedUnity.unidadeID &&
                                                        unit.papel?.id === loggedUnity.papelID && (
                                                            <CustomChip
                                                                size='small'
                                                                skin='light'
                                                                color='success'
                                                                label='Atual'
                                                                sx={{
                                                                    mx: 2,
                                                                    '& .MuiChip-label': { textTransform: 'capitalize' }
                                                                }}
                                                            />
                                                        )}
                                                </Typography>
                                                <Grid container spacing={5} sx={{ my: 2 }}>
                                                    {/* Unidade (seleciona apenas no inserir uma nova) */}
                                                    {!unit.unidadeID ? (
                                                        <Grid item xs={12} md={3}>
                                                            {/* Unidade nova, monta coluna com autocomplete para selecionar */}
                                                            <Autocomplete
                                                                options={data.unidadesOptions}
                                                                getOptionLabel={option => option.nome}
                                                                defaultValue={unit?.unidade ?? null}
                                                                name={`units[${indexUnit}].unidade`}
                                                                {...register(`units[${indexUnit}].unidade`, {
                                                                    required: false
                                                                })}
                                                                onChange={(index, value) => {
                                                                    const newDataUnit = value
                                                                        ? {
                                                                              id: value?.unidadeID,
                                                                              nome: value?.nome
                                                                          }
                                                                        : null
                                                                    setValue(`units[${indexUnit}].unidade`, newDataUnit)
                                                                }}
                                                                renderInput={params => (
                                                                    <TextField
                                                                        {...params}
                                                                        label='Selecione a unidade'
                                                                        placeholder='Selecionar unidade'
                                                                        aria-describedby='formulario-error'
                                                                        error={
                                                                            form.formState?.errors.units?.[indexUnit]
                                                                                ?.unidade
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        </Grid>
                                                    ) : (
                                                        <input
                                                            type='hidden'
                                                            value={unit.unidadeID}
                                                            name={`units[${indexUnit}].unidadeID`}
                                                            {...register(`units[${indexUnit}].unidadeID`)}
                                                        />
                                                    )}

                                                    {/* Papel */}
                                                    <Grid item xs={12} md={3}>
                                                        <Autocomplete
                                                            options={data.papelOptions}
                                                            getOptionLabel={option => option.nome}
                                                            defaultValue={unit.papel ?? null}
                                                            name={`units[${indexUnit}].papel`}
                                                            {...register(`units[${indexUnit}].papel`, {
                                                                required: false
                                                            })}
                                                            onChange={(index, value) => {
                                                                const newDataPapel = value
                                                                    ? {
                                                                          id: value?.id,
                                                                          nome: value?.nome,
                                                                          edit: true
                                                                      }
                                                                    : null
                                                                setValue(`units[${indexUnit}].papel`, newDataPapel)
                                                            }}
                                                            renderInput={params => (
                                                                <TextField
                                                                    {...params}
                                                                    label='Selecione o papel'
                                                                    placeholder='Selecione o papel'
                                                                    aria-describedby='formulario-error'
                                                                    error={
                                                                        form.formState?.errors.units?.[indexUnit]?.papel
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    </Grid>

                                                    {/* Profissão */}
                                                    {/* <Grid item xs={12} md={3}>
                                                        <Autocomplete
                                                            options={data.profissaoOptions}
                                                            getOptionLabel={option => option.nome || ''}
                                                            defaultValue={unit.profissao ?? ''}
                                                            name={`units[${indexUnit}].profissao`}
                                                            {...register(`units[${indexUnit}].profissao`, {
                                                                required: false
                                                            })}
                                                            onChange={(index, value) => {
                                                                const newDataProfission = value
                                                                    ? {
                                                                          id: value?.profissaoID,
                                                                          nome: value?.nome,
                                                                          edit: true
                                                                      }
                                                                    : null
                                                                setValue(
                                                                    `units[${indexUnit}].profissao`,
                                                                    newDataProfission
                                                                )
                                                            }}
                                                            renderInput={params => (
                                                                <TextField
                                                                    {...params}
                                                                    label='Selecione a profissão'
                                                                    placeholder='Selecione a profissão'
                                                                    aria-describedby='formulario-error'
                                                                    error={form.formState?.errors.units?.[indexUnit]?.profissao}
                                                                />
                                                            )}
                                                        />
                                                    </Grid> */}

                                                    {/* Cargo(s) */}
                                                    <Grid item xs={12} md={unit.unidadeID ? 6 : 3}>
                                                        <Autocomplete
                                                            multiple
                                                            limitTags={2}
                                                            options={data.cargosOptions}
                                                            getOptionLabel={option => option.nome || ''}
                                                            defaultValue={unit.cargos ?? []}
                                                            name={`units[${indexUnit}].cargo[]`}
                                                            {...register(`units[${indexUnit}].cargo`, {
                                                                required: false
                                                            })}
                                                            onChange={(index, value) => {
                                                                const newDataCargos = value
                                                                    ? value.map(item => {
                                                                          return {
                                                                              id: item?.id,
                                                                              nome: item?.nome,
                                                                              edit: true
                                                                          }
                                                                      })
                                                                    : []
                                                                setValue(`units[${indexUnit}].cargo`, newDataCargos)
                                                            }}
                                                            renderInput={params => (
                                                                <TextField
                                                                    {...params}
                                                                    label='Cargos'
                                                                    placeholder='Cargos'
                                                                    error={
                                                                        form.formState?.errors.units?.[indexUnit]?.cargo
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                {/* Permissões da unidade */}
                                                <Permissions
                                                    unit={unit}
                                                    indexUnit={indexUnit}
                                                    expanded={expanded}
                                                    expandedItem={expandedItem}
                                                    handleChange={handleChange}
                                                    handleChangeItem={handleChangeItem}
                                                    control={form.control}
                                                    register={form.register}
                                                    setValue={form.setValue}
                                                />
                                            </CardContent>

                                            <CardContent>{/* Accordion */}</CardContent>
                                        </Card>
                                    </>
                                ))}

                            {/* Adicionar unidade */}
                            <Grid container spacing={5} sx={{ my: 2 }}>
                                <Grid item xs={12} md={3}>
                                    <Button
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                        variant='outlined'
                                        onClick={() => {
                                            addUnity()
                                        }}
                                    >
                                        Inserir unidade
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </form>
            )}

            <DialogForm
                text='Tem certeza que deseja excluir?'
                title='Excluir dado'
                openModal={open}
                handleClose={() => setOpen(false)}
                handleSubmit={handleClickDelete}
                btnCancel
                btnConfirm
            />
        </>
    )
}

export default FormUsuario

// 1222 inicial

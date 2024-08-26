// ** React Imports
import { useState, useContext, useEffect } from 'react'
import { api } from 'src/configs/api'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { RouteContext } from 'src/context/RouteContext'

//* CNPJ Mask
import { cnpjMask, cpfMask } from '../../configs/masks'
import { validationCNPJ, validationCPF } from '../../configs/validations'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { AuthContext } from 'src/context/AuthContext'

import useBgColor from 'src/@core/hooks/useBgColor'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'
import { toast } from 'react-hot-toast'
import Logo from 'src/components/Defaults/Logo'
import Router from 'next/router'

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(10)
    }
}))

const LoginIllustration = styled('img')(({ theme }) => ({
    maxWidth: '48rem',
    [theme.breakpoints.down('xl')]: {
        maxWidth: '38rem'
    },
    [theme.breakpoints.down('lg')]: {
        maxWidth: '30rem'
    }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
        maxWidth: 400
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: 450
    }
}))

const BoxWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.down('md')]: {
        maxWidth: 400
    }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: '0.18px',
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
    '& .MuiFormControlLabel-label': {
        fontSize: '0.875rem',
        color: theme.palette.text.secondary
    }
}))

const schema = yup.object().shape({
    cnpj: yup.string().required('Campo obrigatório').min(14, 'O campo deve ser preenchido completamente').max(18),
    // .test('Campo válido', 'Campo inválido', value => validationCNPJ(value)),

    password: yup.string().min(4, 'A senha deve conter pelo menos 4 caracteres').required('A senha é obrigatória')
})

const defaultValues = {
    password: '',
    cnpj: ''
}

const FornecedorPage = ({ units }) => {
    const [isCpf, setIsCpf] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [codeCNPJ, setCodeCNPJ] = useState(null)
    const router = Router
    const currentLink = router.pathname

    // ** Hooks
    const auth = useAuth()
    const { user } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)

    const theme = useTheme()
    const bgColors = useBgColor()
    const { settings } = useSettings()
    const hidden = useMediaQuery(theme.breakpoints.down('md'))

    // ** Vars
    const { skin } = settings

    const {
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    // id que vem da rota, para quem acessa com o link do email
    const id = router.query.f ?? router.query.r

    const onSubmit = data => {
        const { cnpj, password } = data
        setId(null)
        auth.loginFornecedor({ type: isCpf ? 'cpf' : 'cnpj', cnpjCpf: cnpj, password, rememberMe }, error => {
            setError('cnpj', {
                type: 'manual',
                message: isCpf ? 'CPF e/ou senha inválidos!' : 'CNPJ e/ou senha inválidos!'
            })
            if (error && error.response && error.response.status === 401) {
                toast.error(isCpf ? 'CPF e/ou senha inválidos!' : 'CNPJ e/ou senha inválidos!')
            }
        })
    }

    const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'

    // UnidadeID e CNPJ criptografados / CNPJ esta com mascara de apenas numeros
    const unidadeIDRouter = router.query.u
    const cnpjRouter = router.query.c

    const setAcessLink = async (unidadeID, cnpj) => {
        const data = {
            unidadeID,
            cnpj
        }
        await api.post(`/login-fornecedor/setAcessLink`, { data })
    }

    // Validar se o CNPJ esta na tabela fabrica_fornecedor
    const validationExistCNPJCPF = e => {
        setCodeCNPJ(null)
        if (
            (e.target.value.length === 14 || e.target.value.length === 18) &&
            (isCpf ? validationCPF(e.target.value) : validationCNPJ(e.target.value))
        ) {
            api.post(`/login-fornecedor/validationCNPJ`, {
                type: isCpf ? 'cpf' : 'cnpj',
                cnpjCpf: e.target.value
            }).then(response => {
                setCodeCNPJ(response.status)
            })
        }
    }

    useEffect(() => {
        if (unidadeIDRouter && cnpjRouter) {
            setAcessLink(unidadeIDRouter, cnpjRouter)
        }
    }, [[unidadeIDRouter, cnpjRouter]])

    return (
        <>
            <Box className='content-right'>
                {!hidden ? (
                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            position: 'relative',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <img src='/images/storyset/loginFornecedor.svg' style={{ height: '100vh', width: '65%' }} />
                        <img
                            alt='mask'
                            src='https://demos.pixinvent.com/materialize-nextjs-admin-template/demo-3/images/pages/misc-mask-light.png'
                            className='css-84vgca'
                            style={{
                                position: 'absolute',
                                zIndex: '-1',
                                bottom: '0',
                                left: '0',
                                width: '100%'
                            }}
                        />
                    </Box>
                ) : null}
                <RightWrapper
                    sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}
                >
                    <Box
                        sx={{
                            p: 7,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'background.paper'
                        }}
                    >
                        <BoxWrapper>
                            <Box
                                sx={{
                                    top: 30,
                                    left: 40,
                                    display: 'flex',
                                    position: 'absolute',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* Logo do sistema GED */}
                                <Logo />
                            </Box>
                            <Box sx={{ mb: 6 }}>
                                <TypographyStyled
                                    variant='h6'
                                    sx={{ fontWeight: 600 }}
                                >{`Bem-vindo Fornecedor`}</TypographyStyled>
                                <Typography variant='body2'>Digite seu CNPJ e senha para começar</Typography>
                            </Box>

                            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex items-start justify-center gap-0 '>
                                    <FormControl fullWidth sx={{ mb: 4 }}>
                                        <Controller
                                            name='cnpj'
                                            control={control}
                                            rules={{ required: true }}
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <TextField
                                                    autoFocus
                                                    label={isCpf ? 'CPF' : 'CNPJ'}
                                                    size='small'
                                                    value={isCpf ? cpfMask(value ?? '') : cnpjMask(value ?? '')}
                                                    onBlur={onBlur}
                                                    onChange={e => {
                                                        onChange(e)
                                                        validationExistCNPJCPF(e)
                                                    }}
                                                    error={Boolean(errors.cnpj)}
                                                    placeholder={isCpf ? '000.000.000-00' : '00.000.000/0000-00'}
                                                    inputProps={{
                                                        maxLength: isCpf ? 14 : 18,
                                                        type: 'tel', // define o tipo de entrada como 'tel'
                                                        inputMode: 'numeric' // define o inputMode como 'numeric'
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors.cnpj && (
                                            <FormHelperText sx={{ color: 'error.main' }}>
                                                {errors.cnpj.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>

                                    <FormControlLabel
                                        label='CPF'
                                        labelPlacement='top'
                                        control={
                                            <Checkbox checked={isCpf} onChange={e => setIsCpf(e.target.checked)} />
                                        }
                                        sx={{ position: 'relative', top: -15 }}
                                    />
                                </div>
                                <FormControl fullWidth>
                                    <Controller
                                        name='password'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label='Senha'
                                                variant='outlined'
                                                size='small'
                                                id='auth-login-v2-password'
                                                error={Boolean(errors.password)}
                                                type={showPassword ? 'text' : 'password'}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position='end'>
                                                            <IconButton
                                                                edge='end'
                                                                onMouseDown={e => e.preventDefault()}
                                                                onClick={() => setShowPassword(!showPassword)}
                                                            >
                                                                <Icon
                                                                    icon={
                                                                        showPassword
                                                                            ? 'mdi:eye-outline'
                                                                            : 'mdi:eye-off-outline'
                                                                    }
                                                                    fontSize={20}
                                                                />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <FormHelperText sx={{ color: 'error.main' }} id=''>
                                            Campo obrigatório
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Box
                                    sx={{
                                        mb: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        justifyContent: 'space-between'
                                    }}
                                >
                                    <FormControlLabel
                                        label='Lembrar-me'
                                        control={
                                            <Checkbox
                                                checked={rememberMe}
                                                onChange={e => setRememberMe(e.target.checked)}
                                            />
                                        }
                                    />
                                    <Typography
                                        variant='body2'
                                        component={Link}
                                        href='/esqueceu-sua-senha?type=fornecedor'
                                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                                    >
                                        Esqueceu sua senha?
                                    </Typography>
                                </Box>
                                <Button
                                    fullWidth
                                    size='large'
                                    type='submit'
                                    variant='contained'
                                    sx={{ mb: 4 }}
                                    disabled={!codeCNPJ || codeCNPJ == 202 || codeCNPJ == 201}
                                >
                                    Entrar
                                </Button>
                                {/* Verifica se o CNPJ existe na tabela fornecedor_fabrica e mostra mensagem de acordo*/}
                                {codeCNPJ && codeCNPJ == 202 ? (
                                    <Alert severity='warning'>
                                        Antes de realizar o cadastro, é necessário que uma fábrica habilite o seu
                                        CNPJ/CPF como um fornecedor.
                                    </Alert>
                                ) : codeCNPJ == 201 ? (
                                    <Alert severity='warning'>
                                        É necessário fazer o cadastro para que você possa acessar o sistema.{'  '}
                                        <Typography
                                            href='/registro'
                                            component={Link}
                                            sx={{ color: 'primary.main', textDecoration: 'none' }}
                                        >
                                            Registre-se
                                        </Typography>
                                    </Alert>
                                ) : (
                                    ''
                                )}
                                {/* <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        mt: 4
                                    }}
                                >
                                    <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                                        É um fornecedor novo?
                                    </Typography>
                                    <Typography
                                        href='/registro'
                                        component={Link}
                                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                                    >
                                        Registre-se
                                    </Typography>
                                </Box> */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        marginTop: '1rem'
                                    }}
                                >
                                    <Typography sx={{ mr: 2, color: 'text.secondary' }}>É uma fábrica?</Typography>
                                    <Typography
                                        href='/login'
                                        component={Link}
                                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                                    >
                                        Login
                                    </Typography>
                                </Box>
                            </form>
                        </BoxWrapper>
                    </Box>
                </RightWrapper>
            </Box>
        </>
    )
}
FornecedorPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
FornecedorPage.guestGuard = true

export default FornecedorPage

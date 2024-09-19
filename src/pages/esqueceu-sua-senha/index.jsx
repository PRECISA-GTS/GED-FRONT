// ** Next Import
import Link from 'next/link'
import { api } from 'src/configs/api'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: 450 }
}))

import { useEffect, useState, onChange, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { cpfMask, cnpjMask } from 'src/configs/masks'
import { validationCPF, validationCNPJ, validationEmail } from 'src/configs/validations'
import Router from 'next/router'
import { toast } from 'react-hot-toast'
import Logo from 'src/components/Defaults/Logo'
import { Alert, Checkbox, FormControlLabel } from '@mui/material'
import { FornecedorContext } from 'src/context/FornecedorContext'

const EsqueceuSenha = () => {
    // ** Hook
    const [type, setType] = useState()
    const [getData, setGetData] = useState()
    const [campo, setCampo] = useState()
    const router = Router
    const { isCpf, setIsCpf } = useContext(FornecedorContext)
    const emailToShow = getData?.email?.replace(/^(.{3}).*@/, '$1****@')

    const form = useForm({})

    function OnchangeValue(value) {
        setGetData('')
        if (
            (!isCpf && value.length == 18 && validationCNPJ(value)) ||
            (isCpf && value.length == 14 && validationCPF(value))
        ) {
            api.post(`esqueceuSenha/validation?type=${type}`, { data: value }).then(response => {
                setGetData(response.data)
            })
        }
    }

    const onSubmit = value => {
        const newValue = {
            ...value,
            email: getData?.email,
            nome: getData?.nome,
            usuarioID: getData?.usuarioID
        }
        api.post(`/esqueceuSenha?type=${type}`, { data: newValue }).then(response => {
            if (response.status === 200) {
                toast.success('Email enviado com sucesso!')
            } else {
                toast.error('Erro ao enviar email, tente novamente!')
            }
        })
    }

    useEffect(() => {
        setType(router.query.type)
    }, [router.query])

    return (
        <Box className='content-center'>
            <Card sx={{ zIndex: 1 }} style={{ width: 'min(500px, 96%)' }}>
                <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
                    <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Logo />
                    </Box>
                    <Box sx={{ mb: 6.5 }}>
                        <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
                            Esqueceu sua senha? 🔒
                        </Typography>
                        <Typography variant='body2'>
                            {type === 'login'
                                ? 'Digite seu CPF e enviaremos instruções para redefinir sua senha'
                                : `Digite seu ${
                                      isCpf ? 'CPF' : 'CNPJ'
                                  } e enviaremos instruções para redefinir sua senha`}
                        </Typography>
                    </Box>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {type === 'login' ? (
                            <FormControl fullWidth>
                                <TextField
                                    label='CPF'
                                    placeholder='CPF'
                                    size='small'
                                    aria-describedby='validation-schema-nome'
                                    name='cpf'
                                    {...form.register(`cpf`, {
                                        required: true,
                                        validate: value => validationCPF(value) || 'CPF inválido'
                                    })}
                                    error={form.formState?.errors.cpf}
                                    helperText={form.formState?.errors.cpf?.message}
                                    inputProps={{
                                        maxLength: 14,
                                        onChange: e => {
                                            form.setValue('cpf', cpfMask(e.target.value))
                                            OnchangeValue(e.target.value)
                                            setCampo(e.target.value)
                                        }
                                    }}
                                />
                            </FormControl>
                        ) : (
                            <div className='flex items-center'>
                                <FormControl fullWidth>
                                    <TextField
                                        label={isCpf ? 'CPF' : 'CNPJ'}
                                        placeholder={isCpf ? 'CPF' : 'CNPJ'}
                                        aria-describedby='validation-schema-nome'
                                        name='cnpj'
                                        {...form.register(`cnpj`, {
                                            required: true,
                                            validate: value =>
                                                isCpf
                                                    ? validationCPF(value)
                                                    : validationCNPJ(value) || isCpf
                                                    ? 'CPF inválido'
                                                    : 'CNPJ inválido'
                                        })}
                                        error={form.formState?.errors?.cnpj}
                                        helperText={form.formState?.errors?.cnpj?.message}
                                        inputProps={{
                                            maxLength: isCpf ? 14 : 18,
                                            onChange: e => {
                                                form.setValue(
                                                    'cnpj',
                                                    isCpf ? cpfMask(e.target.value) : cnpjMask(e.target.value)
                                                )
                                                OnchangeValue(e.target.value)
                                                setCampo(e.target.value)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormControlLabel
                                    label='CPF'
                                    labelPlacement='top'
                                    control={
                                        <Checkbox
                                            checked={isCpf}
                                            onChange={e => {
                                                setIsCpf(e.target.checked)
                                                form.setValue('cnpj', '')
                                            }}
                                        />
                                    }
                                    sx={{ position: 'relative', top: -10 }}
                                />
                            </div>
                        )}

                        {getData?.email && validationEmail(getData?.email) && (
                            <Alert severity='info' sx={{ mt: 2 }}>
                                <Typography variant='body2'>
                                    Um link para a redefinição da senha será enviado para {emailToShow}
                                </Typography>
                            </Alert>
                        )}

                        {/* Gerar um alerte de erro se o email não existir no banco de dados ou se o email não for validado */}
                        {/* {!getData && campo?.length == (type == 'login' ? 14 : 18) && ( */}
                        {!getData && ((isCpf && campo?.length == 14) || (!isCpf && campo?.length == 18)) && (
                            <Alert severity='error' sx={{ mt: 2 }}>
                                <Typography variant='body2'>
                                    Esse {isCpf ? 'CPF' : 'CNPJ'} não está na nossa base de dados!
                                </Typography>
                            </Alert>
                        )}

                        {getData &&
                            !getData?.email &&
                            ((isCpf && campo?.length == 14) || (!isCpf && campo?.length == 18)) && (
                                <Alert severity='warning' sx={{ mt: 2 }}>
                                    <Typography variant='body2'>
                                        Seu cadastro não possui um e-mail informado! Por favor, entre em contato com o
                                        suporte.
                                    </Typography>
                                </Alert>
                            )}

                        <Button
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                            sx={{ mb: 5.25, mt: 4 }}
                            disabled={!getData?.email || !validationEmail(getData?.email)}
                        >
                            Enviar
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography
                                component={Link}
                                href={type === 'login' ? '/login' : '/fornecedor'}
                                sx={{
                                    display: 'flex',
                                    '& svg': { mr: 1.5 },
                                    alignItems: 'center',
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    justifyContent: 'center'
                                }}
                            >
                                <Icon icon='mdi:chevron-left' fontSize='2rem' />
                                <span>Voltar para o login</span>
                            </Typography>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <FooterIllustrationsV1 image={`/images/pages/auth-v1-reset-password-mask-dark.png`} />
        </Box>
    )
}
EsqueceuSenha.getLayout = page => <BlankLayout>{page}</BlankLayout>
EsqueceuSenha.guestGuard = true

export default EsqueceuSenha

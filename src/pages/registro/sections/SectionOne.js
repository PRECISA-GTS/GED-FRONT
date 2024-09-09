import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { api } from 'src/configs/api'
import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { validationCNPJ } from 'src/configs/validations'
import Router from 'next/router'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import { Alert, OutlinedInput } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import Link from 'next/link'
import Input from 'src/components/Form/Input'

const SectionOne = ({ handleNext, setDataGlobal, dataGlobal }) => {
  const router = Router
  const [lenghtPassword, setLenghtPassword] = useState(null)
  const [unidadeID, setUnidadeID] = useState(null)
  const [cnpjData, setCnpjData] = useState()
  const [fromLink, setFromLink] = useState(false)
  const [validationCnpj, setValidationCnpj] = useState(null)

  const inputRef = useRef(null)


  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  const form = useForm()

  // Quando a quantidade de caracteres do cnpj é 18 faz um get para pegar os dados do fornecedor
  const handleGetCnpj = (cnpj) => {
    if (cnpj.length === 18) {
      setValidationCnpj(validationCNPJ(cnpj))
      if (validationCNPJ(cnpj)) {
        api.post(`/registro-fornecedor/getData`, { cnpj: cnpj })
          .then((response) => {
            setCnpjData(cnpj)
            setDataGlobal({
              ...response.data,
              ...dataGlobal,
              sectionOne: {
                cnpj: cnpj,
                nomeFantasia: '',
                razaoSocial: '',
                email: '',
              }
            })
          })
      }
    } else {
      setDataGlobal(null)
      setCnpjData(null)
      setValidationCnpj(null)
    }
  }

  // UnidadeID e CNPJ criptografados / CNPJ esta com mascara de apenas numeros
  const unidadeIDRouter = router.query.u
  const cnpjRouter = router.query.c
  const email = router.query.e
  const nome = router.query.n

  // Execula se link conter parametros
  const setAcessLink = async (unidadeID, cnpj) => {
    if (unidadeID && cnpj) {
      const data = {
        unidadeID,
        cnpj,
        nome,
        email
      }
      await api.post(`/login-fornecedor/setAcessLink`, { data })
        .then((response, err) => {
          setUnidadeID(response.data[0].unidadeID)
          if (response.data && response.data[0] && response.data[0].cnpj) {
            handleGetCnpj(response.data[0].cnpj)
            form.setValue('cnpj', data.response?.data[0].cnpj)
            form.setValue('email', data.email)
            form.setValue('nomeFantasia', data.nome)
            form.setValue('razaoSocial', data.nome)
            setFromLink(true)
          }
        })
    }
  }

  const onSubmit = value => {
    setDataGlobal({
      ...dataGlobal,
      unidadeID: unidadeID,
      sectionOne: {
        ...dataGlobal?.sectionOne,
        nomeFantasia: value.nomeFantasia,
        razaoSocial: value.razaoSocial,
        email: value.email,
        senha: value.senha,
      },
      sectionTwo: {
        ...dataGlobal?.sectionTwo,
        logradouro: dataGlobal?.sectionTwo?.logradouro ?? '--',
        bairro: dataGlobal?.sectionTwo?.bairro ?? '--',
        cidade: dataGlobal?.sectionTwo?.cidade ?? '--',
        uf: dataGlobal?.sectionTwo?.uf ?? '--',
      }
    });
    handleNext(value);
  }


  useEffect(() => {
    if (unidadeIDRouter && cnpjRouter) {
      setAcessLink(unidadeIDRouter, cnpjRouter)
      setTimeout(() => {
        inputRef?.current?.focus()
      }, 500)
    }

  }, [unidadeIDRouter, cnpjRouter])

  useEffect(() => {
    setCnpjData(dataGlobal?.sectionOne?.cnpj)
    form.setValue("cnpj", dataGlobal?.sectionOne?.cnpj)
    form.setValue("nomeFantasia", dataGlobal?.sectionOne?.nomeFantasia)
    form.setValue("razaoSocial", dataGlobal?.sectionOne?.razaoSocial)
    form.setValue("email", dataGlobal?.sectionOne?.email)
    setCnpjData(dataGlobal?.sectionOne?.cnpj)
  }, [])

  return (
    (!fromLink || dataGlobal) && (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box sx={{ mb: 4 }}>
          <Typography variant='h5'>Informações obrigatórios</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Insira as informações obrigatórias</Typography>
        </Box>
        <Grid container spacing={5}>

          <Input
            xs={12}
            md={6}
            title='CNPJ'
            name='cnpj'
            defaultValue={dataGlobal?.sectionOne?.cnpj}
            mask='cnpj'
            control={form.control}
            errors={form.formState?.errors?.cnpj}
            onChange={(value) => handleGetCnpj(value)}
          />
          {/* Mostra quando cnpj digitado for inválido  */}
          {
            !validationCnpj && validationCnpj !== null && (
              <Grid item xs={12} md={12}>
                <Alert severity='warning'>
                  CNPJ inválido!
                </Alert>
              </Grid>
            )
          }

          {/* Não autorizado / O fornecedor não está habilidade por nenhuma fabrica */}
          {
            dataGlobal && dataGlobal?.status === 'notAuthorized' && (
              <Grid item xs={12} md={12}>
                <Alert severity='warning'>
                  Antes de realizar o cadastro, é necessário que uma fábrica habilite o seu CNPJ como um fornecedor.
                </Alert>
              </Grid>
            )
          }
          {/* Já tem usuário mas não tem nenhuma unidade com papel fornecedor/ / Nessesario criar usuario */}
          {
            dataGlobal && dataGlobal?.status === 'hasUserNotUnity' && (
              <Grid item xs={12} md={12}>
                <h3>CNPJ já cadastrado</h3>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography sx={{ color: 'text.primary' }}>Nome Fantasia:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{dataGlobal?.unity?.nomeFantasia}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography sx={{ color: 'text.primary' }}>Email Institucional:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{dataGlobal?.unity?.email}</Typography>
                    </Box>
                  </Box>
                  {/* Redefinir senha */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='input-password' color={form.formState?.errors.senha ? 'error' : ''}>Senha</InputLabel>
                        <OutlinedInput
                          label='Senha'
                          size='small'
                          id='input-password'
                          inputRef={inputRef}
                          type={values.showPassword ? 'text' : 'password'}
                          name='senha'
                          {...register('senha')}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                              </IconButton>
                            </InputAdornment>
                          }
                          error={form.formState?.errors.senha && true}
                          helperText={form.formState?.errors.senha && form.formState?.errors.senha.message}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='input-confirm-password' style={{
                          color: form.formState?.errors.confirmaSenha && 'red'
                        }}  >Confirme a senha</InputLabel>
                        <OutlinedInput
                          label='Confirme a senha'
                          name='confirmaSenha'
                          size='small'
                          {...register('confirmaSenha')}
                          id='input-confirm-password'
                          type={values.showConfirmPassword ? 'text' : 'password'} // altere o tipo para 'password'
                          onChange={e => {
                            setLenghtPassword(e.target.value)
                          }}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                edge='end'
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                              >
                                <Icon icon={values.showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                              </IconButton>
                            </InputAdornment>
                          }
                          error={form.formState?.errors.confirmaSenha && true}
                        />
                        <Typography variant='caption' sx={{ color: 'error.main' }}>
                          {form.formState?.errors.confirmaSenha && form.formState?.errors.confirmaSenha.message}
                        </Typography>
                      </FormControl>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            )
          }
          {/* Já tem usuário e já tem unidade com papel fornecedor / Link para redefinir senha ou fazer login*/}
          {
            dataGlobal && dataGlobal?.status === 'hasUserHasUnity' && (
              <Grid item xs={12} md={12}>
                <h3>CNPJ já cadastrado</h3>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography sx={{ color: 'text.primary' }}>Nome Fantasia:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{dataGlobal?.unity?.nomeFantasia}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography sx={{ color: 'text.primary' }}>Email Institucional:</Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{dataGlobal?.unity?.email}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography
                      href='/fornecedor'
                      component={Link}
                      sx={{ color: 'primary.main', textDecoration: 'none' }}
                    >
                      Fazer login
                    </Typography>
                    <Typography
                      href='/fornecedor'
                      component={Link}
                      sx={{ color: 'primary.main', textDecoration: 'none' }}
                    >
                      Esqueceu a senha?
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
          }
          {/* Está habilidado por uma fábrica, e não possui cadastro de unidade e nem de usuário */}
          {
            dataGlobal && dataGlobal?.status === 'isAuthorized' && (
              <>
                <Input
                  xs={12}
                  md={6}
                  title='Nome Fantasia'
                  name='nomeFantasia'
                  defaultValue={dataGlobal?.sectionOne.nomeFantasia || nome}
                  required
                  control={form.control}
                  errors={form.formState?.errors?.nomeFantasia}
                />
                <Input
                  xs={12}
                  md={6}
                  title='Razão Social'
                  name='razaoSocial'
                  defaultValue={dataGlobal?.sectionOne?.razaoSocial || nome}
                  required
                  control={form.control}
                  errors={form.formState?.errors?.razaoSocial}
                />
                <Input
                  xs={12}
                  md={6}
                  title='Email Institucional'
                  name='email'
                  defaultValue={dataGlobal?.sectionOne?.email || email}
                  required
                  control={form.control}
                  errors={form.formState?.errors?.email}
                />
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="input-password" color={form.formState?.errors.senha ? 'error' : ''}>
                      Senha
                    </InputLabel>
                    <OutlinedInput
                      size='small'
                      label="Senha"
                      id="input-password"
                      type={values.showPassword ? 'text' : 'password'}
                      name="senha"
                      {...register('senha', {
                        required: 'Campo obrigatório',
                        minLength: {
                          value: 4,
                          message: 'Senha deve ter pelo menos 4 caracteres',
                        },
                      })}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                      error={!!form.formState?.errors.senha}
                      helperText={form.formState?.errors.senha && form.formState?.errors.senha.message}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="input-confirm-password" style={{ color: form.formState?.errors.confirmaSenha && 'red' }}>
                      Confirme a senha
                    </InputLabel>
                    <OutlinedInput
                      label="Confirme a senha"
                      name="confirmaSenha"
                      size='small'
                      {...form.register('confirmaSenha', {
                        required: 'Campo obrigatório',
                        validate: (value) => value === form.watch('senha') || 'As senhas não coincidem',
                      })}
                      id="input-confirm-password"
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      onChange={e => {
                        setLenghtPassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                          >
                            <Icon icon={values.showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                      error={!!form.formState?.errors.confirmaSenha}
                    />
                    <Typography variant="caption" sx={{ color: 'error.main' }}>
                      {form.formState?.errors.confirmaSenha && form.formState?.errors.confirmaSenha.message}
                    </Typography>
                  </FormControl>
                </Grid>
              </>
            )
          }
          {/* Botões de acção */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled
                variant='contained'
                startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
              >
                Anterior
              </Button>
              <Button
                disabled={dataGlobal?.status == 'hasUserHasUnity' || dataGlobal?.status == 'notAuthorized' || !cnpjData}
                type='submit'
                variant='contained'
                onClick={handleSubmit}
                endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}
              >
                Proximo
              </Button>
            </Box>
            {dataGlobal?.status !== 'hasUserHasUnity' || dataGlobal?.status == 'notAuthorized' && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 10,
                  flexWrap: 'wrap',
                  justifyContent: 'start'
                }}
              >
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>
                  Fazer login?
                </Typography>
                <Typography
                  href='/fornecedor'
                  component={Link}
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Login
                </Typography>
              </Box>
            )
            }
          </Grid>
        </Grid>
      </form >
    )
  )
}

export default SectionOne

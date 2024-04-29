import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import Input from 'src/components/Form/Input'
import CheckLabel from 'src/components/Form/CheckLabel'
import { validationCPF } from 'src/configs/validations'
import Alert from '@mui/material/Alert'
import DateField from 'src/components/Form/DateField'
import { api } from 'src/configs/api'
import { Button, TextField, FormControl } from '@mui/material'
import DialogNewPasswordProfessional from 'src/components/Defaults/Dialogs/DialogNewPasswordProfessional'
import useDateFormat from 'src/hooks/useDateFormat'

const Fields = ({
    control,
    setError,
    errors,
    data,
    register,
    watch,
    getValues,
    setValue,
    userNewVerifyCPF,
    setUserNewVerifyCPF,
    userExistVerifyCPF,
    setUserExistVerifyCPF,
    resetFields,
    routeVeryfyCNP,
    userExistDefault,
    type
}) => {
    console.log('🚀 ~ data', data)
    const [lenghtPassword, setLenghtPassword] = useState(null)
    const [openModalNewPassword, setOpenModalNewPassword] = useState(false)
    const { setDateFormat, dateStatus } = useDateFormat()

    const [values, setValues] = useState({
        showPassword: false,
        showConfirmPassword: false
    })

    // Funções para validação e comparação de senha
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

    // Verifica se os campos cpf e email estão preenchidos
    const onChangeField = () => {
        const cpf = getValues('fields').cpf

        if (cpf && cpf.length < 14) {
            setValue('isUsuario', false)
            resetFields()
        }

        if (!validationCPF(cpf)) {
            setError('fields.cpf', {
                type: 'manual',
                message: 'CPF inválido'
            })
        } else {
            setError('fields.cpf', null)
            watch()
        }
        watch()
    }

    // Vai até o back e verifica se o já existe um usuario ncom o cpf digitado
    const verifyCPF = async () => {
        resetFields()

        const isUsuario = getValues('isUsuario')

        if (!isUsuario) {
            const data = {
                cpf: getValues('fields').cpf
            }
            try {
                const response = await api.post(routeVeryfyCNP, data)
                setUserNewVerifyCPF(true)
            } catch (e) {
                if (e.response.status == 409) {
                    setUserExistVerifyCPF(true)
                } else {
                    console.log(e)
                }
            }
        }
    }

    // Ao clicar no checkLabel seta os estados como null (é usuario ou é novo usuario), após chama a função que verifica se o cpf já esta esta cadastrado no sistema
    const handleClickIsUser = () => {
        verifyCPF()
    }

    return (
        data && (
            <>
                <Input
                    md={12}
                    title='Nome'
                    name='fields.nome'
                    required
                    control={control}
                    errors={errors?.fields?.nome}
                />
                <Input
                    xs={12}
                    md={4}
                    title='CPF'
                    mask='cpf'
                    name='fields.cpf'
                    // required={userExistVerifyCPF ?? false}
                    required
                    control={control}
                    errors={errors?.fields?.cpf}
                    onChange={onChangeField}
                />
                <DateField
                    xs={12}
                    md={4}
                    title='Data de Nascimento'
                    name={`fields.dataNascimento`}
                    type='date'
                    required
                    value={data?.fields?.dataNascimento}
                    register={register}
                    control={control}
                    setDateFormat={setDateFormat}
                    typeValidation='dataPassado'
                    daysValidation={9999999999999999999}
                    dateStatus={dateStatus}
                    errors={errors?.fields?.dataNascimento}
                />

                <Input
                    xs={12}
                    md={4}
                    title='Email'
                    type='email'
                    required={userExistVerifyCPF ?? false}
                    name='fields.email'
                    control={control}
                    errors={errors?.fields?.email}
                    onChange={onChangeField}
                />
                <Input
                    xs={12}
                    md={userNewVerifyCPF ? 2 : 4}
                    title='Matricula'
                    name='fields.matricula'
                    control={control}
                    errors={errors?.fields?.matricula}
                />
                <CheckLabel
                    xs={12}
                    md={2}
                    onClick={handleClickIsUser}
                    title='Usuário do sistema'
                    name='isUsuario'
                    value={data.fields.usuarioID > 0 ? true : false}
                    register={register}
                    disabled={getValues('fields').email && validationCPF(getValues('fields').cpf) ? false : true}
                    helpText='Preencha com um CPF e email válidos para habilitar esta função'
                />
                {userExistVerifyCPF && (
                    <Grid item xs={12}>
                        <Alert severity='warning' sx={{ mt: 2 }}>
                            <Typography variant='body2'>
                                Esse profissional já possui acesso ao sistema. A senha não será alterada!
                            </Typography>
                        </Alert>
                    </Grid>
                )}
                {userNewVerifyCPF && (
                    <>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Senha'
                                id='input-password'
                                variant='outlined'
                                size='small'
                                type={values.showPassword ? 'text' : 'password'}
                                name='senha'
                                error={!!errors.senha}
                                helperText={errors.senha && errors.senha.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                <Icon
                                                    icon={
                                                        values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                {...register('senha', {
                                    minLength: {
                                        value: 4,
                                        message: 'Senha deve ter pelo menos 4 caracteres'
                                    }
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label='Confirme a senha'
                                id='input-confirm-password'
                                variant='outlined'
                                size='small'
                                type={values.showConfirmPassword ? 'text' : 'password'}
                                name='confirmaSenha'
                                error={!!errors.confirmaSenha}
                                helperText={errors.confirmaSenha && errors.confirmaSenha.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                edge='end'
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownConfirmPassword}
                                            >
                                                <Icon
                                                    icon={
                                                        values.showConfirmPassword
                                                            ? 'mdi:eye-outline'
                                                            : 'mdi:eye-off-outline'
                                                    }
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={e => {
                                    setLenghtPassword(e.target.value)
                                }}
                                {...register('confirmaSenha', {
                                    validate: value => value === watch('senha') || 'As senhas não coincidem'
                                })}
                            />
                        </Grid>
                    </>
                )}
                {/* Alterar senha profissional */}
                {(userExistDefault || userNewVerifyCPF) && type != 'new' && (
                    <Grid item xs={12} sm={2}>
                        <FormControl fullWidth>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='medium'
                                startIcon={<Icon icon='uil:padlock' />}
                                onClick={() => setOpenModalNewPassword(true)}
                            >
                                Alterar senha
                            </Button>
                        </FormControl>
                    </Grid>
                )}
                {/* Modal trocar senha */}
                <DialogNewPasswordProfessional
                    openModal={openModalNewPassword}
                    handleClose={() => setOpenModalNewPassword(false)}
                    setOpenModalNewPassword={setOpenModalNewPassword}
                    usuarioID={data.fields?.usuarioID}
                />
            </>
        )
    )
}

export default Fields

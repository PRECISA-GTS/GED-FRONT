import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, DialogContentText } from '@mui/material'
import { useContext, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import { toast } from 'react-hot-toast'
import { AuthContext } from 'src/context/AuthContext'

const DialogNewPasswordProfessional = ({ handleClose, openModal, setOpenModalNewPassword, usuarioID }) => {
    const [lenghtPassword, setLenghtPassword] = useState(null)
    const { user, loggedUnity } = useContext(AuthContext)

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

    const form = useForm({})

    const onSubmit = async data => {
        console.log('passa aki', data)
        try {
            const response = await api.put(`cadastros/profissional/updatePassword/${usuarioID}`, {
                ...data,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            })
            toast.success('Senha atualizada com sucesso!')
            form.reset()
            setOpenModalNewPassword(false)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Dialog open={openModal} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Alterar senha</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>
                        Preencha os campos abaixo para definir sua nova senha
                    </DialogContentText>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <TextField
                            fullWidth
                            label='Nova senha'
                            id='input-password'
                            variant='outlined'
                            size='small'
                            type={values.showPassword ? 'text' : 'password'}
                            name='senha'
                            error={!!form.formState?.errors.senha}
                            helperText={form.formState?.errors.senha && form.formState?.errors.senha.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            edge='end'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            <Icon
                                                icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            {...form.register('senha', {
                                minLength: {
                                    value: 4,
                                    message: 'Senha deve ter pelo menos 4 caracteres'
                                }
                            })}
                        />

                        <TextField
                            fullWidth
                            label='Confirmar nova senha'
                            id='input-confirm-password'
                            variant='outlined'
                            size='small'
                            type={values.showConfirmPassword ? 'text' : 'password'}
                            name='confirmaSenha'
                            error={!!form.formState?.errors.confirmaSenha}
                            helperText={
                                form.formState?.errors.confirmaSenha && form.formState?.errors.confirmaSenha.message
                            }
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
                            {...form.register('confirmaSenha', {
                                validate: value => value === form.watch('senha') || 'As senhas não coincidem'
                            })}
                        />
                    </form>
                </DialogContent>

                <DialogActions className='dialog-actions-dense' sx={{ mx: 2, mb: 2 }}>
                    <Button variant='outlined' onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant='contained' onClick={form.handleSubmit(onSubmit)}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogNewPasswordProfessional

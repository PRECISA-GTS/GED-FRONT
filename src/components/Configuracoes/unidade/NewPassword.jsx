import { useState } from 'react'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import { Button, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

const NewPassword = ({ register, errors, setShowNewPassword, showNewPassword, watch }) => {
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

    return (
        <>
            <Grid item xs={6} md={4}>
                <FormControl fullWidth>
                    <Button
                        variant='outlined'
                        size='large'
                        startIcon={<Icon icon='uil:padlock' />}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                        Alterar senha
                    </Button>
                </FormControl>
            </Grid>
            {showNewPassword && (
                <>
                    <Grid item xs={6} sm={4}>
                        <TextField
                            fullWidth
                            label='Nova senha'
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
                                                icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
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
                    <Grid item xs={6} sm={4}>
                        <TextField
                            fullWidth
                            label='Confirmar nova senha'
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
        </>
    )
}

export default NewPassword

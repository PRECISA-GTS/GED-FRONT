import { Alert, DialogActions, DialogContent, DialogContentText, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Form/Input'
import Icon from 'src/@core/components/icon'

const DialogActs = ({
    title,
    description,
    setOpenModal,
    openModal,
    children,
    handleConclusion,
    handleCopyLink,
    handleLink,
    size,
    type,
    fullHeight = false
}) => {
    const form = useForm({ mode: 'onChange', defaultValues: { cnpj: '' } })

    const validateForm = values => {
        form.handleSubmit(onSubmit)(values)
    }

    const onSubmit = values => {
        form.reset()
        setOpenModal(false)
        handleConclusion(values)
    }

    return (
        <div className='relative'>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                fullWidth={size ? true : false}
                maxWidth={size ? size : null}
            >
                <form className={`${fullHeight && 'grid grid-rows-[60px_auto_auto] min-h-[calc(100vh-120px)]'}`}>
                    <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
                    {description && (
                        <DialogContent>
                            <Alert severity='info'>{description}</Alert>
                        </DialogContent>
                    )}

                    <DialogContent>
                        <DialogContentText
                            sx={{
                                py: 2
                            }}
                        >
                            {React.cloneElement(children, type == 'fornecedor' ? { form: form } : null)}
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions className='dialog-actions-dense m-2'>
                        <Button variant='outlined' color='primary' onClick={() => setOpenModal(false)}>
                            Fechar
                        </Button>

                        {handleConclusion && (
                            <Button type='button' variant='contained' color='primary' onClick={validateForm}>
                                Confirmar
                            </Button>
                        )}

                        {handleLink && (
                            <Button type='button' variant='contained' color='primary' onClick={handleLink}>
                                Acessar
                            </Button>
                        )}

                        {handleCopyLink && (
                            <Button
                                variant='contained'
                                color='primary'
                                startIcon={<Icon icon='uil:copy' fontSize={20} />}
                                onClick={handleCopyLink}
                            >
                                Copiar Link
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default DialogActs

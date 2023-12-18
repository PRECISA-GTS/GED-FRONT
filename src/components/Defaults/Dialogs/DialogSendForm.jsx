import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Icon from 'src/@core/components/icon'
import { Alert, FormControl, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { validationEmail } from '../../../configs/validations'

//* Custom components
import Select from 'src/components/Form/Select'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import CheckLabel from 'src/components/Form/CheckLabel'
import Remove from 'src/components/Form/Remove'

const DialogSendForm = ({
    title,
    text,
    handleClose,
    openModal,
    handleSubmit,

    cnpj,
    nomeFornecedor,
    gruposAnexo,
    email,
    setEmail,
    inputEmail,
    btnClose,
    btnConfirm,
    grupoAnexosFornecedor,
    btnConfirmColor,
    closeAfterSave,
    listErrors
}) => {
    return (
        <>
            <Dialog
                open={openModal}
                aria-labelledby='form-dialog-title'
                disableEscapeKeyDown
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose()
                    }
                }}
            >
                <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>{text}</DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    {btnClose && (
                        <Button variant='outlined' color='primary' onClick={handleClose}>
                            Fechar
                        </Button>
                    )}
                    {btnConfirm && (
                        <Button
                            variant='contained'
                            color={'primary'}
                            onClick={() => {
                                handleSubmit()
                                if (closeAfterSave) {
                                    handleClose()
                                }
                            }}
                        >
                            Confirmar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogSendForm

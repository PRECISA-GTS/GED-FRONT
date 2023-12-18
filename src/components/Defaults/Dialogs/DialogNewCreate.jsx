import { DialogActions, DialogContent, DialogContentText, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import React from 'react'

const DialogNewCreate = ({ title, description, setOpenModal, openModal, children, size }) => {
    return (
        <>
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                fullWidth={size ? true : false}
                maxWidth={size ? size : null}
            >
                <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{children}</DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogNewCreate

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const DialogDefault = ({ title, onClose, open, children, fullWidth, size, dividers, DialogActionsChildren }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth={fullWidth ? true : false} maxWidth={size}>
            <DialogTitle className='!px-8 !py-6'>{title}</DialogTitle>
            <IconButton
                aria-label='close'
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 14,
                    top: 14,
                    color: theme => theme.palette.grey[500]
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent className='min-w-[400px] !px-8 !py-6' dividers={dividers}>
                <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions className='!px-8 !py-6 !pb-8'>
                <div className='w-full flex justify-end'>{DialogActionsChildren}</div>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDefault

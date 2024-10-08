import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Typography } from '@mui/material'
import { api } from 'src/configs/api'
import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import toast from 'react-hot-toast'
import { AuthContext } from 'src/context/AuthContext'

const DialogDelete = ({ title, description, open, handleClose, params, setIdNc }) => {
    const { setId } = useContext(RouteContext)
    const { user, loggedUnity } = useContext(AuthContext)

    const handleConfirmDelete = async () => {
        try {
            const route = `${params.route}/${user.usuarioID}/${loggedUnity.unidadeID}`
            await api.delete(route)
            toast.success(params.messageSucceded)
            setIdNc ? setIdNc(null) : setId(null)
        } catch (err) {
            console.log(err)
            toast.error(params.MessageError)
        } finally {
            handleClose()
        }
    }

    return (
        <Dialog open={open}>
            <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
            <DialogContent>
                <Typography variant='body1'>{description}</Typography>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
                <Button variant='outlined' color='secondary' onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant='contained' color='error' onClick={handleConfirmDelete}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDelete

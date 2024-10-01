import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    TextField,
    DialogContentText,
    Alert
} from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'

const DialogSelectUnit = ({ handleClose, openModal, handleSubmit, unidades, setSelectedUnit }) => {
    return (
        <>
            <Dialog open={openModal} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth>
                <DialogTitle id='form-dialog-title' sx={{ pb: 2 }}>
                    Selecione a Unidade
                </DialogTitle>
                <DialogContent>
                    <Alert severity='info' sx={{ mb: 8 }}>
                        Selecione uma unidade para fazer o login no sistema
                    </Alert>
                    <FormControl fullWidth>
                        <Autocomplete
                            options={unidades}
                            getOptionLabel={unit => unit.nomeFantasia + ' [' + unit.papel + ']'}
                            onChange={(event, newValue) => {
                                setSelectedUnit(newValue)
                            }}
                            renderInput={params => <TextField {...params} label='Selecione uma unidade' />}
                        />
                    </FormControl>
                </DialogContent>

                <DialogActions className='dialog-actions-dense' sx={{ mx: 2, mb: 2 }}>
                    <Button variant='outlined' onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant='contained' onClick={handleSubmit}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogSelectUnit

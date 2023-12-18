import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { Typography } from '@mui/material'
import { api } from 'src/configs/api'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import Loading from 'src/components/Loading'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const DialogSignatureReport = ({ title, description, open, handleClose }) => {
    const [logged, setLogged] = useState(false)
    const [idReport, setIdReport] = useState(null)
    const reportJSON = localStorage.getItem('report')
    const report = JSON.parse(reportJSON)

    const handleClick = async () => {
        setLogged(!logged)
        if (logged) {
            setLogged(false)
            setIdReport(null)
            handleClose()
        } else {
            await createDocumentAutentique()
        }
    }

    const createDocumentAutentique = async () => {
        try {
            const response = await api.post(
                `/formularios/fornecedor/createDocumentAutentique/${report.id}/${report.usuarioID}/${report.unidadeID}`
            )
            setIdReport(response.data)
            localStorage.setItem('hashSignedDocument', JSON.stringify(response.data))
        } catch (err) {
            console.log(err)
        }
    }

    const saveSignedDocument = async () => {
        const reportJSON = localStorage.getItem('hashSignedDocument')
        const hashSignedDocument = JSON.parse(reportJSON)
        if (!hashSignedDocument) return
        try {
            const route = `/formularios/fornecedor/saveSignedDocument`
            const response = await api.post(route, {
                id: report.id,
                usuarioID: report.usuarioID,
                unidadeID: report.unidadeID,
                hashSignedDocument: hashSignedDocument
            })
            console.log('🚀 ~ response:', response)
            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseModal = () => {
        handleClose()
        setLogged(false)
        setIdReport(null)
        localStorage.removeItem('hashSignedDocument')
    }

    useEffect(() => {
        if (!open) {
            saveSignedDocument()
            handleCloseModal()
        }
    }, [handleClose])

    return (
        <Dialog open={open} maxWidth='xl' fullWidth scroll={!idReport ? 'body' : 'paper'}>
            <DialogTitle id='form-dialog-title'>
                {title}
                <IconButton
                    onClick={() => {
                        handleClose(), setLogged(false)
                    }}
                    className='!absolute !right-2 !top-2'
                >
                    <Icon icon='mdi:close' />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {logged ? (
                    <div className='h-[80vh]'>
                        {idReport ? (
                            <div className='h-[80vh]'>
                                <Typography variant='body1'>{description}</Typography>
                                <iframe
                                    src={`https://painel.autentique.com.br/documentos/${idReport}`}
                                    frameborder='0'
                                    width='100%'
                                    height='100%'
                                ></iframe>
                            </div>
                        ) : (
                            <Loading
                                title='Preparando documento para assinatura...'
                                show={true}
                                customTextProps='text-xl font-bold'
                                size={60}
                                thickness={4}
                            />
                        )}
                    </div>
                ) : (
                    <div className='h-[80vh]'>
                        <Typography variant='body1'>{description}</Typography>
                        <iframe
                            src='https://painel.autentique.com.br/entrar'
                            frameBorder='0'
                            width='100%'
                            height='100%'
                        ></iframe>
                    </div>
                )}
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
                {logged && (
                    <Button
                        variant='outlined'
                        color={'primary'}
                        onClick={() => {
                            setLogged(false)
                            setIdReport(null)
                        }}
                        className='flex gap-1'
                    >
                        <Icon icon='fe:login' />
                        Fazer login
                    </Button>
                )}
                <Button
                    variant={logged ? 'outlined' : 'contained'}
                    color={'primary'}
                    onClick={handleClick}
                    className='flex gap-1'
                >
                    <Icon icon={!logged ? 'fluent:signature-24-filled' : ''} />
                    {logged ? 'Fechar' : 'Confirmar e assinar'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSignatureReport

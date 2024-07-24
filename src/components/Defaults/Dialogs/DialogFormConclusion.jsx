import Router from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { AuthContext } from 'src/context/AuthContext'
import { Alert, Typography } from '@mui/material'
import { useState, useContext } from 'react'
import Result from 'src/components/Defaults/Formularios/Result'
import { BlobProvider, Document, Page } from '@react-pdf/renderer'
import { useGlobal } from 'src/hooks/useGlobal'
import Header from 'src/components/Reports/Header'
import ContentFornecedor from 'src/pages/relatorio/formularios/fornecedor/Content'
import Footer from 'src/components/Reports/Footer'

const DialogFormConclusion = ({
    title,
    text,
    handleClose,
    openModal,
    conclusionForm,
    info,
    canChange,
    btnCancel,
    btnConfirm,
    register,
    setValue,
    listErrors,
    canApprove,
    hasNaoConformidade,
    handleSend,
    type,
    unity
}) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [result, setResult] = useState({})
    const { data } = useGlobal()
    const router = Router
    const module = router.pathname.split('/')[2]

    const DocumentPdf = () => {
        return (
            <Document>
                <Page
                    size='A4'
                    style={{
                        paddingHorizontal: 25
                    }}
                >
                    <>
                        <Header data={data} />
                        {module === 'fornecedor' && <ContentFornecedor values={data} key={data} />}
                        <Footer />
                    </>
                </Page>
            </Document>
        )
    }

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
                    <DialogContentText sx={{ mb: 3 }}>
                        {/* Formulário Pendente */}
                        {info.status <= 40 && (
                            <>
                                {text}
                                {listErrors && listErrors.status && (
                                    <Alert variant='outlined' severity='error' sx={{ mt: 2 }}>
                                        Por favor, verifique os campos abaixo:
                                        <Typography variant='subtitle1' color='error' sx={{ mt: 2 }}>
                                            {listErrors.errors.map((error, index) => (
                                                <Typography variant='body2' color='error' key={index}>
                                                    - {error}
                                                </Typography>
                                            ))}
                                        </Typography>
                                    </Alert>
                                )}

                                {listErrors && user.papelID == 2 && !listErrors.status && (
                                    <Alert severity='info' sx={{ mt: 2 }}>
                                        {unity.quemPreenche == 2 && type == 'fornecedor'
                                            ? `Após concluir o formulário, o mesmo será enviado para análise e conclusão da empresa ${unity?.nomeFantasia}!`
                                            : 'Após concluir o formulário, o mesmo não poderá mais ser alterado!'}
                                    </Alert>
                                )}

                                {!canApprove && (
                                    <Alert severity='error' sx={{ mt: 2 }}>
                                        Este formulário não pode ser aprovado pois possui resposta que gera não
                                        conformidade
                                    </Alert>
                                )}

                                {user.papelID == 1 && (
                                    <Result
                                        title={user.papelID == 1 ? 'Resultado do Processo' : 'Observação'}
                                        name={'status'}
                                        value={result}
                                        register={register}
                                        setValue={setValue}
                                        setResult={setResult}
                                        papelID={user.papelID}
                                        hasNaoConformidade={hasNaoConformidade}
                                        options={[
                                            {
                                                value: 70,
                                                color: 'success',
                                                label: 'Aprovado',
                                                disabled: canApprove ? false : true
                                            },
                                            {
                                                value: 60,
                                                color: 'warning',
                                                label: 'Aprovado Parcial'
                                            },
                                            {
                                                value: 50,
                                                color: 'error',
                                                label: 'Reprovado'
                                            }
                                        ]}
                                    />
                                )}
                            </>
                        )}

                        {/* Formulário Concluído e com não conformidade */}
                        {info.status >= 40 && info.naoConformidade && (
                            <Typography variant='body1' sx={{ mt: 2 }}>
                                Concluir não conformidades do formulário? Após concluir, o mesmo não poderá mais ser
                                alterado!
                            </Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    {btnCancel && (
                        <Button variant='outlined' color='primary' onClick={handleClose}>
                            Fechar
                        </Button>
                    )}
                    {btnConfirm && canChange && (
                        <BlobProvider document={<DocumentPdf />}>
                            {({ blob, url, loading, error }) => (
                                <Button
                                    variant='contained'
                                    disabled={
                                        info.status < 40 &&
                                        ((listErrors && listErrors.status) || (user.papelID == 1 && !result.status))
                                    }
                                    color='primary'
                                    onClick={() => {
                                        conclusionForm(result, blob)
                                    }}
                                >
                                    Concluir
                                </Button>
                            )}
                        </BlobProvider>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogFormConclusion

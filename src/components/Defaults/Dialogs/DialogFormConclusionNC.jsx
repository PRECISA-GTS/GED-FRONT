import Router from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { AuthContext } from 'src/context/AuthContext'
import { Alert, Divider, Grid, Typography } from '@mui/material'
import { useState, useContext, useEffect } from 'react'
import Result from 'src/components/Defaults/Formularios/Result'
import { BlobProvider, Document, Page } from '@react-pdf/renderer'
import { useGlobal } from 'src/hooks/useGlobal'
import Header from 'src/components/Reports/Header'
import ContentFornecedor from 'src/pages/relatorio/formularios/fornecedor/Content'
import Footer from 'src/components/Reports/Footer'
import InfoSetores from '../Formularios/InfoSetores'
import DateField from 'src/components/Form/DateField'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import TableProductsConclusionNC from 'src/components/RecebimentoMp/NaoConformidade/Header/Produtos/TableProductsConclusionNC'
const DialogFormConclusionNC = ({
    title,
    text,
    handleClose,
    openModal,
    conclusionForm,
    status,
    canChange,
    btnCancel,
    btnConfirm,
    listErrors,
    canApprove,
    hasNaoConformidade,
    handleSend,
    type,
    unity,
    values,
    formularioID,
    modeloID,
    form,
    produtos,
    setores
}) => {
    if (!modeloID) return null

    console.log('🚀 ~ modeloID:', values)

    const { user, loggedUnity, hasSectorPermission } = useContext(AuthContext)
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
                fullWidth
                maxWidth='lg'
                open={openModal}
                aria-labelledby='form-dialog-title'
                disableEscapeKeyDown
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose()
                    }
                }}
            >
                <DialogTitle id='form-dialog-title'>
                    <Grid container spacing={6}>
                        <Grid item xs={12} md={6}>
                            {title}
                        </Grid>
                        {user.papelID === 1 && (
                            <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                                <InfoSetores data={setores ?? []} />
                            </Grid>
                        )}
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>
                        {!hasSectorPermission(values?.setores ?? []) && (
                            <Alert severity='warning' sx={{ mb: 4 }}>
                                <Typography variant='body2'>
                                    Seu setor não está habilitado para concluir este formulário!
                                </Typography>
                            </Alert>
                        )}
                        {/* Formulário Pendente */}
                        {status <= 40 && (
                            <>
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
                                    <Grid container spacing={4} sx={{ mt: 4 }}>
                                        {/* Resultado */}
                                        <Grid item xs={12}>
                                            <Result
                                                title={
                                                    user.papelID == 1
                                                        ? 'Avaliação final da não conformidade:'
                                                        : 'Observação'
                                                }
                                                name={'status'}
                                                value={result}
                                                register={form.register}
                                                setValue={form.setValue}
                                                setResult={setResult}
                                                papelID={user.papelID}
                                                hasNaoConformidade={hasNaoConformidade}
                                                options={[
                                                    {
                                                        value: 80,
                                                        color: 'success',
                                                        label: 'Aceite',
                                                        disabled: canApprove ? false : true
                                                    },
                                                    {
                                                        value: 90,
                                                        color: 'error',
                                                        label: 'Não Aceite'
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                )}

                                {/* Produtos do recebimento */}
                                {type == 'recebimentoMpNaoConformidade' && (
                                    <TableProductsConclusionNC data={produtos} form={form} />
                                )}
                            </>
                        )}

                        {/* Formulário Concluído e com não conformidade */}
                        {status >= 40 && (
                            <Typography variant='body1' sx={{ mt: 2 }}>
                                Concluir não conformidades do formulário? Após concluir, o mesmo não poderá mais ser
                                alterado!
                            </Typography>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='dialog-actions-dense'>
                    <div className='flex items-center gap-2 p-2'>
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
                                            !hasSectorPermission(values?.setores ?? []) ||
                                            (status < 40 &&
                                                ((listErrors && listErrors.status) ||
                                                    (user.papelID == 1 && !result.status)))
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
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogFormConclusionNC

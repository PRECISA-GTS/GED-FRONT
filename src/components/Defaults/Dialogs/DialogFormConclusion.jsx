import Router from 'next/router'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { AuthContext } from 'src/context/AuthContext'
import { Alert, Grid, Typography } from '@mui/material'
import { useState, useContext } from 'react'
import Result from 'src/components/Defaults/Formularios/Result'
import { useGlobal } from 'src/hooks/useGlobal'
import InfoDepartamentos from '../Formularios/InfoDepartamentos'
import DateField from 'src/components/Form/DateField'
import Input from 'src/components/Form/Input'

const DialogFormConclusion = ({
    form,
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
    control,
    handleSend,
    type,
    unity,
    values,
    errors,
    formularioID,
    modeloID
}) => {
    if (!modeloID) return null

    const { user, hasSectorPermission } = useContext(AuthContext)
    const [result, setResult] = useState({})
    const { data } = useGlobal()
    const router = Router
    const module = router.pathname.split('/')[2]

    // Hora atual: HH:mm
    const getTimeNow = () => {
        const date = new Date()
        const hour = date.getHours()
        const minute = date.getMinutes()
        return `${hour}:${minute}`
    }

    return (
        <>
            <Dialog
                fullWidth
                maxWidth='md'
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
                                <InfoDepartamentos data={values?.departamentos ?? []} />
                            </Grid>
                        )}
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3 }}>
                        {!hasSectorPermission(values?.departamentos ?? []) && (
                            <Alert severity='warning' sx={{ mb: 4 }}>
                                <Typography variant='body2'>
                                    Seu departamento não está habilitado para concluir este formulário!
                                </Typography>
                            </Alert>
                        )}
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
                                    <Alert severity='warning' sx={{ mt: 2 }}>
                                        Este formulário não pode ser aprovado pois possui resposta que gera não
                                        conformidade!
                                    </Alert>
                                )}
                                {user.papelID == 1 && (
                                    <Grid container spacing={4} sx={{ mt: 4 }}>
                                        <DateField
                                            xs={12}
                                            md={3}
                                            title='Data da conclusão'
                                            name={`fieldsFooter.dataConclusao`}
                                            type='date'
                                            value={values?.dataConclusao ?? new Date()}
                                            typeValidation='dataPassado'
                                            daysValidation={365}
                                            required
                                            form={form}
                                        />

                                        <Input
                                            xs={12}
                                            md={3}
                                            title='Hora da conclusão'
                                            name={`fieldsFooter.horaConclusao`}
                                            type='time'
                                            value={values?.horaConclusao ?? getTimeNow()}
                                            required
                                            form={form}
                                        />

                                        {/* <Select
                                            xs={12}
                                            md={6}
                                            title='Profissional que aprova'
                                            name={`fieldsFooter.profissional`}
                                            type='string'
                                            required
                                            options={profissionaisAprova ?? []}
                                            register={register}
                                            setValue={setValue}
                                            control={control}
                                            errors={errors?.fieldsFooter?.profissional}
                                        /> */}

                                        {/* Resultado */}
                                        <Grid item xs={12}>
                                            <Result
                                                title={user.papelID == 1 ? 'Resultado do Processo' : 'Observação'}
                                                name={'status'}
                                                value={result}
                                                form={form}
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
                                        </Grid>
                                    </Grid>
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
                    <div className='flex items-center gap-2 p-2'>
                        {btnCancel && (
                            <Button variant='outlined' color='primary' onClick={handleClose}>
                                Fechar
                            </Button>
                        )}
                        {btnConfirm && canChange && (
                            <Button
                                variant='contained'
                                disabled={
                                    !hasSectorPermission(values?.departamentos ?? []) ||
                                    (info.status < 40 &&
                                        ((listErrors && listErrors.status) || (user.papelID == 1 && !result.status)))
                                }
                                color='primary'
                                onClick={() => {
                                    conclusionForm(result)
                                }}
                            >
                                Concluir
                            </Button>
                        )}
                    </div>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogFormConclusion

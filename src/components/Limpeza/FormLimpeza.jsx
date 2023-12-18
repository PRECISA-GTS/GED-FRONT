// import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'

//* Default Form Components
import Fields from 'src/components/Defaults/Formularios/Fields'
import Block from 'src/components/Defaults/Formularios/Block'
import DialogFormStatus from '../Defaults/Dialogs/DialogFormStatus'

//* Custom components
import Input from 'src/components/Form/Input'

import { Alert, Card, CardContent, FormControl, Grid, Typography } from '@mui/material'
import Router from 'next/router'
import { backRoute, toastMessage, formType, statusDefault, dateConfig } from 'src/configs/defaultConfigs'
import { generateReport } from 'src/configs/defaultConfigs'
import { api } from 'src/configs/api'
import FormHeader from 'src/components/Defaults/FormHeader'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import { NotificationContext } from 'src/context/NotificationContext'
import Loading from 'src/components/Loading'
import toast from 'react-hot-toast'
import { SettingsContext } from 'src/@core/context/settingsContext'
import DialogFormConclusion from '../Defaults/Dialogs/DialogFormConclusion'

const FormLimpeza = ({ id }) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [isLoading, setLoading] = useState(false)
    const [savingForm, setSavingForm] = useState(false)
    const [validateForm, setValidateForm] = useState(false) //? Se true, valida campos obrigatórios
    const [hasFormPending, setHasFormPending] = useState(true) //? Tem pendencia no formulário (já vinculado em formulário de recebimento, não altera mais o status)
    const [status, setStatus] = useState(null)
    const { createNewNotification } = useContext(NotificationContext)
    const [openModalStatus, setOpenModalStatus] = useState(false)
    const [field, setField] = useState([])
    const [data, setData] = useState(null)
    const [blocos, setBlocos] = useState([])
    const [info, setInfo] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })
    const { settings } = useContext(SettingsContext)
    const { setId } = useContext(RouteContext)

    const [canEdit, setCanEdit] = useState({
        status: false,
        message: 'Você não tem permissões',
        messageType: 'info'
    })

    //! Se perder Id, copia do localstorage
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname

    const {
        reset,
        register,
        getValues,
        setValue,
        control,
        watch,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors }
    } = useForm()

    //* Reabre o formulário pro fornecedor alterar novamente se ainda nao estiver vinculado com recebimento
    const changeFormStatus = async status => {
        const data = {
            status: status,
            auth: {
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            }
        }

        try {
            setSavingForm(true)
            await api.post(`${staticUrl}/changeFormStatus/${id}`, data).then(response => {
                toast.success(toastMessage.successUpdate)
                setSavingForm(false)

                //? Trata notificações
                manageNotifications(status, null, null)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Nomes e rotas dos relatórios passados para o componente FormHeader/MenuReports
    const actionsData = [
        {
            id: 1,
            name: 'Dados do Recebimento de MP',
            component: (
                <ReportRecebimentoMP
                    params={{
                        id: id,
                        unidadeID: 1 //loggedUnity.unidadeID
                    }}
                />
            ),
            route: '/relatorio/recebimentoMp/dadosRecebimentoMp',
            papelID: user.papelID,
            identification: '01',
            params: {
                fornecedorID: id
            }
        },
        {
            id: 2,
            name: 'Declaração de prolificiência',
            component: (
                <ReportRecebimentoMP
                    params={{
                        id: id,
                        unidadeID: 1 //loggedUnity.unidadeID
                    }}
                />
            ),
            route: '/relatorio/recebimentoMp/dadosRecebimentoMp',
            papelID: user.papelID,
            identification: '02',
            params: {
                fornecedorID: id
            }
        }
    ]

    const verifyFormPending = async () => {
        try {
            const parFormularioID = 4
            await api.post(`${staticUrl}/verifyFormPending/${id}`, { parFormularioID }).then(response => {
                setHasFormPending(response.data) //! true/false
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getNewData = () => {
        try {
            setLoading(true)
            api.post(`${backRoute(staticUrl)}/new/getData`, { unidadeID: loggedUnity.unidadeID }).then(response => {
                console.log('getNewData: ', response.data)

                setField(response.data.fields)
                setBlocos(response.data.blocos)
                setInfo(response.data.info)

                //* Insere os dados no formulário
                reset(response.data)

                setCanEdit({
                    status: true,
                    message:
                        'Esse formulário já foi concluído! Para alterá-lo é necessário atualizar seu Status para "Em preenchimento" através do botão "Status"!',
                    messageType: 'info'
                })

                setLoading(false)
            })
        } catch (error) {
            console.log('🚀 ~ error:', error)
        }
    }

    const getData = () => {
        setLoading(true)
        if (id) {
            api.post(`${staticUrl}/getData/${id}`, { type: type, unidadeID: loggedUnity.unidadeID }).then(response => {
                console.log('getData: ', response.data)

                setField(response.data.fields)
                setBlocos(response.data.blocos)
                setInfo(response.data.info)

                //* Insere os dados no formulário
                reset(response.data)

                let objStatus = statusDefault[response?.data?.info?.status]
                setStatus(objStatus)

                setCanEdit({
                    status: response?.data?.info?.status < 40 ? true : false,
                    message:
                        'Esse formulário já foi concluído! Para alterá-lo é necessário atualizar seu Status para "Em preenchimento" através do botão "Status"!',
                    messageType: 'info'
                })

                verifyFormPending()
                setLoading(false)
            })
        }
    }

    const checkErrors = () => {
        clearErrors()
        let hasErrors = false
        let arrErrors = []

        //? Header
        field?.forEach((field, index) => {
            const fieldName = field.tabela ? `fields[${index}].${field.tabela}` : `fields[${index}].${field.nomeColuna}`
            const fieldValue = getValues(fieldName)
            if (field.obrigatorio === 1 && !fieldValue) {
                setError(fieldName, {
                    type: 'manual',
                    message: 'Campo obrigatório'
                })
                arrErrors.push(field?.nomeCampo)
                hasErrors = true
            }
        })

        //? Blocos
        blocos.forEach((block, indexBlock) => {
            block.itens.forEach((item, indexItem) => {
                const fieldValue = getValues(`blocos[${indexBlock}].itens[${indexItem}].resposta`)
                if (item?.obrigatorio === 1 && !fieldValue) {
                    setError(`blocos[${indexBlock}].itens[${indexItem}].resposta`, {
                        type: 'manual',
                        message: 'Campo obrigatário'
                    })
                    arrErrors.push(item?.nome)
                    hasErrors = true
                }
            })
        })

        setListErrors({
            status: hasErrors,
            errors: arrErrors
        })
    }

    const handleSendForm = () => {
        checkErrors()
        setOpenModal(true)
        setValidateForm(true)
    }

    const conclusionForm = async values => {
        values['conclusion'] = true

        await handleSubmit(onSubmit)(values)
    }

    //? Trata notificações
    const manageNotifications = (status, nãoConformidade, idNãoConformidade) => {
        const statusName =
            status == 30
                ? 'Em preenchimento'
                : status == 40
                ? 'Concluído'
                : status == 50
                ? 'Reprovado'
                : status == 60
                ? 'Aprovado parcialmente'
                : status == 70
                ? 'Aprovado'
                : 'Pendente'

        //? Fornecedor concluiu o formulário
        const data = {
            titulo: `Formulário de Limpeza ${statusName}`,
            descricao: `O formulário de Limpeza #${id} está ${statusName}.`,
            url: '/formularios/limpeza/',
            urlID: id,
            tipoNotificacaoID: 6, //? limpeza
            usuarioGeradorID: user.usuarioID,
            usuarioID: 0, //? Todos da unidade
            unidadeID: loggedUnity.unidadeID, //? UnidadeID da fábrica (que verá a notificação)
            papelID: 1 //? Notificação pra fábrica
        }

        if (data) {
            createNewNotification(data) //* Cria nova notificação
            if (nãoConformidade) {
                //? Gera não conformidade
                const dataNãoConformidade = {
                    titulo: `Limpeza gerada`,
                    descricao: `O formulário de Limpeza #${id} está ${statusName} e gerou uma não conformidade.`,
                    url: '/formularios/limpeza/nao-conformidade/',
                    urlID: idNãoConformidade,
                    tipoNotificacaoID: 5, //? Não conformidade
                    usuarioGeradorID: user.usuarioID,
                    usuarioID: 0, //? Todos da unidade
                    unidadeID: loggedUnity.unidadeID, //? UnidadeID da fábrica (que verá a notificação)
                    papelID: 1 //? Notificação pra fábrica
                }
                createNewNotification(dataNãoConformidade)
            }
        }
    }

    const onSubmit = async (values, param = false) => {
        if (param.conclusion === true && param.status > 10) {
            values['status'] = param.status
            values['obsConclusao'] = param.obsConclusao
        }

        const data = {
            form: values,
            auth: {
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            }
        }

        try {
            if (type == 'edit') {
                setSavingForm(true)
                await api.post(`${staticUrl}/updateData/${id}`, data).then(response => {
                    toast.success(toastMessage.successUpdate)
                    setSavingForm(false)
                    let idNãoConformidade = null

                    //? Se gerou uma não conformidade, redireciona pra não conformidade gerada
                    if (response.data && response.data.naoConformidade && response.data.id > 0) {
                        router.push('/formularios/limpeza/nao-conformidade/')
                        setId(response.data.id)
                        idNãoConformidade = response.data.id
                    }

                    //? Trata notificações
                    manageNotifications(values.status, values.naoConformidade, idNãoConformidade)
                })
            } else if (type == 'new') {
                await api.post(`${backRoute(staticUrl)}/insertData`, data).then(response => {
                    router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                    setId(response.data)
                    toast.success(toastMessage.successNew)
                })
            } else {
                toast.error(toastMessage.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        type == 'new' ? getNewData() : getData()
    }, [id, savingForm])

    useEffect(() => {
        checkErrors()
    }, [])

    return (
        <>
            <Loading show={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Mensagem */}
                {!canEdit.status && (
                    <Alert severity={canEdit.messageType} sx={{ mb: 2 }}>
                        {canEdit.message}
                    </Alert>
                )}

                {/* Card Header */}
                <Card>
                    <FormHeader
                        btnCancel
                        btnSave={info?.status < 40 || type == 'new'}
                        btnSend={type == 'edit' && info?.status < 50 ? true : false}
                        btnPrint={type == 'edit' ? true : false}
                        generateReport={generateReport}
                        actionsData={actionsData}
                        actions
                        handleSubmit={() => handleSubmit(onSubmit)}
                        handleSend={handleSendForm}
                        iconConclusion={'mdi:check-bold'}
                        titleConclusion={'Aprovar Limpeza'}
                        title='Limpeza'
                        btnStatus={type == 'edit' ? true : false}
                        handleBtnStatus={() => setOpenModalStatus(true)}
                        type={type}
                        status={status}
                    />

                    {/* Header */}
                    <CardContent>
                        <Fields
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                            fields={field}
                            values={field}
                            disabled={!canEdit.status}
                        />
                    </CardContent>
                </Card>

                {/* Blocos */}
                {blocos &&
                    blocos.map((bloco, index) => (
                        <Block
                            key={index}
                            index={index}
                            blockKey={`parLimpezaModeloBlocoID`}
                            values={bloco}
                            control={control}
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            disabled={!canEdit.status}
                        />
                    ))}

                {/* Observação do formulário */}
                {info && (
                    <>
                        <Card sx={{ mt: 4 }}>
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={12}>
                                        <FormControl fullWidth>
                                            <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
                                                Observações (campo de uso exclusivo da validadora)
                                            </Typography>
                                            <Input
                                                title='Observação (opcional)'
                                                name='info.obs'
                                                multiline
                                                rows={4}
                                                value={info.obs}
                                                disabled={!canEdit.status}
                                                control={control}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* Dialog pra alterar status do formulário (se formulário estiver concluído e fábrica queira reabrir pro preenchimento do fornecedor) */}
                {openModalStatus && (
                    <DialogFormStatus
                        id={id}
                        parFormularioID={2} // Recebimento MP
                        formStatus={info.status}
                        hasFormPending={hasFormPending}
                        canChangeStatus={info.status > 30 && !hasFormPending}
                        openModal={openModalStatus}
                        handleClose={() => setOpenModalStatus(false)}
                        title='Histórico do Formulário'
                        text={`Listagem do histórico das movimentações do formulário ${id} de Limpeza e Higienização.`}
                        btnCancel
                        btnConfirm
                        handleSubmit={changeFormStatus}
                    />
                )}

                {/* Dialog de confirmação de envio */}
                <DialogFormConclusion
                    openModal={openModal}
                    handleClose={() => {
                        setOpenModal(false), setValidateForm(false)
                    }}
                    title='Concluir Formulário'
                    text={`Deseja realmente concluir este formulário?`}
                    info={info}
                    canChange={!hasFormPending}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    btnCancel
                    btnConfirm
                    btnConfirmColor='primary'
                    conclusionForm={conclusionForm}
                    listErrors={listErrors}
                />
            </form>
        </>
    )
}

export default FormLimpeza

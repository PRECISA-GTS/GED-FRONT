import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'

//* Default Form Components
import Block from 'src/components/Defaults/Formularios/Block'
import DialogFormStatus from '../Defaults/Dialogs/DialogFormStatus'

//* Custom components
import Input from 'src/components/Form/Input'
import CustomChip from 'src/@core/components/mui/chip'
import { Alert, Box, Card, CardContent, FormControl, Grid, Typography } from '@mui/material'
import Router from 'next/router'
import { backRoute, toastMessage, statusDefault } from 'src/configs/defaultConfigs'
import { api } from 'src/configs/api'
import FormHeader from 'src/components/Defaults/FormHeader'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import { NotificationContext } from 'src/context/NotificationContext'
import Loading from 'src/components/Loading'
import toast from 'react-hot-toast'
import { SettingsContext } from 'src/@core/context/settingsContext'
import DialogFormConclusion from '../Defaults/Dialogs/DialogFormConclusion'
import HeaderFields from './Header'
import FooterFields from './Footer'
import useLoad from 'src/hooks/useLoad'
import DialogDelete from '../Defaults/Dialogs/DialogDelete'
// import DadosRecebimentoMp from 'src/components/Reports/Formularios/RecebimentoMp/DadosRecebimentoMp'
import { useFormContext } from 'src/context/FormContext'

const FormLimpeza = ({ id }) => {
    const { menu, user, loggedUnity } = useContext(AuthContext)
    const [isLoading, setLoading] = useState(false)
    const [change, setChange] = useState(false)
    const [savingForm, setSavingForm] = useState(false)
    const [hasFormPending, setHasFormPending] = useState(false) //? Tem pendencia no formulário (já vinculado em formulário de recebimento, não altera mais o status)
    const [unidade, setUnidade] = useState(null)
    const [grupoAnexo, setGrupoAnexo] = useState([])
    const [status, setStatus] = useState(null)
    const [openModalStatus, setOpenModalStatus] = useState(false)
    const [fieldsHeader, setFieldsHeader] = useState([])
    const [fieldsFooter, setFieldsFooter] = useState([])
    const [field, setField] = useState([])
    const [link, setLink] = useState(null)
    const [blocos, setBlocos] = useState([])
    const [movimentacao, setMovimentacao] = useState(null)
    const [info, setInfo] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [openModalNewFornecedor, setOpenModalNewFornecedor] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })
    const [blobSaveReport, setBlobSaveReport] = useState(null) // Salva o blob do relatório que sera salvo no back
    const { settings } = useContext(SettingsContext)
    const { setId } = useContext(RouteContext)
    const { startLoading, stopLoading } = useLoad()
    const [openModalDeleted, setOpenModalDeleted] = useState(false)
    const { setReportParameters, sendPdfToServer } = useFormContext()

    const [canEdit, setCanEdit] = useState({
        status: false,
        message: 'Você não tem permissões',
        messageType: 'info'
    })

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

    const canConfigForm = () => {
        let canConfig = false
        menu.map(divisor => {
            divisor.menu.map(menu_ => {
                if (menu_.submenu && menu_.submenu.length > 0) {
                    menu_.submenu.map(submenu => {
                        if (submenu.rota == '/configuracoes/formularios') canConfig = true
                    })
                }
            })
        })
        return canConfig
    }

    const goToFormConfig = () => {
        setId(unidade.modelo.id) //? ID do modelo do formulário
        router.push(`/configuracoes/formularios/limpeza/`)
    }

    // Nomes e rotas dos relatórios passados para o componente FormHeader/MenuReports
    // const objRelatorio = {
    //     id: id,
    //     name: 'Formulário da Limpeza',
    //     nameComponent: 'DadosRecebimentoMp',
    //     type: 'report',
    //     unidadeID: loggedUnity.unidadeID,
    //     papelID: user.papelID,
    //     route: 'recebimentoMp/dadosRecebimentoMp',
    //     icon: 'fluent:print-24-regular'
    // }
    const objFormConfig = {
        id: 5,
        name: 'Configurações do formulário',
        description: 'Alterar as configurações do modelo de formulário.',
        // component: <NewFornecedor />,
        route: null,
        type: null,
        action: goToFormConfig,
        modal: false,
        icon: 'bi:gear',
        identification: null
    }
    // Monta array de ações baseado nas permissões
    const actionsData = []
    // actionsData.push(objRelatorio)
    if (canConfigForm()) actionsData.push(objFormConfig)

    const verifyFormPending = async () => {
        try {
            const parFormularioID = 2 //? Recebimento MP
            // await api.post(`${staticUrl}/verifyFormPending/${id}`, { parFormularioID }).then(response => {
            //     setHasFormPending(response.data) //! true/false
            // })
        } catch (error) {
            console.log(error)
        }
    }

    const getData = () => {
        setLoading(true)
        try {
            api.post(`${staticUrl}/getData/${id}`, {
                type: type,
                profissionalID: user.profissionalID,
                unidadeID: loggedUnity.unidadeID
            })
                .then(response => {
                    setLoading(false)

                    console.log('getData: ', response.data)

                    setFieldsHeader(response.data.fieldsHeader)
                    setFieldsFooter(response.data.fieldsFooter)
                    setField(response.data.fields)
                    setBlocos(response.data.blocos)
                    // setGrupoAnexo(response.data.grupoAnexo)
                    setInfo(response.data.info)
                    setUnidade(response.data.unidade)
                    // setLink(response.data.link)
                    setMovimentacao(response.data.ultimaMovimentacao)
                    // verifyIfCanAproveForm(response.data.blocos) //? Verifica se há alguma resposta que bloqueie o formulário, se sim, o mesmo não pode ser aprovado
                    // setNaoConformidade(response.data.naoConformidade) //! Seta não conformidades

                    //* Insere os dados no formulário
                    reset(response.data)

                    let objStatus = statusDefault[response?.data?.info?.status]
                    setStatus(objStatus)

                    setCanEdit({
                        status: user.papelID == 1 && response.data.info.status < 40 ? true : false,
                        message:
                            response.data.info.status > 40
                                ? 'Esse formulário já foi concluído, não é mais possível alterar as informações!'
                                : response.data.info.status < 40
                                ? 'Formulário aberto para preenchimento!'
                                : response.data.info.status == 40
                                ? 'Este formulário está aguardando aprovação!'
                                : null,
                        messageType: 'info'
                    })

                    verifyFormPending()
                })
                .catch(error => {
                    console.log('🚀 ~ error:', error)
                    setLoading(false)
                })
        } catch (error) {
            console.log('🚀 ~ error:', error)
            setLoading(false)
        }
    }

    const checkErrors = validateForm => {
        console.log('checkErrors => validateForm: ', validateForm, errors)

        clearErrors()
        let hasErrors = false
        let arrErrors = []

        if (validateForm) {
            //? Header
            field?.forEach((field, index) => {
                const fieldName = field.tabela
                    ? `fields[${index}].${field.tabela}`
                    : `fields[${index}].${field.nomeColuna}`
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
                    //? Valida resposta do item
                    if (item?.obrigatorio === 1 && !fieldValue) {
                        setError(`blocos[${indexBlock}].itens[${indexItem}].resposta`, {
                            type: 'manual',
                            message: 'Campo obrigatário'
                        })
                        arrErrors.push(item?.nome)
                        hasErrors = true
                    }

                    //? Valida anexos do item
                    if (
                        item.respostaConfig &&
                        item.respostaConfig.anexo == 1 &&
                        item.respostaConfig.anexosSolicitados.length > 0
                    ) {
                        item.respostaConfig.anexosSolicitados.forEach((anexo, indexAnexo) => {
                            if (anexo.obrigatorio == 1 && anexo.anexos && anexo.anexos.length == 0) {
                                setError(
                                    `blocos[${indexBlock}].itens[${indexItem}].respostaConfig.anexosSolicitados[${indexAnexo}].anexos`,
                                    {
                                        type: 'manual',
                                        message: 'Campo obrigatário'
                                    }
                                )
                                arrErrors.push(`Anexo: ${item?.nome} / ${anexo?.nome}`)
                                hasErrors = true
                            }
                        })
                    }
                })
            })

            //? Grupos de anexo
            // if (grupoAnexo && grupoAnexo.length > 0) {
            //     grupoAnexo.forEach((grupo, indexGrupo) => {
            //         grupo.itens.forEach((item, indexItem) => {
            //             if (item.obrigatorio === 1 && item.anexos.length == 0) {
            //                 setError(`grupoAnexo[${indexGrupo}].itens[${indexItem}].anexos`, {
            //                     type: 'manual',
            //                     message: 'Campo obrigatário'
            //                 })
            //                 arrErrors.push(`Anexo: ${grupo?.nome} / ${item?.nome}`)
            //                 hasErrors = true
            //             }
            //         })
            //     })
            // }
        }

        setListErrors({
            status: hasErrors,
            errors: arrErrors
        })
    }

    const handleSendForm = blob => {
        setBlobSaveReport(blob)
        checkErrors(true)
        setOpenModal(true)
    }

    const conclusionForm = async values => {
        console.log('🚀 ~ conclusionForm:', values)
        // sendPdfToServer(id, blobSaveReport, 'limpeza')
        values['conclusion'] = true
        await handleSubmit(onSubmit)(values)
    }

    //? Trata notificações
    // const manageNotifications = (status, nãoConformidade, idNãoConformidade) => {
    //     const statusName =
    //         status == 30
    //             ? 'Em preenchimento'
    //             : status == 40
    //             ? 'Concluído'
    //             : status == 50
    //             ? 'Reprovado'
    //             : status == 60
    //             ? 'Aprovado parcialmente'
    //             : status == 70
    //             ? 'Aprovado'
    //             : 'Pendente'

    //     //? Limpeza concluiu o formulário
    //     const data = {
    //         titulo: `Formulário de Limpeza ${statusName}`,
    //         descricao: `O formulário de Limpeza #${id} está ${statusName}.`,
    //         url: '/formularios/fornecedor/',
    //         urlID: id,
    //         tipoNotificacaoID: 6, //? fornecedor
    //         usuarioGeradorID: user.usuarioID,
    //         usuarioID: 0, //? Todos da unidade
    //         unidadeID: loggedUnity.unidadeID, //? UnidadeID da fábrica (que verá a notificação)
    //         papelID: 1 //? Notificação pra fábrica
    //     }

    //     if (data) {
    //         createNewNotification(data) //* Cria nova notificação
    //         if (nãoConformidade) {
    //             //? Gera não conformidade
    //             const dataNãoConformidade = {
    //                 titulo: `Fornecedor gerado`,
    //                 descricao: `O formulário de Fornecedor #${id} está ${statusName} e gerou uma não conformidade.`,
    //                 url: '/formularios/fornecedor/nao-conformidade/',
    //                 urlID: idNãoConformidade,
    //                 tipoNotificacaoID: 5, //? Não conformidade
    //                 usuarioGeradorID: user.usuarioID,
    //                 usuarioID: 0, //? Todos da unidade
    //                 unidadeID: loggedUnity.unidadeID, //? UnidadeID da fábrica (que verá a notificação)
    //                 papelID: 1 //? Notificação pra fábrica
    //             }
    //             createNewNotification(dataNãoConformidade)
    //         }
    //     }
    // }

    const onSubmit = async (values, param = false) => {
        if (param.conclusion === true) {
            values['concluiForm'] = true
            values['info']['status'] = param.status ?? info.status
            values['obsConclusao'] = param.obsConclusao
        }

        const data = {
            form: values,
            auth: {
                usuarioID: user.usuarioID,
                profissionalID: user.profissionalID ?? 0,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            }
        }
        console.log('🚀 ~ data:', data)
        startLoading()
        try {
            if (type == 'edit') {
                setSavingForm(true)
                await api.post(`${staticUrl}/updateData/${id}`, data).then(response => {
                    toast.success(toastMessage.successUpdate)
                    console.log('🚀 ~ response edit email:', response)
                    setSavingForm(false)
                    let idNãoConformidade = null
                    //? Trata notificações
                    // manageNotifications(values.status, values.naoConformidade, idNãoConformidade)
                })
            } else if (type == 'new') {
                await api.post(`${backRoute(staticUrl)}/insertData`, data).then(response => {
                    router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                    console.log('🚀 ~ response new email:', response)

                    setId(response.data)
                    toast.success(toastMessage.successNew)
                })
            } else {
                toast.error(toastMessage.error)
            }
        } catch (error) {
            console.log('errro da função update/email', error)
        } finally {
            stopLoading()
        }
    }

    // const handleFileSelectGroup = async (event, item) => {
    //     setLoadingFileGroup(true)
    //     const selectedFile = event.target.files

    //     if (selectedFile && selectedFile.length > 0) {
    //         const formData = new FormData()
    //         for (let i = 0; i < selectedFile.length; i++) {
    //             formData.append('files[]', selectedFile[i])
    //         }
    //         formData.append(`usuarioID`, user.usuarioID)
    //         formData.append(`unidadeID`, loggedUnity.unidadeID)
    //         formData.append(`grupoAnexoItemID`, item.grupoAnexoItemID ?? null)

    //         await api
    //             .post(`${staticUrl}/saveAnexo/${id}/grupo-anexo/${user.usuarioID}/${unidade.unidadeID}`, formData)
    //             .then(response => {
    //                 setLoadingFileGroup(false)

    //                 //* Submete formulário pra atualizar configurações dos grupos
    //                 const values = getValues()
    //                 onSubmit(values)
    //             })
    //             .catch(error => {
    //                 setLoadingFileGroup(false)
    //                 toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!')
    //             })
    //     }
    // }

    const handleFileSelectItem = async (event, item) => {
        setLoadingFileItem(true)
        const selectedFile = event.target.files

        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }
            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(`parLimpezaModeloBlocoID`, item.parLimpezaModeloBlocoID ?? null)
            formData.append(`itemOpcaoAnexoID`, item.itemOpcaoAnexoID ?? null)

            await api
                .post(`${staticUrl}/saveAnexo/${id}/item/${user.usuarioID}/${unidade.unidadeID}`, formData)
                .then(response => {
                    setLoadingFileItem(false)

                    //* Submete formulário pra atualizar configurações dos itens
                    const values = getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    setLoadingFileItem(false)
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!!!!')
                })
        }
    }

    //? Função que atualiza os anexos solicitados no item, quando altera a resposta
    const setItemResposta = async value => {
        // envia pro backend verificar as configurações dessa resposta (se possui anexos, se bloqueia formulário e se possui obs)
        try {
            const response = await api.post('/cadastros/item/getItemConfigs', {
                itemID: value.itemID,
                alternativaItemID: value.alternativa.id ?? null
            })

            // Limpar o array de anexos solicitados do item selecionado do bloco
            const updatedBlocos = blocos.map(bloco => {
                return {
                    ...bloco,
                    itens: bloco.itens.map(row => {
                        if (row.itemID == value.itemID) {
                            return {
                                ...row,
                                respostaConfig: {
                                    ...response.data
                                }
                            }
                        }
                        return row
                    })
                }
            })

            setBlocos(updatedBlocos)
        } catch (error) {
            console.log('error', error)
        }
    }

    // Remove um anexo do array de anexos
    const handleRemoveAnexoItem = async item => {
        if (item) {
            await api
                .delete(`${staticUrl}/deleteAnexo/${id}/${item.anexoID}/${unidade.unidadeID}/${user.usuarioID}/item`)
                .then(response => {
                    //* Submete formulário pra atualizar configurações dos itens
                    const values = getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao remover anexo, tente novamente!')
                })
        }
    }

    const changeAllOptions = colIndex => {
        const tempBlocos = [...blocos]

        //? Formulário
        tempBlocos.map((bloco, index) => {
            // bloco
            bloco.itens.map((item, indexItem) => {
                // item
                setValue(`blocos[${index}].itens[${indexItem}].resposta`, item.alternativas[colIndex])
            })
        })

        //? Estado
        setBlocos(prev =>
            prev.map(bloco => ({
                ...bloco,
                itens: bloco.itens.map(item => ({
                    ...item,
                    resposta:
                        item.alternativas[colIndex] && item.alternativas[colIndex].id > 0
                            ? item.alternativas[colIndex]
                            : null
                }))
            }))
        )
        setChange(!change)

        //* Submete formulário pra atualizar configurações dos produtos
        const values = getValues()
        onSubmit(values)
    }

    useEffect(() => {
        type == 'edit' ? getData() : null
    }, [id, savingForm])

    useEffect(() => {
        checkErrors(false)
    }, [])

    //? Seta informações do relatório no localstorage através do contexto (pra gravar arquivo .pdf na conclusão do formulário)
    // useEffect(() => {
    //     setReportParameters({
    //         id: id,
    //         nameComponent: 'DadosRecebimentoMp',
    //         route: 'recebimentoMp/dadosRecebimentoMp',
    //         unidadeID: loggedUnity.unidadeID,
    //         papelID: user.papelID,
    //         usuarioID: user.usuarioID
    //     })
    // }, [])

    return (
        <>
            <Loading show={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader
                    btnCancel
                    btnSave={!info.concluido}
                    btnSend={info.status >= 30 && !info.concluido}
                    btnPrint={type == 'edit' ? true : false}
                    btnDelete={info.status < 40 ? true : false}
                    onclickDelete={() => setOpenModalDeleted(true)}
                    actionsData={actionsData}
                    actions
                    handleSubmit={() => handleSubmit(onSubmit)}
                    handleSend={handleSendForm}
                    iconConclusion={'mdi:check-bold'}
                    titleConclusion={'Concluir Formulário'}
                    title='Limpeza'
                    // componentSaveReport={<DadosRecebimentoMp />}
                    componentSaveReport={null}
                    btnStatus={type == 'edit' ? true : false}
                    handleBtnStatus={() => setOpenModalStatus(true)}
                    type={type}
                    status={status}
                />

                {/* Div superior com tags e status */}
                <div className='flex gap-2 mb-2'>
                    {status && (
                        <CustomChip
                            size='small'
                            skin='light'
                            color={status.color}
                            label={status.title}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                    )}
                    {unidade && unidade.modelo && (
                        <CustomChip
                            size='small'
                            skin='light'
                            label={unidade.modelo.nome}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                    )}
                </div>

                <Box display='flex' flexDirection='column' sx={{ gap: 6 }}>
                    {/* Cabeçalho do modelo */}
                    {info && info.cabecalhoModelo != '' && (
                        <Card>
                            <CardContent>
                                <Typography variant='subtitle1'>{info.cabecalhoModelo}</Typography>
                            </CardContent>
                        </Card>
                    )}

                    {unidade && (
                        <HeaderFields
                            recebimentoMpID={id}
                            modelo={unidade.modelo}
                            values={fieldsHeader}
                            fields={field}
                            getValues={getValues}
                            disabled={!canEdit.status}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                        />
                    )}

                    {/* Blocos */}
                    {blocos &&
                        blocos.map((bloco, index) => (
                            <Block
                                key={change}
                                index={index}
                                blockKey={`parLimpezaModeloBlocoID`}
                                handleFileSelect={handleFileSelectItem}
                                setItemResposta={setItemResposta}
                                handleRemoveAnexoItem={handleRemoveAnexoItem}
                                setBlocos={setBlocos}
                                changeAllOptions={changeAllOptions}
                                values={bloco}
                                control={control}
                                getValues={getValues}
                                register={register}
                                setValue={setValue}
                                errors={errors?.blocos}
                                disabled={!canEdit.status}
                            />
                        ))}

                    {/* Grupo de anexos */}
                    {/* {grupoAnexo &&
                        grupoAnexo.map((grupo, indexGrupo) => (
                            <AnexoModeView
                                key={indexGrupo}
                                values={{
                                    grupo: grupo,
                                    loadingFile: loadingFileGroup,
                                    indexGrupo: indexGrupo,
                                    handleFileSelect: handleFileSelectGroup,
                                    handleRemove: handleRemoveAnexoGroup,
                                    folder: 'grupo-anexo',
                                    disabled: !canEdit.status,
                                    error: errors
                                }}
                            />
                        ))} */}

                    {/* Observação do formulário */}
                    {info && (
                        <>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} md={12}>
                                            <FormControl fullWidth>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
                                                    Observações
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

                    {/* Rodapé inserir assinatura, data e hora */}
                    {unidade && fieldsFooter && !fieldsFooter.concluded && (
                        <FooterFields
                            modeloID={unidade.modelo.id}
                            values={fieldsFooter}
                            register={register}
                            disabled={false}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                        />
                    )}

                    {/* Rodapé com informações de conclusão */}
                    {fieldsFooter && fieldsFooter.concluded && fieldsFooter.conclusion?.profissional && (
                        <Typography variant='caption'>
                            {`Concluído por ${fieldsFooter.conclusion.profissional.nome} em ${fieldsFooter.conclusion.dataFim} ${fieldsFooter.conclusion.horaFim}.`}
                        </Typography>
                    )}

                    {/* Mensagem */}
                    {canEdit.message && <Alert severity='warning'>{canEdit.message}</Alert>}

                    {/* Última movimentação do formulário */}
                    {movimentacao && (
                        <Alert severity='info'>
                            {`Última movimentação: Profissional ${movimentacao.nome} do(a) ${movimentacao.nomeFantasia} movimentou o formulário de ${movimentacao.statusAnterior} para ${movimentacao.statusAtual} em ${movimentacao.dataHora}.`}
                            {movimentacao.observacao && (
                                <p>
                                    <br />
                                    Mensagem: "{movimentacao.observacao}"
                                </p>
                            )}
                        </Alert>
                    )}

                    {/* Dialog pra alterar status do formulário (se formulário estiver concluído e fábrica queira reabrir pro preenchimento do fornecedor) */}
                    {openModalStatus && (
                        <DialogFormStatus
                            title='Histórico do Formulário'
                            text={`Listagem do histórico das movimentações do formulário ${id} de Limpeza.`}
                            id={id}
                            parFormularioID={4} // Limpeza
                            formStatus={info.status}
                            hasFormPending={hasFormPending}
                            canChangeStatus={false}
                            openModal={openModalStatus}
                            handleClose={() => setOpenModalStatus(false)}
                            btnCancel
                            btnConfirm
                            handleSubmit={false}
                        />
                    )}

                    {/* Dialog de confirmação de envio */}
                    <DialogFormConclusion
                        openModal={openModal}
                        handleClose={() => {
                            setOpenModal(false), checkErrors(false)
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
                        canApprove={true}
                        type='limpeza'
                        unity={unidade}
                    />

                    {/* Modal que deleta formulario */}
                    <DialogDelete
                        title='Excluir Formulário'
                        description='Tem certeza que deseja exluir o formulario?'
                        params={{
                            route: `formularios/limpeza/delete/${id}`,
                            messageSucceded: 'Formulário excluído com sucesso!',
                            MessageError: 'Dado possui pendência!'
                        }}
                        open={openModalDeleted}
                        handleClose={() => setOpenModalDeleted(false)}
                    />
                </Box>
            </form>
        </>
    )
}

export default FormLimpeza

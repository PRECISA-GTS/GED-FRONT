import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'

//* Default Form Components
import Block from 'src/components/Defaults/Formularios/Block'
import DialogFormStatus from '../Defaults/Dialogs/DialogFormStatus'

//* Custom components
import Input from 'src/components/Form/Input'
import AnexoModeView from 'src/components/Anexos/ModeView'
import CustomChip from 'src/@core/components/mui/chip'
import { Box, Button, Card, CardContent, FormControl, Grid, Typography } from '@mui/material'
import Router from 'next/router'
import { backRoute, toastMessage, statusDefault } from 'src/configs/defaultConfigs'
import { api } from 'src/configs/api'
import FormHeader from 'src/components/Defaults/FormHeader'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import { NotificationContext } from 'src/context/NotificationContext'
import toast from 'react-hot-toast'
import { SettingsContext } from 'src/@core/context/settingsContext'
import DialogFormConclusion from '../Defaults/Dialogs/DialogFormConclusion'
import HeaderFields from './Header'
import useLoad from 'src/hooks/useLoad'
import DialogDelete from '../Defaults/Dialogs/DialogDelete'
import { useFormContext } from 'src/context/FormContext'
import FormTransportador from '../Cadastros/Transportador/FormTransportador'
import DialogNewCreate from '../Defaults/Dialogs/DialogNewCreate'
import FormTipoVeiculo from '../Cadastros/TipoVeiculo/FormTipoVeiculo'
import HistoricForm from '../Defaults/HistoricForm'
import DialogReOpenForm from '../Defaults/Dialogs/DialogReOpenForm'
import { ParametersContext } from 'src/context/ParametersContext'
import HeaderModelDescription from '../Defaults/HeaderModelDescription'
import ButtonOpenForm from '../Defaults/Buttons/ButtonOpenForm'

const FormRecebimentoMp = ({ id, model }) => {
    const { menu, user, hasPermission, loggedUnity, hasSectorPermission } = useContext(AuthContext)
    const [change, setChange] = useState(false)
    const { setTitle } = useContext(ParametersContext)
    const [loadingFileGroup, setLoadingFileGroup] = useState(false) //? loading de carregamento do arquivo
    const [loadingFileProduct, setLoadingFileProduct] = useState(false) //? loading de carregamento do arquivo
    const [loadingFileItem, setLoadingFileItem] = useState(false) //? loading de carregamento do arquivo
    const [savingForm, setSavingForm] = useState(false)
    const [hasFormPending, setHasFormPending] = useState(false) //? Tem pendencia no formulário (já vinculado em formulário de recebimento, não altera mais o status)
    const [canApprove, setCanApprove] = useState(true) //? Se true, pode aprovar o formulário
    const [unidade, setUnidade] = useState(null)
    // const [produtos, setProdutos] = useState([])
    const [grupoAnexo, setGrupoAnexo] = useState([])
    const [status, setStatus] = useState(null)
    const { createNewNotification } = useContext(NotificationContext)
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
    const { isLoading, startLoading, stopLoading } = useLoad()
    const [openModalDeleted, setOpenModalDeleted] = useState(false)
    const { setReportParameters } = useFormContext()
    const [newChange, setNewChange] = useState(false)
    const [openModalNew, setOpenModalNew] = useState(false)
    const [columnSelected, setColumnSelected] = useState(null)
    const [nameSelected, setNameSelected] = useState(null)

    const [canEdit, setCanEdit] = useState({
        status: false,
        message: 'Você não tem permissões',
        messageType: 'info'
    })
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = type == 'edit' ? router.pathname : backRoute(router.pathname)

    const form = useForm({ mode: 'onChange' })

    const copyLinkForm = () => {
        navigator.clipboard.writeText(link)
        toast.success('Link copiado com sucesso!')
    }

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
        router.push(`/configuracoes/formularios/recebimento-mp/`)
    }

    //* Reabre o formulário
    const changeFormStatus = async values => {
        const data = {
            status: 30,
            observacao: values?.obs,
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
        } finally {
            setChange(!change)
        }
    }

    const objReOpenForm = {
        id: 1,
        name: 'Reabrir formulário',
        description: 'Reabrir formulário para preenchimento.',
        component: <DialogReOpenForm />,
        disabled: hasFormPending || !hasPermission(router.pathname, 'editar') ? true : false,
        route: null,
        type: null,
        action: changeFormStatus,
        modal: true,
        size: 'sm',
        icon: 'heroicons:lock-open',
        identification: null,
        ncPending: true //? Campo que desabilita opção se houver NC
    }
    const objFormConfig = {
        id: 2,
        name: 'Configurações do formulário',
        description: 'Alterar as configurações do modelo de formulário.',
        route: null,
        type: null,
        action: goToFormConfig,
        modal: false,
        icon: 'bi:gear',
        identification: null
    }

    // Monta array de ações baseado nas permissões
    const actionsData = []
    if (user.papelID == 1 && info.status >= 40) actionsData.push(objReOpenForm)
    if (user.papelID == 1 && canConfigForm()) actionsData.push(objFormConfig)

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
        startLoading()
        try {
            api.post(`${staticUrl}/getData`, {
                id: id ?? 0,
                type: type,
                profissionalID: user.profissionalID,
                unidadeID: loggedUnity.unidadeID,
                modeloID: model ?? 0
            })
                .then(response => {
                    console.log('getData: ', response.data)
                    setFieldsHeader(response.data.fieldsHeader)
                    setFieldsFooter(response.data.fieldsFooter)
                    setField(response.data.fields)
                    setBlocos(response.data.blocos)
                    setGrupoAnexo(response.data.grupoAnexo)
                    setInfo(response.data.info)
                    setUnidade(response.data.unidade)
                    setLink(response.data.link)
                    setMovimentacao(response.data.ultimaMovimentacao)
                    verifyIfCanAproveForm(response.data.blocos) //? Verifica se há alguma resposta que bloqueie o formulário, se sim, o mesmo não pode ser aprovado

                    //* Insere os dados no formulário
                    form.reset(response.data)

                    let objStatus = statusDefault[response?.data?.info?.status]
                    setStatus(objStatus)

                    setCanEdit({
                        status:
                            user.papelID == 1 &&
                            response.data.info.status < 40 &&
                            hasSectorPermission(response.data.fieldsHeader?.departamentos ?? [])
                                ? true
                                : false,
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
                })
        } catch (error) {
            console.log('🚀 ~ error:', error)
        } finally {
            stopLoading()
        }
    }

    let hasErrors = false
    let arrErrors = []

    const setFormError = (fieldName, fieldTitle) => {
        form.setError(fieldName, {
            type: 'manual',
            message: 'Campo obrigatório'
        })
        arrErrors.push(fieldTitle)
        hasErrors = true
    }

    const checkErrors = () => {
        form.clearErrors()

        //? Header
        // Fields estáticos (todos obrigatórios)
        if (!form.getValues(`fieldsHeader.data`)) setFormError('fieldsHeader.data', 'Data da avaliação')
        if (!form.getValues(`fieldsHeader.hora`)) setFormError('fieldsHeader.hora', 'Hora da avaliação')
        // if (!getValues(`fieldsHeader.razaoSocial`)) setFormError('fieldsHeader.razaoSocial', 'Razão Social')
        // if (!getValues(`fieldsHeader.nomeFantasia`)) setFormError('fieldsHeader.nomeFantasia', 'Nome Fantasia')

        // Fields dinâmicos
        field?.forEach((field, index) => {
            const fieldName = field.tabela ? `fields[${index}].${field.tabela}` : `fields[${index}].${field.nomeColuna}`
            const fieldValue = form.getValues(fieldName)
            if (field.obrigatorio === 1 && !fieldValue) {
                setFormError(fieldName, field?.nomeCampo)
            }
        })

        //? Blocos
        blocos.forEach((block, indexBlock) => {
            block.itens.forEach((item, indexItem) => {
                const fieldValue = form.getValues(`blocos[${indexBlock}].itens[${indexItem}].resposta`)
                //? Valida resposta do item
                if (item?.obrigatorio === 1 && !fieldValue) {
                    form.setError(`blocos[${indexBlock}].itens[${indexItem}].resposta`, {
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
                            form.setError(
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
        if (grupoAnexo && grupoAnexo.length > 0) {
            grupoAnexo.forEach((grupo, indexGrupo) => {
                grupo.itens.forEach((item, indexItem) => {
                    if (item.obrigatorio === 1 && item.anexos.length == 0) {
                        form.setError(`grupoAnexo[${indexGrupo}].itens[${indexItem}].anexos`, {
                            type: 'manual',
                            message: 'Campo obrigatário'
                        })
                        arrErrors.push(`Anexo: ${grupo?.nome} / ${item?.nome}`)
                        hasErrors = true
                    }
                })
            })
        }

        setListErrors({
            status: hasErrors,
            errors: arrErrors
        })
    }

    const getAddressByCep = async cepString => {
        if (cepString.length === 9) {
            const cep = cepString.replace(/[^0-9]/g, '')
            try {
                const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`)
                if (response.data.localidade) {
                    field.forEach(async (row, index) => {
                        if (
                            row.nomeColuna === 'logradouro' ||
                            row.nomeColuna === 'bairro' ||
                            row.nomeColuna === 'cidade' ||
                            row.nomeColuna === 'estado'
                        ) {
                            await setValue(`fields[${index}].logradouro`, response.data.logradouro)
                            await setValue(`fields[${index}].bairro`, response.data.bairro)
                            await setValue(`fields[${index}].cidade`, response.data.localidade)
                            await setValue(`fields[${index}].estado`, response.data.uf)
                        }
                    })

                    toast.success('Endereço encontrado!')
                } else {
                    toast.error('Endereço não encontrado!')
                }
            } catch (error) {
                // Handle error
                console.error(error)
            }
        }
    }

    const handleSendForm = blob => {
        setBlobSaveReport(blob)
        checkErrors()
        verifyIfCanAproveForm(blocos)
        setOpenModal(true)
    }

    const verifyIfCanAproveForm = blocos => {
        let tempCanApprove = true
        blocos.forEach(block => {
            block.itens.forEach(item => {
                if (item.resposta && item.resposta.bloqueiaFormulario == 1) {
                    tempCanApprove = false
                }
            })
        })
        setCanApprove(tempCanApprove)
    }

    const conclusionForm = async values => {
        values['conclusion'] = true
        await form.handleSubmit(onSubmit)(values)
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
            titulo: `Formulário de Fornecedor ${statusName}`,
            descricao: `O formulário de Fornecedor #${id} está ${statusName}.`,
            url: '/formularios/fornecedor/',
            urlID: id,
            tipoNotificacaoID: 6, //? fornecedor
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
                    titulo: `Fornecedor gerado`,
                    descricao: `O formulário de Fornecedor #${id} está ${statusName} e gerou uma não conformidade.`,
                    url: '/formularios/fornecedor/nao-conformidade/',
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

        //? Verifica se há pelo menos 1 produto marcado
        const hasSomeProductChecked = data.form.produtos.some(product => product.checked_ === true)
        if (!hasSomeProductChecked) {
            toast.error('É necessário selecionar pelo menos um produto!')
            return
        }

        if (id == true) return
        setOpenModal(false)
        try {
            if (type == 'edit') {
                await api.post(`${staticUrl}/updateData/${id}`, data).then(response => {
                    toast.success(toastMessage.successUpdate)
                    let idNãoConformidade = null
                    //? Trata notificações
                    manageNotifications(values.status, values.naoConformidade, idNãoConformidade)
                })
            } else if (type == 'new') {
                await api.post(`${staticUrl}/insertData`, data).then(response => {
                    setId(response.data.recebimentoMpID)
                    router.push(`${staticUrl}`)
                    toast.success(toastMessage.successNew)
                })
            } else {
                toast.error(toastMessage.error)
            }
        } catch (error) {
            console.log('erro da função update/email', error)
        } finally {
            setChange(!change)
        }
    }

    // Quando selecionar um arquivo, o arquivo é adicionado ao array de anexos
    const handleFileSelectProduct = async (event, item) => {
        setLoadingFileProduct(true)
        const selectedFile = event.target.files

        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }

            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(`produtoAnexoID`, item.produtoAnexoID ?? null)

            await api
                .post(`${staticUrl}/saveAnexo/${id}/produto/${user.usuarioID}/${unidade.unidadeID}`, formData)
                .then(response => {
                    //* Submete formulário pra atualizar configurações dos produtos
                    const values = form.getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!')
                })
                .finally(() => {
                    setLoadingFileProduct(false)
                    setChange(!change)
                })
        }
    }

    const handleFileSelectGroup = async (event, item) => {
        setLoadingFileGroup(true)
        const selectedFile = event.target.files

        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }
            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(`grupoAnexoItemID`, item.grupoAnexoItemID ?? null)

            await api
                .post(`${staticUrl}/saveAnexo/${id}/grupo-anexo/${user.usuarioID}/${unidade.unidadeID}`, formData)
                .then(response => {
                    //* Submete formulário pra atualizar configurações dos grupos
                    const values = form.getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!')
                })
                .finally(() => {
                    setLoadingFileGroup(false)
                    setChange(!change)
                })
        }
    }

    const handleFileSelectItem = async (event, item) => {
        // setLoadingFileItem(true)
        const selectedFile = event.target.files

        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }
            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(`parRecebimentoMpModeloBlocoID`, item.parRecebimentoMpModeloBlocoID ?? null)
            formData.append(`itemOpcaoAnexoID`, item.itemOpcaoAnexoID ?? null)

            await api
                .post(`${staticUrl}/saveAnexo/${id}/item/${user.usuarioID}/${loggedUnity.unidadeID}`, formData)
                .then(response => {
                    console.log('Chegou no response..', response.data)
                    //* Submete formulário pra atualizar configurações dos itens
                    onSubmit(form.getValues())
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!!!!')
                })
                .finally(() => {
                    // setLoadingFileItem(false)
                    setChange(!change)
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
    const handleRemoveAnexoProduct = async item => {
        if (item) {
            await api
                .delete(`${staticUrl}/deleteAnexo/${id}/${item.anexoID}/${unidade.unidadeID}/${user.usuarioID}/produto`)
                .then(response => {
                    const values = form.getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao remover anexo, tente novamente!')
                })
                .finally(() => {
                    getData()
                })
        }
    }

    // Remove um anexo do array de anexos
    const handleRemoveAnexoItem = async item => {
        if (item) {
            await api
                .delete(`${staticUrl}/deleteAnexo/${id}/${item.anexoID}/${unidade.unidadeID}/${user.usuarioID}/item`)
                .then(response => {
                    //* Submete formulário pra atualizar configurações dos itens
                    const values = form.getValues()
                    onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao remover anexo, tente novamente!')
                })
                .finally(() => {
                    getData()
                })
        }
    }

    //* Envia o formulário mesmo havendo erros (salva rascunho)
    const customSubmit = e => {
        e.preventDefault()
        const values = form.getValues()
        onSubmit(values)
    }

    useEffect(() => {
        setTitle({
            icon: 'icon-park-outline:receive',
            title: 'Recebimento de MP',
            subtitle: {
                id: id,
                count: 1,
                new: false
            }
        })
        getData()
    }, [id, change])

    useEffect(() => {
        checkErrors()
    }, [isLoading])

    const handleConfirmNew = async data => {
        setOpenModalNew(false)
    }

    return (
        <>
            <form onSubmit={e => customSubmit(e)}>
                <FormHeader
                    key={id}
                    id={id}
                    btnCancel
                    btnSave={!info.concluido}
                    btnSend={user.papelID == 1 && info.status >= 30 && !info.concluido}
                    btnPrint={type == 'edit' ? true : false}
                    btnDelete={info.status < 40 && type === 'edit' ? true : false}
                    onclickDelete={() => setOpenModalDeleted(true)}
                    handleSubmit={() => form.handleSubmit(onSubmit)}
                    handleSend={handleSendForm}
                    iconConclusion={'solar:check-read-linear'}
                    titleConclusion={'Concluir'}
                    title='Recebimento de MP'
                    btnStatus={user.papelID == 1 && type == 'edit' ? true : false}
                    handleBtnStatus={() => setOpenModalStatus(true)}
                    type={type}
                    status={status}
                    actions={actionsData.length > 0 ? true : false}
                    actionsData={actionsData}
                    module='recebimentoMp'
                    actionsNC={info.naoConformidade && info.status > 40}
                />

                <>
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
                                HeaderFiel
                                skin='light'
                                label={unidade.modelo.nome}
                                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                            />
                        )}
                    </div>

                    <Box display='flex' flexDirection='column' sx={{ gap: 6 }}>
                        <HeaderModelDescription description={info.cabecalhoModelo} />

                        {unidade && (
                            <HeaderFields
                                key={unidade.unidadeID}
                                nameSelected={nameSelected}
                                setNameSelected={setNameSelected}
                                columnSelected={columnSelected}
                                setColumnSelected={setColumnSelected}
                                openModalNew={openModalNew}
                                setOpenModalNew={setOpenModalNew}
                                newChange={newChange}
                                setNewChange={setNewChange}
                                recebimentoMpID={id}
                                modelo={unidade.modelo}
                                values={fieldsHeader}
                                fields={field}
                                disabled={!canEdit.status}
                                getAddressByCep={getAddressByCep}
                                form={form}
                            />
                        )}

                        {type === 'new' && <ButtonOpenForm />}

                        {/* Blocos */}
                        {blocos &&
                            type === 'edit' &&
                            blocos.map((bloco, index) => (
                                <Block
                                    form={form}
                                    index={index}
                                    bloco={bloco}
                                    blockKey={`parRecebimentoMpModeloBlocoID`}
                                    setBlocos={setBlocos}
                                    blocos={blocos}
                                    disabled={hasFormPending}
                                    handleFileSelect={handleFileSelectItem}
                                    handleRemoveAnexoItem={handleRemoveAnexoItem}
                                    status={info.status}
                                />
                            ))}
                        {/* Grupo de anexos */}
                        {grupoAnexo &&
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
                                        error: form.formState?.errors
                                    }}
                                />
                            ))}
                        {/* Observação do formulário */}
                        {info && type === 'edit' && (
                            <>
                                <Card>
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
                                                        rows={3}
                                                        value={info.obs}
                                                        disabled={!canEdit.status}
                                                        form={form}
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        <HistoricForm
                            key={change}
                            id={id}
                            parFormularioID={2} // Recebimento MP
                        />
                        {/* Dialog pra alterar status do formulário (se formulário estiver concluído e fábrica queira reabrir pro preenchimento do fornecedor) */}
                        {openModalStatus && (
                            <DialogFormStatus
                                title='Histórico do Formulário'
                                text={`Listagem do histórico das movimentações do formulário ${id} do Recebimento de MP.`}
                                id={id}
                                parFormularioID={2} // Recebimento MP
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
                                setOpenModal(false), checkErrors()
                            }}
                            title='Concluir Recebimento de MP'
                            text={`Deseja realmente concluir este formulário?`}
                            info={info}
                            canChange={!hasFormPending}
                            btnCancel
                            btnConfirm
                            btnConfirmColor='primary'
                            conclusionForm={conclusionForm}
                            listErrors={listErrors}
                            canApprove={canApprove}
                            hasNaoConformidade={true}
                            type='recebimentoMp'
                            unity={unidade}
                            values={fieldsFooter}
                            formularioID={2} // Recebimento MP
                            modeloID={unidade?.modelo?.id}
                            form={form}
                        />
                        {/* Modal que deleta formulario */}
                        <DialogDelete
                            title='Excluir Formulário'
                            description='Tem certeza que deseja exluir o formulario?'
                            params={{
                                route: `formularios/recebimento-mp/delete/${id}`,
                                messageSucceded: 'Formulário excluído com sucesso!',
                                MessageError: 'Dado possui pendência!'
                            }}
                            open={openModalDeleted}
                            handleClose={() => setOpenModalDeleted(false)}
                        />
                    </Box>
                </>
            </form>

            <DialogNewCreate
                title={
                    columnSelected == 'transportadorID'
                        ? 'Novo transportador'
                        : columnSelected == 'tipoVeiculoID'
                        ? 'Novo tipo de veiculo'
                        : ''
                }
                size='md'
                openModal={openModalNew}
                setOpenModal={setOpenModalNew}
            >
                {columnSelected == 'transportadorID' ? (
                    <FormTransportador
                        btnClose
                        handleModalClose={() => setOpenModalNew(false)}
                        setNewChange={setNewChange}
                        newChange={newChange}
                        outsideID={true}
                        handleConfirmNew={handleConfirmNew}
                        manualUrl='/cadastros/transportador'
                    />
                ) : columnSelected == 'tipoVeiculoID' ? (
                    <FormTipoVeiculo
                        btnClose
                        handleModalClose={() => setOpenModalNew(false)}
                        setNewChange={setNewChange}
                        newChange={newChange}
                        outsideID={true}
                        handleConfirmNew={handleConfirmNew}
                        manualUrl='/cadastros/tipo-veiculo'
                    />
                ) : null}
            </DialogNewCreate>
        </>
    )
}

export default FormRecebimentoMp

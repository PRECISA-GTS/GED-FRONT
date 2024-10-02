import { useContext, useEffect, useState } from 'react'
import FormHeader from 'src/components/Defaults/FormHeader'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { AuthContext } from 'src/context/AuthContext'
import { ParametersContext } from 'src/context/ParametersContext'
import Header from './Header'

import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import Router from 'next/router'
import toast from 'react-hot-toast'
import DialogFormConclusion from 'src/components/Defaults/Dialogs/DialogFormConclusion'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'
import DialogReOpenForm from 'src/components/Defaults/Dialogs/DialogReOpenForm'
import { RouteContext } from 'src/context/RouteContext'
import CustomChip from 'src/@core/components/mui/chip'
import { toastMessage } from 'src/configs/defaultConfigs'
import { canConfigForm } from 'src/configs/functions'
import { checkErrorsBlocks, checkErrorsDynamicHeader, checkErrorStaticHeader, getErrors } from 'src/configs/checkErrors'
import HeaderModelDescription from '../Defaults/HeaderModelDescription'
import { ca } from 'date-fns/locale'
import ButtonOpenForm from '../Defaults/Buttons/ButtonOpenForm'
import ModelBlocks from '../Form/ModelBlocks'

const FormLimpeza = ({ id, modelID }) => {
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const { menu, user, loggedUnity, hasPermission } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const [change, setChange] = useState(false)
    const [canApprove, setCanApprove] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })
    const [openDelete, setOpenDelete] = useState(false)
    const { setId } = useContext(RouteContext)

    const form = useForm({ mode: 'onChange' })

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

    const conclude = async values => {
        const naoConformidade = form.getValues(`info.naoConformidade`)
        const fieldsFooter = form.getValues(`fieldsFooter`)

        if (!id) return

        values = {
            form: {
                ...fieldsFooter,
                ...values,
                naoConformidade
            },
            params: {
                id,
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID,
                profissionalID: user.profissionalID
            }
        }
        console.log('🚀 ~ conclude values:', values)

        setHeader(null)

        try {
            const response = await api.post(`${router.pathname}/conclude`, values)
            await onSubmit(form.getValues()) //? Atualiza dados do formulário
        } catch (e) {
            console.log(e)
            return
        } finally {
            setOpenModal(false)
            setChange(!change)
        }
    }

    const reOpen = async values => {
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
            const response = await api.post(`${router.pathname}/reOpen/${id}`, data)
            toast.success(toastMessage.successUpdate)
        } catch (error) {
            console.log(error)
        } finally {
            setChange(!change)
        }
    }

    const getData = async () => {
        try {
            const values = {
                id: id ?? 0, //? Novo (id == null)
                modelID: modelID ?? 0, //? Novo (modelID)
                unidadeID: loggedUnity.unidadeID
            }
            const response = await api.post(`/formularios/limpeza/getData`, values)
            console.log('🚀 ~ getData: ', response.data)

            form.reset(response.data)
            setHeader(response.data.header)
            setBlock(response.data.blocos)
        } catch (e) {
            console.log(e)
            return
        }
    }

    //* Envia o formulário mesmo havendo erros (salva rascunho)
    const customSubmit = e => {
        e.preventDefault()
        const values = form.getValues()
        onSubmit(values)
    }

    const onSubmit = async values => {
        if (!values) return

        const data = {
            form: values,
            auth: {
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            }
        }
        console.log('🚀 ~ onSubmit:', data)

        try {
            if (type === 'new') {
                const response = await api.post(`/formularios/limpeza/insertData`, data)
                toast.success('Dados cadastrados com sucesso!')
                //? Redireciona pro ID criado
                setId(response.data.id)
                router.push(`/formularios/limpeza`)
            } else if (type === 'edit') {
                await api.post(`/formularios/limpeza/updateData/${id}`, data)
                toast.success('Dados atualizados com sucesso!')
            }
        } catch (e) {
            console.log(e)
            return
        } finally {
            setChange(!change)
        }
    }

    const goToFormConfig = () => {
        setId(header.modelo.id) //? ID do modelo do formulário
        router.push(`/configuracoes/formularios/limpeza/`)
    }

    //* Actions data
    const actionsData = []
    const objReOpenForm = {
        id: 1,
        name: 'Reabrir formulário',
        description: 'Reabrir formulário para preenchimento.',
        component: <DialogReOpenForm />,
        disabled: !hasPermission(router.pathname, 'editar') ? true : false,
        route: null,
        type: null,
        action: reOpen,
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
    if (header && header.status.id >= 40) actionsData.push(objReOpenForm)
    if (canConfigForm(menu, '/configuracoes/formularios')) actionsData.push(objFormConfig)

    const checkErrors = () => {
        let objErrors = {
            status: false,
            errors: []
        }

        //? Limpa os erros atuais do formulário
        form.clearErrors()

        //? Checa os erros estáticos
        checkErrorStaticHeader(form, 'header.dataInicio', 'Data Inicial', objErrors)
        checkErrorStaticHeader(form, 'header.horaInicio', 'Hora Inicial', objErrors)
        checkErrorStaticHeader(form, 'header.dataFim', 'Data Final', objErrors)
        checkErrorStaticHeader(form, 'header.horaFim', 'Hora Final', objErrors)
        checkErrorStaticHeader(form, 'header.departamento.id', 'Departamento responsável pela limpeza', objErrors)
        checkErrorStaticHeader(form, 'header.setor.id', 'Setor que foi limpo', objErrors)

        //? Checa os erros dinâmicos
        checkErrorsDynamicHeader(form, form.getValues('header.fields'), objErrors)
        //? Blocos
        checkErrorsBlocks(form, form.getValues('blocos'), objErrors)
        //? Verifica se houve mudanças antes de setar no estado
        const updatedErrors = getErrors(objErrors)
        //? Se houver erro, atualiza o estado
        if (listErrors.status !== updatedErrors.status || listErrors.errors.length !== updatedErrors.errors.length) {
            setListErrors(updatedErrors)
        }
    }

    const handleFileSelect = async (event, item) => {
        console.log('🚀 ~ event, item:', item)
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

            await onSubmit(form.getValues()) //? Atualiza dados do formulário

            await api
                .post(`/formularios/limpeza/saveAnexo/${id}/item/${user.usuarioID}/${loggedUnity.unidadeID}`, formData)
                .then(response => {
                    //* Submete formulário pra atualizar configurações dos itens
                    // const values = form.getValues()
                    // onSubmit(values)
                })
                .catch(error => {
                    toast.error(error.response?.data?.message ?? 'Erro ao atualizar anexo, tente novamente!')
                })
                .finally(() => {
                    setChange(!change)
                })
        }
    }

    const handleRemoveFile = async item => {
        if (item) {
            await api
                .delete(
                    `/formularios/recebimento-mp/nao-conformidade/deleteAnexo/${id}/${item.anexoID}/${loggedUnity.unidadeID}/${user.usuarioID}/item`
                )
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

    useEffect(() => {
        setTitle({
            icon: 'carbon:clean',
            title: 'Limpeza e Higienização',
            subtitle: {
                id: id,
                count: 1,
                new: false
            }
        })
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id, change])

    return (
        <form onSubmit={e => customSubmit(e)}>
            {header && (
                <>
                    <FormHeader
                        id={id}
                        btnNew={type === 'edit' ? true : false}
                        btnCancel
                        btnSave={header?.status?.id < 40 ? true : false}
                        btnSend={header?.status?.id >= 30 && header?.status?.id <= 40 ? true : false}
                        btnPrint={type == 'edit' ? true : false}
                        btnDelete={header?.status?.id < 40 && type === 'edit' ? true : false}
                        onclickDelete={() => setOpenDelete(true)}
                        actions={true}
                        handleSubmit={() => form.handleSubmit(onSubmit)}
                        handleSend={() => {
                            setOpenModal(true)
                            checkErrors()
                            verifyIfCanAproveForm(block)
                        }}
                        iconConclusion={'mdi:check-bold'}
                        titleConclusion={'Concluir'}
                        title='Limpeza e Higienização'
                        type={type}
                        status={header?.status?.id}
                        actionsNC={header?.naoConformidade && header?.status?.id > 40}
                        module='limpeza'
                        actionsData={actionsData}
                    />

                    <div className='flex gap-2 mb-2'>
                        <CustomChip
                            size='small'
                            HeaderFiel
                            skin='light'
                            color={header.status.color}
                            label={header.status.label}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                        <CustomChip
                            size='small'
                            HeaderFiel
                            skin='light'
                            label={header.modelo.nome}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                    </div>

                    <div className='space-y-4'>
                        <HeaderModelDescription description={header.modelo.cabecalho} />
                        <Header form={form} data={header} disabled={header.status?.id >= 40} />

                        {type === 'new' && <ButtonOpenForm />}

                        {type === 'edit' && (
                            <ModelBlocks
                                form={form}
                                data={block}
                                blockKeyName='parLimpezaModeloBlocoID'
                                setBlock={setBlock}
                                handleFileSelect={handleFileSelect}
                                handleRemoveFile={handleRemoveFile}
                                status={header.status.id}
                                disabled={header.status.id >= 40}
                            />
                        )}

                        <HistoricForm key={change} id={id} parFormularioID={4} />
                    </div>

                    <DialogFormConclusion
                        openModal={openModal}
                        handleClose={() => {
                            setOpenModal(false), checkErrors()
                        }}
                        title='Concluir Limpeza e Higienização'
                        text={`Deseja realmente concluir este formulário?`}
                        info={{
                            status: header.status.id
                        }}
                        canChange
                        btnCancel
                        btnConfirm
                        btnConfirmColor='primary'
                        conclusionForm={conclude}
                        listErrors={listErrors}
                        canApprove={canApprove}
                        hasNaoConformidade={true}
                        type='limpeza'
                        unity={loggedUnity}
                        values={header}
                        formularioID={4} // Limpeza
                        modeloID={header.modelo.id}
                        form={form}
                    />

                    <DialogDelete
                        open={openDelete}
                        handleClose={() => setOpenDelete(false)}
                        title='Excluir Formulário'
                        description='Tem certeza que deseja exluir o formulario?'
                        params={{
                            route: `formularios/recebimento-mp/nao-conformidade/delete/${id}`,
                            messageSucceded: 'Formulário excluído com sucesso!',
                            MessageError: 'Dado possui pendência!'
                        }}
                    />
                </>
            )}
        </form>
    )
}

export default FormLimpeza

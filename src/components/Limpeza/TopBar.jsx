import { Fragment, useContext, useEffect, useState } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import FormHeader from '../Defaults/FormHeader'
import Tabs from './Tabs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { checkErrorsBlocks, checkErrorsDynamicHeader, checkErrorStaticHeader, getErrors } from 'src/configs/checkErrors'
import { canConfigForm } from 'src/configs/functions'
import DialogFormConclusion from '../Defaults/Dialogs/DialogFormConclusion'
import DialogDelete from '../Defaults/Dialogs/DialogDelete'
import DialogReOpenForm from '../Defaults/Dialogs/DialogReOpenForm'
import { toastMessage } from 'src/configs/defaultConfigs'
import { ParametersContext } from 'src/context/ParametersContext'

const TopBar = ({ modelID }) => {
    const router = useRouter()
    const { id, setId } = useContext(RouteContext)
    const { menu, user, loggedUnity, hasPermission } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const type = id && id > 0 ? 'edit' : 'new'
    const form = useForm({ mode: 'onChange' })
    const [change, setChange] = useState(false)
    const [canApprove, setCanApprove] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })

    const getData = async () => {
        try {
            const values = {
                id: id ?? 0, //? Novo (id == null)
                modelID: modelID ?? 0, //? Novo (modelID)
                unidadeID: loggedUnity.unidadeID
            }
            const response = await api.post(`/formularios/limpeza/getData`, values)
            form.reset(response.data)
            setHeader(response.data.header)
            setBlock(response.data.blocos)
        } catch (e) {
            console.log(e)
            return
        }
    }

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
            await api.post(`${router.pathname}/conclude`, values)
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
            await api.post(`${router.pathname}/reOpen/${id}`, data)
            toast.success(toastMessage.successUpdate)
        } catch (error) {
            console.log(error)
        } finally {
            setChange(!change)
        }
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

    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id, loggedUnity, change])

    return (
        <>
            <form onSubmit={e => customSubmit(e)}>
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
                    iconConclusion={'solar:check-read-linear'}
                    titleConclusion={'Concluir'}
                    title='Limpeza e Higienização'
                    type={type}
                    status={header?.status?.id}
                    actionsNC={header?.naoConformidade && header?.status?.id > 40}
                    module='limpeza'
                    actionsData={actionsData}
                />
            </form>

            <Tabs id={id} modelID={modelID} form={form} header={header} block={block} setBlock={setBlock} />

            {header && (
                <>
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
        </>
    )
}

export default TopBar

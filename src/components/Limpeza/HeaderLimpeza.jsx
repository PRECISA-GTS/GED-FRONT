import { useContext, useEffect, useState } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import FormHeader from 'src/components/Defaults/FormHeader'
import Tabs from './Tabs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { checkErrorsBlocks, checkErrorsDynamicHeader, checkErrorStaticHeader, getErrors } from 'src/configs/checkErrors'
import DialogFormConclusion from '../Defaults/Dialogs/DialogFormConclusion'
import DialogDelete from '../Defaults/Dialogs/DialogDelete'
import DialogReOpenForm from '../Defaults/Dialogs/DialogReOpenForm'
import { toastMessage } from 'src/configs/defaultConfigs'
import { getCurrentTab } from 'src/configs/tabs'
import NewContent from './NaoConformidade/NewContent'
import DialogActs from '../Defaults/Dialogs/DialogActs'

const HeaderLimpeza = () => {
    const router = useRouter()
    const { id, setId, idNc, setModelID, setLimpezaID } = useContext(RouteContext)
    const { user, loggedUnity, hasPermission } = useContext(AuthContext)
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const type = id && id > 0 ? 'edit' : 'new'
    const form = useForm({ mode: 'onChange' })
    const [change, setChange] = useState(false)
    const [canApprove, setCanApprove] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })
    const [openNew, setOpenNew] = useState(false)
    const currentTab = getCurrentTab('limpeza', router)

    const getData = async () => {
        try {
            const values = {
                id: id ?? 0, //? Novo (id == null)
                unidadeID: loggedUnity.unidadeID
            }
            const response = await api.post(`/formularios/limpeza/getData`, values)
            console.log('🚀 ~ getData:', response.data)
            form.reset(response.data)
            setHeader(response.data.header)
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

    //? Envio do formulário: limpeza e não conformidade
    const onSubmit = async values => {
        if (!values) return

        if (values.type === 'limpeza') {
            await onSubmitLimpeza(values)
        } else if (values.type == 'nao-conformidade') {
            console.log('envia formulário da nao conformidade...')
        }
    }

    const onSubmitLimpeza = async values => {
        if (!values) return

        const data = {
            form: values,
            auth: {
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            }
        }
        console.log('🚀 ~ onSubmit limpeza:', data)
        // return

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

            //? Concluiu com NC, abre modal pra cadastrar nova NC
            if (naoConformidade) setOpenNew(true)
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
        const equipamentos = blocos[0].equipamentos

        let tempCanApprove = true

        if (equipamentos.length == 0) tempCanApprove = false
        equipamentos.forEach(equip => {
            equip.itens.forEach(item => {
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

    const handleNewNC = values => {
        //? Seta Recebimento e Modelo (contexto) selecionados pra enviar pra NOVO
        console.log('🚀 ~ handleNewNC: ', header.limpeza.id, values.new.modelo.id)
        setId(header.limpeza.id)
        setLimpezaID(header.limpeza.id)
        setModelID(values.new.modelo.id)
        router.push(`/formularios/limpeza/novo/?aba=nao-conformidade`)
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
    if (header && header.status.id >= 40) actionsData.push(objReOpenForm)

    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id, loggedUnity, change])

    console.log('==> ', openModal)

    return (
        <form onSubmit={e => customSubmit(e)}>
            <FormHeader
                id={id}
                btnNew={type === 'edit' && currentTab == 'limpeza' ? true : false}
                btnNewModal={user.papelID === 1 && type === 'edit' && currentTab != 'limpeza' ? true : false}
                handleNewModal={() => setOpenNew(true)}
                btnCancel
                btnSave={header?.status?.id < 40 ? true : false}
                btnSend={header?.status?.id >= 30 && header?.status?.id <= 40 ? true : false}
                btnPrint={type == 'edit' ? true : false}
                btnDelete={header?.status?.id < 40 && type === 'edit' ? true : false}
                onclickDelete={() => setOpenDelete(true)}
                actions={currentTab == 'limpeza' ? true : false}
                handleSubmit={() => form.handleSubmit(onSubmit)}
                handleSend={() => {
                    setOpenModal(true)
                    checkErrors()
                    verifyIfCanAproveForm(form.getValues('blocos'))
                }}
                iconConclusion={'solar:check-read-linear'}
                titleConclusion={'Concluir'}
                title='Limpeza e Higienização'
                type={type}
                status={header?.status?.id}
                module='limpeza'
                actionsData={actionsData}
            />

            <Tabs
                id={id}
                form={form}
                header={header}
                block={block}
                setBlock={setBlock}
                defaultTab='limpeza'
                onSubmit={onSubmit}
            />

            <DialogActs
                title='Nova Não Conformidade'
                handleConclusion={handleNewNC}
                size='lg'
                setOpenModal={setOpenNew}
                openModal={openNew}
                form={form}
            >
                <NewContent type='form' data={header} form={form} />
            </DialogActs>

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
                        modeloID={1}
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

export default HeaderLimpeza

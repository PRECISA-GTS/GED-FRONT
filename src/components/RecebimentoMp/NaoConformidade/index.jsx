import { useContext, useEffect, useState } from 'react'
import FormHeader from 'src/components/Defaults/FormHeader'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { AuthContext } from 'src/context/AuthContext'
import { ParametersContext } from 'src/context/ParametersContext'
import Header from './Header'
import ModelBlocks from './ModelBlocks'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import RecebimentoMpInfo from './RecebimentoMpInfo'
import Router from 'next/router'
import toast from 'react-hot-toast'
import DialogFormConclusionNC from 'src/components/Defaults/Dialogs/DialogFormConclusionNC'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'
import DialogReOpenForm from 'src/components/Defaults/Dialogs/DialogReOpenForm'
import { RouteContext } from 'src/context/RouteContext'
import { toastMessage } from 'src/configs/defaultConfigs'

const RecebimentoMpNaoConformidade = ({ id }) => {
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const { menu, user, loggedUnity, hasPermission } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const [change, setChange] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const { setId } = useContext(RouteContext)

    const form = useForm({ mode: 'onChange' })

    const handleConclude = () => {
        setOpenModal(true)
    }

    const convertToFload = value => {
        if (!value) return
        const formattedStr = value.replace('.', '').replace(',', '.')
        const floatNumber = parseFloat(formattedStr)
        return floatNumber
    }

    const isValidProductsQuantity = values => {
        let isValid = true
        values.forEach(value => {
            if (value.novaQuantidade && convertToFload(value.novaQuantidade) > convertToFload(value.quantidade))
                isValid = false
        })
        return isValid
    }

    const conclude = async values => {
        const products = form.getValues(`productsConclude`)
        if (!products) return

        if (!id || !header.recebimentoMpID) return

        //? Valida se nenhuma quantidade nova do produto é maior que a quantidade do recebimento de MP
        if (!isValidProductsQuantity(products)) {
            toast.error('Quantidade não pode ser maior que a quantidade do recebimento de MP!')
            return
        }

        values = {
            form: {
                ...values,
                products: products
            },
            params: {
                id,
                recebimentoMpID: header.recebimentoMpID,
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID,
                profissionalID: user.profissionalID
            }
        }
        console.log('🚀 ~ onSubmit:', values)

        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/conclude`, values)
            toast.success('Dados atualizados com sucesso!')
        } catch (e) {
            console.log(e)
            return
        } finally {
            setOpenModal(false)
            setChange(!change)
        }

        console.log('🚀 ~ conclude values:', values)
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
        console.log('🚀 ~ reOpen:', data)

        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/reOpen/${id}`, data)
            toast.success(toastMessage.successUpdate)
        } catch (error) {
            console.log(error)
        } finally {
            setChange(!change)
        }
    }

    const getData = async () => {
        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/getData`, {
                id,
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID
            })
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

        if (!values.header.transporte && !values.header.produto) {
            toast.error('Selecione o tipo de não conformidade (Transporte ou Produto)!')
            return
        }

        const hasSomeCheckedProduct = values.header.produtos.some(item => item.checked_)
        if (values.header.produto && !hasSomeCheckedProduct) {
            toast.error('Selecione pelo menos um produto!')
            return
        }

        const data = {
            form: values,
            auth: {
                usuarioID: user.usuarioID,
                profissionalID: user.profissionalID,
                papelID: user.papelID,
                unidadeID: user.unidadeID
            }
        }

        try {
            await api.post(`/formularios/recebimento-mp/nao-conformidade/updateData/${id}`, data)
            toast.success('Dados atualizados com sucesso!')
        } catch (e) {
            console.log(e)
            return
        } finally {
            setChange(!change)
        }
    }

    const goToFormConfig = () => {
        setId(header.modelo.id) //? ID do modelo do formulário
        router.push(`/configuracoes/formularios/recebimentomp-naoconformidade/`)
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
        identification: null
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
    if (user.papelID == 1 && header?.status >= 40) actionsData.push(objReOpenForm)
    if (user.papelID == 1 && canConfigForm()) actionsData.push(objFormConfig)

    useEffect(() => {
        setTitle({
            title: 'Não conformidade do Recebimento de MP',
            subtitle: {
                id: id,
                count: 1,
                new: false
            }
        })
        getData()
    }, [change])

    return (
        <>
            <form onSubmit={e => customSubmit(e)} className='space-y-4'>
                {header && (
                    <FormHeader
                        btnCancel
                        btnSave={header?.status < 40 ? true : false}
                        btnSend={header?.status >= 30 && header?.status < 40 ? true : false}
                        btnPrint={type == 'edit' ? true : false}
                        btnDelete
                        onclickDelete={() => setOpenDelete(true)}
                        actionsData={actionsData}
                        actions
                        handleSubmit={() => form.handleSubmit(onSubmit)}
                        handleSend={handleConclude}
                        iconConclusion={'mdi:check-bold'}
                        titleConclusion={'Concluir'}
                        title='Não conformidade do Recebimento de MP'
                        type={type}
                        status={header?.status}
                    />
                )}

                {header && <RecebimentoMpInfo data={header} />}

                {/* Header */}
                {header && <Header form={form} data={header} disabled={header.status >= 40} />}

                {/* Modelo com seus blocos */}
                {block && (
                    <ModelBlocks
                        form={form}
                        data={block}
                        setBlock={setBlock}
                        status={header.status}
                        disabled={header.status >= 40}
                    />
                )}

                {/* Histórico de movimentações */}
                <HistoricForm
                    key={change}
                    id={id}
                    parFormularioID={3} // Não conformidade do Recebimento de MP
                />
            </form>

            {/* Modal conclusion */}
            {header && (
                <>
                    <DialogFormConclusionNC
                        openModal={openModal}
                        handleClose={() => {
                            setOpenModal(false) //, checkErrors()
                        }}
                        title='Concluir Formulário'
                        text={`Deseja realmente concluir este formulário?`}
                        status={header.status}
                        canChange={true} //{!hasFormPending}
                        btnCancel
                        btnConfirm
                        btnConfirmColor='primary'
                        conclusionForm={conclude}
                        // listErrors={listErrors}
                        canApprove={true}
                        type='recebimentoMpNaoConformidade'
                        unity={loggedUnity}
                        values={null}
                        formularioID={3} // Não conformidade do Recebimento MP
                        modeloID={header.modelo.id}
                        produtos={header.produtos}
                        form={form}
                        setores={header.setoresConclusao}
                    />

                    {/* Modal que deleta formulario */}
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

export default RecebimentoMpNaoConformidade

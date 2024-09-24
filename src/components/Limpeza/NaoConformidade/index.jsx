import { useContext, useEffect, useState } from 'react'
import FormHeader from 'src/components/Defaults/FormHeader'
import HistoricForm from 'src/components/Defaults/HistoricForm'
import { AuthContext } from 'src/context/AuthContext'
import { ParametersContext } from 'src/context/ParametersContext'
import Header from './Header'
import ModelBlocks from './ModelBlocks'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import LimpezaInfo from './LimpezaInfo'
import Router from 'next/router'
import toast from 'react-hot-toast'
import DialogFormConclusionNC from 'src/components/Defaults/Dialogs/DialogFormConclusionNC'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'
import DialogReOpenForm from 'src/components/Defaults/Dialogs/DialogReOpenForm'
import { RouteContext } from 'src/context/RouteContext'
import CustomChip from 'src/@core/components/mui/chip'
import { toastMessage } from 'src/configs/defaultConfigs'
import DialogActs from 'src/components/Defaults/Dialogs/DialogActs'
import NewContent from './NewContent'
import { Card, CardContent } from '@mui/material'
import { canConfigForm, fractionedToFloat } from 'src/configs/functions'
import { checkErrorsBlocks, checkErrorsDynamicHeader, checkErrorStaticHeader, getErrors } from 'src/configs/checkErrors'

const NaoConformidade = ({ id, limpezaID, modelID }) => {
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const { menu, user, loggedUnity, hasPermission } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const [change, setChange] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [listErrors, setListErrors] = useState({ status: false, errors: [] })
    const [openNew, setOpenNew] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const { setId, setModelID, setLimpezaID } = useContext(RouteContext)

    const form = useForm({ mode: 'onChange' })

    const isValidProductsQuantity = values => {
        let isValid = true
        values.forEach(value => {
            if (value.novaQuantidade && fractionedToFloat(value.novaQuantidade) > fractionedToFloat(value.quantidade))
                isValid = false
        })
        return isValid
    }

    const conclude = async values => {
        const products = form.getValues(`productsConclude`)

        if (!id || !header.limpeza.id) return

        //? Valida se nenhuma quantidade nova do equipamento é maior que a quantidade da limpeza
        if (!isValidProductsQuantity(products ?? [])) {
            toast.error('Quantidade não pode ser maior que a quantidade da limpeza e higienização!')
            return
        }

        values = {
            form: {
                ...values,
                products: products,
                prazo: form.getValues('header.prazoSolucao'),
                data: form.getValues('header.data'),
                data_: form.getValues('header.data') && form.getValues('header.data').split('-').reverse().join('/'),
                hora: form.getValues('header.hora'),
                transporte: form.getValues('header.transporte'),
                produto: form.getValues('header.produto')
            },
            params: {
                id,
                limpezaID: header.limpeza.id,
                usuarioID: user.usuarioID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID,
                profissionalID: user.profissionalID
            }
        }

        setHeader(null)

        try {
            const response = await api.post(`/formularios/limpeza/nao-conformidade/conclude`, values)
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
            const response = await api.post(`/formularios/limpeza/nao-conformidade/reOpen/${id}`, data)
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
                limpezaID: limpezaID ?? 0, //? Novo (limpezaID)
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID
            }
            const response = await api.post(`/formularios/limpeza/nao-conformidade/getData`, values)

            if (response.status === 204) {
                //? Estava no formulário NOVO que passa dados do contexto, se recarregar a página perde os valores do contexto, então redireciona pra listagem
                setId(null)
                router.push(`/formularios/limpeza/?aba=nao-conformidade`)
            }

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
                profissionalID: user.profissionalID,
                papelID: user.papelID,
                unidadeID: loggedUnity.unidadeID
            }
        }
        console.log('🚀 ~ onSubmit:', data)

        try {
            if (type === 'new') {
                const response = await api.post(`/formularios/limpeza/nao-conformidade/insertData`, data)
                toast.success('Dados cadastrados com sucesso!')
                //? Redireciona pro ID criado
                setId(response.data.id)
                router.push(`/formularios/limpeza/?aba=nao-conformidade`)
            } else if (type === 'edit') {
                await api.post(`/formularios/limpeza/nao-conformidade/updateData/${id}`, data)
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
        router.push(`/configuracoes/formularios/limpeza-naoconformidade/`)
    }

    const handleNew = () => {
        //? Seta Recebimento e Modelo (contexto) selecionados pra enviar pra NOVO
        const values = form.getValues('new')
        setLimpezaID(header.limpeza.id)
        setModelID(values.modelo.id)
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
    if (user.papelID == 1 && header && header.status.id >= 40) actionsData.push(objReOpenForm)
    if (user.papelID == 1 && canConfigForm(menu, '/configuracoes/formularios')) actionsData.push(objFormConfig)

    const checkErrors = () => {
        let objErrors = {
            status: false,
            errors: []
        }

        //? Limpa os erros atuais do formulário
        form.clearErrors()

        //? Checa os erros estáticos
        checkErrorStaticHeader(form, 'header.data', 'Data', objErrors)
        checkErrorStaticHeader(form, 'header.hora', 'Hora', objErrors)

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
        const selectedFile = event.target.files
        if (selectedFile && selectedFile.length > 0) {
            const formData = new FormData()
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append('files[]', selectedFile[i])
            }
            formData.append(`usuarioID`, user.usuarioID)
            formData.append(`unidadeID`, loggedUnity.unidadeID)
            formData.append(
                `parLimpezaNaoConformidadeModeloBlocoID`,
                item.parLimpezaNaoConformidadeModeloBlocoID ?? null
            )
            formData.append(`itemOpcaoAnexoID`, item.itemOpcaoAnexoID ?? null)

            await onSubmit(form.getValues()) //? Atualiza dados do formulário

            await api
                .post(
                    `/formularios/limpeza/nao-conformidade/saveAnexo/${id}/item/${user.usuarioID}/${loggedUnity.unidadeID}`,
                    formData
                )
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
                    `/formularios/limpeza/nao-conformidade/deleteAnexo/${id}/${item.anexoID}/${loggedUnity.unidadeID}/${user.usuarioID}/item`
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
            icon: 'typcn:warning-outline',
            title: 'Não conformidade da Limpeza e Higienização',
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
    }, [change, user])

    return (
        <form onSubmit={e => customSubmit(e)}>
            {header && (
                <>
                    <FormHeader
                        btnNewModal={user.papelID === 1 && type === 'edit' ? true : false}
                        handleNewModal={() => setOpenNew(true)}
                        btnCancel
                        btnSave={header?.status?.id < 40 ? true : false}
                        btnSend={
                            (user.papelID === 1 && header?.status?.id >= 30 && header?.status?.id <= 40) ||
                            (user.papelID === 2 && header?.status?.id === 30)
                                ? true
                                : false
                        }
                        btnPrint={type == 'edit' ? true : false}
                        btnDelete={user.papelID === 1 && header?.status?.id < 40 && type === 'edit' ? true : false}
                        onclickDelete={() => setOpenDelete(true)}
                        actionsData={actionsData}
                        actions={user.papelID === 1 ? true : false}
                        handleSubmit={() => form.handleSubmit(onSubmit)}
                        handleSend={() => {
                            setOpenModal(true)
                            checkErrors()
                            verifyIfCanAproveForm(block)
                        }}
                        iconConclusion={'mdi:check-bold'}
                        titleConclusion={'Concluir'}
                        title='Não conformidade da Limpeza e Higienização'
                        type={type}
                        status={header?.status?.id}
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
                        <Card>
                            <CardContent className='space-y-2 '>
                                <LimpezaInfo data={header} />
                            </CardContent>
                        </Card>

                        <Header form={form} data={header} disabled={header.status?.id >= 40 || user.papelID != 1} />

                        {type === 'edit' && (
                            <ModelBlocks
                                form={form}
                                data={block}
                                setBlock={setBlock}
                                handleFileSelect={handleFileSelect}
                                handleRemoveFile={handleRemoveFile}
                                status={header.status.id}
                                disabled={header.status.id >= 40}
                            />
                        )}

                        <HistoricForm key={change} id={id} parFormularioID={5} />
                    </div>

                    <DialogFormConclusionNC
                        openModal={openModal}
                        handleClose={() => {
                            setOpenModal(false)
                        }}
                        title='Concluir Não Conformidade da Limpeza e Higienização'
                        text={`Deseja realmente concluir este formulário?`}
                        status={header.status.id}
                        canChange={true}
                        btnCancel
                        btnConfirm
                        btnConfirmColor='primary'
                        conclusionForm={conclude}
                        type='limpezaNaoConformidade'
                        listErrors={listErrors}
                        unity={loggedUnity}
                        values={null}
                        formularioID={5}
                        modeloID={header.modelo.id}
                        produtos={form.getValues('header.equipamentos')}
                        form={form}
                        departamentos={header.departamentosConclusao}
                    />

                    <DialogDelete
                        open={openDelete}
                        handleClose={() => setOpenDelete(false)}
                        title='Excluir Formulário'
                        description='Tem certeza que deseja exluir o formulario?'
                        params={{
                            route: `formularios/limpeza/nao-conformidade/delete/${id}`,
                            messageSucceded: 'Formulário excluído com sucesso!',
                            MessageError: 'Dado possui pendência!'
                        }}
                    />

                    <DialogActs
                        title='Nova Não Conformidade'
                        handleConclusion={handleNew}
                        size='lg'
                        setOpenModal={setOpenNew}
                        openModal={openNew}
                    >
                        <NewContent type='form' data={header} form={form} />
                    </DialogActs>
                </>
            )}
        </form>
    )
}

export default NaoConformidade

import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { api } from 'src/configs/api'
import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Loading from 'src/components/Loading'
import DialogForm from 'src/components/Defaults/Dialogs/Dialog'
import FormHeader from '../../Defaults/FormHeader'
import { backRoute } from 'src/configs/defaultConfigs'
import { toastMessage } from 'src/configs/defaultConfigs'
import Input from 'src/components/Form/Input'
import Select from 'src/components/Form/Select'
import Check from 'src/components/Form/Check'
import { AuthContext } from 'src/context/AuthContext'
import Icon from 'src/@core/components/icon'
import AnexosList from './AnexosList'
import useLoad from 'src/hooks/useLoad'
import FormClassificacaoProduto from '../ClassificacaoProduto/FormClassificacaoProduto'
import DialogNewCreate from 'src/components/Defaults/Dialogs/DialogNewCreate'
import CheckLabel from 'src/components/Form/CheckLabel'
import Analise from './Analise/Index'

const FormProduto = ({ id, btnClose, handleConfirmNew, handleModalClose, newChange, manualUrl, outsideID }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname
    const { title } = useContext(ParametersContext)
    const { setId } = useContext(RouteContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const [removedItems, setRemovedItems] = useState([])
    const [change, setChange] = useState(false)
    const { startLoading, stopLoading } = useLoad()

    // Modal cadastro nova classificação
    const [openClassification, setOpenClassification] = useState(false)
    const [newChangeClassification, setNewChangeClassification] = useState(false)

    const form = useForm({ mode: 'onChange' })

    // Envia dados para a API
    const onSubmit = async data => {
        startLoading()
        const values = {
            ...data,
            unidadeID: loggedUnity.unidadeID,
            usuarioID: user.usuarioID,
            removedItems
        }
        console.log('onSubmit: ', values)

        try {
            if (type === 'new') {
                await api.post(`cadastros/produto/new/insertData`, values).then(response => {
                    if (handleConfirmNew) {
                        handleConfirmNew(response.data, 'produtos')
                    } else {
                        router.push(`${backRoute(staticUrl)}`) //? backRoute pra remover 'novo' da rota
                        setId(response.data.id)
                    }
                    toast.success(toastMessage.successNew)
                })
            } else if (type === 'edit') {
                await api.post(`${staticUrl}/updateData/${id}`, values)
                toast.success(toastMessage.successUpdate)
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.errorRepeated)
            } else {
                console.log(error)
            }
        } finally {
            stopLoading()
        }
    }

    // Deleta os dados
    const handleClickDelete = async () => {
        try {
            await api.delete(`${staticUrl}/${id}/${user.usuarioID}/${loggedUnity.unidadeID}`)
            setId(null)
            setOpen(false)
            toast.success(toastMessage.successDelete)
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error(toastMessage.pendingDelete)
                setOpen(false)
            } else {
                console.log(error)
            }
        }
    }

    // Dados iniciais ao carregar a página
    const getData = async () => {
        try {
            const route =
                type === 'new'
                    ? `cadastros/produto/new/getData/${loggedUnity.unidadeID}`
                    : `${staticUrl}/getData/${id}/${loggedUnity.unidadeID}`
            await api.post(route).then(response => {
                console.log('🚀 ~ getData:', response.data)
                setData(response.data)
                form.reset(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Remove anexo
    const removeAnexo = (value, index) => {
        if (value.produtoAnexoID) {
            setRemovedItems([...removedItems, value.produtoAnexoID])
        }

        const newAnexos = form.getValues('anexos').filter((_, i) => i !== index)
        form.setValue('anexos', newAnexos)
        setChange(!change)
    }

    // Adiciona um novo anexo
    const addAnexo = () => {
        const newAnexo = {
            nome: '',
            obrigatorio: 1,
            status: 1,
            descricao: '',
            observacao: ''
        }

        const updatedDataAnexos = [...form.getValues('anexos'), newAnexo]
        form.setValue('anexos', updatedDataAnexos)
        setChange(!change)
    }

    const createNewClassification = () => {
        setOpenClassification(true)
    }

    const handleSave = async () => {
        setNewChangeClassification(true)
    }

    const handleConfirmNewClassification = data => {
        setOpenClassification(false)
        form.setValue('classificacao.fields', data)
        setNewChangeClassification(!newChangeClassification)
    }

    // Função que traz os dados quando carrega a página e atualiza quando as dependências mudam
    useEffect(() => {
        getData()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id])

    useEffect(() => {
        if (newChange) form.handleSubmit(onSubmit)()
    }, [newChange])

    return (
        <>
            {!data && <Loading />}
            {data && (
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                    <FormHeader
                        btnCancel
                        btnNew={handleConfirmNew ? false : true}
                        btnSave
                        btnClose={btnClose}
                        manualUrl={manualUrl}
                        handleModalClose={handleModalClose}
                        handleSubmit={() => form.handleSubmit(onSubmit)}
                        btnDelete={type === 'edit' ? true : false}
                        onclickDelete={() => setOpen(true)}
                        type={type}
                        outsideID={outsideID}
                    />
                    <Card>
                        <CardContent>
                            <Grid container spacing={5}>
                                <Input xs={11} md={4} title='Nome' name='fields.nome' required={true} form={form} />
                                <Select
                                    xs={12}
                                    md={3}
                                    title='Unidade de medida'
                                    name='unidadeMedida.fields'
                                    value={data?.unidadeMedida.fields}
                                    required={true}
                                    options={data.unidadeMedida.options}
                                    form={form}
                                    helpText='Selecione a unidade de medida'
                                />
                                <Select
                                    xs={12}
                                    md={3}
                                    title='Classificação'
                                    name='classificacao.fields'
                                    value={data?.classificacao?.fields}
                                    options={data.classificacao.options}
                                    helpText='Selecione a classificação'
                                    createNew={createNewClassification}
                                    form={form}
                                />
                                <CheckLabel
                                    xs='12'
                                    md='2'
                                    title='Limpeza'
                                    name={`fields.limpeza`}
                                    value={data.fields.limpeza}
                                    form={form}
                                    helpText='Este produto será listado nos formulários do POP2 de Limpeza e Higienização'
                                />
                                <CheckLabel
                                    xs='12'
                                    md='2'
                                    title='Usa Laboratório'
                                    name={`fields.usaLaboratorio`}
                                    value={data.fields.usaLaboratorio}
                                    form={form}
                                    helpText='Habilita o uso do laboratório com a inserção de itens de análise'
                                />
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Análise */}
                    <Analise form={form} data={data.analises} />

                    {/* <Card>
                        <CardHeader title='Anexos' />
                        <CardContent>
                            <Grid container spacing={5}>
                                <AnexosList key={change} removeAnexo={removeAnexo} type={type} form={form} />
                                <Grid item xs={12}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        sx={{ mt: 1 }}
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                        onClick={() => {
                                            addAnexo()
                                        }}
                                    >
                                        Inserir Anexo
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card> */}
                </form>
            )}

            <DialogForm
                text='Tem certeza que deseja excluir?'
                title={'Excluir ' + title.title}
                openModal={open}
                handleClose={() => setOpen(false)}
                handleSubmit={handleClickDelete}
                btnCancel
                btnConfirm
            />

            {/* Modal para criação de nova classificação */}
            <DialogNewCreate
                title='Nova Classificação de Produto'
                size='md'
                openModal={openClassification}
                setOpenModal={setOpenClassification}
                handleSave={handleSave}
            >
                <FormClassificacaoProduto
                    manualUrl='/cadastros/classificacao-produto'
                    btnClose
                    handleModalClose={() => setOpenClassification(false)}
                    newChange={newChangeClassification}
                    handleConfirmNew={handleConfirmNewClassification}
                    outsideID={true}
                />
            </DialogNewCreate>
        </>
    )
}

export default FormProduto

import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardContent, Grid, List, Typography, Box } from '@mui/material'
import { RouteContext } from 'src/context/RouteContext'
import Router from 'next/router'
import { api } from 'src/configs/api'
import FormHeader from 'src/components/Defaults/FormHeader'
import { AuthContext } from 'src/context/AuthContext'
import toast from 'react-hot-toast'
import { toastMessage } from 'src/configs/defaultConfigs'
import Loading from 'src/components/Loading'
import Icon from 'src/@core/components/icon'

//* Custom components
import Select from 'src/components/Form/Select'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import CheckLabel from 'src/components/Form/CheckLabel'
import Blocos from './Blocos'
import DialogNewCreate from 'src/components/Defaults/Dialogs/DialogNewCreate'
import FormItem from 'src/components/Cadastros/Item/FormItem'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'

const FormParametrosFornecedor = ({ id }) => {
    const { setId } = useContext(RouteContext)
    const { loggedUnity, user } = useContext(AuthContext)
    const [model, setModel] = useState()
    const [headers, setHeaders] = useState()
    const [allOptions, setAllOptions] = useState(null)
    const [profissionais, setProfissionais] = useState(null)
    const [blocks, setBlocks] = useState()
    const [orientacoes, setOrientacoes] = useState()
    const [openModalConfirmScore, setOpenModalConfirmScore] = useState(false)
    const [itemScore, setItemScore] = useState()
    const [savingForm, setSavingForm] = useState(false)
    const [arrRemovedItems, setArrRemovedItems] = useState([])
    const [arrRemovedBlocks, setArrRemovedBlocks] = useState([])
    const [change, setChange] = useState(false)
    const [openModalNew, setOpenModalNew] = useState(false) //? Abre modal para criar novo item
    const [openModalSelectedItem, setOpenModalSelectedItem] = useState(false) //? Abre modal para exibir item selecionado
    const [idInfoItem, setIdInfoItem] = useState(null)
    const [newChange, setNewChange] = useState(false)
    const [indexNewBloco, setIndexNewBloco] = useState(null)
    const [indexNewItem, setIndexNewItem] = useState(null)
    const [openModalDeleted, setOpenModalDeleted] = useState(false)
    const [setores, setSetores] = useState([])

    const createNew = (indexBloco, indexItem) => {
        setOpenModalNew(true)
        setIndexNewBloco(indexBloco)
        setIndexNewItem(indexItem)
    }

    const viewItem = item => {
        if (item && item.id > 0) {
            setIdInfoItem(item.id)
            setOpenModalSelectedItem(true)
        }
    }

    const handleConfirmNew = data => {
        setOpenModalNew(false)
        setValue(`blocks.[${indexNewBloco}].itens.[${indexNewItem}].item`, data)
    }

    const router = Router
    const type = id && id > 0 ? 'edit' : 'new'
    const staticUrl = router.pathname

    const form = useForm({ mode: 'onChange' })

    const onSubmit = async values => {
        const data = {
            id: id ?? null,
            unidadeID: loggedUnity.unidadeID,
            usuarioID: user.usuarioID,
            model: values.model,
            header: values.header ?? null,
            blocks: values.blocks ?? [],
            arrRemovedBlocks: arrRemovedBlocks ?? [],
            arrRemovedItems: arrRemovedItems ?? [],
            orientacoes: values.orientations ?? null
        }
        console.log('🚀 ~ onSubmit:', data)

        setHeaders(null) //? Pra exibir loading

        try {
            if (type === 'new') {
                //? New
                await api.put(`/configuracoes/formularios/fornecedor/insertData`, data).then(response => {
                    toast.success(toastMessage.successUpdate)
                    router.push(`/configuracoes/formularios/fornecedor/`)
                    setTimeout(() => {
                        setId(response.data.id)
                    }, 1000)
                })
            } else {
                //? Edit
                await api.put(`/configuracoes/formularios/fornecedor/updateData`, data).then(response => {
                    toast.success(toastMessage.successUpdate)
                    setSavingForm(!savingForm)
                    if (openModalNew) {
                        setOutsideLink(true)
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const refreshOptions = (block, index, blocks, allOptions) => {
        let tempOptions = allOptions.itens

        //? Verifica se a opção está presente nos itens selecionados do bloco
        tempOptions = tempOptions.filter(option => {
            const isSelected = block.itens.some(i => i.item && option.id === i.item.id)
            return !isSelected // Retorna true para manter a opção, false para remover
        })

        // Atualiza block.optionsBlock do bloco
        let newBlock = [...blocks]
        newBlock[index].optionsBlock.itens = tempOptions
        setBlocks(newBlock)
    }

    const addItem = index => {
        const newBlock = [...blocks]
        newBlock[index].itens.push({
            ordem: newBlock[index].itens?.length + 1,
            obs: 1,
            status: 1,
            obrigatorio: 1
        })
        setBlocks(newBlock)
        form.setValue(`blocks.[${index}].itens.[${newBlock[index].itens.length - 1}].new`, true)
        refreshOptions(newBlock[index], index, blocks, allOptions)
    }

    const removeItem = (indexBlock, indexItem, arrItens) => {
        if (blocks[indexBlock].itens.length == 1) {
            toast.error('Você deve ter ao menos um item!')
            return
        }

        const newBlocks = form.getValues('blocks')
        const newItens = arrItens.filter((_, i) => i !== indexItem)
        newBlocks[indexBlock].itens = newItens

        setBlocks(newBlocks)
        form.setValue(`blocks.[${indexBlock}].itens`, newItens)

        // Inserir no array de itens removidos
        let newRemovedItems = [...arrRemovedItems]
        newRemovedItems.push(arrItens[indexItem].parFornecedorModeloBlocoItemID)
        setArrRemovedItems(newRemovedItems)

        refreshOptions(newBlocks[indexBlock], indexBlock, newBlocks, allOptions)
        setChange(!change)
    }

    const removeBlock = (block, index) => {
        if (blocks.length == 1) {
            toast.error('Você deve ter ao menos um bloco!')
            return
        }

        // Verifica se o bloco possui itens com pendência
        let canDelete = true
        block &&
            block.itens.map(item => {
                if (item.hasPending == 1) {
                    canDelete = false
                }
            })

        if (!canDelete) {
            toast.error('Este bloco não pode ser removido pois possui itens respondidos em um formulário')
            return
        }

        // Inserir no array de blocos removidos
        let newRemovedBlocks = [...arrRemovedBlocks]
        newRemovedBlocks.push(block.dados.parFornecedorModeloBlocoID)
        setArrRemovedBlocks(newRemovedBlocks)

        // Remove bloco
        const updatedBlocks = [...blocks]
        updatedBlocks.splice(index, 1)
        setBlocks(updatedBlocks)

        form.setValue(`blocks`, updatedBlocks) //* Remove bloco do formulário

        toast.success('Bloco pré-removido. Salve para concluir!')
    }

    const addBlock = () => {
        const newBlock = [...form.getValues('blocks')]
        newBlock.push({
            dados: {
                ordem: newBlock.length + 1,
                nome: '',
                status: 1
            },
            categorias: [],
            atividades: [],
            optionsBlock: {
                itens: [...allOptions.itens]
            },
            itens: [
                {
                    parFormularioID: 1,
                    new: true,
                    ordem: '1',
                    nome: '',
                    status: 1,
                    item: null
                }
            ]
        })
        form.setValue('blocks', newBlock)
        setBlocks(newBlock)
    }

    const getSetores = async () => {
        if (!loggedUnity) return

        try {
            const res = await api.post('/cadastros/setor', { unidadeID: loggedUnity.unidadeID })
            setSetores(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getSetoresModelo = async model => {
        const response = await api.post(`/cadastros/setor/getSetoresAssinatura`, {
            formularioID: 1, // fornecedor
            modeloID: id
        })
        const updatedModel = { ...model }
        updatedModel.setoresPreenchem = response.data.preenche
        updatedModel.setoresConcluem = response.data.conclui
        form.reset({
            ...form.getValues(),
            model: updatedModel
        })
    }

    const getData = () => {
        try {
            if (type === 'new') {
                setModel({
                    nome: '',
                    ciclo: '',
                    cabecalho: '',
                    status: 1
                })
            } else {
                api.post(`/configuracoes/formularios/fornecedor/getData/${id}`, {
                    unidadeID: loggedUnity.unidadeID
                }).then(response => {
                    console.log('🚀 ~ getData: ', response.data)
                    //* Estados
                    setModel(response.data.model)
                    setHeaders(response.data.header)
                    setBlocks(response.data.blocks)
                    setAllOptions({
                        itens: response.data.options?.itens
                    })
                    setOrientacoes(response.data.orientations)

                    //* Insere os dados no formulário
                    form.reset(response.data)

                    getSetoresModelo(response.data.model)

                    setTimeout(() => {
                        response.data.blocks &&
                            response.data.blocks.map((block, indexBlock) => {
                                refreshOptions(block, indexBlock, response.data.blocks, response.data.options)
                            })
                    }, 3000)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
        getSetores()

        //? Seta error nos campos obrigatórios
        setTimeout(() => {
            form.trigger()
        }, 300)
    }, [id, user, savingForm])

    const handleSave = async data => {
        setNewChange(true)
        getData()
        setOpenModalNew(false)
    }

    return (
        <>
            <Loading show={!model} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormHeader
                    partialRoute
                    btnCancel
                    btnSave
                    handleSubmit={() => form.handleSubmit(onSubmit)}
                    type={type}
                    btnDelete
                    onclickDelete={() => setOpenModalDeleted(true)}
                />
                {/* Modal que deleta formulario */}
                <DialogDelete
                    title='Excluir Formulário'
                    description='Tem certeza que deseja exluir o formulario?'
                    params={{
                        route: `/configuracoes/formularios/fornecedor/delete/${id}`,
                        messageSucceded: 'Formulário excluído com sucesso!',
                        MessageError: 'Dado possui pendência!'
                    }}
                    open={openModalDeleted}
                    handleClose={() => setOpenModalDeleted(false)}
                />
                <Card>
                    <CardContent>
                        {/* Modelo */}
                        {model && (
                            <Grid container spacing={4}>
                                <Input
                                    className='order-1'
                                    xs={12}
                                    md={8}
                                    title='Modelo'
                                    name={`model.nome`}
                                    value={model.nome}
                                    required={true}
                                    form={form}
                                />
                                <Input
                                    className='order-1'
                                    xs={12}
                                    md={3}
                                    type='number'
                                    title={`Ciclo (dias)`}
                                    name={`model.ciclo`}
                                    value={model.ciclo}
                                    required={true}
                                    helpText='Ciclo de vencimento deste formulário. Caso não tenha ciclo, use dias igual a 0 (zero)'
                                    form={form}
                                />
                                <Check
                                    className='order-2 md:order-3'
                                    xs={2}
                                    md={1}
                                    title='Ativo'
                                    name={`model.status`}
                                    value={model.status}
                                    form={form}
                                />

                                {/* Setores que preenchem */}
                                {setores && (
                                    <>
                                        <Select
                                            xs={12}
                                            md={6}
                                            className='order-5'
                                            multiple
                                            title='Setores que preenchem cabeçalho'
                                            name={`model.setoresPreenchem`}
                                            options={setores ?? []}
                                            value={model?.setoresPreenchem ?? []}
                                            form={form}
                                            helpText='Profissionais deste setor terão permissão para preencher o formulário. Se nenhum profissional for selecionado, o sistema não fará o controle de permissão para este formulário (válido apenas para preenchimento da fábrica)'
                                        />
                                        <Select
                                            xs={12}
                                            md={6}
                                            className='order-5'
                                            multiple
                                            title='Setores que concluem o formulário'
                                            name={`model.setoresConcluem`}
                                            options={setores ?? []}
                                            value={model?.setoresConcluem ?? []}
                                            form={form}
                                            helpText='Profissionais deste setor terão permissão para concluir/aprovar o formulário. Se nenhum profissional for selecionado, o sistema não fará o controle de permissão para este formulário (válido apenas para preenchimento da fábrica)'
                                        />
                                    </>
                                )}

                                <Input
                                    xs={12}
                                    md={12}
                                    className='order-6'
                                    title='Cabeçalho'
                                    name={`model.cabecalho`}
                                    required={false}
                                    value={model.cabecalho}
                                    multiline
                                    rows={4}
                                    form={form}
                                    helpText='Texto que será exibido no cabeçalho do formulário. Adicione aqui instruções e orientações para auxiliar o preenchimento pelo fornecedor.'
                                />
                            </Grid>
                        )}

                        {/* Cabeçalho */}
                        {headers && (
                            <List component='nav' aria-label='main mailbox'>
                                <Grid container spacing={2}>
                                    {/* Cabeçalho */}
                                    <Grid item md={6}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                            Nome do Campo
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                            Mostra
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                            Obrigatório
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                            Ordem
                                        </Typography>
                                    </Grid>

                                    {form.getValues(`header`).map((header, index) => (
                                        <>
                                            <Grid item md={6}>
                                                <Box display='flex' alignItems='center' sx={{ gap: 2 }}>
                                                    <p>{header.nomeCampo}</p>
                                                </Box>
                                            </Grid>

                                            <CheckLabel
                                                xs='12'
                                                md='2'
                                                title=''
                                                name={`header.[${index}].mostra`}
                                                value={
                                                    header.nomeColuna == 'cnpj' ||
                                                    header.nomeColuna == 'razaoSocial' ||
                                                    header.nomeColuna == 'nome' ||
                                                    header.nomeColuna == 'dataAvaliacao' ||
                                                    header.nomeColuna == 'responsavel'
                                                        ? true
                                                        : header.mostra
                                                }
                                                form={form}
                                                helpText={
                                                    header.nomeColuna == 'cnpj' ||
                                                    header.nomeColuna == 'razaoSocial' ||
                                                    header.nomeColuna == 'nome' ||
                                                    header.nomeColuna == 'dataAvaliacao' ||
                                                    header.nomeColuna == 'responsavel'
                                                        ? 'Campo obrigatório'
                                                        : null
                                                }
                                            />

                                            <CheckLabel
                                                xs='12'
                                                md='2'
                                                title=''
                                                name={`header.[${index}].obrigatorio`}
                                                value={
                                                    header.nomeColuna == 'cnpj' ||
                                                    header.nomeColuna == 'razaoSocial' ||
                                                    header.nomeColuna == 'nome' ||
                                                    header.nomeColuna == 'dataAvaliacao' ||
                                                    header.nomeColuna == 'responsavel'
                                                        ? true
                                                        : header.obrigatorio
                                                }
                                                form={form}
                                                helpText={
                                                    header.nomeColuna == 'cnpj' ||
                                                    header.nomeColuna == 'razaoSocial' ||
                                                    header.nomeColuna == 'nome' ||
                                                    header.nomeColuna == 'dataAvaliacao' ||
                                                    header.nomeColuna == 'responsavel'
                                                        ? 'Campo obrigatório'
                                                        : null
                                                }
                                            />

                                            <Input
                                                xs='12'
                                                md='2'
                                                title=''
                                                name={`header.[${index}].ordem`}
                                                value={header.ordem}
                                                type='number'
                                                form={form}
                                            />
                                        </>
                                    ))}
                                </Grid>
                            </List>
                        )}
                    </CardContent>
                </Card>

                {/* Blocos */}
                {!blocks && <Loading />}
                {blocks && (
                    <Blocos
                        blocks={blocks}
                        removeItem={removeItem}
                        addItem={addItem}
                        removeBlock={removeBlock}
                        allOptions={allOptions}
                        openModalConfirmScore={openModalConfirmScore}
                        setOpenModalConfirmScore={setOpenModalConfirmScore}
                        itemScore={itemScore}
                        setItemScore
                        createNew={createNew}
                        viewItem={viewItem}
                        key={change}
                        setores={setores}
                        form={form}
                    />
                )}
                {/* Botão inserir bloco */}
                {type === 'edit' && model && (
                    <Grid item xs={12} md={12} sx={{ mt: 4 }}>
                        <Button
                            variant='outlined'
                            color='primary'
                            startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                            onClick={() => {
                                addBlock()
                            }}
                        >
                            Inserir Bloco
                        </Button>
                    </Grid>
                )}

                {/* Orientações */}
                {orientacoes && (
                    <Card md={12} sx={{ mt: 4 }}>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Input
                                    xs={12}
                                    md={12}
                                    title='Orientações'
                                    name={`orientations.obs`}
                                    required={false}
                                    value={orientacoes?.obs}
                                    multiline
                                    rows={4}
                                    form={form}
                                />
                            </Grid>
                        </CardContent>
                    </Card>
                )}
            </form>

            {/* Modal para criação de novo item */}
            <DialogNewCreate
                title='Novo item'
                size='md'
                openModal={openModalNew}
                setOpenModal={setOpenModalNew}
                handleSave={handleSave}
            >
                <FormItem
                    btnClose
                    handleModalClose={() => setOpenModalNew(false)}
                    setNewChange={setNewChange}
                    newChange={newChange}
                    outsideID={id}
                    handleConfirmNew={handleConfirmNew}
                    manualUrl='/cadastros/item'
                />
            </DialogNewCreate>

            {/* Modal para ver item selecionado */}
            <DialogNewCreate
                title='Detalhes do Item'
                size='md'
                openModal={openModalSelectedItem}
                setOpenModal={setOpenModalSelectedItem}
            >
                <FormItem
                    id={idInfoItem}
                    outsideID={id}
                    btnClose
                    handleModalClose={() => setOpenModalSelectedItem(false)}
                />
            </DialogNewCreate>
        </>
    )
}

export default FormParametrosFornecedor

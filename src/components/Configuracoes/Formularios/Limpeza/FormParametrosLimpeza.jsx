import { useState, useEffect, useContext } from 'react'

import { useForm } from 'react-hook-form'
import { Box, Button, Card, CardContent, Grid, List, Typography } from '@mui/material'
import Router from 'next/router'
import { backRoute } from 'src/configs/defaultConfigs'
import { api } from 'src/configs/api'
import FormHeader from 'src/components/Defaults/FormHeader'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import toast from 'react-hot-toast'
import { toastMessage } from 'src/configs/defaultConfigs'
import Loading from 'src/components/Loading'
import Icon from 'src/@core/components/icon'
import DialogConfirmScore from 'src/components/Defaults/Dialogs/DialogConfirmScore'

//* Custom components
import Select from 'src/components/Form/Select'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import CheckLabel from 'src/components/Form/CheckLabel'
import Remove from 'src/components/Form/Remove'
import HelpText from 'src/components/Defaults/HelpText'
import Blocos from './Blocos'
import DialogDelete from 'src/components/Defaults/Dialogs/DialogDelete'

const FormParametrosLimpeza = ({ id }) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [model, setModel] = useState()
    const [headers, setHeaders] = useState()
    const [allOptions, setAllOptions] = useState(null)
    const [blocks, setBlocks] = useState()
    const [orientacoes, setOrientacoes] = useState()
    const [openModalConfirmScore, setOpenModalConfirmScore] = useState(false)
    const [itemScore, setItemScore] = useState()
    const [savingForm, setSavingForm] = useState(false)
    const [arrRemovedItems, setArrRemovedItems] = useState([])
    const [arrRemovedBlocks, setArrRemovedBlocks] = useState([])
    const [change, setChange] = useState(false)
    const [openModalDeleted, setOpenModalDeleted] = useState(false)

    const router = Router
    const type = 'edit'
    const staticUrl = router.pathname

    const {
        setValue,
        register,
        handleSubmit,
        reset,
        getValues,
        control,
        formState: { errors }
    } = useForm()

    const onSubmit = async values => {
        const data = {
            id: id,
            unidadeID: loggedUnity.unidadeID,
            model: values.model,
            header: values.header,
            blocks: values.blocks,
            arrRemovedBlocks: arrRemovedBlocks,
            arrRemovedItems: arrRemovedItems,
            orientacoes: values.orientations
        }

        setHeaders(null) //? Pra exibir loading

        try {
            await api.put(`${staticUrl}/updateData`, data).then(response => {
                toast.success(toastMessage.successUpdate)
                setSavingForm(!savingForm)
            })
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
        // setChangeItem(!changeItem)
        const newBlock = [...blocks]

        newBlock[index].itens.push({
            ordem: newBlock[index].itens?.length + 1,
            obs: 1,
            status: 1,
            obrigatorio: 1
        })
        setBlocks(newBlock)

        setValue(`blocks.[${index}].itens.[${newBlock[index].itens.length - 1}].new`, true)

        refreshOptions(newBlock[index], index, blocks, allOptions)
    }

    const removeItem = (item, indexBlock, indexItem) => {
        if (blocks[indexBlock].itens.length === 1) {
            toast.error('Você deve ter ao menos um item!')
            return
        }
        // Inserir no array de itens removidos
        let newRemovedItems = [...arrRemovedItems]
        newRemovedItems.push(item)
        setArrRemovedItems(newRemovedItems)

        const updatedBlocks = [...getValues('blocks')]
        updatedBlocks[indexBlock].itens.splice(indexItem, 1)

        setValue('blocks', updatedBlocks)

        setBlocks(updatedBlocks)

        refreshOptions(blocks[indexBlock], indexBlock, blocks, allOptions)
        setChange(!change)
    }

    const removeBlock = (block, index) => {
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
        newRemovedBlocks.push(block.dados.parLimpezaModeloBlocoID)
        setArrRemovedBlocks(newRemovedBlocks)

        // Remove bloco
        const updatedBlocks = [...blocks]
        updatedBlocks.splice(index, 1)
        setBlocks(updatedBlocks)

        setValue(`blocks`, updatedBlocks) //* Remove bloco do formulário

        toast.success('Bloco pré-removido. Salve para concluir!')
    }

    //  Ao clicar no icone de pontuação, abre o modal de confirmação de pontuação e envia para o back o item selecionado
    const openScoreModal = item => {
        setItemScore(null)
        api.post(`/formularios/fornecedor/getItemScore`, { data: item }).then(response => {
            setItemScore(response.data)
        })
        if (setItemScore) {
            setOpenModalConfirmScore(true)
        }
    }

    const addBlock = () => {
        const newBlock = [...getValues('blocks')]
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
        setValue('blocks', newBlock)
        setBlocks(newBlock)
    }

    const getData = () => {
        try {
            api.post(`${staticUrl}/getData`, {
                id: id,
                unidadeID: loggedUnity.unidadeID
            }).then(response => {
                console.log('🚀 ~ response:', response.data)
                //* Estados
                setModel(response.data.model)
                setHeaders(response.data.header)
                setBlocks(response.data.blocks)
                setAllOptions({
                    itens: response.data.options?.itens
                })
                setOrientacoes(response.data.orientations)

                //* Insere os dados no formulário
                reset(response.data)

                setTimeout(() => {
                    response.data?.blocks?.map((block, indexBlock) => {
                        refreshOptions(block, indexBlock, response.data.blocks, response.data.options)
                    })
                }, 3000)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [id, savingForm])

    return (
        <>
            {!headers ? (
                <Loading />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader
                        partialRoute
                        btnCancel
                        btnSave
                        handleSubmit={() => handleSubmit(onSubmit)}
                        type={type}
                        btnDelete
                        onclickDelete={() => setOpenModalDeleted(true)}
                    />
                    {/* Modal que deleta formulario */}
                    <DialogDelete
                        title='Excluir Formulário'
                        description='Tem certeza que deseja exluir o formulario?'
                        params={{
                            route: `/configuracoes/formularios/limpeza/delete/${id}`,
                            messageSucceded: 'Formulário excluído com sucesso!',
                            MessageError: 'Dado possui pendência!'
                        }}
                        open={openModalDeleted}
                        handleClose={() => setOpenModalDeleted(false)}
                    />
                    {/* Modelo */}
                    {model && (
                        <Card>
                            <CardContent>
                                <Grid container spacing={4}>
                                    <Input
                                        className='order-1'
                                        xs={12}
                                        md={8}
                                        title='Modelo'
                                        name={`model.nome`}
                                        value={model.nome}
                                        required={true}
                                        control={control}
                                        errors={errors?.model?.nome}
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
                                        control={control}
                                        errors={errors?.model?.ciclo}
                                        help={{
                                            text: '...',
                                            position: 'top',
                                            gapLeft: '10px'
                                        }}
                                    />
                                    <Check
                                        className='order-2 md:order-3'
                                        xs={2}
                                        md={1}
                                        title='Ativo'
                                        name={`model.status`}
                                        value={model.status}
                                        register={register}
                                    />
                                </Grid>
                            </CardContent>
                        </Card>
                    )}

                    {/* Cabeçalho */}
                    {headers && (
                        <Card sx={{ mt: 4 }}>
                            <CardContent>
                                {/* Lista campos */}
                                <List component='nav' aria-label='main mailbox'>
                                    <Grid container spacing={2}>
                                        {/* Cabeçalho */}
                                        <Grid item md={4} xs={4}>
                                            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                                Nome do Campo
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3} xs={4}>
                                            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                                Mostra no Formulário
                                            </Typography>
                                        </Grid>
                                        <Grid item md={3} xs={4}>
                                            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                                Obrigatório
                                            </Typography>
                                        </Grid>

                                        {headers.map((header, index) => (
                                            <>
                                                <Grid item md={4} xs={6}>
                                                    {header.nomeCampo}
                                                </Grid>
                                                <Grid item md={3} xs={3}>
                                                    <CheckLabel
                                                        title=''
                                                        name={`header.[${index}].mostra`}
                                                        value={header.mostra}
                                                        register={register}
                                                        disabled={header.nomeColuna == 'cnpj' ? true : false}
                                                    />
                                                </Grid>
                                                <Grid item md={3} xs={3}>
                                                    <CheckLabel
                                                        title=''
                                                        name={`header.[${index}].obrigatorio`}
                                                        value={header.obrigatorio}
                                                        register={register}
                                                        disabled={header.nomeColuna == 'cnpj' ? true : false}
                                                    />
                                                </Grid>
                                            </>
                                        ))}
                                    </Grid>
                                </List>
                            </CardContent>
                        </Card>
                    )}

                    {/* Blocos */}
                    {!blocks ? (
                        <Loading />
                    ) : (
                        <Blocos
                            blocks={blocks}
                            errors={errors}
                            control={control}
                            register={register}
                            removeItem={removeItem}
                            addItem={addItem}
                            getValues={getValues}
                            removeBlock={removeBlock}
                            setValue={setValue}
                            openModalConfirmScore={openModalConfirmScore}
                            setOpenModalConfirmScore={setOpenModalConfirmScore}
                            itemScore={itemScore}
                            allOptions={allOptions}
                            key={change}
                        />
                    )}

                    {/* Botão inserir bloco */}
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
                                        control={control}
                                    />
                                </Grid>
                            </CardContent>
                        </Card>
                    )}
                </form>
            )}
        </>
    )
}

export default FormParametrosLimpeza

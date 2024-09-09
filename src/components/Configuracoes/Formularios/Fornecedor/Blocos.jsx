import { Box, Button, Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React, { useState } from 'react'
import Check from 'src/components/Form/Check'
import Input from 'src/components/Form/Input'
import Remove from 'src/components/Form/Remove'
import Select from 'src/components/Form/Select'
import DialogConfirmScore from 'src/components/Defaults/Dialogs/DialogConfirmScore'
import DialogNewCreate from 'src/components/Defaults/Dialogs/DialogNewCreate'

const Blocos = ({
    form,
    blocks,
    removeItem,
    addItem,
    removeBlock,
    openModalConfirmScore,
    setOpenModalConfirmScore,
    itemScore,
    setItemScore,
    createNew,
    viewItem,
    setores
}) => {
    return (
        <>
            {form.getValues('blocks') &&
                blocks &&
                form.getValues('blocks').map((block, index) => (
                    <Card key={index} md={12} sx={{ mt: 4 }}>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Input
                                    className='order-1'
                                    xs={10}
                                    md={1}
                                    title='Sequência'
                                    name={`blocks.[${index}].dados.ordem`}
                                    value={block.dados.ordem}
                                    required={true}
                                    form={form}
                                />

                                <Input
                                    className='order-3 md:order-2'
                                    xs={10}
                                    md={5}
                                    title='Nome do Bloco'
                                    name={`blocks.[${index}].dados.nome`}
                                    value={block.dados.nome}
                                    required={true}
                                    form={form}
                                />

                                <Select
                                    xs={12}
                                    md={4}
                                    className='order-5 md:order-3'
                                    multiple
                                    title='Setores que preenchem'
                                    name={`blocks.[${index}].dados.setores`}
                                    options={setores ?? []}
                                    value={block.dados.setores ?? []}
                                    form={form}
                                    helpText='Nenhum setor selecionado significa que o sistema não fará o controle de permissão por setores'
                                />

                                <Check
                                    className='order-2 md:order-3'
                                    xs={2}
                                    md={1}
                                    title='Ativo'
                                    name={`blocks.[${index}].dados.status`}
                                    value={blocks[index]?.dados?.status}
                                    form={form}
                                />

                                <Check
                                    className='order-4'
                                    xs={2}
                                    md={1}
                                    title='Observação'
                                    name={`blocks.[${index}].dados.obs`}
                                    value={blocks[index]?.dados.obs}
                                    form={form}
                                />
                            </Grid>

                            {/* Itens */}
                            <Typography variant='subtitle1' sx={{ fontWeight: 600, mt: 4 }}>
                                Itens
                            </Typography>
                            {form.getValues(`blocks.[${index}].itens`)?.map((item, indexItem) => (
                                <Grid
                                    id={`item-${index}-${indexItem}`}
                                    key={indexItem}
                                    container
                                    spacing={2}
                                    sx={{ my: 1 }}
                                >
                                    {/* Sequência do item */}
                                    <Input
                                        xs={12}
                                        md={1}
                                        title='Sequência'
                                        name={`blocks.[${index}].itens.[${indexItem}].ordem`}
                                        value={item.ordem}
                                        required={true}
                                        form={form}
                                    />

                                    {/* Item */}
                                    <Select
                                        xs={12}
                                        md={7}
                                        createNew={() => createNew(index, indexItem)}
                                        title={
                                            blocks[index]?.itens[indexItem]?.itemID
                                                ? `Item [${blocks[index]?.itens[indexItem]?.itemID}]`
                                                : 'Item'
                                        }
                                        name={`blocks.[${index}].itens.[${indexItem}].item`}
                                        value={blocks[index]?.itens[indexItem]?.item ?? null}
                                        required={true}
                                        disabled={item.hasPending == 1 ? true : false}
                                        options={blocks[index]?.optionsBlock?.itens}
                                        form={form}
                                    />

                                    {/* Mais detalhes do item */}
                                    <Grid item xs={12} md={1}>
                                        <Box
                                            height='100%'
                                            display='flex'
                                            flexDirection='column'
                                            justifyContent='center'
                                            alignItems='center'
                                        >
                                            {indexItem == 0 && <Typography variant='caption'>Detalhes</Typography>}
                                            <Tooltip
                                                title={
                                                    form.watch(`blocks.[${index}].itens.[${indexItem}].item`)
                                                        ? 'Ver mais detalhes do item selecionado'
                                                        : 'Selecione o item'
                                                }
                                            >
                                                <IconButton
                                                    color='primary'
                                                    size='small'
                                                    onClick={() => {
                                                        form.watch(`blocks.[${index}].itens.[${indexItem}].item`)
                                                            ? viewItem(
                                                                  form.getValues(
                                                                      `blocks.[${index}].itens.[${indexItem}].item`
                                                                  )
                                                              )
                                                            : null
                                                    }}
                                                    sx={{
                                                        opacity: form.watch(
                                                            `blocks.[${index}].itens.[${indexItem}].item`
                                                        )
                                                            ? 1
                                                            : 0.5,
                                                        disabled: form.watch(
                                                            `blocks.[${index}].itens.[${indexItem}].item`
                                                        )
                                                            ? false
                                                            : true
                                                    }}
                                                >
                                                    <Icon icon='octicon:info-16' width='18' />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Grid>

                                    <Check
                                        xs={2}
                                        md={1}
                                        title='Ativo'
                                        index={indexItem}
                                        name={`blocks.[${index}].itens.[${indexItem}].status`}
                                        value={blocks[index]?.itens[indexItem]?.status}
                                        form={form}
                                    />

                                    <Check
                                        xs={2}
                                        md={1}
                                        title='Obrigatório'
                                        index={indexItem}
                                        name={`blocks.[${index}].itens.[${indexItem}].obrigatorio`}
                                        value={blocks[index]?.itens[indexItem]?.obrigatorio}
                                        form={form}
                                    />

                                    {/* Deletar */}
                                    <Remove
                                        xs={2}
                                        md={1}
                                        title={indexItem == 0 ? 'Remover' : ''}
                                        index={index}
                                        removeItem={() => removeItem(index, indexItem, block.itens)}
                                        item={item}
                                        pending={item.hasPending}
                                        textSuccess='Remover este item'
                                        textError='Este item não pode mais ser removido pois já foi respondido em um formulário'
                                    />
                                </Grid>
                            ))}
                            {/* Modal que define a pontuação das respostas */}
                            {openModalConfirmScore && itemScore && (
                                <DialogConfirmScore
                                    openModal={openModalConfirmScore}
                                    setOpenModalConfirmScore={setOpenModalConfirmScore}
                                    itemScore={itemScore}
                                    setItemScore={setItemScore}
                                />
                            )}

                            {/* Botão inserir item */}
                            <Grid container spacing={4} sx={{ mt: 4 }}>
                                <Grid item xs={12} md={12}>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                        onClick={() => {
                                            addItem(index)
                                        }}
                                    >
                                        Inserir Item
                                    </Button>

                                    <Button
                                        variant='outlined'
                                        color='error'
                                        startIcon={<Icon icon='tabler:trash-filled' />}
                                        onClick={() => {
                                            removeBlock(block, index)
                                        }}
                                        sx={{ ml: 2 }}
                                    >
                                        Remover Bloco
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))}

            {/* <DialogNewCreate
                title='Novo item'
                size='md'
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleConclusion={handleCreateNew}
            >
                <Input
                    className='order-1'
                    xs={10}
                    md={1}
                    title='Teste'
                    name={'teste'}
                    required
                    control={control}
                    errors={errors?.teste}
                />
            </DialogNewCreate> */}
        </>
    )
}

export default Blocos

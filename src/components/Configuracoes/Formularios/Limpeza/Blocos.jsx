import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import React from 'react'
import Check from 'src/components/Form/Check'
import Input from 'src/components/Form/Input'
import Remove from 'src/components/Form/Remove'
import Select from 'src/components/Form/Select'

const Blocos = ({
    blocks,
    errors,
    control,
    register,
    getValues,
    removeItem,
    addItem,
    removeBlock,
    setValue,
    allOptions,
    openModalConfirmScore,
    setOpenModalConfirmScore,
    itemScore,
    setItemScore
}) => {
    return (
        getValues('blocks') &&
        blocks &&
        getValues('blocks').map((block, index) => (
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
                            control={control}
                            errors={errors?.blocks?.[index]?.dados?.ordem}
                        />

                        <Input
                            className='order-3 md:order-2'
                            xs={10}
                            md={9}
                            title='Nome do Bloco'
                            name={`blocks.[${index}].dados.nome`}
                            value={block.dados.nome}
                            required={true}
                            control={control}
                            errors={errors?.blocks?.[index]?.dados?.nome}
                        />

                        <Check
                            className='order-2 md:order-3'
                            xs={2}
                            md={1}
                            title='Ativo'
                            name={`blocks.[${index}].dados.status`}
                            value={blocks[index]?.dados.status}
                            register={register}
                        />

                        <Check
                            className='order-4 '
                            xs={2}
                            md={1}
                            title='Observação'
                            name={`blocks.[${index}].dados.obs`}
                            value={blocks[index]?.dados.obs}
                            register={register}
                        />
                    </Grid>

                    {/* Itens */}
                    <Typography variant='subtitle1' sx={{ fontWeight: 600, mt: 4 }}>
                        Itens
                    </Typography>
                    {getValues('blocks') &&
                        block.itens &&
                        block.itens.map((item, indexItem) => (
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
                                    control={control}
                                    errors={errors?.blocks?.[index]?.itens?.[indexItem]?.ordem}
                                />

                                {/* Item */}
                                <Select
                                    xs={12}
                                    md={7}
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
                                    register={register}
                                    setValue={setValue}
                                    control={control}
                                    errors={errors?.blocks?.[index]?.itens?.[indexItem]?.item}
                                />

                                <Check
                                    xs={2}
                                    md={1}
                                    title='Ativo'
                                    index={indexItem}
                                    name={`blocks.[${index}].itens.[${indexItem}].status`}
                                    value={blocks[index]?.itens[indexItem]?.status}
                                    register={register}
                                />

                                <Check
                                    xs={2}
                                    md={1}
                                    title='Obs'
                                    index={indexItem}
                                    name={`blocks.[${index}].itens.[${indexItem}].obs`}
                                    value={blocks[index]?.itens[indexItem]?.obs}
                                    register={register}
                                />

                                <Check
                                    xs={2}
                                    md={1}
                                    title='Obrigatório'
                                    index={indexItem}
                                    name={`blocks.[${index}].itens.[${indexItem}].obrigatorio`}
                                    value={blocks[index]?.itens[indexItem]?.obrigatorio}
                                    register={register}
                                />

                                {/* Deletar */}
                                <Remove
                                    xs={2}
                                    md={1}
                                    title={indexItem == 0 ? 'Remover' : ''}
                                    index={index}
                                    removeItem={() => removeItem(item, index, indexItem)}
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
        ))
    )
}

export default Blocos

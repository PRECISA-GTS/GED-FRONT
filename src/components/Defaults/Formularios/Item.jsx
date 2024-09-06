import { FormControl, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'
import AnexoListMultiple from 'src/components/Anexos/ModeView/AnexoListMultiple'
import Input from 'src/components/Form/Input'
import RadioLabel from 'src/components/Form/RadioLabel'
import DateField from 'src/components/Form/DateField'

const Item = ({
    blockKey,
    index,
    indexItem,
    item,
    errors,
    disabled,
    control,
    register,
    getValues,
    updateResponse,
    handleFileSelect,
    handleRemoveAnexoItem
}) => {
    console.log('🚀 ~ item:', item)
    // if (!item) return null

    const { settings } = useContext(SettingsContext)
    const modeTheme = settings.mode
    const [selectedItem, setSelectedItem] = useState(null)
    const fileInputRef = useRef(null)

    //? Anexos
    const handleFileClick = values => {
        values[blockKey] = item[blockKey] ?? 0 //? blockKey: parFornecedorModeloBlocoID, parRecebimentoMpModeloBlocoID, etc
        fileInputRef.current.click()
        setSelectedItem(values)
    }

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }, [handleFileSelect])

    return (
        <Grid container key={indexItem} spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Hidden do itemID */}
            <input
                type='hidden'
                name={`blocos[${index}].itens[${indexItem}].itemID`}
                defaultValue={item.itemID}
                {...register(`blocos[${index}].itens[${indexItem}].itemID`)}
            />

            {/* Descrição do item */}
            <Grid item xs={12} md={6}>
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontWeight: 400,
                        color:
                            item.obrigatorio &&
                            !item.resposta &&
                            !getValues(`blocos[${index}].itens[${indexItem}].resposta`)
                                ? 'error.main'
                                : 'text.primary'
                    }}
                >
                    {item.nome ? `${item.ordem} - ${item.nome}` : ``}
                </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                    {/* Tipo de alternativa  */}
                    <input
                        type='hidden'
                        name={`blocos[${index}].itens[${indexItem}].tipoAlternativa`}
                        defaultValue={item.alternativa}
                        {...register(`blocos[${index}].itens[${indexItem}].tipoAlternativa`)}
                    />

                    {/* +1 opção pra selecionar (Radio) */}
                    {item && item.alternativas && item.alternativas.length > 1 && (
                        <RadioLabel
                            key={`${index}-${indexItem}`}
                            xs={12}
                            md={12}
                            blockIndex={index}
                            control={control}
                            index={indexItem}
                            defaultValue={item?.resposta?.id}
                            getValues={getValues}
                            values={item.alternativas}
                            name={`blocos[${index}].itens[${indexItem}].resposta`}
                            item={item}
                            disabled={disabled}
                            handleChange={e => updateResponse({ e, item, index, indexItem })}
                            errors={errors?.[index]?.itens[indexItem]?.resposta}
                            // blockForm={item.respostaConfig?.bloqueiaFormulario == 1 ? true : false}
                            blockForm={
                                item.alternativas.find(alt => alt.id == item?.resposta?.id)?.bloqueiaFormulario == 1
                                    ? true
                                    : false
                            }
                        />
                    )}

                    {/* Data */}
                    {item && item.alternativas && item.alternativas.length == 0 && item.alternativa == 'Data' && (
                        <DateField
                            xs={12}
                            md={6}
                            title='Data da avaliação'
                            disabled={disabled}
                            value={item.resposta}
                            type={null}
                            name={`blocos[${index}].itens[${indexItem}].resposta`}
                            errors={errors?.[index]?.itens[indexItem]?.resposta}
                            control={control}
                            register={register}
                        />
                    )}

                    {/* Dissertativa */}
                    {item &&
                        item.alternativas &&
                        item.alternativas.length == 0 &&
                        item.alternativa == 'Dissertativa' && (
                            <Input
                                xs={12}
                                md={6}
                                title='Descreva a resposta'
                                name={`blocos[${index}].itens[${indexItem}].resposta`}
                                value={item.resposta}
                                multiline
                                disabled={disabled}
                                control={control}
                                errors={errors?.[index]?.itens[indexItem]?.resposta}
                            />
                        )}

                    {/* Obs */}
                    {item && item?.resposta?.observacao == 1 && (
                        <Input
                            xs={12}
                            md={12}
                            title='Observação'
                            name={`blocos[${index}].itens[${indexItem}].observacao`}
                            value={item?.observacao}
                            multiline
                            disabled={disabled}
                            control={control}
                        />
                    )}
                </Grid>
            </Grid>

            {/* Texto longo (linha inteira) */}
            {item && item.alternativas && item.alternativas.length == 0 && item.alternativa == 'Dissertativa longa' && (
                <FormControl fullWidth>
                    <Input
                        xs={12}
                        md={12}
                        title='Descreva a resposta'
                        name={`blocos[${index}].itens[${indexItem}].resposta`}
                        rows={6}
                        value={item.resposta}
                        multiline
                        disabled={disabled}
                        control={control}
                        errors={errors?.blocos?.[index]?.itens[indexItem]?.resposta}
                    />
                </FormControl>
            )}

            {/* Configs da resposta (se houver) */}
            {item &&
                item?.resposta?.anexo == 1 &&
                item?.resposta?.anexosSolicitados &&
                item?.resposta?.anexosSolicitados.length > 0 &&
                item?.resposta?.anexosSolicitados.map((anexo, indexAnexo) => (
                    <Grid item xs={12} md={12} sx={{ mb: 5 }}>
                        <AnexoListMultiple
                            modeTheme={modeTheme}
                            key={anexo}
                            handleFileClick={() =>
                                handleFileClick({
                                    ...anexo,
                                    itemOpcaoAnexoID: anexo.itemOpcaoAnexoID
                                })
                            }
                            selectedItem={selectedItem}
                            inputRef={fileInputRef}
                            item={anexo}
                            loadingFile={null}
                            indexBlock={index}
                            indexItem={indexItem}
                            indexAnexo={indexAnexo}
                            handleFileSelect={handleFileSelect}
                            folder='item'
                            handleRemove={handleRemoveAnexoItem}
                            error={errors}
                            disabled={disabled}
                        />
                    </Grid>
                ))}
        </Grid>
    )
}

export default Item

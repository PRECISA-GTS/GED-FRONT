import { useContext, useEffect, useRef, useState } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { FormControl, Grid, Typography } from '@mui/material'

//* Custom inputs
import AnexoListMultiple from 'src/components/Anexos/ModeView/AnexoListMultiple'
import Input from 'src/components/Form/Input'
import RadioLabel from 'src/components/Form/RadioLabel'
import DateField from 'src/components/Form/DateField'

const Item = ({
    blockIndex,
    index,
    setBlocos,
    changeAllOptions,
    totalColumns,
    blockKey,
    handleFileSelect,
    setItemResposta,
    updateResponse,
    handleRemoveAnexoItem,
    values,
    register,
    getValues,
    control,
    errors,
    setValue,
    disabled
}) => {
    const { settings } = useContext(SettingsContext)
    const modeTheme = settings.mode
    const [selectedItem, setSelectedItem] = useState(null)
    const fileInputRef = useRef(null)

    //? Anexos
    const handleFileClick = item => {
        item[blockKey] = values[blockKey] ?? 0 //? blockKey: parFornecedorModeloBlocoID, parRecebimentoMpModeloBlocoID, etc
        fileInputRef.current.click()
        setSelectedItem(item)
    }

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }, [handleFileSelect])

    return (
        <Grid index={index} container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Hidden do itemID */}
            <input
                type='hidden'
                name={`blocos[${blockIndex}].itens[${index}].itemID`}
                defaultValue={values.itemID}
                {...register(`blocos[${blockIndex}].itens[${index}].itemID`)}
            />

            {/* Descrição do item */}
            <Grid item xs={12} md={6}>
                <Typography
                    variant='subtitle1'
                    sx={{
                        fontWeight: 400,
                        color:
                            values.obrigatorio && getValues(`blocos[${blockIndex}].itens[${index}].resposta`) == null
                                ? 'error.main'
                                : 'text.primary'
                    }}
                >
                    {values.nome ? `${values.ordem} - ${values.nome}` : ``}
                </Typography>
            </Grid>

            {/* Alternativas de respostas */}
            <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                    {/* Tipo de alternativa  */}
                    <input
                        type='hidden'
                        name={`blocos[${blockIndex}].itens[${index}].tipoAlternativa`}
                        defaultValue={values.alternativa}
                        {...register(`blocos[${blockIndex}].itens[${index}].tipoAlternativa`)}
                    />

                    {/* +1 opção pra selecionar (Radio) */}
                    {values && values.alternativas && values.alternativas.length > 1 && (
                        <RadioLabel
                            xs={12}
                            md={12}
                            index={index}
                            defaultValue={values?.resposta?.id}
                            totalColumns={totalColumns}
                            values={values.alternativas}
                            name={`blocos[${blockIndex}].itens[${index}].resposta`}
                            changeAllOptions={changeAllOptions}
                            disabled={disabled}
                            handleChange={e => updateResponse({ e, values, blockIndex, index })}
                            errors={errors?.[blockIndex]?.itens[index]?.resposta}
                            blockForm={values.respostaConfig?.bloqueiaFormulario == 1 ? true : false}
                        />
                    )}

                    {/* Data */}
                    {values &&
                        values.alternativas &&
                        values.alternativas.length == 0 &&
                        values.alternativa == 'Data' && (
                            <DateField
                                xs={12}
                                md={6}
                                title='Data da avaliação'
                                disabled={disabled}
                                value={values.resposta}
                                type={null}
                                name={`blocos[${blockIndex}].itens[${index}].resposta`}
                                errors={errors?.[blockIndex]?.itens[index]?.resposta}
                                control={control}
                                register={register}
                            />
                        )}

                    {/* Dissertativa */}
                    {values &&
                        values.alternativas &&
                        values.alternativas.length == 0 &&
                        values.alternativa == 'Dissertativa' && (
                            <Input
                                xs={12}
                                md={6}
                                title='Descreva a resposta'
                                name={`blocos[${blockIndex}].itens[${index}].resposta`}
                                value={values.resposta}
                                multiline
                                disabled={disabled}
                                control={control}
                                errors={errors?.[blockIndex]?.itens[index]?.resposta}
                            />
                        )}

                    {/* Obs */}
                    {values && values.respostaConfig?.observacao == 1 && (
                        <Input
                            xs={12}
                            md={6}
                            title='Observação'
                            name={`blocos[${blockIndex}].itens[${index}].observacao`}
                            value={values?.observacao}
                            multiline
                            disabled={disabled}
                            control={control}
                        />
                    )}
                </Grid>
            </Grid>

            {/* Texto longo (linha inteira) */}
            {values &&
                values.alternativas &&
                values.alternativas.length == 0 &&
                values.alternativa == 'Dissertativa longa' && (
                    <FormControl fullWidth>
                        <Input
                            xs={12}
                            md={12}
                            title='Descreva a resposta'
                            name={`blocos[${blockIndex}].itens[${index}].resposta`}
                            rows={6}
                            value={values.resposta}
                            multiline
                            disabled={disabled}
                            control={control}
                            errors={errors?.blocos?.[blockIndex]?.itens[index]?.resposta}
                        />
                    </FormControl>
                )}

            {/* Configs da resposta (se houver) */}
            {values &&
                values.respostaConfig &&
                values.respostaConfig.anexo == 1 &&
                values.respostaConfig.anexosSolicitados.length > 0 &&
                values.respostaConfig.anexosSolicitados.map((anexo, indexAnexo) => (
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
                            indexBlock={blockIndex}
                            indexItem={index}
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

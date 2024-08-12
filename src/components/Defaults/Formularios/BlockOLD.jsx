import { Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Item from './ItemOLD'
import { useFormContext } from 'react-hook-form'
import RadioLabel from 'src/components/Form/RadioLabel'
import ItemObservacao from './ItemObservacao'
import Input from 'src/components/Form/Input'
const Block = ({
    index,
    setBlocos,
    values,
    blockKey,
    setItemResposta,
    handleFileSelect,
    handleRemoveAnexoItem,
    register,
    getValues,
    control,
    setValue,
    errors,
    disabled,
    blocos
}) => {
    const [changed, setChanged] = useState(false)
    const [totalColumns, setTotalColumns] = useState(0)
    const [selectedColumn, setSelectedColumn] = useState(null) // Adicione um estado para o índice da coluna selecionada
    const [requiresObservation, setRequiresObservation] = useState(false)

    console.log('renderiza block...', values)

    const updateResponse = ({ item, blockIndex, index }) => {
        console.log('🚀 ~ updateResponse item, blockIndex, index:', item, blockIndex, index)

        // values.itens.forEach((item, indexItem) => {
        //     console.log('🚀 ~ updateResponse item.resposta:', item.resposta)
        //     setValue(`blocos[${blockIndex}].itens[${indexItem}].resposta`, item.resposta)
        // })

        // setBlocos(prevBlocos => {
        //     const newBlocos = [...prevBlocos]
        //     newBlocos[index].itens.forEach((item, indexItem) => {
        //         item.resposta = item.resposta
        //     })

        //     return newBlocos
        // })

        // setChanged(!changed)
    }

    const changeAllOptions = (blockIndex, colIndex) => {
        console.log('changeAllOptions', blockIndex, colIndex)

        // Atualize o estado do formulário
        values.itens.forEach((item, indexItem) => {
            setValue(`blocos[${blockIndex}].itens[${indexItem}].resposta`, item.alternativas[colIndex])
        })

        // Atualize o estado do bloco
        setBlocos(prevBlocos => {
            console.log('🚀 ~ prevBlocos:', prevBlocos)
            const newBlocos = [...prevBlocos]
            newBlocos[blockIndex].itens.forEach((item, indexItem) => {
                item.resposta = item.alternativas[colIndex]
                item.respostaConfig = item.respostaConfig
                console.log('🚀 ~ item.respostaConfig:', item.respostaConfig)
            })
            console.log('🚀 ~ newBlocos:', newBlocos)

            return newBlocos
        })

        // Atualize o estado do índice da coluna selecionada
        setSelectedColumn(colIndex)

        // setChanged(!changed)
    }

    const getTotalColumns = () => {
        let total = 0
        values &&
            values.itens &&
            values.itens.map(item => {
                if (item.alternativas.length > total) total = item.alternativas.length
            })
        setTotalColumns(total)
    }

    useEffect(() => {
        console.log('useeffect em values...')
        getTotalColumns()
        // setChanged(!changed)
    }, [values])

    return (
        <Card key={index}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography color='primary' variant='subtitle1' sx={{ fontWeight: 700, mb: 6 }}>
                            {values?.nome}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RadioGroup
                            row
                            value={selectedColumn} // Vincule o valor selecionado aqui
                        >
                            {[...Array(totalColumns)].map((item, indexCol) => (
                                <Grid item xs={12} md={3} key={indexCol}>
                                    <FormControlLabel
                                        value={indexCol}
                                        control={<Radio disabled={disabled} error={errors ? true : false} />}
                                        onChange={() => changeAllOptions(index, indexCol)} // Passa o índice do bloco
                                        label='Todos'
                                        fullWidth
                                        sx={{
                                            '& .MuiFormControlLabel-label': {
                                                color: 'text.secondary',
                                                fontWeight: 600
                                            },
                                            '&:hover': {
                                                '& .MuiFormControlLabel-label': {
                                                    color: 'primary.main'
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            ))}
                        </RadioGroup>
                    </Grid>

                    {values &&
                        values.itens &&
                        values.itens.map((item, indexItem) => (
                            <Grid
                                key={`${index}-${indexItem}`}
                                container
                                spacing={2}
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
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
                                                getValues(`blocos[${index}].itens[${indexItem}].resposta`) == null
                                                    ? 'error.main'
                                                    : 'text.primary'
                                        }}
                                    >
                                        {item.nome ? `${item.ordem} - ${item.nome}` : ``}
                                    </Typography>
                                </Grid>

                                {/* Alternativas de respostas */}
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
                                                totalColumns={totalColumns}
                                                values={item.alternativas}
                                                name={`blocos[${index}].itens[${indexItem}].resposta`}
                                                // changeAllOptions={changeAllOptions}
                                                item={item}
                                                disabled={disabled}
                                                handleChange={e => updateResponse({ item, index, indexItem })}
                                                errors={errors?.[index]?.itens[indexItem]?.resposta}
                                                blockForm={item.respostaConfig?.bloqueiaFormulario == 1 ? true : false}
                                            />
                                        )}

                                        {/* Data */}
                                        {item &&
                                            item.alternativas &&
                                            item.alternativas.length == 0 &&
                                            item.alternativa == 'Data' && (
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
                                        {item && item.respostaConfig?.observacao == 1 && (
                                            <Input
                                                xs={12}
                                                md={6}
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
                                {item &&
                                    item.alternativas &&
                                    item.alternativas.length == 0 &&
                                    item.alternativa == 'Dissertativa longa' && (
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
                                    item.respostaConfig &&
                                    item.respostaConfig.anexo == 1 &&
                                    item.respostaConfig.anexosSolicitados.length > 0 &&
                                    item.respostaConfig.anexosSolicitados.map((anexo, indexAnexo) => (
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
                        ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Block

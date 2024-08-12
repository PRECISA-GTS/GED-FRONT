import { Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useState } from 'react'
import DateField from 'src/components/Form/DateField'
import Input from 'src/components/Form/Input'
import RadioLabel from 'src/components/Form/RadioLabel'

const Block = ({ setBlocos, setValue, blocos, getValues, register, control, disabled, errors }) => {
    if (!blocos) return null

    const [selectedColumn, setSelectedColumn] = useState(Array(blocos.length).fill(null))

    const updateResponse = ({ e, item, index, indexItem }) => {
        const newBlocos = [...blocos]
        const newResponse = item.alternativas.find(item => item.id == e.target.value)
        // Estado
        newBlocos[index].itens[indexItem].resposta = newResponse
        setBlocos(newBlocos)
        // Form
        setValue(`blocos[${index}].itens[${indexItem}].resposta`, newResponse)
    }

    const changeAllOptions = (bloco, blockIndex, colIndex) => {
        bloco.itens.forEach((item, indexItem) => {
            setValue(`blocos[${blockIndex}].itens[${indexItem}].resposta`, item.alternativas[colIndex])
        })

        setBlocos(prevBlocos => {
            const newBlocos = [...prevBlocos]
            newBlocos[blockIndex].itens.forEach((item, indexItem) => {
                item.resposta = item.alternativas[colIndex]
            })
            return newBlocos
        })

        // Atualiza o selectedColumn para o bloco atual
        setSelectedColumn(prevSelectedColumn => {
            const newSelectedColumn = [...prevSelectedColumn]
            newSelectedColumn[blockIndex] = colIndex
            return newSelectedColumn
        })
    }

    const getTotalColumns = bloco => {
        let total = 0
        bloco.itens &&
            bloco.itens.map(item => {
                if (item.alternativas.length > total) total = item.alternativas.length
            })
        return total
    }

    return blocos.map((bloco, index) => (
        <Card key={Math.random()}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography color='primary' variant='subtitle1' sx={{ fontWeight: 700, mb: 6 }}>
                            {bloco?.nome}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RadioGroup
                            row
                            value={selectedColumn[index]} // Vincula o valor selecionado aqui
                        >
                            {[...Array(getTotalColumns(bloco))].map((item, indexCol) => (
                                <Grid item xs={12} md={3} key={indexCol}>
                                    <FormControlLabel
                                        value={indexCol}
                                        control={<Radio disabled={disabled} error={errors ? true : false} />}
                                        onChange={() => changeAllOptions(bloco, index, indexCol)} // Passa o índice do bloco
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

                    {bloco.itens.map((item, indexItem) => (
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
                                            getValues(`blocos[${index}].itens[${indexItem}].resposta`) == null
                                                ? 'error.main'
                                                : 'text.primary'
                                    }}
                                >
                                    {item?.nome}
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
                                            totalColumns={3} // TODO
                                            values={item.alternativas}
                                            name={`blocos[${index}].itens[${indexItem}].resposta`}
                                            item={item}
                                            disabled={disabled}
                                            handleChange={e => updateResponse({ e, item, index, indexItem })}
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
                                    {item && item?.resposta?.observacao == 1 && (
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
                                        {/* <AnexoListMultiple
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
                                        /> */}
                                    </Grid>
                                ))}
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    ))
}

export default Block

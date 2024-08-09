import { Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import Item from './Item'
import { useFormContext } from 'react-hook-form'
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

    const changeAllOptions = (blockIndex, colIndex) => {
        // Atualize o estado do formulário
        values.itens.forEach((item, indexItem) => {
            setValue(`blocos[${blockIndex}].itens[${indexItem}].resposta`, item.alternativas[colIndex])
        })

        // Atualize o estado do bloco
        setBlocos(prevBlocos => {
            const newBlocos = [...prevBlocos]
            newBlocos[blockIndex].itens.forEach((item, indexItem) => {
                item.resposta = item.alternativas[colIndex]
            })

            return newBlocos
        })

        // Atualize o estado do índice da coluna selecionada
        setSelectedColumn(colIndex)

        console.log('trocarrrr')
        setChanged(!changed)
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

    const updateResponse = () => {
        values.itens.forEach((item, indexItem) => {
            setValue(`blocos[${index}].itens[${indexItem}].resposta`, item.resposta)
        })
    }

    useEffect(() => {
        getTotalColumns()
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

                    {/* {values &&
                        values.itens &&
                        values.itens.map((item, indexItem) => (
                            <Item
                                key={indexItem}
                                blockIndex={index}
                                blockKey={blockKey}
                                index={indexItem}
                                setBlocos={setBlocos}
                                totalColumns={totalColumns}
                                updateResponse={updateResponse}
                                changeAllOptions={changeAllOptions}
                                handleFileSelect={handleFileSelect}
                                setItemResposta={setItemResposta}
                                handleRemoveAnexoItem={handleRemoveAnexoItem}
                                values={item}
                                control={control}
                                register={register}
                                getValues={getValues}
                                setValue={setValue}
                                errors={errors}
                                disabled={disabled}
                            />
                        ))} */}

                    {getValues(`blocos[${index}].itens`)?.map((item, indexItem) => (
                        <Item
                            key={Math.random()}
                            blockIndex={index}
                            blockKey={blockKey}
                            index={indexItem}
                            setBlocos={setBlocos}
                            totalColumns={totalColumns}
                            updateResponse={updateResponse}
                            changeAllOptions={changeAllOptions}
                            handleFileSelect={handleFileSelect}
                            setItemResposta={setItemResposta}
                            handleRemoveAnexoItem={handleRemoveAnexoItem}
                            values={item}
                            control={control}
                            register={register}
                            getValues={getValues}
                            setValue={setValue}
                            errors={errors}
                            disabled={disabled}
                        />
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Block

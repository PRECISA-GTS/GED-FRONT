import { Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import AnexoList from 'src/components/Anexos/ModeView/AnexoListMultiple'
import DateField from 'src/components/Form/DateField'
import Input from 'src/components/Form/Input'
import RadioLabel from 'src/components/Form/RadioLabel'
import { SettingsContext } from 'src/@core/context/settingsContext'
import Item from './Item'

const Block = ({
    blockKey,
    setBlocos,
    setValue,
    blocos,
    getValues,
    register,
    control,
    disabled,
    errors,
    handleFileSelect,
    handleRemoveAnexoItem
}) => {
    if (!blocos) return null

    const { settings } = useContext(SettingsContext)
    const modeTheme = settings.mode
    const [selectedColumn, setSelectedColumn] = useState(Array(blocos.length).fill(null))

    const updateResponse = ({ e, item, index, indexItem }) => {
        const newBlocos = [...blocos]
        const newResponse = item.alternativas.find(item => item.id == e.target.value)
        console.log('🚀 ~ newResponse:', newResponse)
        // Estado
        newBlocos[index].itens[indexItem].resposta = newResponse
        setBlocos(newBlocos)
        // Form
        setValue(`blocos[${index}].itens[${indexItem}].resposta`, newResponse)
    }

    const changeAllOptions = (bloco, blockIndex, colIndex) => {
        bloco.itens.forEach((item, indexItem) => {
            if (item.alternativas.length > 0) {
                //? ignora data e dissertativa
                setValue(`blocos[${blockIndex}].itens[${indexItem}].resposta`, item.alternativas[colIndex])
            }
        })

        setBlocos(prevBlocos => {
            const newBlocos = [...prevBlocos]
            newBlocos[blockIndex].itens.forEach((item, indexItem) => {
                if (item.alternativas.length > 0) {
                    //? ignora data e dissertativa
                    item.resposta = item.alternativas[colIndex]
                }
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

    const getTotalCheckItems = bloco => {
        if (!bloco.itens) return 0
        let total = 0
        bloco.itens.map(item => {
            if (item.alternativas.length > 0) total++
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

                    {/* Marcar todos se houver +1 item com checkbox para selecionar */}
                    {getTotalCheckItems(bloco) > 1 && (
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
                    )}

                    {bloco.itens.map((item, indexItem) => (
                        <Item
                            blockKey={blockKey}
                            index={index}
                            indexItem={indexItem}
                            item={item}
                            errors={errors}
                            disabled={disabled}
                            control={control}
                            register={register}
                            getValues={getValues}
                            updateResponse={updateResponse}
                            handleFileSelect={handleFileSelect}
                            handleRemoveAnexoItem={handleRemoveAnexoItem}
                        />
                    ))}
                </Grid>
            </CardContent>
        </Card>
    ))
}

export default Block

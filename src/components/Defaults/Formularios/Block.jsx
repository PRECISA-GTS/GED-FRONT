import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormControlLabel,
    Grid,
    TextField,
    Typography
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import Item from 'src/components/Defaults/Formularios/Item'
import CheckLabel from 'src/components/Form/CheckLabel'
import RadioLabel from 'src/components/Form/RadioLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

const Block = ({
    index,
    setBlocos,
    values,
    blockKey,
    changeAllOptions,
    setItemResposta,
    handleFileSelect,
    handleRemoveAnexoItem,
    register,
    control,
    setValue,
    errors,
    disabled
}) => {
    const [totalColumns, setTotalColumns] = useState(0)
    const [newValues, setNewValues] = useState([])

    const updateResponse = ({ e, values, blockIndex, index }) => {
        setValue(
            `blocos[${blockIndex}].itens[${index}].resposta`,
            values.alternativas.find(item => item.id == e.target.value)
        )
        setItemResposta({
            // parFornecedorModeloBlocoID: values.parFornecedorModeloBlocoID ?? 0,
            // parRecebimentoMpModeloBlocoID: values.parRecebimentoMpModeloBlocoID ?? 0,
            itemID: values.itemID,
            alternativa: values.alternativas.find(item => item.id == e.target.value)
        })
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
        getTotalColumns()
    }, [])

    return (
        <>
            <Card key={index}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <Typography color='primary' variant='subtitle1' sx={{ fontWeight: 700, mb: 6 }}>
                                {values?.nome}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* Marcar todos */}
                            <RadioGroup row>
                                {[...Array(totalColumns)].map((item, indexCol) => (
                                    <Grid item xs={12} md={3}>
                                        <FormControlLabel
                                            key={indexCol}
                                            value={indexCol}
                                            control={<Radio disabled={disabled} error={errors ? true : false} />}
                                            onChange={() => changeAllOptions(indexCol)}
                                            label='Marcar todos'
                                            fullWidth
                                            sx={{
                                                '& .MuiFormControlLabel-label': {
                                                    fontSize: '0.8rem',
                                                    color: 'text.secondary',
                                                    fontWeight: 700
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

                        {/* Itens */}
                        {values &&
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
                                    setValue={setValue}
                                    errors={errors}
                                    disabled={disabled}
                                />
                            ))}
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default Block

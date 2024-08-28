import { Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Item from './Item'
import InfoSetores from './InfoSetores'
import { AuthContext } from 'src/context/AuthContext'

const Block = ({
    bloco,
    index,
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
    handleRemoveAnexoItem,
    status,
    isFornecedorLogged
}) => {
    if (!bloco) return null

    const { user, hasSectorPermission } = useContext(AuthContext)
    const [selectedColumn, setSelectedColumn] = useState(Array(blocos.length).fill(null))
    const [blockPermission, setBlockPermission] = useState(false)

    const updateResponse = ({ e, item, index, indexItem }) => {
        const newBlocos = [...blocos]
        const newResponse = item.alternativas.find(item => item.id == e.target.value)
        newBlocos[index].itens[indexItem].resposta = newResponse
        setBlocos(newBlocos)
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

    const validateBlockPermission = () => {
        //? É formulário de fornecedor e é um fornecedor logado acessando (não possui controle por setor)
        if (isFornecedorLogged) {
            setBlockPermission(true)
            return
        }

        if (status >= 40 || user.papelID !== 1) {
            setBlockPermission(false)
            return
        }

        //? Sem setor pro bloco, todos acessam
        if (!disabled && (user.admin === 1 || bloco.setores.length === 0)) {
            setBlockPermission(true)
            return
        }

        //? Se bloco conter pelo menos 1 setor do profissional
        if (hasSectorPermission(bloco?.setores ?? [])) {
            setBlockPermission(true)
            return
        }
    }

    useEffect(() => {
        console.log('🚀 ~ renderiza bloco useeffect:')
        validateBlockPermission()
    }, [user, bloco, disabled])

    return (
        <Card key={Math.random()}>
            <CardContent>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography color='primary' variant='subtitle1' sx={{ fontWeight: 700, mb: 6 }}>
                            {bloco?.nome}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
                        <InfoSetores data={bloco?.setores ?? []} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 700, mb: 6 }}>
                            Itens
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
                                            control={
                                                <Radio disabled={!blockPermission} error={errors ? true : false} />
                                            }
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
                            key={indexItem}
                            blockKey={blockKey}
                            index={index}
                            indexItem={indexItem}
                            item={item}
                            errors={errors}
                            disabled={!blockPermission}
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
    )
}

export default Block

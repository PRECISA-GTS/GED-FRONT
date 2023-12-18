import { Box, Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import CheckLabel from 'src/components/Form/CheckLabel'
import ListOptionsAnexo from './ListOptionsAnexo'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { set } from 'nprogress'

const ListOptions = ({ data, addAnexo, register, control, errors, handleRemoveAnexo, getValues, watch }) => {
    const [change, setChange] = useState(false)

    const getInitialAnexos = () => {
        const initial = []
        data &&
            data.map(item => {
                initial.push(item.anexo == 1 ? true : false)
            })
        return initial
    }
    const [hasAnexo, setHasAnexo] = useState(getInitialAnexos())

    const handleChangeAnexo = i => {
        const copyHasAnexo = [...hasAnexo]
        copyHasAnexo[i] = !copyHasAnexo[i]
        setHasAnexo(copyHasAnexo)
    }

    return (
        data &&
        data.map((item, index) => (
            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <>
                        <Typography variant='h6' sx={{ my: 3 }}>
                            <Box display='flex' alignItems='center' sx={{ gap: 2 }}>
                                <Icon icon='akar-icons:edit' />
                                <p>{item.nome}</p>
                            </Box>
                        </Typography>
                        <Box display='flex' alignItems='center' sx={{ gap: 4 }}>
                            <Box>
                                <CheckLabel
                                    title='Solicita anexo'
                                    name={`fields.opcoes[${index}].anexo`}
                                    onClick={() => handleChangeAnexo(index)}
                                    value={item.anexo}
                                    register={register}
                                />
                            </Box>
                            <Box>
                                <CheckLabel
                                    title='Gera Não Conformidade (NC)'
                                    name={`fields.opcoes[${index}].bloqueiaFormulario`}
                                    value={item.bloqueiaFormulario}
                                    register={register}
                                    helpText='Se marcada esta resposta, bloqueia a aprovação do formulário e obrigatoriamente gera uma não conformidade (Plano de ação)'
                                />
                            </Box>
                            <Box>
                                <CheckLabel
                                    title='Observação'
                                    name={`fields.opcoes[${index}].observacao`}
                                    value={item.observacao}
                                    register={register}
                                />
                            </Box>
                        </Box>
                    </>

                    {/* Anexos */}
                    {hasAnexo[index] && (
                        <>
                            <Typography variant='body1' sx={{ my: 3 }}>
                                Anexos do item
                            </Typography>
                            <Grid container spacing={4}>
                                {item.anexos.map((anexo, indexAnexo) => (
                                    <ListOptionsAnexo
                                        key={change}
                                        index={index}
                                        indexAnexo={indexAnexo}
                                        data={anexo}
                                        control={control}
                                        handleRemoveAnexo={handleRemoveAnexo}
                                        register={register}
                                        errors={errors}
                                    />
                                ))}
                            </Grid>
                            {/* Botão inserir */}
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    type='button'
                                    variant='outlined'
                                    startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                                    onClick={() => addAnexo(index)}
                                >
                                    Inserir
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        ))
    )
}

export default ListOptions

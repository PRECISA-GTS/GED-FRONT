import { Box, Button, Grid } from '@mui/material'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import Icon from 'src/@core/components/icon'
import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import Router from 'next/router'
import CardList from 'src/components/Defaults/Cards/CardList'
import FormLimpeza from '../FormLimpeza'
import { backRoute } from 'src/configs/defaultConfigs'

const SelectModel = () => {
    const { loggedUnity } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)
    const [model, setModel] = useState(null)
    const [models, setModels] = useState([])
    const router = Router

    const getModels = async () => {
        try {
            const response = await api.post(`${backRoute(router.pathname)}/getModels`, {
                unidadeID: loggedUnity.unidadeID
            })

            if (response.data.length === 1) {
                selectModel(response.data[0].id)
                setModel(response.data[0].id)
            } else {
                //? Mais de um modelo, mostra tela de seleção
                setModels(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const selectModel = modelID => {
        setModel(modelID)
    }

    const handleNewForm = async newFormID => {
        try {
            selectModel(newFormID)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getModels()
    }, [])

    return (
        <>
            {model && <FormLimpeza id={null} modelID={model} />}
            {!model && (
                <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
                    {/* Botão voltar */}
                    <div>
                        <Button
                            onClick={() => {
                                setId(null)
                                router.push(backRoute(router.pathname))
                            }}
                            type='button'
                            variant='outlined'
                            color='primary'
                            size='medium'
                        >
                            <Icon icon='grommet-icons:form-previous-link' />
                        </Button>
                    </div>

                    <Grid container spacing={4}>
                        {models &&
                            models.length > 1 &&
                            models.map((item, index) => (
                                <CardList
                                    key={index}
                                    xs={12}
                                    md={3}
                                    icon='fluent:form-multiple-48-regular'
                                    title={item.nome}
                                    action='new'
                                    subtitle={`Ciclo de ${item.ciclo} dias`}
                                    handleClick={() => handleNewForm(item.id)}
                                />
                            ))}
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default SelectModel

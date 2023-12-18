import { Alert, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import Loading from 'src/components/Loading'
import Select from 'src/components/Form/Select'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import FormHeader from 'src/components/Defaults/FormHeader'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import Router from 'next/router'
import CardList from 'src/components/Defaults/Cards/CardList'

const SelectModel = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)
    const [models, setModels] = useState([])
    const [model, setModel] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = Router
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode

    const {
        reset,
        register,
        getValues,
        setValue,
        control,
        watch,
        handleSubmit,
        clearErrors,
        setError,
        formState: { errors }
    } = useForm()

    const onSubmit = async values => {
        try {
            const data = {
                model: values.model,
                profissionalID: user.profissionalID,
                usuarioID: user.usuarioID,
                unidadeID: loggedUnity.unidadeID
            }

            const response = await api.post(`/formularios/recebimento-mp/insertData`, data)
            if (response) {
                toast.success('Novo formulário criado!')
                setId(response.data.recebimentoMpID)
                router.push(`/formularios/recebimento-mp/`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getModels = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/formularios/recebimento-mp/getModels/${loggedUnity.unidadeID}`)
            console.log(response.data)

            if (response.data.length === 1) {
                //? Somente um modelo, cria direto
                // Envia submit passando o modeloID
                onSubmit({ model: response.data[0] })
            } else {
                //? Mais de um modelo, mostra tela de seleção
                setModels(response.data)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = value => {
        setModel(value)
    }

    const handleNewForm = async newFormID => {
        try {
            onSubmit({
                model: {
                    id: newFormID
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getModels()
    }, [])

    return (
        <>
            <Loading show={isLoading} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
                    {/* Botão voltar */}
                    <div>
                        <Button
                            onClick={() => {
                                setId(null)
                                router.push('/formularios/recebimento-mp/')
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
            </form>
        </>
    )
}

export default SelectModel

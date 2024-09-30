import { useEffect, useState, useContext, Fragment } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import Loading from 'src/components/Loading'
import Icon from 'src/@core/components/icon'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { Box, Grid, Typography } from '@mui/material'
import CardList from 'src/components/Defaults/Cards/CardList'
import CardListHorizontal from 'src/components/Defaults/Cards/CardListHorizontal'
import { AuthContext } from 'src/context/AuthContext'

const ListParametrosFormularios = () => {
    const [result, setResult] = useState(null)
    const router = useRouter()
    const currentLink = router.pathname
    const { loggedUnity } = useContext(AuthContext)
    const { setTitle } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)

    useEffect(() => {
        const getList = async () => {
            await api.post(currentLink, { unidadeID: loggedUnity.unidadeID }).then(response => {
                console.log('🚀 ~ response.data:', response.data)
                setResult(response.data)
                setTitle({
                    icon: 'clarity:form-line',
                    title: 'Formulários',
                    subtitle: {
                        id: id,
                        count: response.data.length,
                        new: false
                    }
                })
            })
        }
        getList()
    }, [id])

    const arrColumns = [
        {
            title: 'ID',
            field: 'id',
            size: 0.2
        },
        {
            title: 'Nome',
            field: 'nome',
            size: 0.8
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    const handleRoute = route => {
        router.push(`${currentLink}/${route}`)
        setId(null)
    }

    const goToForm = id => {
        setId(id)
    }

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!result ? (
                <Loading />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                id == 1 ? (
                    handleRoute('fornecedor')
                ) : id == 2 ? (
                    handleRoute('recebimento-mp')
                ) : id == 3 ? (
                    handleRoute('recebimentomp-naoconformidade')
                ) : id == 4 ? (
                    handleRoute('limpeza')
                ) : id == 5 ? (
                    handleRoute('limpeza-naoconformidade')
                ) : null
            ) : (
                //? Lista tabela de resultados da listagem
                result &&
                result.map((module, indexModule) => (
                    <Box key={indexModule} sx={{ pt: 4 }}>
                        <div className='flex items-center gap-1'>
                            <Icon icon={module.icon} />
                            <p className='text-lg'>{module.forms[0].nome}</p>
                        </div>
                        <Grid container spacing={4} sx={{ pt: 1 }}>
                            {module.forms &&
                                module.forms.map((value, index) => (
                                    <CardListHorizontal
                                        key={index}
                                        xs={12}
                                        md={6}
                                        icon='material-symbols:folder'
                                        title={value?.nome}
                                        subtitle={`${value.total} ${value.total == 1 ? 'modelo' : 'modelos'}`}
                                        action='edit'
                                        handleClick={() => goToForm(value.id)}
                                    />
                                ))}
                        </Grid>
                    </Box>
                ))
            )}
        </>
    )
}

export default ListParametrosFormularios

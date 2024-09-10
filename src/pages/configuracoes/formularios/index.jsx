import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { Grid } from '@mui/material'
import CardList from 'src/components/Defaults/Cards/CardList'

const ListParametrosFormularios = () => {
    const [result, setResult] = useState(null)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)

    useEffect(() => {
        const getList = async () => {
            await api.get(currentLink).then(response => {
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
                ) : null
            ) : (
                //? Lista tabela de resultados da listagem
                <Grid container spacing={4}>
                    {result &&
                        result.map((value, index) => (
                            <CardList
                                key={index}
                                xs={12}
                                md={3}
                                icon='material-symbols:folder'
                                title={value?.nome}
                                subtitle={`Contém os modelos do formulário`}
                                action='edit'
                                handleClick={() => goToForm(value.id)}
                            />
                        ))}
                </Grid>
            )}
        </>
    )
}

export default ListParametrosFormularios

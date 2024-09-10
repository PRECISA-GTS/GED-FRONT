import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

const Usuario = () => {
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id } = useContext(RouteContext)
    const { loggedUnity } = useContext(AuthContext)
    const { setFilteredData, filteredData, setData, startFilter } = useFilter()

    const getList = async () => {
        try {
            const response = await api.get(`${currentLink}/${loggedUnity.unidadeID}`)
            setFilteredData(response.data)
            // console.log('🚀 ~ getList ~ response', response.data)
            setData(response.data)
            setTitle({
                icon: 'material-symbols:engineering-outline',
                title: 'Log',
                subtitle: {
                    id: id,
                    count: response.data.length,
                    new: false
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getList()
        startFilter(<Filters />)
    }, [id])

    const arrColumns = [
        {
            title: 'ID',
            field: 'id',
            size: 0.1
        },
        {
            title: 'Nome',
            field: 'nome',
            size: 0.3
        },
        {
            headerName: 'Usuário',
            field: 'usuario',
            size: 0.2
        },
        {
            headerName: 'Data hora',
            field: 'dataHora',
            type: 'date',
            size: 0.2
        },
        {
            headerName: 'Tabelas',
            field: 'tabelas',
            size: 0.2
        },
        {
            headerName: 'Scripts',
            field: 'scripts',
            size: 0.3
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    return (
        /* Exibe loading enquanto não existe result */
        !filteredData ? (
            <Loading />
        ) : (
            // Lista tabela de resultados da listagem
            <Table result={filteredData} columns={columns} modalLog />
        )
    )
}

export default Usuario

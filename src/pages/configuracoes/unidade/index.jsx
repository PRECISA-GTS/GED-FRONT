import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import TableFilter from 'src/views/table/data-grid/TableFilter'
import Table from 'src/components/Defaults/Table'
import FormUnidade from 'src/components/Configuracoes/unidade/FormUnidade'
import { CardContent } from '@mui/material'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'

import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { Card } from '@mui/material'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

// import axios from 'axios'

const Unidade = () => {
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id } = useContext(RouteContext)
    const { user, loggedUnity } = useContext(AuthContext)
    const { setFilteredData, filteredData, setData, startFilter } = useFilter()

    const getList = async () => {
        await api
            .get(`${currentLink}?admin=${user.admin}&unidadeID=${loggedUnity.unidadeID}&usuarioID=${user.usuarioID}`)
            .then(response => {
                setFilteredData(response.data)
                setData(response.data)
                setTitle({
                    title: 'Unidade',
                    subtitle: {
                        id: id,
                        count: response.data.length,
                        new: false
                    }
                })
            })
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
            size: 0.8
        },
        {
            headerName: 'Status',
            field: {
                name: 'status',
                cor: 'cor'
            },
            size: 0.1
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!filteredData ? (
                <Loading />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormUnidade id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={filteredData} columns={columns} />
            )}
        </>
    )
}

export default Unidade

import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import FormSistemaQualidade from 'src/components/Cadastros/SistemaQualidade/FormSistemaQualidade'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'

import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { Card } from '@mui/material'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

const SistemaQualidade = () => {
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id } = useContext(RouteContext)
    const { filteredData, setFilteredData, setData, startFilter } = useFilter()

    const getList = async () => {
        await api.get(currentLink).then(response => {
            setFilteredData(response.data)
            setData(response.data)
            setTitle({
                title: 'Sistema de Qualidade',
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
                <FormSistemaQualidade id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={filteredData} columns={columns} />
            )}
        </>
    )
}

export default SistemaQualidade

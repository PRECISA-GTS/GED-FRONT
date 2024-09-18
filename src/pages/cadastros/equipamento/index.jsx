import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import FormEquipamento from 'src/components/Cadastros/Equipamento/FormEquipamento'
import Table from 'src/components/Defaults/Table'
import { RouteContext } from 'src/context/RouteContext'
import { ParametersContext } from 'src/context/ParametersContext'
import { AuthContext } from 'src/context/AuthContext'

import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

const Equipamento = () => {
    const router = useRouter()
    const { id } = useContext(RouteContext)
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { loggedUnity } = useContext(AuthContext)
    const { filteredData, setFilteredData, setData, startFilter } = useFilter()

    const getList = async () => {
        await api.post(currentLink, { unidadeID: loggedUnity.unidadeID }).then(response => {
            setFilteredData(response.data)
            setData(response.data)
            setTitle({
                icon: 'game-icons:manual-meat-grinder',
                title: 'Equipamento',
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
                <FormEquipamento id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={filteredData} columns={columns} />
            )}
        </>
    )
}

export default Equipamento

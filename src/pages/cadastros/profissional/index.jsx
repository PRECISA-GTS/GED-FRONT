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
import FormProfissional from 'src/components/Cadastros/profissional/FormProfissional'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

const Usuario = () => {
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id } = useContext(RouteContext)
    const { user, loggedUnity } = useContext(AuthContext)
    const { filteredData, setFilteredData, setData, startFilter } = useFilter()

    const getList = async () => {
        await api
            .get(`${currentLink}?unidadeID=${loggedUnity.unidadeID}&papelID=${loggedUnity.papelID}&admin=${user.admin}`)
            .then(response => {
                setFilteredData(response.data)
                setData(response.data)
                setTitle({
                    icon: 'material-symbols:engineering-outline',
                    title: 'Profissional',
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
            id ? (
                <FormProfissional id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={filteredData} columns={columns} />
            )}
        </>
    )
}

export default Usuario

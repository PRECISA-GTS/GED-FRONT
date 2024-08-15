import { useEffect, useContext } from 'react'
import { api } from 'src/configs/api'
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
import FormSetor from 'src/components/Cadastros/Setor/FormSetor'

const Setor = () => {
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
                title: 'Setor',
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
            size: 0.3
        },
        {
            title: 'Profissionais',
            field: 'profissionais',
            size: 0.5
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
                <FormSetor id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={filteredData} columns={columns} />
            )}
        </>
    )
}

export default Setor

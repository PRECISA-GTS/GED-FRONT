import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { AuthContext } from 'src/context/AuthContext'
import Loading from 'src/components/Loading'
import { useRouter } from 'next/router'
import { configColumns } from 'src/configs/defaultConfigs'
import { useFilter } from 'src/context/FilterContext'
import Filters from '../../Filters'

const ListLimpeza = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { startFilter, setFilteredDataRecebimentoMP, filteredDataRecebimentoMP, setDataRecebimentoMP } = useFilter()
    const [status, setStatus] = useState({
        module: 'limpeza',
        type: 'open'
    })

    const getList = async () => {
        await api
            .post(`${currentLink}/getList`, {
                unidadeID: loggedUnity.unidadeID,
                papelID: user.papelID,
                usuarioID: user.usuarioID,
                status
            })
            .then(response => {
                setFilteredDataRecebimentoMP(response.data)
                setDataRecebimentoMP(response.data)
                setTitle({
                    icon: 'carbon:clean',
                    title: 'Limpeza e Higienização',
                    subtitle: {
                        id: null,
                        count: response.data.length,
                        new: false
                    }
                })
            })
    }

    useEffect(() => {
        getList()
        startFilter(<Filters />, false)
    }, [router.query, status])

    const arrColumns = [
        {
            headerName: 'ID',
            field: 'id',
            size: 0.4,
            variant: 'naoConformidade'
        },
        {
            headerName: 'Data Inicial',
            field: 'dataInicio',
            size: 0.4,
            type: 'date'
        },
        {
            headerName: 'Data Final',
            field: 'dataFim',
            size: 0.4,
            type: 'date'
        },
        {
            headerName: 'Setor',
            field: 'setor',
            size: 1
        },
        {
            headerName: 'Modelo',
            field: 'modelo',
            size: 1
        },
        {
            headerName: 'Tipo',
            field: 'limpezaHigienizacao',
            size: 1
        },
        {
            headerName: 'Status',
            field: {
                name: 'status',
                cor: 'cor'
            },
            size: 0.5,
            type: 'statusSteps'
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!filteredDataRecebimentoMP ? (
                <Loading show />
            ) : (
                <Table
                    key={filteredDataRecebimentoMP}
                    result={filteredDataRecebimentoMP}
                    columns={columns}
                    status={status}
                    setStatus={setStatus}
                />
            )}
        </>
    )
}

export default ListLimpeza

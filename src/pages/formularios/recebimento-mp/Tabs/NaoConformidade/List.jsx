import { useEffect, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { AuthContext } from 'src/context/AuthContext'
import Loading from 'src/components/Loading'
import { useRouter } from 'next/router'
import { configColumns } from 'src/configs/defaultConfigs'
import { useFilter } from 'src/context/FilterContext'
import Filters from '../../Filters'

const ListNaoConformidade = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { startFilter, setFilteredDataRecebimentoMP, filteredDataRecebimentoMP, setDataRecebimentoMP } = useFilter()

    const getList = async () => {
        await api
            .get(
                `/formularios/recebimento-mp/nao-conformidade/getList/${loggedUnity.unidadeID}/${user.papelID}/${user.usuarioID}`
            )
            .then(response => {
                setFilteredDataRecebimentoMP(response.data)
                setDataRecebimentoMP(response.data)
                setTitle({
                    title: 'Não Conformidades do Recebimento de MP',
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
    }, [router.query])

    const arrColumns = [
        {
            headerName: 'ID',
            field: 'id',
            size: 0.1
        },
        {
            headerName: 'Data',
            field: 'data',
            size: 0.7,
            type: 'date'
        },
        {
            headerName: 'Recebimento de MP',
            field: 'recebimentoMpID',
            size: 1
        },
        {
            headerName: 'Fornecedor',
            field: 'fornecedor',
            size: 1
        },
        {
            headerName: 'Produtos',
            field: 'produtos',
            size: 1
        },
        {
            headerName: 'Status',
            field: {
                name: 'status',
                cor: 'cor'
            },
            size: 1,
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
                <Table key={filteredDataRecebimentoMP} result={filteredDataRecebimentoMP} columns={columns} />
            )}
        </>
    )
}

export default ListNaoConformidade

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

const ListRecebimentoMP = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { startFilter, setFilteredDataRecebimentoMP, filteredDataRecebimentoMP, setDataRecebimentoMP } = useFilter()

    const getList = async () => {
        await api
            .get(`${currentLink}/getList/${loggedUnity.unidadeID}/${user.papelID}/${user.usuarioID}`)
            .then(response => {
                setFilteredDataRecebimentoMP(response.data)
                setDataRecebimentoMP(response.data)
                setTitle({
                    icon: 'icon-park-outline:receive',
                    title: 'Recebimento de MP',
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

    const arrColumns =
        user.papelID == 2
            ? [
                  {
                      headerName: 'ID',
                      field: 'id',
                      size: 0.1,
                      variant: 'naoConformidade'
                  },
                  {
                      headerName: 'Data',
                      field: 'data',
                      size: 0.1,
                      type: 'date'
                  },
                  {
                      headerName: 'Fábrica',
                      field: 'fabrica',
                      size: 0.2
                  },
                  {
                      headerName: 'NF',
                      field: 'nf',
                      size: 1
                  },
                  {
                      headerName: 'Produtos',
                      field: 'produtos',
                      size: 1
                  },
                  {
                      headerName: 'Modelo',
                      field: 'modelo',
                      size: 0.2
                  },
                  {
                      headerName: 'Status',
                      field: {
                          name: 'status',
                          cor: 'cor'
                      },
                      size: 0.2,
                      type: 'statusSteps'
                  }
              ]
            : [
                  {
                      headerName: 'ID',
                      field: 'id',
                      size: 0.4,
                      variant: 'naoConformidade'
                  },
                  {
                      headerName: 'Data',
                      field: 'data',
                      size: 0.4,
                      type: 'date'
                  },
                  {
                      headerName: 'Fornecedor',
                      field: 'fornecedor',
                      size: 1.5
                  },
                  {
                      headerName: 'NF',
                      field: 'nf',
                      size: 1
                  },
                  {
                      headerName: 'Produtos',
                      field: 'produtos',
                      size: 1
                  },
                  {
                      headerName: 'Modelo',
                      field: 'modelo',
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

export default ListRecebimentoMP

import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import FormRecebimentoMp from 'src/components/RecebimentoMP/FormRecebimentoMp'
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

const RecebimentoMP = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)
    const { startFilter, setFilteredDataRecebimentoMP, filteredDataRecebimentoMP, setDataRecebimentoMP } = useFilter()

    const getList = async () => {
        await api
            .get(`${currentLink}/getList/${loggedUnity.unidadeID}/${user.papelID}/${user.usuarioID}`)
            .then(response => {
                setFilteredDataRecebimentoMP(response.data)
                setDataRecebimentoMP(response.data)
                setTitle({
                    title: 'Recebimento de MP',
                    subtitle: {
                        id: id,
                        count: response.data.length,
                        new: false
                    }
                })
            })
    }

    useEffect(() => {
        // const filter = router.query.filter === '2' ? true : false
        getList()
        startFilter(<Filters />, false)
    }, [id, setId, router.query])

    // useEffect(() => {
    //     getList()
    //     startFilter(<Filters />, null)
    // }, [id])

    const arrColumns =
        user.papelID == 2
            ? [
                  {
                      headerName: 'ID',
                      field: 'id',
                      size: 0.1
                  },
                  {
                      headerName: 'Data',
                      field: 'data',
                      size: 0.1,
                      type: 'date',
                      variant: 'naoConformidade'
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
                      size: 0.1
                  },
                  {
                      headerName: 'Data',
                      field: 'data',
                      size: 0.7,
                      type: 'date',
                      variant: 'naoConformidade'
                  },
                  {
                      headerName: 'Fornecedor',
                      field: 'fornecedor',
                      size: 1
                  },
                  {
                      headerName: 'NF',
                      field: 'nf',
                      size: 0.6
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
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormRecebimentoMp id={id} model={null} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table key={filteredDataRecebimentoMP} result={filteredDataRecebimentoMP} columns={columns} />
            )}
        </>
    )
}

export default RecebimentoMP

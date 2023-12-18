import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import FormRecebimentoMP from 'src/components/RecebimentoMP/FormRecebimentoMP'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'

import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'

const RecebimentoMP = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [result, setResult] = useState(null)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id } = useContext(RouteContext)

    const getList = async () => {
        await api
            .get(`${currentLink}/getList/${loggedUnity.unidadeID}/${user.papelID}/${user.usuarioID}`)
            .then(response => {
                setResult(response.data)
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
        getList()
    }, [id])

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
                      type: 'date'
                  },
                  {
                      headerName: 'Fábrica',
                      field: 'fabrica',
                      size: 0.2
                  },
                  {
                      headerName: 'Profissional',
                      field: 'profissional',
                      size: 0.2
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
                      size: 0.2
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
                      size: 0.1,
                      type: 'date'
                  },
                  {
                      headerName: 'Fornecedor',
                      field: 'fornecedor',
                      size: 0.2
                  },
                  {
                      headerName: 'Profissional',
                      field: 'profissional',
                      size: 0.2
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
                      size: 0.2
                  }
              ]

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!result ? (
                <Loading show />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormRecebimentoMP id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={result} columns={columns} />
            )}
        </>
    )
}

export default RecebimentoMP

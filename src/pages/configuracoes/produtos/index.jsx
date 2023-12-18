import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import TableCheck from 'src/components/Defaults/TableCheck'
import FormProdutos from 'src/components/Configuracoes/Produtos/FormProdutos'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'

import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { Alert, Card } from '@mui/material'
import { toast } from 'react-hot-toast'

const Produtos = () => {
    const [result, setResult] = useState(null)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { user, loggedUnity } = useContext(AuthContext)
    const { id } = useContext(RouteContext)

    const getList = async () => {
        await api.post(currentLink, { unidadeID: loggedUnity.unidadeID }).then(response => {
            setResult(response.data)
            setTitle({
                title: 'Produtos',
                subtitle: {
                    id: id,
                    count: response.data.length,
                    new: false
                }
            })
        })
    }

    const updateData = async () => {
        await api
            .post(`${currentLink}/updateData`, {
                unidadeID: loggedUnity.unidadeID,
                usuarioID: user.usuarioID,
                products: selectedRows
            })
            .then(response => {
                setHasChange(false)
                toast.success('Dados atualizados com sucesso!')
                getList()
            })
    }

    useEffect(() => {
        getList()
    }, [id])

    //? Configura linhas pra serem iniciadas já selecionadas
    const getSelectedRows = () => {
        return result ? result.filter(row => row.checked === 1).map(row => row.id) : []
    }

    const [selectedRows, setSelectedRows] = useState(getSelectedRows())
    const [hasChange, setHasChange] = useState(false)

    useEffect(() => {
        if (result) setSelectedRows(getSelectedRows())
    }, [result])

    const arrColumns = [
        {
            headerName: 'ID',
            field: 'id',
            size: 0.1
        },
        {
            headerName: 'ID MP',
            field: 'idMinisterio',
            size: 0.1
        },
        {
            headerName: 'Nome',
            field: 'nome',
            size: 0.6
        },
        {
            headerName: 'Descrição',
            field: 'descricao',
            size: 0.2
        },
        {
            headerName: 'Categoria',
            field: 'categoria',
            size: 0.2
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
            {!result ? (
                <Loading />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormProdutos id={id} />
            ) : (
                <>
                    <Alert severity='info' sx={{ mb: 2 }}>
                        Somente os produtos marcados ficarão disponíveis para uso nesta unidade.
                    </Alert>
                    <Alert severity='warning' sx={{ mb: 2 }}>
                        Produtos já vinculados em outros registros o sistema não permitirá desmarcar.
                    </Alert>

                    {/* Lista tabela de resultados da listagem */}
                    <TableCheck
                        result={result}
                        columns={columns}
                        btnNew={false}
                        btnPrint={false}
                        btnSave={true}
                        handleSave={updateData}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        hasChange={hasChange}
                        setHasChange={setHasChange}
                    />
                </>
            )}
        </>
    )
}

Produtos.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default Produtos

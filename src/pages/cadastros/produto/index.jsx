import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import FormProduto from 'src/components/Cadastros/Produto/FormProduto'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'

const Produto = () => {
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { loggedUnity } = useContext(AuthContext)
    const { id } = useContext(RouteContext)
    const { filteredData, setFilteredData, setData, startFilter } = useFilter()

    const getList = async () => {
        await api.get(`${currentLink}/${loggedUnity.unidadeID}`).then(response => {
            setFilteredData(response.data)
            setData(response.data)
            setTitle({
                icon: 'ph:plant',
                title: 'Produto',
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
            headerName: 'ID',
            field: 'id',
            size: 0.1
        },
        {
            headerName: 'Nome',
            field: 'nome',
            size: 0.4
        },
        {
            headerName: 'Classificação',
            field: 'classificacao',
            size: 0.4
        },
        {
            headerName: 'Unidade de medida',
            field: 'unidadeMedida',
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
            {!filteredData ? (
                <Loading />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormProduto id={id} />
            ) : (
                //? Lista tabela de resultados da listagem
                <Table result={filteredData} columns={columns} />
            )}
        </>
    )
}

export default Produto

import { useEffect, useState, useContext } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import FormParametrosRecebimentoMpNaoConformidade from 'src/components/Configuracoes/Formularios/RecebimentoMpNaoConformidade/FormParametrosRecebimentoMpNaoConformidade'
import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { AuthContext } from 'src/context/AuthContext'
import { Card } from '@material-ui/core'
import SelectModel from './SelectModel'
import EmptyForms from '../EmptyForms'

const ListParametrosRecebimentoMpNaoConformidade = () => {
    const [result, setResult] = useState(null)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)
    const { loggedUnity } = useContext(AuthContext)

    useEffect(() => {
        const getList = async () => {
            console.log('getList')
            await api.get(`${currentLink}/getList/${loggedUnity.unidadeID}`).then(response => {
                setResult(response.data)
                setTitle({
                    icon: 'clarity:form-line',
                    title: 'Formulários de Não Conformidade do Recebimento de MP',
                    subtitle: {
                        id: id,
                        count: response.data.length,
                        new: false
                    }
                })
            })
        }
        getList()
    }, [id])

    const arrColumns = [
        {
            title: 'ID',
            field: 'id',
            size: 0.2
        },
        {
            title: 'Nome',
            field: 'nome',
            size: 0.8
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    return (
        <>
            {!result ? (
                <Loading show />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormParametrosRecebimentoMpNaoConformidade id={id} />
            ) : (
                <>
                    {result && result.length > 0 && <SelectModel values={result} />}
                    {result && result.length === 0 && <EmptyForms />}
                </>
            )}
        </>
    )
}

export default ListParametrosRecebimentoMpNaoConformidade

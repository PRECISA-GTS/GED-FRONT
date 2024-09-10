import SelectModel from 'src/components/RecebimentoMp/SelectModel'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import RecebimentoMpNaoConformidade from 'src/components/RecebimentoMp/NaoConformidade'
import { RouteContext } from 'src/context/RouteContext'

const RecebimentoMpNovo = () => {
    const { setTitle } = useContext(ParametersContext)
    const { modelID, recebimentoMpID } = useContext(RouteContext)
    const router = useRouter()

    useEffect(() => {
        setTitle({
            title:
                router.query?.aba == 'nao-conformidade'
                    ? 'Não Conformidade do Recebimento de MP'
                    : 'Recebimento de Matéria Prima',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [router])

    return router.query?.aba == 'nao-conformidade' ? (
        <RecebimentoMpNaoConformidade id={null} recebimentoMpID={recebimentoMpID} modelID={modelID} />
    ) : (
        <SelectModel />
    )
}

export default RecebimentoMpNovo

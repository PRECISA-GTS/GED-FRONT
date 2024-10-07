import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import NaoConformidade from 'src/components/Limpeza/NaoConformidade/HeaderLimpezaNC'
import { RouteContext } from 'src/context/RouteContext'
import SelectModel from 'src/components/Limpeza/SelectModel'

const LimpezaNovo = () => {
    const { setTitle } = useContext(ParametersContext)
    const { modelID, limpezaID } = useContext(RouteContext)
    const router = useRouter()

    useEffect(() => {
        setTitle({
            title:
                router.query?.aba == 'nao-conformidade'
                    ? 'Não Conformidade da Limpeza e Higienização'
                    : 'Limpeza e Higienização',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [router])

    return router.query?.aba == 'nao-conformidade' ? (
        <NaoConformidade id={null} limpezaID={limpezaID} modelID={modelID} />
    ) : (
        <SelectModel />
    )
}

export default LimpezaNovo

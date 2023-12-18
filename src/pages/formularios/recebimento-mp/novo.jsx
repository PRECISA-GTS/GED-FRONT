import FormRecebimentoMp from 'src/components/RecebimentoMp/FormRecebimentoMp'
import SelectModel from 'src/components/RecebimentoMp/SelectModel'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'

const RecebimentoMpNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Recebimento de Matéria Prima',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <SelectModel />
}

export default RecebimentoMpNovo

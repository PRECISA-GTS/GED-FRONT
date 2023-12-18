import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormSistemaQualidade from 'src/components/Cadastros/SistemaQualidade/FormSistemaQualidade'

const SistemaQualidadeNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Sistema de Qualidade',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormSistemaQualidade />
}

export default SistemaQualidadeNovo

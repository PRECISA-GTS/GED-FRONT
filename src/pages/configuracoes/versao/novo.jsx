import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormVersao from 'src/components/Configuracoes/Versao/FormVersao'

const VersaoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Versão',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormVersao />
}

export default VersaoNovo

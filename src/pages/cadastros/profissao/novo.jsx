import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormProfissao from 'src/components/Cadastros/Profissao/FormProfissao'

const ProfissaoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Profissão',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormProfissao />
}

export default ProfissaoNovo

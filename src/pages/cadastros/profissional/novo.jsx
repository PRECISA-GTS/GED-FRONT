import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormProfissional from 'src/components/Cadastros/profissional/FormProfissional'

const ProfissinalNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Profissional',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormProfissional />
}

export default ProfissinalNovo

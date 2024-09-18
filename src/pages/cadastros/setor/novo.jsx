import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormSetor from 'src/components/Cadastros/Setor/FormSetor'

const SetorNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Setor',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormSetor />
}

export default SetorNovo

import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormDepartamento from 'src/components/Cadastros/Departamento/FormDepartamento'

const DepartamentoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Departamento',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormDepartamento />
}

export default DepartamentoNovo

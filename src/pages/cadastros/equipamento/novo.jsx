import FormEquipamento from 'src/components/Cadastros/Equipamento/FormEquipamento'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'

const EquipamentoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Equipamento',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormEquipamento />
}

export default EquipamentoNovo

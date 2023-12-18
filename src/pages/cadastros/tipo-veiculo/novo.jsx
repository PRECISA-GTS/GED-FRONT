import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormTipoVeiculo from 'src/components/Cadastros/TipoVeiculo/FormTipoVeiculo'

const TipoVeiculoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Tipo de Veículo',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormTipoVeiculo />
}

export default TipoVeiculoNovo

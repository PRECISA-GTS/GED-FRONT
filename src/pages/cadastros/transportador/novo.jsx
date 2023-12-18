import FormTransportador from 'src/components/Cadastros/Transportador/FormTransportador'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'

const TransportadorNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Transportador',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormTransportador />
}

export default TransportadorNovo

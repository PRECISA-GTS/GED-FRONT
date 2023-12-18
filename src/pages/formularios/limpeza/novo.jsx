import SelectModel from 'src/components/Limpeza/SelectModel'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'

const LimpezaNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Limpeza',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <SelectModel />
}

export default LimpezaNovo

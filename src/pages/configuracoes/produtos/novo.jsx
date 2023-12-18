import FormProdutos from 'src/components/Configuracoes/Produtos/FormProdutos'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'

const TransportadorNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Produtos',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormProdutos />
}

TransportadorNovo.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default TransportadorNovo

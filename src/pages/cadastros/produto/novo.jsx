import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormProduto from 'src/components/Cadastros/Produto/FormProduto'

const ProdutoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Produto',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormProduto />
}

ProdutoNovo.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default ProdutoNovo

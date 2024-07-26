import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormClassificacaoProduto from 'src/components/Cadastros/ClassificacaoProduto/FormClassificacaoProduto'

const ClassificacaoProdutoNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Classificação de Produtos',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormClassificacaoProduto />
}

ClassificacaoProdutoNovo.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default ClassificacaoProdutoNovo

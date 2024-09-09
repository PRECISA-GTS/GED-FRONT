import { useEffect, useState } from 'react'
import Input from 'src/components/Form/Input'

const ItemObservacao = ({ blockIndex, itemIndex, values, control, disabled }) => {
    const [observacao, setObservacao] = useState(values?.observacao || '') // Inicializa com o valor do item

    // Use o efeito para atualizar o estado sempre que values mudar
    useEffect(() => {
        setObservacao(values?.observacao || '')
    }, [values])

    console.log('renderiza obs...', values.respostaConfig?.observacao)

    return values && values.respostaConfig?.observacao == 1 ? (
        <Input
            key={`${blockIndex}-${itemIndex}`}
            xs={12}
            md={6}
            title='Observação'
            name={`blocos[${blockIndex}].itens[${itemIndex}].observacao`}
            value={values?.observacao}
            // value={observacao} // Use o estado observacao
            multiline
            disabled={disabled}
            form={form}
        />
    ) : null
}

export default ItemObservacao

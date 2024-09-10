import React from 'react'
import Check from 'src/components/Form/Check'
import Input from 'src/components/Form/Input'
import Remove from 'src/components/Form/Remove'

const GrupoAnexoList = ({ getValues, removeItem, form, type }) => {
    return (
        getValues('items') &&
        getValues('items').map((item, index) => (
            <>
                <Input xs={12} md={3} title='Nome' name={`items[${index}].nome`} required={true} form={form} />

                <Input
                    xs={12}
                    md={6}
                    title='Descrição'
                    name={`items[${index}].descricao`}
                    required={false}
                    form={form}
                />

                <Check
                    xs={4}
                    md={1}
                    title='Ativo'
                    index={index}
                    name={`items[${index}].status`}
                    value={item.status}
                    typePage={type}
                    form={form}
                />

                <Check
                    xs={4}
                    md={1}
                    title='Obrigatório'
                    index={index}
                    name={`items[${index}].obrigatorio`}
                    value={item.obrigatorio}
                    typePage={type}
                    form={form}
                />

                <Remove
                    xs={4}
                    md={1}
                    title='Remover'
                    index={index}
                    removeItem={removeItem}
                    item={item}
                    pending={item.hasPending}
                    textSuccess='Remover este item'
                    textError='Este item não pode mais ser removido pois possui anexo vinculado a ele'
                />
            </>
        ))
    )
}

export default GrupoAnexoList

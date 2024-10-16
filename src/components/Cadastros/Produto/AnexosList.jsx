import React, { Fragment, useEffect, useState } from 'react'
import Input from 'src/components/Form/Input'
import Check from 'src/components/Form/Check'
import Remove from 'src/components/Form/Remove'
import Select from 'src/components/Form/Select'
import { Divider } from '@mui/material'
import { api } from 'src/configs/api'

const AnexosList = ({ removeAnexo, type, form }) => {
    const [formularios, setFormularios] = useState([])

    const getFormularios = async () => {
        const response = await api.post(`/cadastros/produto/getFormularios`)
        setFormularios(response.data)
    }

    useEffect(() => {
        getFormularios()
    }, [])

    return (
        form.getValues('anexos') &&
        form.getValues('anexos').map((item, index) => (
            <Fragment key={index}>
                <Input md={6} title='Nome' name={`anexos[${index}].nome`} required form={form} />
                <Select
                    xs={12}
                    md={3}
                    title='Formulário'
                    name={`anexos[${index}].formulario`}
                    value={item.formulario}
                    required={true}
                    options={formularios ?? []}
                    form={form}
                    helpText='Formulário em que será solicitado esse anexo para este produto'
                />
                <Check
                    xs={1}
                    md={1}
                    title='Obrigatório'
                    name={`anexos[${index}].obrigatorio`}
                    value={item.obrigatorio == 1 ? true : false}
                    typePage={type}
                    form={form}
                />
                <Check
                    xs={1}
                    md={1}
                    title='Ativo'
                    name={`anexos[${index}].status`}
                    value={item.obrigatorio == 1 ? true : false}
                    typePage={type}
                    form={form}
                />
                <Remove
                    xs={4}
                    md={1}
                    title='Remover'
                    index={index}
                    removeItem={removeAnexo}
                    item={item}
                    pending={item.hasPending}
                    textSuccess='Remover este item'
                    textError='Este item não pode mais ser removido pois possui anexo vinculado a ele'
                />
                <Input
                    xs={11}
                    md={12}
                    multiline
                    items={4}
                    title='Descrição (opcional)'
                    name={`anexos[${index}].descricao`}
                    form={form}
                />

                {index < form.getValues('anexos').length - 1 && <Divider />}
            </Fragment>
        ))
    )
}

export default AnexosList

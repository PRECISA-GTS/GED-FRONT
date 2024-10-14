import { Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Item from 'src/components/Defaults/Formularios/Item'
import CheckLabel from 'src/components/Form/CheckLabel'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const Equipamento = ({ form, data, index }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [produtos, setProdutos] = useState([])

    const getProdutosLimpeza = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/cadastros/produto/getProdutosLimpeza`, {
                unidadeID: loggedUnity.unidadeID
            })
            setProdutos(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const updateResponse = ({ e, item, index, indexItem }) => {
        const newResponse = item.alternativas.find(item => item.id == e.target.value)
        form.setValue(`blocos[0].equipamentos[${index}].itens[${indexItem}].resposta`, newResponse)
    }

    useEffect(() => {
        getProdutosLimpeza()
    }, [])

    return (
        <Grid container spacing={4}>
            <Select
                xs={12}
                md={8}
                title='Produtos utilizados na limpeza'
                name={`blocos[0].equipamentos.${index}.produtos`}
                multiple
                options={produtos ?? []}
                form={form}
                helpText='Produtos utilizados na limpeza do equipamento.'
            />

            <CheckLabel
                form={form}
                xs={6}
                md={4}
                title='Higienização'
                name={`blocos[0].equipamentos.${index}.higienizacao`}
                value={data?.higienizacao}
            />

            {form.watch(`blocos[0].equipamentos.${index}.itens`) &&
                form.watch(`blocos[0].equipamentos.${index}.itens`).map((item, i) => (
                    <Grid item xs={12}>
                        <Item
                            key={index}
                            form={form}
                            blockKey={'limpezaID'}
                            index={index}
                            indexItem={i}
                            item={item}
                            updateResponse={updateResponse}
                            // handleFileSelect={handleFileSelect}
                            // handleRemoveAnexoItem={handleRemoveAnexoItem}
                        />
                    </Grid>
                ))}
        </Grid>
    )
}

export default Equipamento

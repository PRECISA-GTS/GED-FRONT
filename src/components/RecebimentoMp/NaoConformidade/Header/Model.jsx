import { useContext, useEffect, useState } from 'react'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const Model = ({ form, data }) => {
    if (!data) return null

    const { loggedUnity } = useContext(AuthContext)
    const [modelos, setModelos] = useState([])

    const getModelos = async () => {
        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/getModelos`, {
                unidadeID: loggedUnity.unidadeID
            })

            setModelos(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getModelos()
    }, [data])

    return (
        <Select
            xs={12}
            md={4}
            title='Modelo de formulário'
            name={`header.modelo`}
            options={modelos ?? []}
            value={data.modelo || { nome: '' }}
            register={form.register}
            setValue={form.setValue}
            control={form.control}
            helpText='Selecione um modelo de formulário para o preenchimento desta não conformidade'
        />
    )
}

export default Model

import { Grid } from '@mui/material'
import LimpezaInfo from './LimpezaInfo'
import { useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Select from 'src/components/Form/Select'

const NewContent = ({ form, type, data }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [models, setModels] = useState(null)
    const [limpezas, setLimpezas] = useState(null)

    const getModels = async () => {
        try {
            const response = await api.post(`/formularios/limpeza/nao-conformidade/getModels`, {
                unidadeID: loggedUnity.unidadeID
            })

            setModels(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getLimpezaNC = async () => {
        try {
            const response = await api.post(`/formularios/limpeza/nao-conformidade/getLimpezaNC`, {
                unidadeID: loggedUnity.unidadeID
            })
            setLimpezas(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getModels()
        getLimpezaNC()
    }, [data])

    return (
        <div className='flex flex-col gap-8'>
            {type === 'form' && <LimpezaInfo data={data} />}
            <Grid container spacing={4}>
                {type === 'list' && (
                    <Select
                        xs={12}
                        md={6}
                        title='Limpeza'
                        name={`new.limpeza`}
                        required
                        options={limpezas ?? []}
                        helpText='Selecione a limpeza e higienização para lançar uma nova não conformidade'
                        form={form}
                    />
                )}
                {models && (
                    <Select
                        xs={12}
                        md={type === 'form' ? 12 : 6}
                        title='Modelo de formulário'
                        name={`new.modelo`}
                        required
                        options={models ?? []}
                        value={
                            data?.modelo || models?.length === 1 ? models[0] : { nome: '' } //? Apenas 1 opção, traz selecionado
                        }
                        helpText='Selecione um modelo de formulário para o preenchimento desta não conformidade para este Recebimento de MP'
                        form={form}
                    />
                )}
            </Grid>
        </div>
    )
}

export default NewContent

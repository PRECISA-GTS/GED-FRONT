import { Grid } from '@mui/material'
import RecebimentoMpInfo from './RecebimentoMpInfo'
import { useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Select from 'src/components/Form/Select'

const NewContent = ({ form, type, data }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [models, setModels] = useState(null)
    const [recebimentos, setRecebimentos] = useState(null)

    const getModels = async () => {
        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/getModels`, {
                unidadeID: loggedUnity.unidadeID
            })

            setModels(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getRecebimentoMPNC = async () => {
        try {
            const response = await api.post(`/formularios/recebimento-mp/nao-conformidade/getRecebimentoMPNC`, {
                unidadeID: loggedUnity.unidadeID
            })
            setRecebimentos(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getModels()
        getRecebimentoMPNC()
    }, [data])

    return (
        <div className='flex flex-col gap-8'>
            {type === 'form' && <RecebimentoMpInfo data={data} />}
            <Grid container spacing={4}>
                {type === 'list' && (
                    <Select
                        xs={12}
                        md={6}
                        title='Recebimento de MP'
                        name={`new.recebimento`}
                        options={recebimentos ?? []}
                        helpText='Selecione o Recebimento de MP para lançar uma nova não conformidade'
                        form={form}
                    />
                )}
                {models && (
                    <Select
                        xs={12}
                        md={type === 'form' ? 12 : 6}
                        title='Modelo de formulário'
                        name={`new.modelo`}
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

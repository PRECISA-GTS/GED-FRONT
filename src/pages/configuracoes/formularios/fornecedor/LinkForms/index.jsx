import { useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { api } from 'src/configs/api'
import { Grid } from '@mui/material'
import CustomSelect from 'src/components/Form/CustomSelect'
import { AuthContext } from 'src/context/AuthContext'
import Icon from 'src/@core/components/icon'

const LinkForms = ({ form, onSubmit }) => {
    const { loggedUnity } = useContext(AuthContext)
    const router = Router
    const staticUrl = router.pathname
    const [data, setData] = useState(null)
    const [models, setModels] = useState([])

    const getCategories = async () => {
        try {
            const response = await api.post(`${staticUrl}/getCategories`, {
                unidadeID: loggedUnity.unidadeID,
                allRisks: true
            })
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getModels = async () => {
        try {
            const response = await api.post(`/formularios/fornecedor/getModels`, {
                unidadeID: loggedUnity.unidadeID
            })
            setModels(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
        getModels()
    }, [])

    return (
        <div className='flex flex-col gap-6'>
            {data &&
                data.map((value, index) => {
                    return (
                        <div className='space-y-4'>
                            <div className='flex items-center gap-2'>
                                <Icon icon={value.icon} className='text-yellow-500 text-3xl' />
                                <p className='font-semibold text-lg'>{value.nome}</p>
                            </div>
                            <div className='flex flex-col gap-2 ml-10 '>
                                {value.riscos.map((risco, riscoIndex) => {
                                    return (
                                        <form onSubmit={form.handleSubmit(onSubmit)}>
                                            <Grid
                                                container
                                                spacing={4}
                                                key={index}
                                                className='grid grid-cols-2 items-center space-y-2'
                                            >
                                                <Grid item xs={12} md={3}>
                                                    <p>{risco.risco}</p>
                                                </Grid>
                                                <CustomSelect
                                                    xs={12}
                                                    md={9}
                                                    title='Modelo de formulário'
                                                    name={`fornecedorCategoriaRiscoID${risco.fornecedorCategoriaRiscoID}`}
                                                    value={form.getValues('parFormularioID')?.name}
                                                    form={form}
                                                    options={models}
                                                    required
                                                />
                                            </Grid>
                                        </form>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default LinkForms

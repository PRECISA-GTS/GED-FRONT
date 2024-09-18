import { Grid, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Fragment, useContext, useEffect, useState } from 'react'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const Departamento = ({ form, index, item, remove }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [departamentos, setDepartamentos] = useState([])
    const today = new Date().toISOString().substring(0, 10)

    const getDepartamentos = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post('/cadastros/departamento', { unidadeID: loggedUnity.unidadeID })
            setDepartamentos(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDepartamentos()
    }, [])

    return (
        <Fragment key={item.id}>
            <input type='hidden' name={`fields.departamentos[${index}].id`} value={item.id} />

            <Select
                xs={12}
                md={7}
                title='Departamento'
                name={`fields.departamentos[${index}].departamento`}
                value={item?.departamento}
                required
                options={departamentos ?? []}
                form={form}
                opacity={item.status === 0 ? true : false}
            />

            <DateField
                xs={12}
                md={2}
                title='Data Início'
                name={`fields.departamentos[${index}].dataInicio`}
                value={item?.dataInicio}
                required
                form={form}
                opacity={item.status === 0 ? true : false}
            />

            <DateField
                xs={12}
                md={2}
                title='Data Fim'
                name={`fields.departamentos[${index}].dataFim`}
                value={item?.dataFim}
                form={form}
                opacity={item.status === 0 ? true : false}
            />

            <Grid item xs={12} md={1} className='flex items-center'>
                <IconButton color='error' size='small' onClick={remove}>
                    <Icon icon={'tabler:trash-filled'} />
                </IconButton>
            </Grid>
        </Fragment>
    )
}

export default Departamento

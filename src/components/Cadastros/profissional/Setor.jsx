import { Grid, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { Fragment, useContext, useEffect, useState } from 'react'
import Select from 'src/components/Form/Select'
import DateField from 'src/components/Form/DateField'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const Setor = ({ index, setValue, control, register, errors, item, remove }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [setores, setSetores] = useState([])
    const today = new Date().toISOString().substring(0, 10)

    const getSetores = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post('/cadastros/setor', { unidadeID: loggedUnity.unidadeID })
            setSetores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getSetores()
    }, [])

    return (
        <Fragment key={item.id}>
            <input type='hidden' name={`fields.setores[${index}].id`} value={item.id} />

            <Select
                xs={12}
                md={7}
                title='Setor'
                name={`fields.setores[${index}].setor`}
                value={item?.setor}
                required
                options={setores ?? []}
                register={register}
                setValue={setValue}
                control={control}
                errors={errors?.fields?.setores?.[index]?.setor ?? null}
                opacity={item.status === 0 ? true : false}
            />

            <DateField
                xs={12}
                md={2}
                title='Data Início'
                name={`fields.setores[${index}].dataInicio`}
                value={item?.dataInicio}
                required
                register={register}
                control={control}
                errors={errors?.fields?.setores?.[index]?.dataInicio}
                opacity={item.status === 0 ? true : false}
            />

            <DateField
                xs={12}
                md={2}
                title='Data Fim'
                name={`fields.setores[${index}].dataFim`}
                value={item?.dataFim}
                register={register}
                control={control}
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

export default Setor

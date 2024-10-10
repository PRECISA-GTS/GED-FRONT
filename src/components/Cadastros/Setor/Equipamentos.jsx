import { Button, Grid, IconButton } from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import Select from 'src/components/Form/Select'
import Icon from 'src/@core/components/icon'
import { useFieldArray } from 'react-hook-form'
import { AuthContext } from 'src/context/AuthContext'
import { api } from 'src/configs/api'

const Equipamentos = ({ form }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [equipamentos, setEquipamentos] = useState([])

    //? Gerencia o array de equipamentos
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'fields.equipamentos'
    })

    const getEquipamentos = async () => {
        const response = await api.post(`/cadastros/equipamento/getEquipamentos`, {
            unidadeID: loggedUnity.unidadeID
        })
        setEquipamentos(response.data)
    }

    useEffect(() => {
        getEquipamentos()
    }, [])

    return (
        <>
            <Grid item xs={12}>
                <div className='flex items-center gap-2 pb-1 pt-2'>
                    <div className=''>
                        <Icon icon='game-icons:manual-meat-grinder' className='text-3xl' />
                    </div>
                    <div className='flex flex-col gap-0'>
                        <p className='text-xl'>Equipamentos</p>
                    </div>
                </div>
            </Grid>

            {fields.map((item, index) => (
                <Fragment key={item.id}>
                    <input type='hidden' name={`fields.equipamentos[${index}].id`} value={item.id} />

                    <Select
                        xs={12}
                        md={11}
                        title='Equipamento'
                        name={`fields.equipamentos[${index}].equipamento`}
                        required
                        options={equipamentos ?? []}
                        form={form}
                        opacity={item.status === 0 ? true : false}
                        link='/cadastros/equipamento/'
                        helpText='uashuhasuha'
                    />

                    <Grid item xs={12} md={1} className='flex items-center'>
                        <IconButton color='error' size='small' onClick={() => remove(index)}>
                            <Icon icon={'tabler:trash-filled'} />
                        </IconButton>
                    </Grid>
                </Fragment>
            ))}

            <Grid item xs={12}>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                        append({
                            id: null,
                            dataInicio: new Date()
                        })
                        form.trigger()
                    }}
                    startIcon={<Icon icon='material-symbols:add-circle-outline-rounded' />}
                >
                    Inserir
                </Button>
            </Grid>
        </>
    )
}

export default Equipamentos

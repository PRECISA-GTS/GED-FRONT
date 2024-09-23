import { Grid } from '@mui/material'
import { Fragment } from 'react'
import Input from 'src/components/Form/Input'

const EquipmentInfo = ({ value, form }) => {
    return (
        <Input
            xs={12}
            md={12}
            title='Descrição da Não Conformidade do equipamento'
            name='fields.nome'
            required={true}
            form={form}
            multiline
            rows={4}
        />
    )
}

export default EquipmentInfo

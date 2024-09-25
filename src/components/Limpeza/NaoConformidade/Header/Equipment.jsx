import { Divider, Grid, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import Equipments from './Equipments'
import Icon from 'src/@core/components/icon'
import { useFieldArray } from 'react-hook-form'

const Equipment = ({ form, data, disabled }) => {
    if (!data) return

    const [equipment, setEquipment] = useState(data.equipamentos)

    // const handleCheck = (e, index) => {
    //     const { checked } = e.target
    //     form.setValue(`header.equipamentos[${index}].checked_`, checked)
    //     const updatedRows = equipment.map((row, i) => (i === index ? { ...row, checked_: checked } : row))
    //     setEquipment(updatedRows)
    //     form.setValue('header.equipamentos', updatedRows)
    // }

    const { fields: equipmentFields, update: updateEquipment } = useFieldArray({
        control: form.control,
        name: 'header.equipamentos'
    })

    const handleCheck = (e, index) => {
        const { checked } = e.target
        form.setValue(`header.equipamentos[${index}].checked_`, checked)
        updateEquipment(index, { ...equipmentFields[index], checked_: checked })
    }

    return (
        <>
            <Grid container sx={{ mt: 4 }}>
                <Grid item xs={12}>
                    <Typography
                        color='primary'
                        variant='subtitle1'
                        sx={{ fontWeight: 700 }}
                        className='flex items-center gap-1'
                    >
                        <Icon icon='game-icons:manual-meat-grinder' className='text-primary' />
                        Selecione os equipamentos com Não Conformidade
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    {equipmentFields &&
                        equipmentFields.map((row, index) => (
                            <Fragment key={row.id}>
                                <Equipments
                                    key={index}
                                    index={index}
                                    value={row}
                                    setEquipment={setEquipment}
                                    handleCheck={handleCheck}
                                    disabled={disabled}
                                    form={form}
                                />
                                {index < equipmentFields.length - 1 && <Divider />}
                            </Fragment>
                        ))}
                </Grid>
            </Grid>
        </>
    )
}

export default Equipment

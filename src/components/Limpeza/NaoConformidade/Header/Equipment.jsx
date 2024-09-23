import { Divider, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import Equipments from './Equipments'
import Icon from 'src/@core/components/icon'

const Equipment = ({ form, data, disabled }) => {
    if (!data) return

    const [equipment, setEquipment] = useState(data.equipamentos)

    const handleCheck = (e, index) => {
        const { checked } = e.target
        form.setValue(`header.equipamentos[${index}].checked_`, checked)
        const updatedRows = equipment.map((row, i) => (i === index ? { ...row, checked_: checked } : row))
        setEquipment(updatedRows)
        form.setValue('header.equipamentos', updatedRows)
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
                    {equipment &&
                        equipment.map((row, index) => (
                            <>
                                <Equipments
                                    key={index}
                                    index={index}
                                    value={row}
                                    setEquipment={setEquipment}
                                    handleCheck={handleCheck}
                                    disabled={disabled}
                                    form={form}
                                />
                                {index < equipment.length - 1 && <Divider />}
                            </>
                        ))}
                </Grid>
            </Grid>
        </>
    )
}

export default Equipment

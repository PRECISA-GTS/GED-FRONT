import { Grid, IconButton } from '@mui/material'
import React from 'react'
import DateField from 'src/components/Form/DateField'
import Input from 'src/components/Form/Input'
import Icon from 'src/@core/components/icon'

const CargoFuncao = ({ index, item, remove, form }) => {
    return (
        <>
            <Input
                xs={12}
                md={4}
                required
                title='Formação / Cargo'
                name={`cargosFuncoes.${[index]}.formacaoCargo`}
                form={form}
                opacity={item.status === 0 ? true : false}
            />
            <Input
                xs={12}
                md={3}
                title='Conselho'
                name={`cargosFuncoes.${[index]}.conselho`}
                form={form}
                opacity={item.status === 0 ? true : false}
            />
            <DateField
                xs={12}
                md={2}
                title='Data'
                type='date'
                required
                name={`cargosFuncoes.${[index]}.data`}
                value={item.data}
                typeValidation='dataPassado'
                daysValidation={999999}
                opacity={item.status === 0 ? true : false}
                form={form}
            />
            <DateField
                xs={12}
                md={2}
                title='Data Inativação'
                name={`cargosFuncoes.${[index]}.dataInativacao`}
                type='date'
                value={item.dataInativacao}
                opacity={item.status === 0 ? true : false}
                form={form}
            />
            <Grid item xs={12} md={1} className='flex items-center'>
                <IconButton
                    color='error'
                    size='small'
                    onClick={() => {
                        remove(item, index)
                    }}
                >
                    <Icon icon={'tabler:trash-filled'} />
                </IconButton>
            </Grid>
        </>
    )
}

export default CargoFuncao

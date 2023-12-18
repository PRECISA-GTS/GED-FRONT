import React, { useState, useEffect } from 'react'
import { Grid, Button, ButtonGroup } from '@mui/material'
import Icon from 'src/@core/components/icon'

const ToggleButtonLabel = React.memo(({ xs, md, name, register, setValue, setIsNotFactory }) => {
    const [selectedOption, setSelectedOption] = useState(1)

    useEffect(() => {
        if (name && register) {
            setValue(name, selectedOption)
            setIsNotFactory(selectedOption === 1 ? false : true)
        }
    }, [name, register, selectedOption, setValue, setIsNotFactory])

    return (
        <Grid item xs={xs} md={md}>
            <ButtonGroup color='primary'>
                <Button onClick={() => setSelectedOption(1)} variant={selectedOption === 1 ? 'contained' : 'outlined'}>
                    <div className='flex items-center gap-2 py-2 px-1'>
                        <Icon icon='mdi:company' />
                        <p className='capitalize'>Fábrica</p>
                    </div>
                </Button>
                <Button onClick={() => setSelectedOption(2)} variant={selectedOption === 2 ? 'contained' : 'outlined'}>
                    <div className='flex items-center gap-2 py-2 px-1'>
                        <Icon icon='mdi:truck-fast-outline' />
                        <p className='capitalize'>Fornecedor</p>
                    </div>
                </Button>
            </ButtonGroup>
            {name && register && <input type='hidden' name={name} {...register(name)} value={selectedOption} />}
        </Grid>
    )
})

export default ToggleButtonLabel

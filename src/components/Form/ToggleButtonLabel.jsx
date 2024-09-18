import React, { useState, useEffect } from 'react'
import { Grid, Button, ButtonGroup } from '@mui/material'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import Icon from 'src/@core/components/icon'

const ToggleButtonLabel = React.memo(({ form, xs, md, name, setIsNotFactory }) => {
    const [selectedOption, setSelectedOption] = useState(1)

    useEffect(() => {
        if (name && form.register) {
            form.setValue(name, selectedOption)
        }
    }, [name, form.register, selectedOption, form.setValue, setIsNotFactory])

    return (
        <Grid item xs={xs} md={md}>
            <ButtonGroup color='primary'>
                <Button
                    onClick={() => {
                        setIsNotFactory(false)
                        setSelectedOption(1)
                    }}
                    variant={selectedOption === 1 ? 'contained' : 'outlined'}
                >
                    <div className='flex items-center gap-2 py-2 px-1'>
                        <Icon icon='mage:building-tree' />
                        <p className='capitalize'>Fábrica</p>
                    </div>
                </Button>
                <Button
                    onClick={() => {
                        setIsNotFactory(true)
                        setSelectedOption(2)
                    }}
                    variant={selectedOption === 2 ? 'contained' : 'outlined'}
                >
                    <div className='flex items-center gap-2 py-2 px-1'>
                        <Icon icon='mdi:truck-fast-outline' />
                        <p className='capitalize'>Fornecedor</p>
                    </div>
                </Button>
            </ButtonGroup>
            <div className='flex items-center gap-1 mt-4'>
                <div className='shrink-0'>
                    <BsFillQuestionCircleFill />
                </div>
                <p className='text-sm'>{`${
                    selectedOption == 1
                        ? 'Fábrica ficará responsável pelo preenchimento do formulário'
                        : 'Fornecedor ficará responsável pelo preenchimento do formulário, será enviado um e-mail com instruções de preenchimento ao fornecedor e a fábrica irá monitorar o status'
                }`}</p>
            </div>
            {name && form.register && (
                <input type='hidden' name={name} {...form.register(name)} value={selectedOption} />
            )}
        </Grid>
    )
})

export default ToggleButtonLabel

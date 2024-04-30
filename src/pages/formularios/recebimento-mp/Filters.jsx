import React, { useEffect } from 'react'
import Input from 'src/components/Form/Input'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const { form, setNames } = useFilter()
    useEffect(() => {
        setNames(['email', 'senha'])
    }, [])
    return (
        <div>
            <Input placeholder='Filtrar por Email' control={form.control} name='email' title='Email' />
            <Input placeholder='Filtrar por senha' control={form.control} name='senha' title='Senha' />
        </div>
    )
}

export default Filters

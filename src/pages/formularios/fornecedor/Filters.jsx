import React, { useEffect } from 'react'
import Input from 'src/components/Form/Input'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const { form, setNames } = useFilter()
    useEffect(() => {
        setNames(['nome'])
    }, [])
    return (
        <div>
            <Input placeholder='Filtrar por nome' control={form.control} name='nome' title='Nome' />
        </div>
    )
}

export default Filters

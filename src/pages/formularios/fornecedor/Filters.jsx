import { useEffect } from 'react'
import CustomInputDate from 'src/components/Form/CustomInputDate'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const { form, setNames, dataFilters, filterData } = useFilter()

    const onSubmit = () => {
        filterData()
    }

    useEffect(() => {
        if (dataFilters && Object.keys(dataFilters).length > 0) {
            onSubmit()
        }
    }, [dataFilters])

    useEffect(() => {
        setNames(['dataInicio', 'dataFim'])
    }, [])
    return (
        <>
            <CustomInputDate xs={12} md={6} title='Data inicio' name='dataInicio' form={form} />
            <CustomInputDate xs={12} md={6} title='Data Fim' name='dataFim' form={form} />
        </>
    )
}

export default Filters

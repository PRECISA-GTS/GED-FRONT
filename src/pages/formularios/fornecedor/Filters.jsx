import { useEffect } from 'react'
import CustomInputDate from 'src/components/Form/CustomInputDate'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const { form, setNames, dataFilters, filterDate } = useFilter()

    const onSubmit = async () => {
        filterDate(dataFilters.dataInicio, dataFilters.dataFim)
    }

    //* Função para acionar o formulario de filtro do contexto (useFilter())
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
            <CustomInputDate xs={12} md={6} title='Data inicio da avaliacão' name='dataInicio' form={form} />
            <CustomInputDate xs={12} md={6} title='Data Fim da avaliação' name='dataFim' form={form} />
        </>
    )
}

export default Filters

import { useEffect } from 'react'
import CustomInputDate from 'src/components/Form/CustomInputDate'
import CustomSelect from 'src/components/Form/CustomSelect'
import { useCommonData } from 'src/context/CommonDataContext'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const { form, setNames, filterDate, SelectFilterByName, data, setFilteredData, handleSearch, key } = useFilter()
    const { commonData } = useCommonData()
    let dataFiltered = data

    const onSubmit = async () => {
        dataFiltered = await handleSearch(dataFiltered)
        dataFiltered = await filterDate(dataFiltered)
        dataFiltered = await SelectFilterByName(dataFiltered, 'usuario')
        setFilteredData(dataFiltered)
    }

    //* Função para acionar o formulario de filtro do contexto (useFilter())
    useEffect(() => {
        onSubmit()
    }, [key])

    useEffect(() => {
        setNames(['dataInicio', 'dataFim', 'usuario'])
    }, [])

    return (
        <>
            <CustomInputDate xs={12} md={6} title='Data inicio' name='dataInicio' form={form} />
            <CustomInputDate xs={12} md={6} title='Data Fim' name='dataFim' form={form} />
            <CustomSelect
                xs={12}
                md={6}
                title='Profissional'
                name='usuario'
                form={form}
                options={commonData.professional}
                value={form.getValues('usuario')?.name}
            />
        </>
    )
}
export default Filters

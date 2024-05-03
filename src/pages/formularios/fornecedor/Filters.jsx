import { useEffect } from 'react'
import CustomInputDate from 'src/components/Form/CustomInputDate'
import CustomSelect from 'src/components/Form/CustomSelect'
import { useCommonData } from 'src/context/CommonDataContext'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const {
        form,
        setNames,
        dataFilters,
        filterDate,
        SelectFilterByName,
        filteredData,
        setFilteredData,
        setAuxDataFilter,
        key
    } = useFilter()
    const { commonData } = useCommonData()
    let data = filteredData

    const onSubmit = async () => {
        data = await filterDate(dataFilters.dataInicio, dataFilters.dataFim)
        data = await SelectFilterByName(data, 'status', dataFilters.status?.name)
        data = await SelectFilterByName(data, 'quemPreenche', dataFilters.quemPreenche?.name)
        setAuxDataFilter(data)
        setFilteredData(data)
    }

    const arrQuemPreenche = [
        {
            id: '1',
            name: 'Fábrica'
        },
        {
            id: '2',
            name: 'Fornecedor'
        }
    ]

    //* Função para acionar o formulario de filtro do contexto (useFilter())
    useEffect(() => {
        if (dataFilters && Object.keys(dataFilters).length > 0) {
            onSubmit()
        }
    }, [dataFilters])

    useEffect(() => {
        setNames(['dataInicio', 'dataFim', 'quemPreenche', 'status'])
    }, [])

    return (
        <>
            <CustomInputDate xs={12} md={6} title='Data inicio da avaliacão' name='dataInicio' form={form} />
            <CustomInputDate xs={12} md={6} title='Data Fim da avaliação' name='dataFim' form={form} />
            <CustomSelect
                xs={12}
                md={6}
                title='Quem preencheu'
                name='quemPreenche'
                form={form}
                options={arrQuemPreenche}
            />
            <CustomSelect xs={12} md={6} title='Status' name='status' form={form} options={commonData.status} />
        </>
    )
}

export default Filters

import React, { useEffect } from 'react'
import CustomInputDate from 'src/components/Form/CustomInputDate'
import CustomSelect from 'src/components/Form/CustomSelect'
import { useCommonData } from 'src/context/CommonDataContext'
import { useFilter } from 'src/context/FilterContext'

const Filters = () => {
    const { form, setNames, filterDate, SelectFilterByName, data, setFilteredData, handleSearch, key, searchText } =
        useFilter()
    const { commonData } = useCommonData()
    let dataFiltered = data

    const onSubmit = async () => {
        console.log('🚀 ~ onSubmit ~ dataFiltered', dataFiltered)
        dataFiltered = await handleSearch(dataFiltered)
        dataFiltered = await filterDate(dataFiltered)
        dataFiltered = await SelectFilterByName(dataFiltered, 'status')
        dataFiltered = await SelectFilterByName(dataFiltered, 'profissional')
        dataFiltered = await SelectFilterByName(dataFiltered, 'modelo')
        setFilteredData(dataFiltered)
    }

    //* Função para acionar o formulario de filtro do contexto (useFilter())
    //* Função para acionar o formulario de filtro do contexto (useFilter())
    useEffect(() => {
        onSubmit()
    }, [key])
    useEffect(() => {
        setNames(['dataInicio', 'dataFim', 'status', 'profissional', 'modelo'])
    }, [])
    return (
        <>
            <CustomInputDate xs={12} md={6} title='Data inicio' name='dataInicio' form={form} />
            <CustomInputDate xs={12} md={6} title='Data Fim' name='dataFim' form={form} />
            <CustomSelect xs={12} md={6} title='Status' name='status' form={form} options={commonData.status} />
            <CustomSelect
                xs={12}
                md={6}
                title='Profissional'
                name='profissional'
                value={form.getValues('profissional')?.name}
                form={form}
                options={commonData.professional}
            />
            <CustomSelect
                xs={12}
                md={6}
                title='Modelo'
                name='modelo'
                value={form.getValues('modelo')?.name}
                form={form}
                options={commonData.recebimentoModel}
            />
        </>
    )
}

export default Filters

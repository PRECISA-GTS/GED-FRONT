import React, { useEffect } from 'react'
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
        data: dataAll,
        setFilteredData,
        setAuxDataFilter,
        key
    } = useFilter()
    const { commonData } = useCommonData()
    let data = dataAll

    const onSubmit = async () => {
        data = await filterDate(dataFilters.dataInicio, dataFilters.dataFim)
        data = await SelectFilterByName(data, 'status', dataFilters.status?.name)
        data = await SelectFilterByName(data, 'profissional', dataFilters.professional?.name)
        data = await SelectFilterByName(data, 'modelo', dataFilters.recebimentoModel?.name)

        setAuxDataFilter(data)
        setFilteredData(data)
    }

    //* Função para acionar o formulario de filtro do contexto (useFilter())
    useEffect(() => {
        if (dataFilters && Object.keys(dataFilters).length > 0) {
            onSubmit()
        }
    }, [dataFilters])
    useEffect(() => {
        setNames(['dataInicio', 'dataFim', 'status', 'professional', 'recebimentoModel'])
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
                name='professional'
                form={form}
                options={commonData.professional}
            />
            <CustomSelect
                xs={12}
                md={6}
                title='Modelo'
                name='recebimentoModel'
                form={form}
                options={commonData.recebimentoModel}
            />
        </>
    )
}

export default Filters

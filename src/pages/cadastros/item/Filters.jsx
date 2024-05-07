import { useEffect } from 'react'
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
        dataFiltered = await handleSearch(dataFiltered)
        console.log('🚀dataFiltered', dataFiltered)
        // dataFiltered = await filterDate(dataFiltered)
        // dataFiltered = await SelectFilterByName(dataFiltered, 'status')
        // dataFiltered = await SelectFilterByName(dataFiltered, 'quemPreenche')
        setFilteredData(dataFiltered)
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
        const filter = form.getValues()
        let filledFields = 0
        for (const key in filter) {
            if (filter[key] !== '' && filter[key] !== undefined) {
                filledFields++
            }
        }

        if (filledFields > 0 || searchText !== '') {
            onSubmit()
        } else {
            setFilteredData(data)
        }
    }, [key])

    useEffect(() => {
        setNames([])
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
                value={form.getValues('quemPreenche')?.name}
                form={form}
                options={arrQuemPreenche}
            />
            <CustomSelect
                xs={12}
                md={6}
                title='Status'
                name='status'
                form={form}
                options={commonData.status}
                value={form.getValues('status')?.name}
            />
        </>
    )
}
export default Filters

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
        dataFiltered = await SelectFilterByName(dataFiltered, 'formulario')
        setFilteredData(dataFiltered)
    }

    //* Função para acionar o formulario de filtro do contexto (useFilter())
    useEffect(() => {
        onSubmit()
    }, [key])

    useEffect(() => {
        setNames(['formulario'])
    }, [])

    return (
        <>
            <CustomSelect
                xs={12}
                md={6}
                title='Formulário'
                name='formulario'
                form={form}
                options={commonData.typeFormulario}
                value={form.getValues('formulario')?.name}
            />
        </>
    )
}
export default Filters

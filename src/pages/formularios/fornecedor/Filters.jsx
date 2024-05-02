import { useEffect } from 'react'
import CustomInputDate from 'src/components/Form/CustomInputDate'
import CustomSelect from 'src/components/Form/CustomSelect'
import { useFilter } from 'src/context/FilterContext'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { MenuItem, Select } from '@mui/material'

const Filters = () => {
    const { form, setNames, dataFilters, filterDate } = useFilter()

    const onSubmit = async () => {
        console.log('onSubmit: ', dataFilters)
        filterDate(dataFilters.dataInicio, dataFilters.dataFim)
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
        setNames(['dataInicio', 'dataFim', 'quemPreenche'])
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
        </>
    )
}

export default Filters

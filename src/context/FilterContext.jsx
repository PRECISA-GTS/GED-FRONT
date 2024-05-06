import { createContext, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { convertStringToDate } from 'src/configs/defaultConfigs'

const initialValues = {
    // Estados
    pageSize: 50,
    setPageSize: () => {},
    filteredData: [],
    setFilteredData: () => {},
    data: [],
    setData: () => {},
    searchText: '',
    setSearchText: () => {},
    openFilter: false,
    setOpenFilter: () => {},
    componentFilters: null,
    setComponentFilters: () => {},
    names: [],
    setNames: () => {},
    dataFilters: {},
    setDataFilters: () => {},
    key: false,
    setKey: () => {},
    // Funções
    handleSearch: () => {},
    clearSearch: () => {},
    handleClear: () => {},
    onSubmit: () => {},
    filterDate: () => {},
    startFilter: () => {},
    SelectFilterByName: () => {}
}

const FilterContext = createContext(initialValues)

const FilterProvider = ({ children }) => {
    const [pageSize, setPageSize] = useState(initialValues.pageSize)
    const [filteredData, setFilteredData] = useState(initialValues.filteredData)
    const [searchText, setSearchText] = useState(initialValues.searchText)
    const [data, setData] = useState(initialValues.data)
    const [openFilter, setOpenFilter] = useState(initialValues.openFilter)
    const [componentFilters, setComponentFilters] = useState(initialValues.componentFilters)
    const [names, setNames] = useState(initialValues.names)
    const [key, setKey] = useState(initialValues.key)
    const form = useForm()

    const startFilter = (component, keepFilter) => {
        setComponentFilters(component)
        setFilteredData(data)
        setOpenFilter(false)
        if (!keepFilter) form.reset()
    }

    //* Função para filtrar os dados da tabela | Input de busca
    const handleSearch = data => {
        const searchWords = searchText
            ?.toLowerCase()
            .split(' ')
            .filter(word => word !== '')

        const filteredRows = data.filter(row =>
            searchWords?.every(word => Object.values(row).some(field => field?.toString().toLowerCase().includes(word)))
        )
        return filteredRows
    }

    //* Função para limpar o filtro | Input de busca
    const clearSearch = () => {
        setSearchText('')
        setFilteredData(data)
    }

    //* Função para limpar todos os filtros
    const handleClear = () => {
        setKey(!key)
        clearSearch()
        names.map(name => {
            form.setValue(name, '')
        })
        setFilteredData(data)
    }

    //* Função para setar os valores dos filtros
    const onSubmit = () => {
        setOpenFilter(false)
        setKey(!key)
    }

    useEffect(() => {
        onSubmit()
    }, [searchText])

    // Função que filtra por data
    const filterDate = data => {
        const dataIni = form.getValues('dataInicio')
        const dataFim = form.getValues('dataFim')

        if (!dataIni && !dataFim) {
            return data
        }

        const dataInicio = dataIni ? new Date(dataIni) : null

        if (dataInicio) {
            dataInicio.setDate(dataInicio.getDate() + 1)
            dataInicio.setHours(0, 0, 0, 0)
        }

        const dataFinal = dataFim ? new Date(dataFim) : null

        if (dataFinal) {
            dataFinal.setDate(dataFinal.getDate() + 1)
            dataFinal.setHours(0, 0, 0, 0)
        }

        const filter = data.filter(item => {
            const itemDate = convertStringToDate(item.data)
            if (dataInicio && dataFinal) {
                return itemDate >= dataInicio && itemDate <= dataFinal
            } else if (dataInicio) {
                return itemDate >= dataInicio
            } else if (dataFinal) {
                return itemDate <= dataFinal
            }

            return true
        })

        return filter
    }

    // Função que filtra os selects por nome
    const SelectFilterByName = (data, name) => {
        const nameFormat = form.getValues(name)?.name
        if (!nameFormat) {
            return data
        }
        return data.filter(item => item[name] === nameFormat)
    }

    const values = {
        // Estados
        searchText,
        setSearchText,
        pageSize,
        setPageSize,
        filteredData,
        setFilteredData,
        data,
        setData,
        openFilter,
        setOpenFilter,
        componentFilters,
        setComponentFilters,
        names,
        setNames,
        key,
        setKey,

        // Funções
        form,
        startFilter,
        handleSearch,
        clearSearch,
        handleClear,
        onSubmit,
        filterDate,
        SelectFilterByName
    }
    return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
}

export const useFilter = () => {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider')
    }
    return context
}

export { FilterContext, FilterProvider }

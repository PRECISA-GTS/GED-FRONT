import { createContext, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { convertStringToDate } from 'src/configs/defaultConfigs'

const initialValues = {
    // Estados
    pageSize: 50,
    setPageSize: () => {},
    searchText: '',
    setSearchText: () => {},
    filteredData: [],
    setFilteredData: () => {},
    data: [],
    setData: () => {},
    openFilter: false,
    setOpenFilter: () => {},
    componentFilters: null,
    setComponentFilters: () => {},
    names: [],
    setNames: () => {},
    dataFilters: [],
    setDataFilters: () => {},
    // Funções
    handleSearch: () => {},
    clearSearch: () => {},
    handleClear: () => {},
    onSubmit: () => {},
    filterData: () => {}
}

const FilterContext = createContext(initialValues)

const FilterProvider = ({ children }) => {
    const [pageSize, setPageSize] = useState(initialValues.pageSize)
    const [searchText, setSearchText] = useState(initialValues.searchText)
    const [filteredData, setFilteredData] = useState(initialValues.filteredData)
    const [dataFilters, setDataFilters] = useState(initialValues.dataFilters)
    const [data, setData] = useState(initialValues.data)
    const [openFilter, setOpenFilter] = useState(initialValues.openFilter)
    const [componentFilters, setComponentFilters] = useState(initialValues.componentFilters)
    const [names, setNames] = useState(initialValues.names)
    const form = useForm()

    //* Função para filtrar os dados da tabela | Input de busca
    const handleSearch = searchValue => {
        setSearchText(searchValue)
        const searchWords = searchValue
            ?.toLowerCase()
            .split(' ')
            .filter(word => word !== '')

        const filteredRows =
            filteredData &&
            filteredData.filter(row => {
                return searchWords?.every(word => {
                    return Object.keys(row).some(field => {
                        return row[field]?.toString().toLowerCase().indexOf(word) !== -1
                    })
                })
            })
        if (searchValue && searchValue.length && filteredRows.length > 0) {
            setFilteredData(filteredRows)
        } else {
            setFilteredData([])
        }
    }

    console.log('🚀 ~ clearSearch ~ data', data)
    //* Função para limpar o filtro | Input de busca
    const clearSearch = () => {
        setFilteredData(data)
        setSearchText('')
    }

    //* Função para limpar todos os filtros
    const handleClear = () => {
        setDataFilters(null)
        clearSearch()
        names.map(name => {
            form.setValue(name, '')
        })
    }

    //* Função para setar os valores dos filtros
    const onSubmit = data => {
        if (!form.formState.isValid) {
            setDataFilters(data)
            setOpenFilter(false)
        }
    }

    // Função que filtra por data
    const filterData = () => {
        const filter = filteredData.filter(item => {
            const itemDate = convertStringToDate(item.data)
            const dataInicio = dataFilters.dataInicio ? new Date(dataFilters.dataInicio) : null
            const dataFim = dataFilters.dataFim ? new Date(dataFilters.dataFim) : null

            if (dataInicio && dataFim) {
                return itemDate >= dataInicio && itemDate <= dataFim
            } else if (dataInicio) {
                return itemDate >= dataInicio
            } else if (dataFim) {
                return itemDate <= dataFim
            }

            return true
        })
        setFilteredData(filter)
    }

    // TODO Função para buscar os dados ao clicar nos cards da dashboard
    // useEffect(() => {
    //     if (router.query.s) {
    //         setSearchText(router.query.s);
    //         handleSearch(router.query.s)
    //     } else {
    //         setSearchText('');
    //     }
    // }, [title, router])

    const values = {
        // Estados
        pageSize,
        setPageSize,
        searchText,
        setSearchText,
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
        dataFilters,
        setDataFilters,

        // Funções
        form,
        handleSearch,
        clearSearch,
        handleClear,
        onSubmit,
        filterData
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

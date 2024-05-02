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
    auxDataFilter: [],
    setAuxDataFilter: () => {},
    openFilter: false,
    setOpenFilter: () => {},
    componentFilters: null,
    setComponentFilters: () => {},
    names: [],
    setNames: () => {},
    dataFilters: {},
    setDataFilters: () => {},
    // Funções
    handleSearch: () => {},
    clearSearch: () => {},
    handleClear: () => {},
    onSubmit: () => {},
    filterDate: () => {}
}

const FilterContext = createContext(initialValues)

const FilterProvider = ({ children }) => {
    const [pageSize, setPageSize] = useState(initialValues.pageSize)
    const [searchText, setSearchText] = useState(initialValues.searchText)
    const [filteredData, setFilteredData] = useState(initialValues.filteredData)
    const [dataFilters, setDataFilters] = useState(initialValues.dataFilters)
    const [data, setData] = useState(initialValues.data)
    const [auxDataFilter, setAuxDataFilter] = useState(initialValues.auxDataFilter)
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

        if ((!searchValue || searchValue.length == 0) && (!dataFilters || Object.keys(dataFilters).length == 0)) {
            setFilteredData(data)
            setAuxDataFilter([])
            return
        }

        if ((!searchValue || searchValue.length == 0) && dataFilters) {
            setFilteredData(auxDataFilter)
            return
        }

        if (searchValue && searchValue.length > 0) {
            setFilteredData(filteredRows)
            return
        }
    }
    //* Função para limpar o filtro | Input de busca
    const clearSearch = () => {
        setFilteredData(data)
        setSearchText('')
    }

    //* Função para limpar todos os filtros
    const handleClear = () => {
        setDataFilters(false)
        clearSearch()
        names.map(name => {
            form.setValue(name, '')
        })
    }

    //* Função para setar os valores dos filtros
    const onSubmit = data => {
        setDataFilters(data)
        setOpenFilter(false)
    }

    // Função que filtra por data
    const filterDate = (dataIni, dataFim) => {
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
        setFilteredData(filter)
        setAuxDataFilter(filter)
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
        filterDate
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

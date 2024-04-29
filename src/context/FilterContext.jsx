import { createContext, useContext, useState } from 'react'

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

    // Funções
    handleSearch: () => {},
    clearSearch: () => {}
}

const FilterContext = createContext(initialValues)

const FilterProvider = ({ children }) => {
    const [pageSize, setPageSize] = useState(initialValues.pageSize)
    const [searchText, setSearchText] = useState(initialValues.searchText)
    const [filteredData, setFilteredData] = useState(initialValues.filteredData)
    const [data, setData] = useState(initialValues.data)
    const [openFilter, setOpenFilter] = useState(initialValues.openFilter)

    //* Função para filtrar os dados da tabela | Input de busca
    const handleSearch = searchValue => {
        setSearchText(searchValue)
        const searchWords = searchValue
            ?.toLowerCase()
            .split(' ')
            .filter(word => word !== '')

        const filteredRows =
            data &&
            data.filter(row => {
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

    //* Função para limpar o filtro | Input de busca
    const clearSearch = () => {
        setSearchText('')
        setFilteredData([])
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

        // Funções
        handleSearch,
        clearSearch
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

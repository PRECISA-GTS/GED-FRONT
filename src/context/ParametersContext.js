import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const ParametersContext = createContext({})

const ParametersProvider = ({ children }) => {
    const [title, setTitle] = useState({
        title: 'Início',
        subtitle: {
            id: null,
            count: null,
            new: false
        }
    })
    const [pageSize, setPageSize] = useState(50)
    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [data, setData] = useState([])
    const router = useRouter();

    //* Função para filtrar os dados da tabela
    const handleSearch = searchValue => {

        setSearchText(searchValue)
        const searchWords = searchValue?.toLowerCase().split(' ').filter(word => word !== '')

        const filteredRows = data && data.filter(row => {
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

    // Funções para guardar ids dinamicos no localStorage
    const setStorageId = (id) => {
        localStorage.setItem('dynamicId', JSON.stringify(id))
    }
    const getStorageId = () => {
        const id = JSON.parse(localStorage.getItem('dynamicId'))
        return id
    }

    useEffect(() => {
        if (router.query.s) {
            setSearchText(router.query.s);
            handleSearch(router.query.s)
        } else {
            setSearchText('');
        }
    }, [title, router])

    const values = {
        title,
        setTitle,
        handleSearch,
        pageSize,
        setPageSize,
        searchText,
        setSearchText,
        filteredData,
        setFilteredData,
        data,
        setData,
        setStorageId,
        getStorageId
    }

    return <ParametersContext.Provider value={values}>{children}</ParametersContext.Provider>
}

export { ParametersContext, ParametersProvider }

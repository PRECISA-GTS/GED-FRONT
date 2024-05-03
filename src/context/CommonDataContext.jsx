import { createContext, useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'

const statusTypes = {
    statusID: 0,
    nome: '',
    icone: '',
    cor: ''
}

const initialValues = {
    commonData: {
        status: statusTypes
    }
}

const CommonDataContext = createContext(initialValues)

const CommonDataProvider = ({ children }) => {
    const [commonData, setCommonData] = useState(initialValues.data)

    const getData = async () => {
        const res = await api.post('commonData/getData')
        setCommonData(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const values = {
        commonData,
        getData
    }
    return <CommonDataContext.Provider value={values}>{children}</CommonDataContext.Provider>
}

const useCommonData = () => {
    const context = useContext(CommonDataContext)
    if (context === undefined) {
        throw new Error('useCommonData must be used within a CommonDataProvider')
    }
    return context
}

export { CommonDataContext, CommonDataProvider, useCommonData }

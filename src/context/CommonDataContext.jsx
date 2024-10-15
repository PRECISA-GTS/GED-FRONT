import { createContext, useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { AuthContext } from './AuthContext'

const statusTypes = [
    {
        statusID: 0,
        name: '',
        icone: '',
        cor: ''
    }
]

const selectTypes = [
    {
        id: 0,
        name: ''
    }
]

const initialValues = {
    commonData: {
        status: statusTypes,
        professional: selectTypes,
        recebimentoModel: selectTypes,
        limpezaModel: selectTypes,
        typeFormulario: selectTypes
    }
}

const CommonDataContext = createContext(initialValues)

const CommonDataProvider = ({ children }) => {
    const [commonData, setCommonData] = useState(initialValues.commonData)
    const { loggedUnity } = useContext(AuthContext)

    const getData = async () => {
        // const res = await api.post('commonData/getData', {
        //     unidadeID: loggedUnity.unidadeID
        // })
        // setCommonData(res.data)
    }

    useEffect(() => {
        if (loggedUnity) getData()
    }, [loggedUnity])

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

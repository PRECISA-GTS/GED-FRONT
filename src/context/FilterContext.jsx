import { createContext, useContext, useState } from 'react'

const initialValues = {
    name: 'jonatan'
}

const FilterContext = createContext(initialValues)

const FilterProvider = ({ children }) => {
    const values = {
        name: 'jonatan'
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

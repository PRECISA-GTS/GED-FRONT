// ** React Imports
import React, { createContext, useState } from 'react'

// ** Defaults
const defaultProvider = {
    setIsNotFactory: () => Boolean,
    isNotFactory: false
}

const FornecedorContext = createContext(defaultProvider)

const FornecedorProvider = ({ children }) => {
    // Validação do tipo de formulário a ser preenchido (fornecedor ou fábrica)
    const [isNotFactory, setIsNotFactory] = useState(false)

    const values = {
        setIsNotFactory,
        isNotFactory
    }

    return <FornecedorContext.Provider value={values}>{children}</FornecedorContext.Provider>
}

const useFornecedor = () => {
    const context = React.useContext(FornecedorContext)
    if (context === undefined) {
        throw new Error('useFornecedor must be used within a FornecedorProvider')
    }
    return context
}

export { FornecedorContext, FornecedorProvider, useFornecedor }

// ** React Imports
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { api } from 'src/configs/api';

// ** Defaults
const defaultProvider = {
  setIsNotFactory: () => Boolean,
  isNotFactory: false
}

const FornecedorContext = createContext(defaultProvider)

const FornecedorProvider = ({ children }) => {
  const router = useRouter();
  const { loggedUnity } = useContext(AuthContext)
  // Validação do tipo de formulário a ser preenchido (fornecedor ou fábrica)
  const [isNotFactory, setIsNotFactory] = useState(false)

  const verifySupplierRisk = async () => {
    if (!loggedUnity) return
    const response = await api.post(`dashboard/fornecedor/myData`, { unidadeID: loggedUnity.unidadeID })
    //? Fornecedor ainda não possui categoria/risco, redireciona pra rota /meus-dados
    if (loggedUnity.papelID === 2 && response.data && response.data.possuiRisco !== 1) {
      router.push('/meus-dados')
      return
    }
  }

  useEffect(() => {
    verifySupplierRisk()
  }, [loggedUnity, router.pathname])

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

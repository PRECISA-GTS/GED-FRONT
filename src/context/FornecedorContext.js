// ** React Imports
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext';
import { api } from 'src/configs/api';

// ** Defaults
const defaultProvider = null

const FornecedorContext = createContext(defaultProvider)

const FornecedorProvider = ({ children }) => {
  const router = useRouter();
  const { loggedUnity, user } = useContext(AuthContext)

  const verifySupplierRisk = async () => {
    if (loggedUnity && user && loggedUnity.unidadeID && user.usuarioID) {
      const response = await api.post(`dashboard/fornecedor/myData`, {
        usuarioID: user.usuarioID,
        unidadeID: loggedUnity.unidadeID
      })

      //? Fornecedor ainda não possui categoria/risco ou é primeiro acesso, redireciona pra rota /meus-dados
      if (loggedUnity.papelID === 2 && response.data && (response.data.possuiRisco !== 1 || response.data.primeiroAcesso === 1)) {
        router.push('/meus-dados')
        return
      }
    }
  }

  useEffect(() => {
    verifySupplierRisk()
  }, [user, loggedUnity, router.pathname])

  const values = null

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

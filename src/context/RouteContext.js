import { createContext, useState } from 'react'
const RouteContext = createContext({})

const RouteProvider = ({ children }) => {
  const [id, setId] = useState(null)
  const [idNc, setIdNc] = useState(null)
  const [modelID, setModelID] = useState(null)
  const [recebimentoMpID, setRecebimentoMpID] = useState(null)
  const [limpezaID, setLimpezaID] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const values = {
    id,
    setId,
    idNc,
    setIdNc,
    isLoading,
    setIsLoading,
    modelID,
    setModelID,

    recebimentoMpID,
    setRecebimentoMpID,
    limpezaID,
    setLimpezaID
  }
  return <RouteContext.Provider value={values}>{children}</RouteContext.Provider>
}

export { RouteContext, RouteProvider }

import { createContext, useState } from 'react'
const RouteContext = createContext({})

const RouteProvider = ({ children }) => {
  const [id, setId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const values = { id, setId, isLoading, setIsLoading }
  return <RouteContext.Provider value={values}>{children}</RouteContext.Provider>
}

export { RouteContext, RouteProvider }

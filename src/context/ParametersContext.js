import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const ParametersContext = createContext({})

const ParametersProvider = ({ children }) => {
  const [title, setTitle] = useState({
    title: 'Início',
    icon: 'mdi:home-silo-outline',
    subtitle: {
      id: null,
      count: null,
      new: false
    }
  })
  const router = useRouter();

  // Funções para guardar ids dinamicos no localStorage
  const setStorageId = (id) => {
    localStorage.setItem('dynamicId', JSON.stringify(id))
  }
  const getStorageId = () => {
    const id = JSON.parse(localStorage.getItem('dynamicId'))
    return id
  }

  const values = {
    title,
    setTitle,
    setStorageId,
    getStorageId
  }

  return <ParametersContext.Provider value={values}>{children}</ParametersContext.Provider>
}

export { ParametersContext, ParametersProvider }

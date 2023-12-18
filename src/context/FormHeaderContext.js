import { createContext, useState } from 'react'
const FormHeaderContext = createContext({})

const FormHeaderProvider = ({ children }) => {
    const [id, setId] = useState(null)
    const values = { id, setId }
    return <FormHeaderContext.Provider value={values}>{children}</FormHeaderContext.Provider>
}

export { FormHeaderContext, FormHeaderProvider }

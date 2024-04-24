import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'

const useLoad = () => {
    const { isLoading, setIsLoading } = useContext(RouteContext)

    const startLoading = () => {
        setIsLoading(true)
    }

    const stopLoading = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }

    return { isLoading, startLoading, stopLoading }
}

export default useLoad

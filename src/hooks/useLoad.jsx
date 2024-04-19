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

// import { create } from 'zustand'

// interface LoadingState {
//   isLoading: boolean
//   startLoading: () => void
//   stopLoading: () => void
// }

// const useLoading = create<LoadingState>()((set) => ({
//   isLoading: false,
//   startLoading: () => set({ isLoading: true }),
//   stopLoading: () => set({ isLoading: false }),
// }))

// export default useLoading

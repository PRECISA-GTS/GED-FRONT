import { api } from 'src/configs/api'
import { useEffect, useState } from 'react'

const getDataContentReport = (route, params) => {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await api.post(`relatorio/${route}`, params)

            setData(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (params) {
            fetchData()
        }
    }, [params])

    return data
}

export default getDataContentReport

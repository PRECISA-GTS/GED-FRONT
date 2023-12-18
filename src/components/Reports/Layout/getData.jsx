import { api } from 'src/configs/api'
import { useEffect, useState } from 'react'
import { useFormContext } from 'src/context/FormContext'

const getData = () => {
    const [data, setData] = useState([])
    const reportJSON = localStorage.getItem('report')
    const report = JSON.parse(reportJSON)

    const fetchData = async () => {
        // const data = {
        //     ...report.params.data
        // }
        try {
            const response = await api.post(`relatorio/${report.route}`, report)
            setData(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (report) {
            fetchData()
        }
    }, [])
    return data
}

export default getData

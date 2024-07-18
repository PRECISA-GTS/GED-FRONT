import React, { useEffect } from 'react'
import Content from './Content'
import { api } from 'src/configs/api'

const RelatorioFornecedor = () => {
    const [data, setData] = useState({})
    const getData = async () => {
        const res = await api.get('relatorio/teste')
        setData(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return <Content data={data} />
}

export default RelatorioFornecedor

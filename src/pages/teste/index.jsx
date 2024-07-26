import { Button } from '@mui/material'
import { pdf } from '@react-pdf/renderer'
import { api } from 'src/configs/api'
import Formulario from './RelatorioFornecedor/Formulario'
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter()

    const gerar = async () => {
        const res = await api.get('relatorio/teste/generate')
        const pdfComponent = <Formulario data={res.data} />
        const blob = await pdf(pdfComponent).toBlob()
        window.open(URL.createObjectURL(blob))
    }

    const salvar = async () => {
        const res = await api.get('relatorio/teste/generate')
        const pdfComponent = <Formulario data={res.data} />
        const blob = await pdf(pdfComponent).toBlob()

        // Enviar o blob para o backend
        const formData = new FormData()
        formData.append('file', blob, 'relatorio.pdf')

        await api.post('relatorio/teste/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    const visualizar = async () => {
        // router.push('/teste/relatorio')
        window.open('/teste/relatorio', '_blank')
    }

    return (
        <div className='flex gap-2'>
            <Button variant='contained' onClick={gerar}>
                Gerar Relatório
            </Button>
            <Button variant='contained' onClick={salvar}>
                Salvar Relatório
            </Button>
            <Button variant='contained' onClick={visualizar}>
                Ver Relatório
            </Button>
        </div>
    )
}

export default index

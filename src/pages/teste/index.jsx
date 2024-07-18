import { Button } from '@mui/material'
import RelatorioFornecedor from './RelatorioFornecedor'
import { pdf } from '@react-pdf/renderer'

const index = () => {
    const gerar = async () => {
        const pdfComponent = <RelatorioFornecedor />
        const blob = await pdf(pdfComponent).toBlob()
        window.open(URL.createObjectURL(blob))
    }
    const baixar = () => {
        return <RelatorioFornecedor />
    }

    return (
        <div className='flex gap-2'>
            <RelatorioFornecedor />
            <Button variant='contained' onClick={gerar}>
                Gerar Relatório
            </Button>
            <Button variant='contained' onClick={baixar}>
                Baixar Relatório
            </Button>
        </div>
    )
}

export default index

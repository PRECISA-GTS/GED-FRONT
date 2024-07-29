import { useRouter } from 'next/router'
import StatusFornecedor from './StatusFornecedor'
import StatusRecebimentoMp from './StatusRecebimentoMp'
import StatusLimpeza from './StatusLimpeza'

const StatusSteps = ({ statusID }) => {
    const router = useRouter()

    return router.pathname === '/formularios/fornecedor' ? (
        <StatusFornecedor statusID={statusID} />
    ) : router.pathname === '/formularios/recebimento-mp' ? (
        <StatusRecebimentoMp statusID={statusID} />
    ) : router.pathname === '/formularios/limpeza' ? (
        <StatusLimpeza statusID={statusID} />
    ) : (
        <p>Rota não encontrada!</p>
    )
}

export default StatusSteps

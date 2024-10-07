import { Button } from '@mui/material'

const FixedFilters = ({ status, setStatus }) => {
    if (!status) return

    const handleFilter = type => {
        setStatus({ ...status, type })
    }

    return (
        <div className='flex items-center gap-2'>
            {(status.module === 'fornecedor' ||
                status.module === 'recebimento-mp' ||
                status.module === 'recebimento-mp-nao-conformidade' ||
                status.module === 'limpeza') && (
                <>
                    <Button
                        size='medium'
                        variant={status.type === 'all' ? 'contained' : 'outlined'}
                        onClick={() => handleFilter('all')}
                    >
                        Tudo
                    </Button>
                    <Button
                        size='medium'
                        variant={status.type === 'open' ? 'contained' : 'outlined'}
                        onClick={() => handleFilter('open')}
                    >
                        Em aberto
                    </Button>
                    <Button
                        size='medium'
                        variant={status.type === 'nc' ? 'contained' : 'outlined'}
                        onClick={() => handleFilter('nc')}
                    >
                        NC
                    </Button>
                </>
            )}
        </div>
    )
}

export default FixedFilters

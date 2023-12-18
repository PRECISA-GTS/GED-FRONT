import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const LoadingFile = ({ show, title }) => {
    return (
        show && (
            <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-gray-900 z-50'>
                <div className='flex items-center gap-2 '>
                    <CircularProgress size={20} color='primary' />
                    <p className='text-sm opacity-80 text-white '>{title ?? 'Carregando...'}</p>
                </div>
            </div>
        )
    )
}

export default LoadingFile

import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Loading = ({ show, title, customTextProps, ...props }) => {
    return (
        show && (
            <div className='fixed inset-0 flex items-center justify-center rounded-lg z-50'>
                <div className='flex flex-col justify-center items-center gap-2 '>
                    <CircularProgress color='primary' {...props} />
                    <p className={`opacity-80 text-sm ${customTextProps}`}>{title ?? 'Carregando...'}</p>
                </div>
            </div>
        )
    )
}

export default Loading

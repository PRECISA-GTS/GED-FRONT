import { Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
const StatusRecebimentoMp = ({ statusID }) => {
    const theme = useTheme()

    const Step = ({ color, filled, title }) => {
        return (
            <Tooltip title={title}>
                <div
                    className={`h-3 w-3 md:w-4 lg:w-6 rounded-full border`}
                    style={{
                        backgroundColor: filled ? color : '',
                        borderColor: !filled
                            ? hexToRGBA(
                                  theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
                                  1
                              )
                            : 'transparent'
                    }}
                ></div>
            </Tooltip>
        )
    }

    const Steps = ({ total, color }) => {
        return (
            <>
                <Step color={color} filled={true} title='Pendente' />
                <Step color={color} filled={total > 1 ? true : false} title='Em preenchimento' />
                <Step color={color} filled={total > 2 ? true : false} title='Concluiu preenchimento' />
                <Step
                    color={color}
                    filled={total > 3 ? true : false}
                    title={
                        statusID === 50
                            ? 'Reprovado'
                            : statusID === 60
                            ? 'Aprovado Parcial'
                            : statusID === 70
                            ? 'Aprovado'
                            : 'Agurdando aprovação...'
                    }
                />
            </>
        )
    }

    const MountSteps = () => {
        return (
            <div className='grid grid-cols-4 items-center gap-1'>
                {statusID === 10 ? (
                    <Steps total={1} color={hexToRGBA(theme.palette.primary.main, 1)} />
                ) : statusID === 30 ? (
                    <Steps total={2} color={hexToRGBA(theme.palette.primary.main, 1)} />
                ) : statusID === 40 ? (
                    <Steps total={3} color={hexToRGBA(theme.palette.primary.main, 1)} />
                ) : statusID === 50 ? (
                    <Steps total={4} color={hexToRGBA(theme.palette.error.main, 1)} />
                ) : statusID === 60 ? (
                    <Steps total={4} color={hexToRGBA(theme.palette.warning.main, 1)} />
                ) : statusID === 70 ? (
                    <Steps total={4} color={hexToRGBA(theme.palette.primary.main, 1)} />
                ) : (
                    <p>--</p>
                )}
            </div>
        )
    }

    return <MountSteps />
}

export default StatusRecebimentoMp

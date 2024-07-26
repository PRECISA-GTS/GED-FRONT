import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { statusDefault } from 'src/configs/defaultConfigs'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

//? Timeline
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import Typography from '@mui/material/Typography'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'

//? Styled Timeline component
const Timeline = styled(MuiTimeline)({
    paddingLeft: 0,
    paddingRight: 0,
    '& .MuiTimelineItem-root': {
        width: '100%',
        '&:before': {
            display: 'none'
        }
    }
})

const HistoricForm = ({ parFormularioID, id }) => {
    const [historic, setHistoric] = useState(false)

    const getMovementHistory = async () => {
        try {
            await api.post(`/formularios/fornecedor/getMovementHistory/${id}`, { parFormularioID }).then(response => {
                setHistoric(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovementHistory()
    }, []) // Estado do modal de confirmação como dependência

    return (
        <Card>
            <CardContent>
                <h2 className='font-semibold mb-2'>Histórico de movimentações</h2>
                <Box>
                    <Timeline>
                        {historic &&
                            historic.length > 0 &&
                            historic.map((mov, index) => (
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <TimelineDot color={statusDefault[mov.statusAtual].color} />
                                        {index < historic.length - 1 && <TimelineConnector />}
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom', mx: 4 } }}>
                                        <Box
                                            sx={{
                                                mb: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <div className='flex items-center gap-2'>
                                                <Typography
                                                    variant='body2'
                                                    className='flex items-center'
                                                    sx={{ color: 'text.primary' }}
                                                >
                                                    <span>
                                                        {statusDefault[mov.statusAnterior].title == 'Inativo'
                                                            ? 'Início'
                                                            : statusDefault[mov.statusAnterior].title}
                                                    </span>
                                                    <Icon icon='mdi:arrow-right' />
                                                    <span>{statusDefault[mov.statusAtual].title}</span>
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}
                                                >
                                                    {mov.data + ' - ' + mov.hora + ' '}
                                                </Typography>
                                                {index == 0 && (
                                                    <CustomChip
                                                        size='small'
                                                        skin='light'
                                                        color={statusDefault[mov.statusAtual].color}
                                                        label='Atual'
                                                        sx={{
                                                            '& .MuiChip-label': {
                                                                textTransform: 'capitalize'
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <Typography variant='caption' className='flex items-center'>
                                                    <Icon icon='iconoir:user' />
                                                    {mov.usuario}
                                                </Typography>

                                                <Typography variant='caption' className='flex items-center gap-0'>
                                                    <Icon icon='mdi:company' />
                                                    {mov.unidade}
                                                </Typography>
                                            </div>
                                        </Box>

                                        {mov.observacao != null && (
                                            <Box>
                                                <Typography variant='caption'>{mov.observacao}</Typography>
                                            </Box>
                                        )}
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                    </Timeline>
                </Box>
            </CardContent>
        </Card>
    )
}

export default HistoricForm

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { api } from 'src/configs/api'
import { statusDefault } from 'src/configs/defaultConfigs'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'

//? Timeline
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import MuiTimeline from '@mui/lab/Timeline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { AuthContext } from 'src/context/AuthContext'

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
    const { user } = useContext(AuthContext)

    const getMovementHistory = async () => {
        try {
            await api
                .post(`/formularios/fornecedor/getMovementHistory/${id}`, {
                    parFormularioID,
                    papelID: user.papelID
                })
                .then(response => {
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
        historic &&
        historic.length > 0 && (
            <div>
                <Accordion sx={{ borderRadius: '10px', overflow: 'hidden', p: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                        <h2 className='font-semibold mb-2'>Histórico de movimentações ({historic.length})</h2>
                    </AccordionSummary>
                    <AccordionDetails>
                        {historic &&
                            historic.length > 0 &&
                            historic.map((row, index) => (
                                <>
                                    <div className='grid grid-cols-4 items-center'>
                                        <div>{row.data + ' ' + row.hora}</div>
                                        <div className='flex items-center justify-start gap-2'>
                                            <TimelineDot color={statusDefault[row.statusAtual].color} />
                                            <span>{statusDefault[row.statusAtual].title}</span>
                                            {index == 0 && (
                                                <CustomChip
                                                    size='small'
                                                    skin='light'
                                                    color={statusDefault[row.statusAtual].color}
                                                    label='Atual'
                                                    sx={{
                                                        '& .MuiChip-label': {
                                                            textTransform: 'capitalize'
                                                        }
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <Typography variant='caption' className='flex items-center gap-2'>
                                            <Icon icon='material-symbols:person-check-outline' />
                                            {row.usuario}
                                        </Typography>
                                        <Typography variant='caption' className='flex items-center gap-2'>
                                            <Icon icon='mage:building-tree' />
                                            {row.unidade}
                                        </Typography>
                                    </div>

                                    {row.observacao && (
                                        <Typography
                                            variant='caption'
                                            className='opacity-70'
                                        >{`${row.observacao}`}</Typography>
                                    )}
                                </>
                            ))}
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    )
}

export default HistoricForm

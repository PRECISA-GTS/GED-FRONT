import { Grid, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'

const LimpezaInfo = ({ data }) => {
    if (!data) return

    const router = useRouter()
    const { user } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)

    const goToReceive = () => {
        setId(data.limpeza.id)
        router.push(`/formularios/limpeza/`)
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <label className='opacity-60'>Setor</label>
                <div className='flex items-center gap-2'>
                    <Icon icon='mdi:truck-fast-outline' />
                    <p>{data.setor}</p>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <label className='opacity-60'>Data e hora da limpeza</label>
                <div className='flex items-center gap-2'>
                    <Icon icon='tabler:calendar-check' />
                    <p>{`${data.limpeza.dataLimpeza} ${data.limpeza.horaLimpeza}`}</p>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <label className='opacity-60'>NF</label>
                <div className='flex items-center gap-2 '>
                    <Icon icon='ion:document-text-outline' />
                    <p>{data.limpeza.nfRecebimentoMp ?? '--'}</p>
                </div>
            </Grid>
            <Grid item xs={12} md={2}>
                <label className='opacity-60'>Limpeza</label>
                <div className='flex items-center gap-2'>
                    <CustomChip
                        skin='light'
                        label={data.limpeza.status.label}
                        color={data.limpeza.status.color}
                        sx={{ height: 28, fontSize: '0.75rem' }}
                    />
                    {(user.papelID != 2 || data.fornecedorAcessaRecebimento) && (
                        <Tooltip title='Acessar Limpeza e Higienização' placement='top'>
                            <div className='cursor-pointer'>
                                <Icon icon='ci:external-link' onClick={goToReceive} />
                            </div>
                        </Tooltip>
                    )}
                </div>
            </Grid>
        </Grid>
    )
}

export default LimpezaInfo

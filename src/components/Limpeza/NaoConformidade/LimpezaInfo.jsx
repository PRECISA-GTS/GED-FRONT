import { Grid, Tooltip } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'

const LimpezaInfo = ({ data }) => {
    if (!data) return

    console.log('🚀 ~ LimpezaInfo:', data)

    const router = useRouter()
    const { user } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)

    const goToReceive = () => {
        setId(data.limpeza.id)
        router.push(`/formularios/limpeza/`)
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
                <label className='opacity-60'>Período da limpeza</label>
                <div className='flex items-center gap-2'>
                    <Icon icon='tabler:calendar-check' />
                    <p>{`${data.limpeza.dataInicio} a ${data.limpeza.dataFim}`}</p>
                </div>
            </Grid>
            <Grid item xs={12} md={4}>
                <label className='opacity-60'>Setor</label>
                <div className='flex items-center gap-2'>
                    <Icon icon='fluent-mdl2:map-pin-12' />
                    <p>{data.limpeza.setor}</p>
                </div>
            </Grid>
            <Grid item xs={12} md={3}>
                <label className='opacity-60'>Modelo</label>
                <div className='flex items-center gap-2 '>
                    <Icon icon='clarity:form-line' />
                    <p>{data.limpeza.modelo}</p>
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

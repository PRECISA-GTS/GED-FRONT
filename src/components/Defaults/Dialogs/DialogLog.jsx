import Dialog from '@mui/material/Dialog'
import { api } from 'src/configs/api'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import { AuthContext } from 'src/context/AuthContext'
import { SettingsContext } from 'src/@core/context/settingsContext'
import CustomAvatar from 'src/@core/components/mui/avatar'

const DialogLog = ({ open, handleClose, row }) => {
    const router = useRouter()
    const [data, setData] = useState(null)
    const { loggedUnity } = useContext(AuthContext)
    const currentLink = router.pathname
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode

    const getData = async () => {
        const response = await api.get(`${currentLink}/getData/${loggedUnity.unidadeID}/${row.id}`)
        // console.log('🚀 ~ response:', response.data)
        setData(response.data)
    }

    useEffect(() => {
        if (row) getData()
    }, [row])

    function formatarAlteracao(alteracao, operacao) {
        try {
            const objetoAlteracao = JSON.parse(alteracao)
            let jsonString = JSON.stringify(objetoAlteracao, null, 2)

            // Adiciona a cor amarela aos objetos que têm "alterado" igual a "true"
            jsonString = jsonString.replace(
                /(\"alterado\": true)/g,
                '<span style="background-color: #ce9728; padding: 2px 1px; border-radius: 4px">$1</span>'
            )

            return <pre dangerouslySetInnerHTML={{ __html: jsonString }} />
        } catch (error) {
            return alteracao
        }
    }
    // function formatarAlteracao(alteracao, operacao) {
    //     try {
    //         const objetoAlteracao = JSON.parse(alteracao)
    //         let jsonString = JSON.stringify(objetoAlteracao, null, 2)

    //         // Adiciona a cor amarela aos objetos que têm "alterado" igual a "true" e "antes" diferente de "depois"
    //         jsonString = jsonString.replace(
    //             /("alterado": true, "antes": "([^"]+)", "depois": "\2")/g,
    //             '<span style="background-color: #ce9728; padding: 2px 1px; border-radius: 4px;">$1</span>'
    //         )

    //         return <pre dangerouslySetInnerHTML={{ __html: jsonString }} />
    //     } catch (error) {
    //         return alteracao
    //     }
    // }

    return (
        row &&
        data && (
            <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth={'md'} fullWidth>
                <DialogTitle id='customized-dialog-title' sx={{ textAlign: 'center' }}>
                    <Typography variant='h5' component='span'>
                        {row.nome}
                    </Typography>
                    <Typography variant='body2'>{`Este log #${row.id} gerou um total de ${data.length} ${
                        data.length == 1 ? 'script' : 'scripts'
                    }`}</Typography>

                    <IconButton
                        aria-label='close'
                        onClick={handleClose}
                        sx={{ top: 10, right: 10, position: 'absolute', color: 'grey.500' }}
                    >
                        <Icon icon='mdi:close' />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ p: 10, mt: 8 }}>
                    {/* Icones */}

                    <Grid container spacing={8}>
                        <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon icon='fluent-mdl2:date-time-mirrored' className='text-5xl' />
                            <span>{row.dataHora}</span>
                        </Grid>
                        <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon icon='majesticons:user-line' className='text-5xl' />
                            <span>{row.usuario}</span>
                        </Grid>
                        <Grid item md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Icon icon='material-symbols-light:bring-your-own-ip' className='text-5xl' />
                            <span>{row.ip}</span>
                        </Grid>
                    </Grid>

                    {/* Scripts */}
                    <div className='flex flex-col gap-4 mt-8'>
                        {data.map(log => {
                            return (
                                <div
                                    className={`border ${
                                        mode == 'dark' ? 'border-white/20' : 'border-black/20'
                                    }   rounded-xl p-4 space-y-4 h-auto`}
                                >
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-1'>
                                            <CustomAvatar
                                                skin='light'
                                                color={
                                                    log.operacao == 'insert'
                                                        ? 'success'
                                                        : log.operacao == 'update'
                                                        ? 'warning'
                                                        : log.operacao == 'delete'
                                                        ? 'error'
                                                        : log.operacao == 'login'
                                                        ? 'info'
                                                        : 'info'
                                                }
                                                variant='rounded'
                                                sx={{ mr: 3, width: 48, height: 48 }}
                                            >
                                                <Icon
                                                    icon={
                                                        log.operacao == 'insert'
                                                            ? 'dashicons:insert'
                                                            : log.operacao == 'update'
                                                            ? 'akar-icons:edit'
                                                            : log.operacao == 'delete'
                                                            ? 'mingcute:delete-line'
                                                            : log.operacao == 'login'
                                                            ? 'ic:round-login'
                                                            : log.operacao == 'email'
                                                            ? 'mynaui:send'
                                                            : 'ic:round-logout'
                                                    }
                                                />
                                            </CustomAvatar>
                                            <Typography sx={{ color: 'text.secondary', marginTop: '-4px' }}>
                                                {log.operacao == 'insert'
                                                    ? 'Inclusão'
                                                    : log.operacao == 'update'
                                                    ? 'Alteração'
                                                    : log.operacao == 'delete'
                                                    ? 'Exclusão'
                                                    : log.operacao == 'login'
                                                    ? 'Login efetuado'
                                                    : log.operacao == 'email'
                                                    ? 'Envio de E-mail'
                                                    : 'Logout efetuado'}
                                            </Typography>
                                        </div>
                                        <div>
                                            <div className='flex flex-col justify-end '>
                                                <Typography
                                                    variant='caption'
                                                    sx={{ color: 'text.disabled', textAlign: 'right' }}
                                                >
                                                    Tabela
                                                </Typography>
                                                <Typography sx={{ color: 'text.secondary', marginTop: '-4px' }}>
                                                    {log.tabela}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={`${
                                            mode === 'dark' ? 'bg-[#212b36]' : 'bg-[#f7f7f9]'
                                        } p-2 rounded-lg`}
                                    >
                                        <pre>{formatarAlteracao(log.alteracao, log.operacao)}</pre>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div></div>
                </DialogContent>
            </Dialog>
        )
    )
}

export default DialogLog

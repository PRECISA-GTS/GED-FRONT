import { Avatar, Card, CardContent, Typography } from '@mui/material'
import { useContext } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'

const HeaderInfo = ({ value }) => {
    const { settings } = useContext(SettingsContext)

    return (
        <Card style={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <div className='flex flex-col items-center gap-1'>
                    {/* Informações do fornecedor */}
                    {value?.nome_ ? (
                        <>
                            <div className='flex justify-center'>
                                <Avatar
                                    variant='rounded'
                                    sx={{ width: 70, height: 70 }}
                                    className={`p-1 ${settings.mode === 'dark' ? '!bg-[#e0e0e0]' : '!bg-[#f5f5f5]'}`}
                                >
                                    <img
                                        src={value?.foto ?? '/imageDefault/factory.svg'}
                                        alt='Imagem da logo da fábrica'
                                    />
                                </Avatar>
                            </div>
                            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                                {value?.nome_}
                            </Typography>
                            <Typography variant='subtitle2'>{value?.cnpj_}</Typography>
                            {value.email ? (
                                <Typography variant='subtitle2'>{value?.email}</Typography>
                            ) : (
                                <Typography variant='subtitle2' color='error' sx={{ textTransform: 'italic' }}>
                                    E-mail não informado
                                </Typography>
                            )}

                            {value?.telefone && <Typography variant='subtitle2'>{value?.telefone ?? '--'}</Typography>}
                            {value?.cidade && <Typography variant='subtitle2'>{value?.cidade ?? '--'}</Typography>}
                        </>
                    ) : (
                        <Typography variant='subtitle1'>-- Selecione um fornecedor --</Typography>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default HeaderInfo

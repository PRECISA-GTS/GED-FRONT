import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import Icon from 'src/@core/components/icon'
import { SettingsContext } from 'src/@core/context/settingsContext'

const CardList = ({ xs, md, icon, title, color, subtitle, action, handleClick }) => {
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode

    return (
        <Grid item xs={xs} md={md}>
            <Card
                onClick={handleClick}
                className={`cursor-pointer ${color ?? ''} ${
                    mode == 'dark' ? 'hover:bg-[#232327]' : 'hover:bg-[#EEEEF1]'
                } ${color && mode == 'dark' ? '!text-[#232327]' : ''}  shadow-xl transition-all`}
            >
                <CardContent className='text-center'>
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{ gap: 3, padding: 6 }}>
                        <Icon icon={icon} width={38} />

                        <Typography
                            variant='h6'
                            className={`!font-extrabold ${color && mode == 'dark' ? '!text-[#232327]' : ''}`}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant='subtitle2'
                            className={`${color && mode == 'dark' ? '!text-[#232327]/80' : ''}`}
                        >
                            {subtitle}
                        </Typography>
                        <div className='flex items-center gap-1 text-[#4a8b57] '>
                            <Icon
                                icon={
                                    action == 'new'
                                        ? 'icon-park-solid:add-one'
                                        : action == 'edit'
                                        ? 'grommet-icons:form-next-link'
                                        : 'tabler:select'
                                }
                                width={16}
                            />
                            <Typography variant='body2' color='primary'>
                                {action == 'new' ? 'Criar novo' : action == 'edit' ? 'Acessar' : 'Selecionar'}
                            </Typography>
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CardList

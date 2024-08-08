import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useTheme } from '@mui/material/styles'

const CardList = ({ xs, md, icon, id, title, subtitle, action, handleClick, linkedsForms }) => {
    const theme = useTheme()

    const checkIfIsLinked = id => {
        if (!linkedsForms) return
        const linked = linkedsForms.find(row => row === id)
        return !linked
    }

    return (
        <Grid item xs={xs} md={md}>
            <Card
                sx={{
                    '&:hover': {
                        backgroundColor: `${theme.palette.action.hover}`
                    },
                    height: '100%', // Faz o card ocupar 100% da altura disponível
                    display: 'flex', // Usa flexbox para o layout
                    flexDirection: 'column' // Coloca o conteúdo em coluna
                }}
                onClick={handleClick}
                className={`cursor-pointer shadow-xl transition-all`}
            >
                <CardContent
                    className='text-center'
                    sx={{
                        flexGrow: 1, // Faz o conteúdo crescer para ocupar o espaço disponível
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center' // Centraliza o conteúdo verticalmente
                    }}
                >
                    <Box display='flex' flexDirection='column' alignItems='center' sx={{ gap: 3, padding: 6 }}>
                        <Icon icon={icon} width={38} className='text-[#F8D552]' />
                        <Typography variant='h6' className={`!font-extrabold`}>
                            {title}
                        </Typography>
                        <Typography variant='subtitle2'>{subtitle}</Typography>
                        <div className='flex items-center gap-1'>
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
                        {checkIfIsLinked(id) && (
                            <Typography variant='body2' color='error'>
                                Formulário não vinculado
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CardList

import { Grid, Typography, Box, Tooltip, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

const Remove = ({ xs, md, icon, color, title, removeItem, item, pending, index, textSuccess, textError }) => {
    //* Mensagens tooltip
    textSuccess = textSuccess || 'Remover este item'
    textError = textError || 'Este item não pode ser removido pois possui cadastros vinculados a ele'

    return (
        <Grid item xs={xs} md={md}>
            <Box height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Typography variant='caption'>{title}</Typography>
                <Tooltip title={pending == 1 ? textError : textSuccess}>
                    <IconButton
                        color={color ?? 'error'}
                        size='small'
                        onClick={() => {
                            pending != 1 ? removeItem(item, index) : null
                        }}
                        sx={{
                            opacity: pending == 1 ? 0.5 : 1,
                            cursor: pending == 1 ? 'default' : 'pointer'
                        }}
                    >
                        <Icon icon={icon ?? 'tabler:trash-filled'} />
                    </IconButton>
                </Tooltip>
            </Box>
        </Grid>
    )
}

export default Remove

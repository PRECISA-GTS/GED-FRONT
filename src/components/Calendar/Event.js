import { Grid, Typography } from "@mui/material"
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

const Event = ({ values }) => {
    const data = {
        ...values._def.extendedProps,
        title: values._def.title,
    }

    const getLabel = () => {
        const label = data.variant == 'info' ? 'Dentro do prazo' : data.variant == 'warning' ? 'Vence hoje' : data.variant == 'error' ? 'Vencido' : 'Concluído'
        return label
    }

    return (

        <Grid container spacing={4}>
            <Grid item xs={6} md={3} >
                <CustomAvatar skin='light' variant='rounded' color="secondary" sx={{ width: '100%', height: '100%' }}>
                    <Icon icon={data.icon} />
                </CustomAvatar>
            </Grid>
            <Grid item xs={6} md={8} >
                <div className="flex flex-col gap-1">
                    <Typography variant="h5">
                        {data.title}
                    </Typography>
                    <div className='flex items-end gap-2'>
                        <div>
                            <Typography variant="caption">
                                Vencimento
                            </Typography>
                            <Typography variant="body1">
                                {data.eventDate}
                            </Typography>
                        </div>
                        <CustomChip
                            skin='light'
                            size='small'
                            label={getLabel()}
                            color={data.variant}
                            sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem' }}
                        />
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Event
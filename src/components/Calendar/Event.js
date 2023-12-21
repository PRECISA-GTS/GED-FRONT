import { Typography } from "@mui/material"
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'

const Event = ({ values }) => {
    console.log("🚀 ~ values:", values)

    const data = {
        ...values._def.extendedProps,
        title: values._def.title,
    }

    const getLabel = () => {
        const label = data.variant == 'info' ? 'Dentro do prazo' : data.variant == 'warning' ? 'Vence hoje' : data.variant == 'error' ? 'Vencido' : 'Concluído'
        return label
    }

    console.log("🚀 ~ data:", data)
    return (
        <div className="flex flex-col gap-4">
            <div>

                <div className='flex items-center gap-4'>
                    <CustomAvatar skin='light' variant='rounded' color="secondary">
                        <Icon icon={data.icon} />
                    </CustomAvatar>
                    <Typography variant='body1'>{data.type}</Typography>
                </div>

                <Typography variant="h6">
                    {data.title}
                </Typography>

                <Typography variant="h6">
                    {data.eventDate}
                </Typography>

                <CustomChip
                    skin='light'
                    size='small'
                    label={getLabel()}
                    color={data.variant}
                    sx={{ mb: 5.5, height: 20, fontWeight: 500, fontSize: '0.75rem' }}
                />
            </div>
        </div>
    )
}

export default Event
import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'

const ButtonOpenForm = () => {
    return (
        <Button type='submit' variant='contained' color='primary' size='medium' fullWidth>
            <div className='flex items-center gap-1 py-1'>
                <Icon icon='grommet-icons:form-next-link' />
                Avançar
            </div>
        </Button>
    )
}

export default ButtonOpenForm

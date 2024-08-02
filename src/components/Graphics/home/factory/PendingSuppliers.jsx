import { Card, CardContent, Tooltip, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Icon from 'src/@core/components/icon'

const PendingSuppliers = ({ data }) => {
    const theme = useTheme()

    const Step = ({ filled, title }) => {
        return (
            <Tooltip title={title}>
                <div
                    className={`h-5 rounded-full border`}
                    style={{
                        backgroundColor: filled ? theme.palette.primary.main : '',
                        borderColor: !filled
                            ? hexToRGBA(
                                  theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
                                  1
                              )
                            : 'transparent'
                    }}
                ></div>
            </Tooltip>
        )
    }

    return (
        <Card>
            <CardContent className='space-y-4 w-full'>
                {/* Título */}
                <div className='flex items-center gap-4 pb-2'>
                    <CustomAvatar skin='light' variant='rounded' color='primary'>
                        <Icon icon='mdi:truck-fast-outline' className='text-base' />
                    </CustomAvatar>
                    <Typography variant='body1'>Fornecedores Pendentes</Typography>
                </div>

                {/* Pendente */}
                <div className='grid grid-cols-5 gap-4'>
                    <Step filled title='Pendente' />
                    <Step title='Acessou formulário' />
                    <Step title='Em preenchimento' />
                    <Step title='Concluído' />
                    <Tooltip title='Total pendentes'>
                        <p className='text-center text-lg font-semibold relative -top-[6px]'>
                            {data.find(item => item.status === 10)?.qtd ?? 0}
                        </p>
                    </Tooltip>
                </div>

                {/* Acessou formulário */}
                <div className='grid grid-cols-5 gap-4'>
                    <Step filled title='Pendente' />
                    <Step filled title='Acessou formulário' />
                    <Step title='Em preenchimento' />
                    <Step title='Concluído' />
                    <Tooltip title='Total que acessou o formulário'>
                        <p className='text-center text-lg font-semibold relative -top-[6px]'>
                            {data.find(item => item.status === 20)?.qtd ?? 0}
                        </p>
                    </Tooltip>
                </div>

                {/* Em preenchimento */}
                <div className='grid grid-cols-5 gap-4'>
                    <Step filled title='Pendente' />
                    <Step filled title='Acessou formulário' />
                    <Step filled title='Em preenchimento' />
                    <Step title='Concluído' />
                    <Tooltip title='Total em preenchimento'>
                        <p className='text-center text-lg font-semibold relative -top-[6px]'>
                            {data.find(item => item.status === 30)?.qtd ?? 0}
                        </p>
                    </Tooltip>
                </div>

                {/* Concluído */}
                <div className='grid grid-cols-5 gap-4'>
                    <Step filled title='Pendente' />
                    <Step filled title='Acessou formulário' />
                    <Step filled title='Em preenchimento' />
                    <Step filled title='Concluído' />
                    <Tooltip title='Total concluídos'>
                        <p className='text-center text-lg font-semibold relative -top-[6px]'>
                            {data.find(item => item.status === 40)?.qtd ?? 0}
                        </p>
                    </Tooltip>
                </div>
            </CardContent>
        </Card>
    )
}

export default PendingSuppliers

import { Button, Tooltip } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Router from 'next/router'
import Link from 'next/link'
import useLoad from 'src/hooks/useLoad'
import { useGlobal } from 'src/hooks/useGlobal'

const ButtonsFixedRight = ({
    btnSend,
    btnSave,
    btnNew,
    btnNext,
    routes,
    disabled,
    disabledSend,
    disabledSubmit,
    handleSubmit,
    handleSend,
    iconConclusion,
    titleConclusion
}) => {
    const router = Router
    const { isLoading } = useLoad()
    const { data } = useGlobal()

    return (
        <div className='flex items-center gap-2'>
            {/* Novo */}
            {btnNew && routes.find(route => route.rota === router.pathname && route.inserir) && (
                <Link href={`${router.pathname}/novo`}>
                    <Button
                        type='button'
                        variant='outlined'
                        color='primary'
                        size='medium'
                        sx={{ display: 'flex', gap: 2 }}
                    >
                        <Icon icon='ic:outline-plus' />
                        <span className='hidden sm:block'>Novo</span>
                    </Button>
                </Link>
            )}

            {/* Conclusão de formulário (salva arquivo .pdf do formulário) */}
            {btnSend && data && (
                <Button
                    onClick={handleSend}
                    type='button'
                    variant='contained'
                    size='medium'
                    color='primary'
                    readOnly
                    disabled={disabled || disabledSend}
                    sx={{
                        display: 'flex',
                        gap: 2
                    }}
                >
                    <Icon icon={iconConclusion ?? 'carbon:send-filled'} />
                    <span className='hidden sm:block'>{titleConclusion}</span>
                </Button>
            )}
            {btnSave && (
                <Button
                    onClick={handleSubmit}
                    type='submit'
                    variant='contained'
                    size='medium'
                    disabled={disabled || disabledSubmit}
                    sx={{ display: 'flex', gap: 2 }}
                >
                    <Icon icon='mdi:check-bold' />
                    <span className='hidden sm:block'>Salvar</span>
                </Button>
            )}
            {btnNext && (
                <Button
                    onClick={handleSubmit}
                    type='submit'
                    variant='outlined'
                    size='medium'
                    color={isLoading ? 'secondary' : 'primary'}
                    disabled={disabled || isLoading}
                >
                    <Icon icon='grommet-icons:form-next-link' />
                    <span className='hidden sm:block'>Avançar</span>
                </Button>
            )}
        </div>
    )
}

export default ButtonsFixedRight

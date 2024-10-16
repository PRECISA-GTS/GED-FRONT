import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Router from 'next/router'
import Link from 'next/link'
import useLoad from 'src/hooks/useLoad'
import { useGlobal } from 'src/hooks/useGlobal'
import { AuthContext } from 'src/context/AuthContext'
import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'

const ButtonsFixedRight = ({
    btnSend,
    btnSave,
    btnNew,
    btnNext,
    disabled,
    disabledSend,
    disabledSubmit,
    handleSubmit,
    handleSend,
    iconConclusion,
    titleConclusion,
    btnNewModal,
    handleNewModal
}) => {
    const router = Router
    const { isLoading } = useLoad()
    const { data } = useGlobal()
    const { hasPermission } = useContext(AuthContext)
    const { setId } = useContext(RouteContext)

    return (
        <div className='flex items-center gap-2'>
            {/* Novo */}
            {btnNew && hasPermission(router.pathname, 'inserir') && (
                <Link href={`${router.pathname}/novo`}>
                    <Button
                        type='button'
                        variant='outlined'
                        color='primary'
                        size='medium'
                        sx={{ display: 'flex', gap: 2 }}
                        onClick={() => setId(null)}
                    >
                        <Icon icon='ic:outline-plus' />
                        <span className='hidden sm:block'>Novo</span>
                    </Button>
                </Link>
            )}
            {/* Novo em modal */}
            {btnNewModal && hasPermission(router.pathname, 'inserir') && (
                <Button
                    type='button'
                    variant='outlined'
                    color='primary'
                    size='medium'
                    sx={{ display: 'flex', gap: 2 }}
                    onClick={handleNewModal}
                >
                    <Icon icon='ic:outline-plus' />
                    <span className='hidden sm:block'>Novo</span>
                </Button>
            )}

            {/* Conclusão de formulário (salva arquivo .pdf do formulário) */}
            {btnSend && data && hasPermission(router.pathname, 'editar') && (
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
            {btnSave && hasPermission(router.pathname, 'editar') && (
                <Button
                    onClick={handleSubmit}
                    type='submit'
                    variant='contained'
                    size='medium'
                    disabled={disabled || disabledSubmit}
                    sx={{ display: 'flex', gap: 2 }}
                >
                    <Icon icon='heroicons-outline:check' />
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

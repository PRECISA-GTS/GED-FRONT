import { Button, Tooltip } from '@mui/material'
import { useContext } from 'react'
import Icon from 'src/@core/components/icon'
import { AuthContext } from 'src/context/AuthContext'

const ButtonsFixedLeft = ({
    routes,
    currentUrl,
    btnCancel,
    btnDelete,
    btnStatus,
    btnClose,
    handleModalClose,
    handleBtnStatus,
    status,
    setId,
    router,
    type,
    onclickDelete
}) => {
    const { hasPermission } = useContext(AuthContext)
    const completeRoute = `${router.pathname}${router.query.aba ? `?aba=${router.query.aba}` : ''}`

    const removeRouteNew = route => {
        //? Verifica se há /novo na rota, se sim, remove
        if (route.includes('/novo')) {
            return route.replace('/novo', '')
        }
        return route
    }

    return (
        <div className='flex gap-2'>
            {btnCancel && !btnClose && hasPermission(router.pathname, 'ler') && (
                <Tooltip title='Voltar página' placement='top'>
                    <Button
                        onClick={() => {
                            setId(null)
                            router.push(removeRouteNew(completeRoute))
                        }}
                        type='button'
                        variant='outlined'
                        color='primary'
                        size='medium'
                    >
                        <Icon icon='grommet-icons:form-previous-link' />
                    </Button>
                </Tooltip>
            )}

            {btnDelete && hasPermission(router.pathname, 'excluir') && (
                <Tooltip title='Excluir formulário' placement='top'>
                    <Button
                        type='button'
                        onClick={onclickDelete}
                        variant='outlined'
                        color='error'
                        size='medium'
                        sx={{ display: 'flex', gap: 2 }}
                    >
                        <Icon icon='solar:trash-bin-minimalistic-2-outline' />
                    </Button>
                </Tooltip>
            )}

            {btnClose && (
                <Button
                    type='button'
                    onClick={handleModalClose}
                    variant='outlined'
                    color='primary'
                    size='medium'
                    sx={{ display: 'flex', gap: 2 }}
                >
                    <span className='hidden sm:block'>Fechar</span>
                </Button>
            )}
        </div>
    )
}

export default ButtonsFixedLeft

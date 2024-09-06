import { Button } from '@mui/material'
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

    return (
        <div className='flex gap-2'>
            {btnCancel && !btnClose && hasPermission(router.pathname, 'ler') && (
                <Button
                    onClick={() => {
                        setId(null)
                        if (type == 'new') {
                            router.push(router.pathname)
                        }
                    }}
                    type='button'
                    variant='outlined'
                    color='primary'
                    size='medium'
                >
                    <Icon icon='grommet-icons:form-previous-link' />
                </Button>
            )}

            {btnDelete && hasPermission(router.pathname, 'excluir') && (
                <Button
                    type='button'
                    onClick={onclickDelete}
                    variant='outlined'
                    color='error'
                    size='medium'
                    sx={{ display: 'flex', gap: 2 }}
                >
                    <Icon icon='material-symbols:delete-outline' />
                    {/* <span className='hidden sm:block'>Excluir</span> */}
                </Button>
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

import { Button, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import DialogActs from '../Dialogs/DialogActs'
import { useState } from 'react'
import { useGlobal } from 'src/hooks/useGlobal'
import { api_url } from 'src/configs/api'

const OptionsDots = ({ anchorEl, open, handleClose, handleClick, actionsData }) => {
    const [openModal, setOpenModal] = useState(false)
    const [item, setItem] = useState(null)
    const { setData, data: dataGlobal } = useGlobal()

    // Ao clicar em um item e ele for do tipo report
    const handleClickReport = item => {
        setData({ ...dataGlobal, report: { id: item.id, status: item.status } })
    }

    const handleOpenReport = item => {
        if (item.status >= 50) {
            const url = `${api_url}uploads/${item.unidadeID}/${item.module}/relatorio/original/${item.usuarioID}-${item.id}-${item.module}.pdf`
            window.open(url, '_blank')
        } else {
            window.open(`/relatorio/${item.route}`, '_blank')
        }
    }

    return (
        <div className='relative'>
            <Button
                type='button'
                onClick={handleClick}
                variant='outlined'
                color='primary'
                size='medium'
                sx={{ display: 'flex', gap: 2 }}
            >
                <Icon icon='octicon:chevron-down-12' />
                <span className='hidden sm:block'>Ações</span>
            </Button>

            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {actionsData?.map(item => {
                    return (
                        <MenuItem
                            key={item.id}
                            onClick={() => {
                                handleClose()
                                handleClickReport(item)
                            }}
                            disabled={item.disabled ? true : false}
                            style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                            {item.identification ? (
                                <span style={{ padding: '0 7px' }}>
                                    <span>{item.identification}</span> -
                                </span>
                            ) : (
                                <Icon icon={item.icon} />
                            )}

                            {item.type == 'report' ? (
                                <a onClick={() => handleOpenReport(item)}>{item.name}</a>
                            ) : (
                                <p
                                    onClick={
                                        item.modal
                                            ? () => {
                                                  setOpenModal(true)
                                                  setItem(item)
                                              }
                                            : item.action
                                    }
                                >
                                    {item.name}
                                </p>
                            )}
                        </MenuItem>
                    )
                })}
            </Menu>

            {/* Modal */}
            {item && (
                <DialogActs
                    title={item.name}
                    handleConclusion={item.action}
                    size={item.size}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                    fullHeight={item.fullHeight}
                >
                    {item.component}
                </DialogActs>
            )}
        </div>
    )
}

export default OptionsDots

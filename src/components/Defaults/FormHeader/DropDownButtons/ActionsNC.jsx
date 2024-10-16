import { Button, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import DialogActs from '../../Dialogs/DialogActs'
import { useContext, useState } from 'react'

const ActionsNC = ({ anchorEl, open, handleClose, handleClick, actionsData }) => {
    const [openModal, setOpenModal] = useState(false)
    const [item, setItem] = useState(null)

    const handleOpenReport = item => {
        window.open(`/relatorio/${item.route}`, '_blank')
    }

    return (
        <div className='relative'>
            <Button
                type='button'
                onClick={handleClick}
                variant='outlined'
                color='warning'
                size='medium'
                sx={{ display: 'flex', alignItems: 'end', gap: 2 }}
            >
                <Icon icon='octicon:chevron-down-12' />
                <span className='hidden sm:block'>Não Conformidade</span>
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
                {actionsData &&
                    actionsData.length > 0 &&
                    actionsData?.map(item => {
                        if (!item) return null

                        return (
                            <MenuItem
                                key={item.id}
                                onClick={() => {
                                    handleClose()
                                }}
                                disabled={item.disabled ? true : false}
                                sx={{
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                {item?.identification ? (
                                    <span style={{ padding: '0 7px' }}>
                                        <span>{item.identification}</span> -
                                    </span>
                                ) : (
                                    <Icon icon={item.icon} className={item.iconClass} />
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

export default ActionsNC

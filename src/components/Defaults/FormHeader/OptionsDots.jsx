import { Button, Menu, MenuItem } from '@mui/material'
import Icon from 'src/@core/components/icon'
import DialogActs from '../Dialogs/DialogActs'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import { useFormContext } from 'src/context/FormContext'

const OptionsDots = ({ anchorEl, open, handleClose, handleClick, actionsData }) => {
    const [openModal, setOpenModal] = useState(false)
    const [item, setItem] = useState(null)
    const { setReportParameters } = useFormContext()

    // Ao clicar em um item e ele for do tipo report
    const handleClickReport = item => {
        setReportParameters(item)
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
                <Icon icon='akar-icons:edit' />
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
                    // console.log('🚀 ~ item:', item)
                    // setParamsReport(item)
                    return (
                        <MenuItem
                            key={item.id}
                            onClick={() => {
                                handleClose()
                                handleClickReport(item)
                            }}
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
                                <a href={`/relatorio`} target='_blank'>
                                    {item.name}
                                </a>
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
                    description={item.description}
                    handleConclusion={item.action}
                    size={item.size}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                >
                    {item.component}
                </DialogActs>
            )}
        </div>
    )
}

export default OptionsDots

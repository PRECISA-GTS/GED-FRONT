import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ListHeader from 'src/components/Defaults/ListHeader'
import { useContext, useState } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import Router from 'next/router'
import { BsSliders } from "react-icons/bs";
import { Button } from '@mui/material'
import { backRoute } from 'src/configs/defaultConfigs'
import Icon from 'src/@core/components/icon'
import { useFilter } from 'src/context/FilterContext'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const QuickSearchToolbar = (props) => {
    const router = Router
    const { setId } = useContext(RouteContext)
    const { clearSearch, searchText, handleSearch, setOpenFilter, openFilter } = useFilter()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                mb: 2,
                justifyContent: 'space-between',
                p: theme => theme.spacing(8, 0, 0, 0),
            }}
        >
            <Box sx={{ display: 'flex', gap: '8px', textAlig: "end" }}>
                {
                    props.buttonsHeader.btnBack && (
                        <Button
                            onClick={() => {
                                router.push(backRoute(router.pathname))
                                setId(null)
                            }}
                            type='button'
                            variant='outlined'
                            color='primary'
                            size='small'
                        >
                            <Icon icon='material-symbols:arrow-back-rounded' />
                        </Button>
                    )
                }
                <div className='w-full'>
                    <TextField
                        size='medium'
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder='Buscar…'
                        className='w-auto md:!w-[30vw]'
                        variant='standard'
                        InputProps={{
                            startAdornment: (
                                <Box sx={{ mr: 2, display: 'flex' }}>
                                    <Icon icon='mdi:magnify' fontSize={20} />
                                </Box>
                            ),
                            endAdornment: (
                                <div className='flex items-center gap-1'>
                                    {
                                        searchText && (
                                            <IconButton size='medium' title='Clear' aria-label='Clear' onClick={clearSearch}>
                                                <Icon icon='mdi:close' fontSize={20} />
                                            </IconButton>
                                        )
                                    }
                                    {/* <IconButton
                                        size='medium'
                                        title='Clear' aria-label='Clear'
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    // onClick={handleClick}
                                    >
                                        <BsSliders size={16} />
                                    </IconButton> */}
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
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
                                                    mr: 1,
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >

                                        <MenuItem onClick={handleClose} className='w-auto md:!w-[30vw]'>

                                            Add another account
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>

                                            Settings
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>

                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )
                        }}
                        sx={{
                            width: {
                                xs: 1,
                                sm: 'auto'
                            },
                            '& .MuiInputBase-root > svg': {
                                mr: 2
                            }
                        }}
                    />
                </div>
            </Box>

            <ListHeader
                btnNew={props.buttonsHeader.btnNew}
                btnPrint={props.buttonsHeader.btnPrint}
                btnBack={props.buttonsHeader.btnBack}
                btnSave={props.buttonsHeader.btnSave}
                handleSave={props.buttonsHeader.handleSave}
                hasListChange={props.hasChange}
                openModal={props.buttonsHeader.openModal}
            />
        </Box>
    )
}

export default QuickSearchToolbar

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { GridToolbarFilterButton } from '@mui/x-data-grid'
import ListHeader from 'src/components/Defaults/ListHeader'
import useMediaQuery from '@mui/material/useMediaQuery';
import { AuthContext } from 'src/context/AuthContext'
import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import Router from 'next/router'

import { Button } from '@mui/material'
import { backRoute } from 'src/configs/defaultConfigs'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const QuickSearchToolbar = (props) => {
    const router = Router
    const { setId } = useContext(RouteContext)


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

                <TextField
                    size='medium'
                    value={props.value}
                    onChange={props.onChange}
                    placeholder='Buscar…'
                    variant='standard'
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ mr: 2, display: 'flex' }}>
                                <Icon icon='mdi:magnify' fontSize={20} />
                            </Box>
                        ),
                        endAdornment: (
                            <IconButton size='medium' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                                <Icon icon='mdi:close' fontSize={20} />
                            </IconButton>
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
                <div className='hidden sm:block '>
                    <GridToolbarFilterButton className="!h-full !z-50" />
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

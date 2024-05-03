import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ListHeader from 'src/components/Defaults/ListHeader'
import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import Router from 'next/router'
import { Button } from '@mui/material'
import { backRoute } from 'src/configs/defaultConfigs'
import Icon from 'src/@core/components/icon'
import { useFilter } from 'src/context/FilterContext'
import DropDownFilter from './DropDownFilter'

const QuickSearchToolbar = (props) => {
    const router = Router
    const { setId } = useContext(RouteContext)
    const { clearSearch, searchText, handleSearch, filteredData, handleClear, componentFilters, dataFilters } = useFilter()

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
            <Box className='w-full flex items-center gap-2'>
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
                <div>
                    <TextField
                        size='medium'
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder='Buscar…'
                        className='!w-[70vw] md:!w-[30vw] relative'
                        autoComplete='off'
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
                                    {
                                        componentFilters && (
                                            <DropDownFilter />
                                        )
                                    }
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
                        autoFocus={true}
                    />
                </div>
                {((dataFilters && Object.keys(dataFilters).length > 0) || (searchText.length > 0)) && (
                    <Button onClick={handleClear} className='hidden sm:block !capitalize' variant='outlined' color='secondary' endIcon={<Icon icon='iconamoon:sign-times-fill' className='text-red-500' />}>
                        <span>Filtro: {filteredData.length}</span>
                    </Button>
                )}
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

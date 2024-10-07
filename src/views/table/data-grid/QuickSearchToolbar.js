import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import ListHeader from 'src/components/Defaults/ListHeader'
import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import Router from 'next/router'
import { Button, Input } from '@mui/material'
import { backRoute } from 'src/configs/defaultConfigs'
import Icon from 'src/@core/components/icon'
import { useFilter } from 'src/context/FilterContext'
import DropDownFilter from './DropDownFilter'
import FixedFilters from './FixedFilters/Index'

const QuickSearchToolbar = (props) => {
  console.log("🚀 ~ props:", props.filters)

  const router = Router
  const { setId } = useContext(RouteContext)
  const { clearSearch, searchText, filteredData, handleClear, form, setSearchText, names } = useFilter()

  const filter = form.getValues();
  let filledFields = 0;
  for (const key in filter) {
    if (filter[key] !== "" && filter[key] !== undefined) {
      filledFields++;
    }
  }

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
      {props.filters && (
        <>
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
                onChange={(e) => {
                  setSearchText(e.target.value)
                }}
                placeholder='Buscar…'
                className='!w-[70vw] md:!w-[20vw] relative'
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
                          <IconButton className={` ${names.length > 0 ? 'order-2' : 'order-1'}`} size='medium' title='Clear' color='secondary' aria-label='Clear' onClick={clearSearch}>
                            <Icon icon='mdi:close' fontSize={20} />
                          </IconButton>
                        )
                      }
                      <DropDownFilter />
                    </div>
                  )
                }}
                sx={{
                  width: {
                    xs: 1,
                    sm: 'auto'
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none", // Remove a borda inferior após o foco
                    transition: "none", // Remove a animação
                  },
                  '& .MuiInputBase-root > svg': {
                    mr: 2
                  }
                }}
                autoFocus={true}
              />
            </div>
            {((searchText && searchText.length > 0) || filledFields > 0) && (
              <Button size='medium' title='Clear' color='secondary' variant='outlined' aria-label='Clear' onClick={handleClear} className='hidden sm:block !capitalize'>
                <div className='flex items-center gap-1'>
                  <span>Filtro: {props.rows.length}</span>
                  <Icon icon='mdi:close' fontSize={20} className='text-red-500' />
                </div>
              </Button>
            )}

            <FixedFilters
              status={props.buttonsHeader.status}
              setStatus={props.buttonsHeader.setStatus}
            />

          </Box>

          <ListHeader
            btnNew={props.buttonsHeader.btnNew}
            btnPrint={props.buttonsHeader.btnPrint}
            btnBack={props.buttonsHeader.btnBack}
            btnSave={props.buttonsHeader.btnSave}
            handleSave={props.buttonsHeader.handleSave}
            hasListChange={props.hasChange}
            openModal={props.buttonsHeader.openModal}

            btnNewModal={props.buttonsHeader.btnNewModal}
            handleNewModal={props.buttonsHeader.handleNewModal}
          />
        </>
      )}
    </Box>
  )
}

export default QuickSearchToolbar

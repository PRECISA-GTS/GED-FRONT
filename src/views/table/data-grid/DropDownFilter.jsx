import { useState } from 'react'
import { Menu, IconButton, Button } from '@mui/material'
import { BsSliders } from 'react-icons/bs'
import { useFilter } from 'src/context/FilterContext'

const DropDownFilter = () => {
    const { onSubmit, form, componentFilters, clearSearch, names } = useFilter()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    const handleClear = () => {
        clearSearch()
        names.map(name => {
            form.setValue(name, '')
        })
    }

    return (
        <>
            <IconButton
                size='medium'
                title='Clear'
                aria-label='Clear'
                id='basic-button'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <BsSliders size={16} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id='account-menu'
                open={open}
                onClose={() => setAnchorEl(null)}
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
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-auto md:!w-[30vw] p-2'>
                    {componentFilters}
                    <div className='flex items-center justify-end gap-3'>
                        <Button variant='text' onClick={handleClear}>
                            Limpar
                        </Button>
                        <Button type='submit' variant='contained'>
                            Aplicar
                        </Button>
                    </div>
                </form>
            </Menu>
        </>
    )
}

export default DropDownFilter

import { Menu, IconButton, Button, Grid } from '@mui/material'
import { BsSliders } from 'react-icons/bs'
import { useFilter } from 'src/context/FilterContext'

const DropDownFilter = () => {
    const { onSubmit, form, componentFilters, handleClear, openFilter, setOpenFilter } = useFilter()

    return (
        <>
            <IconButton
                size='medium'
                title='Clear'
                aria-label='Clear'
                id='basic-button'
                aria-controls={openFilter ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openFilter ? 'true' : undefined}
                onClick={event => setOpenFilter(event.currentTarget)}
            >
                <BsSliders size={16} />
            </IconButton>
            <Menu
                anchorEl={openFilter}
                id='account-menu'
                open={openFilter}
                onClose={() => setOpenFilter(false)}
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
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-auto md:!w-[30vw] p-6'>
                    <Grid container spacing={4}>
                        {componentFilters}
                        <Grid item xs={12} className='flex justify-end items-center gap-2 '>
                            <Button variant='text' onClick={handleClear}>
                                Limpar
                            </Button>
                            <Button type='submit' variant='contained'>
                                Aplicar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Menu>
        </>
    )
}

export default DropDownFilter

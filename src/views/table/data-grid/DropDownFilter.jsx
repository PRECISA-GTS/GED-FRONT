import { IconButton, Button, Grid } from '@mui/material'
import { useEffect, useRef } from 'react'
import { BsSliders } from 'react-icons/bs'
import { useFilter } from 'src/context/FilterContext'

const DropDownFilter = () => {
    const { onSubmit, form, componentFilters, handleClear, openFilter, setOpenFilter } = useFilter()

    const filterRef = useRef(null)
    const buttonRef = useRef(null)

    const handleKeyDown = event => {
        if (event.key === 'Escape') {
            setOpenFilter(false)
        }
    }

    const handleClickOutside = event => {
        if (buttonRef.current && buttonRef.current.contains(event.target)) {
            return
        }

        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setOpenFilter(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

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
                onClick={() => setOpenFilter(!openFilter)}
                ref={buttonRef}
            >
                <BsSliders size={16} />
            </IconButton>

            <div
                className={`absolute top-10 left-0 bg-white border rounded-xl shadow-2xl z-30 pt-4 ${
                    openFilter ? 'block' : 'hidden'
                }`}
                ref={filterRef}
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
            </div>
        </>
    )
}

export default DropDownFilter

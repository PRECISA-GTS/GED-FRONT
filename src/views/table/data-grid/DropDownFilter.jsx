import { IconButton, Button, Grid } from '@mui/material'
import { useEffect, useRef } from 'react'
import { BsSliders } from 'react-icons/bs'
import { useFilter } from 'src/context/FilterContext'
import { useTheme } from '@mui/material/styles'

const DropDownFilter = () => {
    const { onSubmit, form, componentFilters, handleClear, openFilter, setOpenFilter, names } = useFilter()
    const theme = useTheme()
    const filterRef = useRef(null)
    const buttonRef = useRef(null)

    const handleKeyDown = event => {
        if (event.key === 'Escape') {
            setOpenFilter(false)
        }
    }

    const handleClickOutside = event => {
        // validação pra não fechar dropdown ao selecionar um item do select
        if (event.target.tagName.toLowerCase() === 'li') return

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
                className={` ${names.length > 0 ? 'block' : 'invisible'}`}
                size='medium'
                title='Clear'
                aria-label='Clear'
                id='basic-button'
                aria-controls={openFilter ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openFilter ? 'true' : undefined}
                onClick={e => {
                    e.preventDefault()
                    setOpenFilter(!openFilter)
                }}
                ref={buttonRef}
            >
                <BsSliders size={16} />
            </IconButton>

            <div
                className={`absolute top-10 left-0 border rounded-xl shadow-2xl z-30 pt-4 ${
                    openFilter ? 'block' : 'hidden'
                } ${theme.palette.mode === 'dark' ? 'bg-[#212b36] dark:border-[#212b36]' : 'bg-white border-white'}`}
                ref={filterRef}
            >
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-auto md:!w-[30vw] p-6'>
                    <Grid container spacing={6}>
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

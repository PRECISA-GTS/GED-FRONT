import { Grid, Skeleton } from '@mui/material'

const DefaultSkeleton = ({ type = 'default', show, total = 5, height = 160 }) => {
    if (!show || !total || total === 0) return null

    return (
        <div>
            {/* Dashboard */}
            {type === 'dashboard' && (
                <div className='grid grid-cols-2 gap-4'>
                    <Skeleton variant='rounded' height={810} />
                    <div className='space-y-4'>
                        <Skeleton variant='rounded' height={220} />
                        <Skeleton variant='rounded' height={300} />
                        <div className='grid grid-cols-2 gap-4'>
                            <Skeleton variant='rounded' height={260} />
                            <Skeleton variant='rounded' height={260} />
                        </div>
                    </div>
                </div>
            )}

            {/* Default (forms) */}
            {type === 'default' && (
                <div className='flex flex-col gap-4'>
                    {[...Array(total)].map((_, index) => (
                        <Skeleton key={index} variant='rounded' height={height} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default DefaultSkeleton

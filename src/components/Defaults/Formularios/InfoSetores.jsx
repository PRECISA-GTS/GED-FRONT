import { Chip } from '@mui/material'

const InfoSetores = ({ data }) => {
    return (
        <div className='flex items-center justify-end gap-1'>
            {data && data.length > 0 && data.map((item, index) => <Chip key={index} label={item?.nome} />)}
        </div>
    )
}

export default InfoSetores

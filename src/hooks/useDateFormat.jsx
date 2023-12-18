import { useState } from 'react'
import { dateConfig } from 'src/configs/defaultConfigs'

const useDateFormat = () => {
    const [dateStatus, setDateStatus] = useState({})

    const setDateFormat = (type, name, value, numDays) => {
        const newDate = new Date(value)
        const status = dateConfig(type, newDate, numDays)
        setDateStatus(prevState => ({
            ...prevState,
            [name]: status
        }))
    }

    return { setDateFormat, dateStatus }
}

export default useDateFormat

import React from 'react'
import { useGlobal } from 'src/hooks/useGlobal'

const index = () => {
    const { data } = useGlobal()
    console.log('🚀  data', data)
    return (
        <div>
            <h1>rttrrrtrt</h1>
        </div>
    )
}

export default index

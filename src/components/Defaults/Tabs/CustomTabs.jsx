import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { tabChange } from 'src/configs/tabs'

const CustomTabs = ({ tabs }) => {
    const router = useRouter()
    const [value, setValue] = useState('limpeza')
    const currentTab = router.query.aba || 'limpeza'

    const handleChange = newValue => {
        setValue(newValue)
        tabChange(newValue, router)
    }

    useEffect(() => {
        setValue(currentTab)
    }, [router.query.aba])

    return (
        <div className='flex flex-col w-full'>
            <div className='flex gap-2'>
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`py-5 px-20 ${value === tab.value ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => handleChange(tab.value)}
                    >
                        <div className='flex items-center gap-1'>
                            {tab.icon && <tab.icon />}
                            <p>{tab.title}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className='tab-content'>
                {tabs.map(tab => (
                    <div key={tab.value} className={`tab-panel ${value === tab.value ? 'block' : 'hidden'}`}>
                        {value === tab.value && tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomTabs

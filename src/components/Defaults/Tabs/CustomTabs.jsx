import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { tabChange } from 'src/configs/tabs'

const CustomTabs = ({ tabs, defaultTab }) => {
    const router = useRouter()
    const [value, setValue] = useState(defaultTab)
    const currentTab = router.query.aba || defaultTab

    const handleChange = newValue => {
        setValue(newValue)
        tabChange(newValue, router)
    }

    useEffect(() => {
        setValue(currentTab)
    }, [router.query.aba])

    return (
        <div className='flex flex-col w-full'>
            <div className='flex gap-2 mb-3'>
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`py-3 px-12 border-b-2 ${
                            value === tab.value ? ' border-[#4A8B57]' : 'border-transparent'
                        }`}
                        onClick={() => handleChange(tab.value)}
                    >
                        <div className='flex items-center gap-1 '>
                            {tab.icon && (
                                <div className={value === tab.value ? 'text-[#4A8B57]' : ''}>
                                    <tab.icon />
                                </div>
                            )}
                            <p className={`text-[14px] ${value === tab.value ? 'text-[#4A8B57]' : ''} `}>{tab.title}</p>
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

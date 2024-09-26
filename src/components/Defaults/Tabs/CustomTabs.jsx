import React from 'react'
import { useRouter } from 'next/router'
import { tabChange } from 'src/configs/tabs'

const CustomTabs = ({ tabs, activeTab, setActiveTab }) => {
    const router = useRouter()

    const handleTabChange = value => {
        setActiveTab(value)
        tabChange(value, router)
    }

    return (
        <div className='flex flex-col w-full'>
            <div className='flex gap-2'>
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`py-5 px-20 ${activeTab === tab.value ? 'border-b-2 border-blue-500' : ''}`}
                        onClick={() => handleTabChange(tab.value)}
                    >
                        <div className='flex items-center gap-1'>
                            {tab.icon && <tab.icon />} {/* Render the icon if provided */}
                            <p>{tab.title}</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className='tab-content'>
                {tabs.map(tab => (
                    <div key={tab.value} className={`tab-panel ${activeTab === tab.value ? 'block' : 'hidden'}`}>
                        {tab.content} {/* Render tab content */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomTabs

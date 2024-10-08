import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { tabChange } from 'src/configs/tabs'
import { RouteContext } from 'src/context/RouteContext'

const CustomTabs = ({ tabs, headerInfoComponent, defaultTab, type }) => {
    const { settings } = useContext(SettingsContext)
    const router = useRouter()
    const currentTab = router.query.aba || defaultTab
    const { setIdNc } = useContext(RouteContext)
    const [value, setValue] = useState(currentTab)

    const handleChange = newValue => {
        if (newValue !== value) {
            tabChange(newValue, router)
            setValue(newValue)
        }
    }

    useEffect(() => {
        if (currentTab !== value) {
            setValue(currentTab)
        }
    }, [currentTab])

    return (
        <div className='flex flex-col gap-2 w-full'>
            <div
                className={`${type !== 'list' ? 'sticky top-[7.8rem] z-50' : ''} ${
                    settings.mode === 'dark' ? 'bg-[#161c24]' : 'bg-[#F7F7F9]'
                }`}
            >
                <div className='flex gap-2'>
                    {tabs.map(tab => (
                        <button
                            key={tab.value}
                            className={`py-3 px-12 border-b-2 ${
                                value === tab.value ? 'border-[#4A8B57]' : 'border-transparent'
                            }
                        ${tab.disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}

                        `}
                            onClick={event => {
                                event.preventDefault()
                                if (tab.disabled) return
                                handleChange(tab.value)
                                setIdNc(null)
                            }}
                        >
                            <div className='flex items-center gap-1 '>
                                {tab.icon && (
                                    <div className={value === tab.value ? 'text-[#4A8B57]' : ''}>
                                        <tab.icon />
                                    </div>
                                )}
                                <p className={`text-[14px] ${value === tab.value ? 'text-[#4A8B57]' : ''}`}>
                                    {tab.title}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {headerInfoComponent}

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

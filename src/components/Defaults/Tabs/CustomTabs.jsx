import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { tabChange } from 'src/configs/tabs'
import { RouteContext } from 'src/context/RouteContext'

const CustomTabs = ({ tabs, headerInfoComponent, defaultTab }) => {
    const router = useRouter()
    const currentTab = router.query.aba || defaultTab
    console.log('renderiza...', tabs)

    const { setIdNc } = useContext(RouteContext)

    const [value, setValue] = useState(currentTab)

    useEffect(() => {
        // Atualiza o estado se a aba atual mudar pela rota
        if (currentTab !== value) {
            setValue(currentTab)
        }
    }, [currentTab])

    const handleChange = newValue => {
        if (newValue !== value) {
            console.log('atualiza...')
            tabChange(newValue, router)
            setValue(newValue)
        }
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex gap-2 mb-3'>
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`py-3 px-12 border-b-2 ${
                            value === tab.value ? 'border-[#4A8B57]' : 'border-transparent'
                        }`}
                        onClick={() => {
                            handleChange(tab.value)
                            setIdNc(null) // Atualiza o estado do contexto
                        }}
                    >
                        <div className='flex items-center gap-1 '>
                            {tab.icon && (
                                <div className={value === tab.value ? 'text-[#4A8B57]' : ''}>
                                    <tab.icon />
                                </div>
                            )}
                            <p className={`text-[14px] ${value === tab.value ? 'text-[#4A8B57]' : ''}`}>{tab.title}</p>
                        </div>
                    </button>
                ))}
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

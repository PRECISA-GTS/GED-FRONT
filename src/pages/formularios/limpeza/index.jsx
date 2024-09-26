import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListLimpeza from './Tabs/Limpeza/List'
import FormLimpeza from 'src/components/Limpeza/FormLimpeza'
import ListNaoConformidade from './Tabs/NaoConformidade/List'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade'
import { tabChange } from 'src/configs/tabs'

const Limpeza = () => {
    const router = useRouter()
    const { id } = useContext(RouteContext)
    const [value, setValue] = useState('limpeza')
    const [activeTab, setActiveTab] = useState('limpeza')

    const handleChange = (event, newValue) => {
        setValue(newValue)
        tabChange(newValue, router)
    }

    const getTabFromURL = () => {
        return router.query.aba || 'limpeza'
    }

    useEffect(() => {
        setValue(getTabFromURL())
    }, [router.query.aba])

    return (
        <>
            {!id ? (
                <>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab
                                    label={
                                        <div className='flex items-center gap-1'>
                                            <Icon icon='carbon:clean' />
                                            <p>Limpeza e Higienização</p>
                                        </div>
                                    }
                                    value='limpeza'
                                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                                />
                                <Tab
                                    label={
                                        <div className='flex items-center gap-1'>
                                            <Icon icon='typcn:warning-outline' />
                                            <p>Não Conformidade</p>
                                        </div>
                                    }
                                    value='nao-conformidade'
                                    sx={{ textTransform: 'none', fontSize: '1rem' }}
                                />
                            </TabList>
                        </Box>
                        <TabPanel value='limpeza'>
                            <ListLimpeza />
                        </TabPanel>
                        <TabPanel value='nao-conformidade'>
                            <ListNaoConformidade />
                        </TabPanel>
                    </TabContext>

                    <div className='flex flex-col w-full'>
                        <div className='flex gap-2'>
                            <button
                                className={`py-5 px-20  ${activeTab === 'limpeza' ? 'active border-b-2' : ''}`}
                                onClick={() => setActiveTab('limpeza')}
                            >
                                <div className='flex items-center gap-1'>
                                    <span>🧹</span> {/* Ícone alternativo */}
                                    <p>Limpeza e Higienização</p>
                                </div>
                            </button>
                            <button
                                className={`py-5 px-20  ${activeTab === 'nao-conformidade' ? 'active border-b-2' : ''}`}
                                onClick={() => setActiveTab('nao-conformidade')}
                            >
                                <div className='flex items-center gap-1'>
                                    <span>⚠️</span> {/* Ícone alternativo */}
                                    <p>Não Conformidade</p>
                                </div>
                            </button>
                        </div>

                        <div className='tab-content'>
                            {activeTab === 'limpeza' && (
                                <div className='tab-panel'>
                                    <ListLimpeza />
                                </div>
                            )}
                            {activeTab === 'nao-conformidade' && (
                                <div className='tab-panel'>
                                    <ListNaoConformidade />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Aba 1 (limpeza de mp)  */}
                    {getTabFromURL() === 'limpeza' && <FormLimpeza id={id} modelID={null} />}
                    {/* Aba 2 (nao conformidade) */}
                    {getTabFromURL() === 'nao-conformidade' && <FormNaoConformidade id={id} />}
                </>
            )}
        </>
    )
}

export default Limpeza

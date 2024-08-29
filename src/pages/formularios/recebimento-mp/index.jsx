import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListRecebimentoMP from './Tabs/RecebimentoMp/List'
import FormRecebimentoMp from 'src/components/RecebimentoMp/FormRecebimentoMp'
import ListNaoConformidade from './Tabs/NaoConformidade/List'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import RecebimentoMpNaoConformidade from 'src/components/RecebimentoMp/NaoConformidade'

const RecebimentoMp = () => {
    const router = useRouter()
    const { id, setId } = useContext(RouteContext)
    const [value, setValue] = useState('1')

    console.log('🚀 ~ router:', router.pathname)

    const handleChange = (event, newValue) => {
        setValue(newValue)
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, aba: newValue }
            },
            undefined,
            { shallow: true }
        )
    }

    const getTabFromURL = () => {
        return router.query.aba || '1'
    }

    console.log('Aba atual: ', getTabFromURL())

    useEffect(() => {
        setValue(getTabFromURL())
    }, [router.query.aba])

    return (
        <>
            {!id ? (
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label='lab API tabs example'>
                            <Tab
                                label={
                                    <div className='flex items-center gap-1'>
                                        <Icon icon='icon-park-outline:receive' />
                                        <p>Recebimento de MP</p>
                                    </div>
                                }
                                value='1'
                                sx={{ textTransform: 'none', fontSize: '1rem' }}
                            />
                            <Tab
                                label={
                                    <div className='flex items-center gap-1'>
                                        <Icon icon='typcn:warning-outline' />
                                        <p>Não Conformidade</p>
                                    </div>
                                }
                                value='2'
                                sx={{ textTransform: 'none', fontSize: '1rem' }}
                            />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <ListRecebimentoMP />
                    </TabPanel>
                    <TabPanel value='2'>
                        <ListNaoConformidade />
                    </TabPanel>
                </TabContext>
            ) : (
                <>
                    {/* Aba 1 (recebimento de mp)  */}
                    {getTabFromURL() === '1' && <FormRecebimentoMp id={id} model={null} />}
                    {/* Aba 2 (nao conformidade) */}
                    {getTabFromURL() === '2' && <RecebimentoMpNaoConformidade id={id} />}
                </>
            )}
        </>
    )
}

export default RecebimentoMp

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
    const { id } = useContext(RouteContext)
    const [value, setValue] = useState('recebimento')

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
        return router.query.aba || 'recebimento'
    }

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
                                value='recebimento'
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
                    <TabPanel value='recebimento'>
                        <ListRecebimentoMP />
                    </TabPanel>
                    <TabPanel value='nao-conformidade'>
                        <ListNaoConformidade />
                    </TabPanel>
                </TabContext>
            ) : (
                <>
                    {/* Aba 1 (recebimento de mp)  */}
                    {getTabFromURL() === 'recebimento' && <FormRecebimentoMp id={id} model={null} />}
                    {/* Aba 2 (nao conformidade) */}
                    {getTabFromURL() === 'nao-conformidade' && <RecebimentoMpNaoConformidade id={id} />}
                </>
            )}
        </>
    )
}

export default RecebimentoMp

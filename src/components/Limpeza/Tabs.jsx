import { useContext, useEffect } from 'react'
import CustomTabs from '../Defaults/Tabs/CustomTabs'
import { AuthContext } from 'src/context/AuthContext'
import Icon from 'src/@core/components/icon'
import FormLimpeza from './FormLimpeza'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade/HeaderLimpezaNC'
import { useRouter } from 'next/router'
import ListNaoConformidade from 'src/pages/formularios/limpeza/Tabs/NaoConformidade/List'
import Controller from './NaoConformidade/Controller'
import { Card, CardContent } from '@mui/material'
import LimpezaInfo from './NaoConformidade/LimpezaInfo'

const Tabs = ({ id, idNc, modelID, form, header, block, setBlock, defaultTab, change }) => {
    console.log('🚀 ~ id nc:', id, idNc)
    const tabs = [
        {
            value: 'limpeza',
            title: 'Limpeza e Higienização',
            icon: () => <Icon icon='carbon:clean' />,
            content: (
                <FormLimpeza id={id} modelID={null} form={form} header={header} block={block} setBlock={setBlock} />
            ),
            disabled: false
        },
        {
            value: 'nao-conformidade',
            title: `Não Conformidade ${header?.totalNc > 0 ? `(${header?.totalNc})` : ''}`,
            icon: () => <Icon icon='typcn:warning-outline' />,
            content: <Controller form={form} header={header} block={block} setBlock={setBlock} change={change} />,
            disabled: !id || !header?.naoConformidade ? true : false
        }
    ]

    const HeaderInfo = () => {
        if (!id) return

        return (
            <Card>
                <CardContent className='space-y-2 '>
                    <LimpezaInfo data={header} />
                </CardContent>
            </Card>
        )
    }

    return <CustomTabs tabs={tabs} headerInfoComponent={<HeaderInfo />} defaultTab={defaultTab} />
}

export default Tabs

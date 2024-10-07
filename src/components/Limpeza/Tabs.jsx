import { useContext, useEffect } from 'react'
import CustomTabs from '../Defaults/Tabs/CustomTabs'
import { AuthContext } from 'src/context/AuthContext'
import Icon from 'src/@core/components/icon'
import FormLimpeza from './FormLimpeza'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade/HeaderLimpezaNC'
import { useRouter } from 'next/router'
import ListNaoConformidade from 'src/pages/formularios/limpeza/Tabs/NaoConformidade/List'
import Controller from './NaoConformidade/Controller'

const Tabs = ({ id, idNc, modelID, form, header, block, setBlock, defaultTab, change }) => {
    console.log('🚀 ~ id nc:', id, idNc)
    const tabs = [
        {
            value: 'limpeza',
            title: 'Limpeza e Higienização',
            icon: () => <Icon icon='carbon:clean' />,
            content: (
                <FormLimpeza id={id} modelID={null} form={form} header={header} block={block} setBlock={setBlock} />
            )
        },
        {
            value: 'nao-conformidade',
            title: 'Não Conformidade',
            icon: () => <Icon icon='typcn:warning-outline' />,
            content: <Controller form={form} header={header} block={block} setBlock={setBlock} change={change} />
        }
    ]

    return <CustomTabs tabs={tabs} defaultTab={defaultTab} />
}

export default Tabs

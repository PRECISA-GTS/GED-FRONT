import { useContext, useEffect } from 'react'
import CustomTabs from '../Defaults/Tabs/CustomTabs'
import { AuthContext } from 'src/context/AuthContext'
import Icon from 'src/@core/components/icon'
import FormLimpeza from './FormLimpeza'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade'
import { useRouter } from 'next/router'
import ListNaoConformidade from 'src/pages/formularios/limpeza/Tabs/NaoConformidade/List'

const Tabs = ({ id, modelID, form, header, block, setBlock }) => {
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
            content: <ListNaoConformidade />
            // content: <FormNaoConformidade id={id} />
        }
    ]

    return <CustomTabs tabs={tabs} defaultTab='limpeza' />
}

export default Tabs

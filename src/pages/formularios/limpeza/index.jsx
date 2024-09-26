import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListLimpeza from './Tabs/Limpeza/List'
import FormLimpeza from 'src/components/Limpeza/FormLimpeza'
import ListNaoConformidade from './Tabs/NaoConformidade/List'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade'
import CustomTabs from 'src/components/Defaults/Tabs/CustomTabs'

const Limpeza = () => {
    const router = useRouter()
    const { id } = useContext(RouteContext)
    const currentTab = router.query.aba || 'limpeza'

    const tabs = [
        {
            value: 'limpeza',
            title: 'Limpeza e Higienização',
            icon: () => <Icon icon='carbon:clean' />,
            content: <ListLimpeza />
        },
        {
            value: 'nao-conformidade',
            title: 'Não Conformidade',
            icon: () => <Icon icon='typcn:warning-outline' />,
            content: <ListNaoConformidade />
        }
    ]

    return (
        <>
            {!id ? (
                <CustomTabs tabs={tabs} />
            ) : (
                <>
                    {currentTab === 'limpeza' && <FormLimpeza id={id} modelID={null} />}
                    {currentTab === 'nao-conformidade' && <FormNaoConformidade id={id} />}
                </>
            )}
        </>
    )
}

export default Limpeza

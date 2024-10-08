import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListNaoConformidade from './Tabs/NaoConformidade/List'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import NaoConformidade from 'src/components/RecebimentoMp/NaoConformidade'
import CustomTabs from 'src/components/Defaults/Tabs/CustomTabs'
import ListRecebimentoMP from './Tabs/RecebimentoMp/List'
import FormRecebimentoMp from 'src/components/RecebimentoMp/FormRecebimentoMp'

const RecebimentoMp = () => {
    const router = useRouter()
    const { id } = useContext(RouteContext)
    const currentTab = router.query.aba || 'recebimento-mp'

    const tabs = [
        {
            value: 'recebimento-mp',
            title: 'Recebimento de MP',
            icon: () => <Icon icon='icon-park-outline:receive' />,
            content: <ListRecebimentoMP />
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
                <CustomTabs tabs={tabs} defaultTab='recebimento-mp' type='list' />
            ) : (
                <>
                    {currentTab === 'recebimento-mp' && <FormRecebimentoMp id={id} model={null} />}
                    {currentTab === 'nao-conformidade' && <NaoConformidade id={id} />}
                </>
            )}
        </>
    )
}

export default RecebimentoMp

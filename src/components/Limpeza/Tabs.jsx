import CustomTabs from '../Defaults/Tabs/CustomTabs'
import Icon from 'src/@core/components/icon'
import FormLimpeza from './FormLimpeza'
import { useRouter } from 'next/router'
import Controller from './NaoConformidade/Controller'
import { Card, CardContent } from '@mui/material'
import LimpezaInfo from './NaoConformidade/LimpezaInfo'

const Tabs = ({ id, idNc, modelID, form, header, block, setBlock, defaultTab, change }) => {
    const router = useRouter()
    const isNew = router.asPath.includes('/novo')

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
            disabled: !id || (!idNc && !header?.naoConformidade && !isNew) ? true : false
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

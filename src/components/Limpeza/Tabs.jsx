import CustomTabs from '../Defaults/Tabs/CustomTabs'
import Icon from 'src/@core/components/icon'
import FormLimpeza from './FormLimpeza'
import { useRouter } from 'next/router'
import Controller from './NaoConformidade/Controller'
import { Card, CardContent } from '@mui/material'
import LimpezaInfo from './NaoConformidade/LimpezaInfo'
import { useContext, useEffect } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'

const Tabs = ({ id, idNc, modelID, form, header, block, setBlock, defaultTab, change, onSubmit }) => {
    const router = useRouter()
    const isNew = router.asPath.includes('/novo')
    const { setTitle } = useContext(ParametersContext)

    const tabs = [
        {
            value: 'limpeza',
            title: 'Limpeza e Higienização',
            icon: () => <Icon icon='carbon:clean' />,
            content: (
                <FormLimpeza
                    id={id}
                    form={form}
                    header={header}
                    block={block}
                    setBlock={setBlock}
                    onSubmit={onSubmit}
                />
            ),
            disabled: false
        },
        {
            value: 'nao-conformidade',
            title: `Não Conformidade ${header?.totalNc > 0 ? `(${header?.totalNc})` : ''}`,
            icon: () => <Icon icon='typcn:warning-outline' />,
            content: (
                <Controller
                    form={form}
                    header={header}
                    block={block}
                    setBlock={setBlock}
                    change={change}
                    onSubmit={onSubmit}
                />
            ),
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

    useEffect(() => {
        setTitle({
            icon: 'carbon:clean',
            title: 'Limpeza e Higienização',
            subtitle: {
                id: id,
                count: 1,
                new: false
            }
        })
    }, [id, router.query?.aba])

    return <CustomTabs tabs={tabs} headerInfoComponent={<HeaderInfo />} defaultTab={defaultTab} />
}

export default Tabs

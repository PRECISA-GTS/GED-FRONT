import { useRouter } from 'next/router'
import CustomTabs from '../Defaults/Tabs/CustomTabs'
import FormLimpeza from './FormLimpezaOLD'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade/HeaderLimpezaNC'
import { useContext, useEffect, useState } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import Icon from 'src/@core/components/icon'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import FormHeader from '../Defaults/FormHeader'
import { Card, CardContent } from '@mui/material'
import LimpezaInfo from './NaoConformidade/LimpezaInfo'

const TopBar = () => {
    const router = useRouter()
    const { id } = useContext(RouteContext)
    const { menu, user, loggedUnity, hasPermission } = useContext(AuthContext)
    const currentTab = router.query.aba || 'limpeza'
    const [header, setHeader] = useState(null)
    const [block, setBlock] = useState(null)
    const type = id && id > 0 ? 'edit' : 'new'

    const form = useForm({ mode: 'onChange' })

    const modelID = 0 //! temp

    const getDataLimpeza = async () => {
        console.log('getDataLimpeza')
        try {
            const values = {
                id: id ?? 0, //? Novo (id == null)
                modelID: modelID ?? 0, //? Novo (modelID)
                unidadeID: loggedUnity.unidadeID
            }
            const response = await api.post(`/formularios/limpeza/getData`, values)
            form.reset(response.data)
            setHeader(response.data.header)
            setBlock(response.data.blocos)
        } catch (e) {
            console.log(e)
            return
        }
    }

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
            content: <FormNaoConformidade id={id} />
        }
    ]

    // chama getDataLimpeza se currentTab for limpeza
    useEffect(() => {
        if (currentTab === 'limpeza') {
            getDataLimpeza()
        }
    }, [currentTab, loggedUnity])

    return (
        <div className='flex flex-col'>
            <FormHeader
                id={id}
                btnNew={type === 'edit' ? true : false}
                btnCancel
                btnSave={header?.status?.id < 40 ? true : false}
                btnSend={header?.status?.id >= 30 && header?.status?.id <= 40 ? true : false}
                btnPrint={type == 'edit' ? true : false}
                btnDelete={header?.status?.id < 40 && type === 'edit' ? true : false}
                onclickDelete={() => setOpenDelete(true)}
                actions={true}
                handleSubmit={() => form.handleSubmit(onSubmit)}
                handleSend={() => {
                    setOpenModal(true)
                    checkErrors()
                    verifyIfCanAproveForm(block)
                }}
                iconConclusion={'solar:check-read-linear'}
                titleConclusion={'Concluir'}
                title='Limpeza e Higienização'
                type={type}
                status={header?.status?.id}
                actionsNC={header?.naoConformidade && header?.status?.id > 40}
                module='limpeza'
                // actionsData={actionsData}
            />

            <CustomTabs tabs={tabs} defaultTab='limpeza' />
        </div>
    )
}

export default TopBar

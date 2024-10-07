import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListLimpeza from './Tabs/Limpeza/List'
import FormLimpeza from 'src/components/Limpeza/FormLimpeza'
import ListNaoConformidade from './Tabs/NaoConformidade/List'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import FormNaoConformidade from 'src/components/Limpeza/NaoConformidade'
import CustomTabs from 'src/components/Defaults/Tabs/CustomTabs'
import TopBar from 'src/components/Limpeza/TopBar'

const Limpeza = () => {
    const router = useRouter()
    const { id, idNc } = useContext(RouteContext)
    console.log('🚀 ~ id:', id, idNc)

    return (
        <>
            {id && idNc ? (
                <FormNaoConformidade id={idNc} limpezaID={id} modelID={null} />
            ) : id && !idNc ? (
                <TopBar />
            ) : (
                <ListLimpeza />
            )}
        </>
    )
}

export default Limpeza

import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListLimpeza from './Tabs/Limpeza/List'
import FormLimpeza from 'src/components/Limpeza/FormLimpeza'
import ListNaoConformidade from './Tabs/NaoConformidade/List'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'
import HeaderLimpezaNC from 'src/components/Limpeza/NaoConformidade/HeaderLimpezaNC'
import CustomTabs from 'src/components/Defaults/Tabs/CustomTabs'
import HeaderLimpeza from 'src/components/Limpeza/HeaderLimpeza'

const Limpeza = () => {
    const router = useRouter()
    const { id, idNc } = useContext(RouteContext)
    console.log('🚀 ~ id:', id, idNc)

    return (
        <>
            {id && idNc ? (
                <HeaderLimpezaNC id={idNc} limpezaID={id} modelID={null} />
            ) : id && !idNc ? (
                <HeaderLimpeza />
            ) : (
                <ListLimpeza />
            )}
        </>
    )
}

export default Limpeza

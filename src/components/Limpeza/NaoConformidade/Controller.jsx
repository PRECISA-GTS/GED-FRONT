import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import FormLimpezaNC from './FormLimpezaNC'
import { useRouter } from 'next/router'
import ListNaoConformidade from 'src/pages/formularios/limpeza/NaoConformidade/List'

const Controller = ({ form, header, block, setBlock, change, onSubmit }) => {
    const router = useRouter()
    const { idNc, id } = useContext(RouteContext)
    const isNew = router.asPath.includes('/novo')
    console.log('🚀 ~ Controller idNc:', isNew)

    return idNc || isNew ? (
        <FormLimpezaNC
            id={idNc}
            limpezaID={id}
            modelID={null}
            form={form}
            header={header}
            block={block}
            setBlock={setBlock}
            change={change}
            onSubmit={onSubmit}
        />
    ) : (
        <ListNaoConformidade limpezaID={id} />
    )
}

export default Controller

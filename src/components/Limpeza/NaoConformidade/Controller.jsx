import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import ListNaoConformidade from 'src/pages/formularios/limpeza/Tabs/NaoConformidade/List'
import FormLimpezaNC from './FormLimpezaNC'

const Controller = ({ form, header, block, setBlock, change }) => {
    const { idNc, id } = useContext(RouteContext)

    return idNc ? (
        <FormLimpezaNC
            id={idNc}
            limpezaID={id}
            modelID={null}
            form={form}
            header={header}
            block={block}
            setBlock={setBlock}
            change={change}
        />
    ) : (
        <ListNaoConformidade />
    )
}

export default Controller

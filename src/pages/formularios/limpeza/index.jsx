import { useContext } from 'react'
import { RouteContext } from 'src/context/RouteContext'
import HeaderLimpezaNC from 'src/components/Limpeza/NaoConformidade/HeaderLimpezaNC'
import HeaderLimpeza from 'src/components/Limpeza/HeaderLimpeza'
import ListLimpeza from './List'

const Limpeza = () => {
    const { id, idNc } = useContext(RouteContext)

    return (
        <>
            {id && idNc ? (
                <HeaderLimpezaNC id={idNc} limpezaID={id} modelID={null} />
            ) : id && !idNc ? (
                <HeaderLimpeza modelID={null} />
            ) : (
                <ListLimpeza />
            )}
        </>
    )
}

export default Limpeza

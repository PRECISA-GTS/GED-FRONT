import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'
import FormGrupoAnexos from 'src/components/Cadastros/grupoAnexos/FormGrupoAnexos'

const GrupoAnexosNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Grupo de Anexos',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormGrupoAnexos />
}

GrupoAnexosNovo.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default GrupoAnexosNovo

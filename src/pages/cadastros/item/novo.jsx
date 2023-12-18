import FormItem from 'src/components/Cadastros/Item/FormItem'
import { ParametersContext } from 'src/context/ParametersContext'
import { useContext, useEffect } from 'react'

const ItemNovo = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Item',
            subtitle: {
                id: null,
                count: null,
                new: true
            }
        })
    }, [])

    return <FormItem />
}

ItemNovo.acl = {
    action: 'read',
    subject: 'acl-page'
}

export default ItemNovo

import { useContext } from 'react'
import Input from 'src/components/Form/Input'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'

const ReOpenFornecedor = ({ control, register }) => {
    const { user } = useContext(AuthContext)
    const { id } = useContext(RouteContext)

    // setData({ user, report: { id: id, status: 69 } })

    console.log('useGlobal data reabre formu...', id, user)

    return (
        <div>
            <Input
                name='obs'
                title='Observação'
                register={register}
                control={control}
                defaultValue=''
                multiline
                rows={6}
            />
        </div>
    )
}

export default ReOpenFornecedor

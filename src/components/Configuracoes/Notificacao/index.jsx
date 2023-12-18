import { Card, Box, CardContent, Typography, CardHeader, Switch } from '@mui/material'
import Router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormHeader from 'src/components/Defaults/FormHeader'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import Loading from 'src/components/Loading'
import toast from 'react-hot-toast'
import { toastMessage } from 'src/configs/defaultConfigs'
import Icon from 'src/@core/components/icon'
import TableRotinas from './TableRotinas'

const FormNotificacao = () => {
    const router = Router
    const staticUrl = router.pathname

    const [data, setData] = useState(null)
    const { user, loggedUnity } = useContext(AuthContext)

    const {
        handleSubmit,
        reset,
        register,
        formState: { errors }
    } = useForm()

    const onSubmit = async values => {
        try {
            const response = await api.post(
                `${staticUrl}/updateData/${user.usuarioID}/${loggedUnity.unidadeID}`,
                values
            )
            toast.success(toastMessage.successUpdate)
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            const response = await api.get(`${staticUrl}/getData/${user.usuarioID}/${loggedUnity.unidadeID}`)
            console.log('🚀 ~ getData:', response.data)
            setData(response.data)
            reset(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {!data ? (
                <Loading show />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader btnSave handleSubmit={() => handleSubmit(onSubmit)} type='edit' />

                    <Box display='flex' flexDirection='column' gap={4}>
                        {data &&
                            data.map(
                                (item, index) =>
                                    item.rotinas.length > 0 && (
                                        <Card key={index}>
                                            <CardContent>
                                                <Box display='flex' alignItems='center' gap={4}>
                                                    <Icon icon={item.icone} style={{ color: item.cor }} fontSize={24} />
                                                    <Typography variant='body' className='font-medium'>
                                                        {item.nome}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                            <CardContent>
                                                <TableRotinas
                                                    category={index}
                                                    values={item.rotinas}
                                                    register={register}
                                                />
                                            </CardContent>
                                        </Card>
                                    )
                            )}
                    </Box>
                </form>
            )}
        </>
    )
}

export default FormNotificacao

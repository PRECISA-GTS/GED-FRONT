import { Alert, Card, CardContent, Typography } from '@mui/material'
import Router from 'next/router'
import { useContext } from 'react'
import Icon from 'src/@core/components/icon'
import { RouteContext } from 'src/context/RouteContext'

const ModelsWithItem = ({ data }) => {
    const router = Router
    const { setId } = useContext(RouteContext)

    const goToModel = (id, route) => {
        router.push(route)
        setId(id)
    }

    return (
        data &&
        data.length > 0 && (
            <Card className='mt-2'>
                <CardContent>
                    <Typography
                        color='primary'
                        variant='subtitle1'
                        sx={{ fontWeight: 700, mb: 6 }}
                        className='flex items-center gap-1'
                    >
                        <Icon icon='clarity:form-line' className='text-primary' />
                        Formulários que contém este item
                    </Typography>

                    {data.map((model, index) => (
                        <Alert
                            key={index}
                            severity='info'
                            onClick={() => goToModel(model.id, model.rota)}
                            sx={{ mt: 2, cursor: 'pointer' }}
                        >
                            <div className='flex items-center gap-2'>
                                {`${model.nome} (ciclo de ${model.ciclo} ${model.ciclo === 1 ? 'dia' : 'dias'})`}
                                <Icon icon='ci:external-link' />
                            </div>
                        </Alert>
                    ))}
                </CardContent>
            </Card>
        )
    )
}

export default ModelsWithItem

import { Card, CardContent, Typography } from '@mui/material'

const MapaSipeAgro = ({ sipeAgro }) => {
    const TableServices = () => {
        return <p>table aqui...</p>
    }

    return (
        <Card sx={{ mt: 4 }}>
            <CardContent>
                <div className='flex flex-col gap-4'>
                    <Typography variant='body2'>
                        <strong>Dados MAPA - Última atualização ({sipeAgro?.dataImportacao})</strong>
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Razão Social:</strong> {sipeAgro?.razaoSocial}
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Registro SIPEAGRO:</strong> {sipeAgro?.registroSipeAgro}
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Situação:</strong> {sipeAgro?.situacao}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default MapaSipeAgro

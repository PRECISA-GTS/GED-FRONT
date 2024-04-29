import { Card, CardContent, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

const MapaSipeAgro = ({ sipeAgro }) => {
    const TableServices = () => {
        const products = [
            {
                name: 'Aditivo',
                column: 'aditivo'
            },
            {
                name: 'Alimento',
                column: 'alimento'
            },
            {
                name: 'Concentrado',
                column: 'concentrado'
            },
            {
                name: 'Coproduto',
                column: 'coproduto'
            },
            {
                name: 'Ingrediente',
                column: 'ingrediente'
            },
            {
                name: 'Núcleo',
                column: 'nucleo'
            },
            {
                name: 'Premix',
                column: 'premix'
            },
            {
                name: 'Produto mastigável',
                column: 'produtoMastigavel'
            },
            {
                name: 'Ração',
                column: 'racao'
            },
            {
                name: 'Suplemento',
                column: 'suplemento'
            }
        ]

        const hasProduct = (type, column) => {
            console.log('🚀 ~ hasProduct: type, column:', type, column)

            // verifica se contém sipeAgro[column] na string type
            if (sipeAgro && sipeAgro[column] && sipeAgro[column].includes(type)) {
                return <Icon icon='lets-icons:check-fill' className='text-green-600 w-full' />
            }

            return <Icon icon='lets-icons:check-fill' className='text-gray-100 w-full' />
        }

        return (
            <table>
                <tr>
                    <td></td>
                    <td className='text-center'>
                        <Typography variant='caption'>
                            <strong>Fabricante</strong>
                        </Typography>
                    </td>
                    <td className='text-center'>
                        <Typography variant='caption'>
                            <strong>Fracionador</strong>
                        </Typography>
                    </td>
                    <td className='text-center'>
                        <Typography variant='caption'>
                            <strong>Importador</strong>
                        </Typography>
                    </td>
                </tr>

                {products.map((product, index) => (
                    <tr className='border-b'>
                        <td className='py-1'>
                            <Typography variant='caption'>
                                <strong>{product.name}</strong>
                            </Typography>
                        </td>
                        <td className='py-1'>{hasProduct(1, product.column)}</td>
                        <td className='py-1'>{hasProduct(2, product.column)}</td>
                        <td className='py-1'>{hasProduct(3, product.column)}</td>
                    </tr>
                ))}
            </table>
        )
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
                    <TableServices />
                </div>
            </CardContent>
        </Card>
    )
}

export default MapaSipeAgro

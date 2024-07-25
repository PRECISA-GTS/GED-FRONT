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

    const regioesSipoa = [
        'Região Norte',
        'Região Nordeste',
        'Região Centro-Oeste',
        'Região Sudeste',
        'Região Sul',
        'Goiás',
        'Minas Gerais',
        'Bahia',
        'Paraná',
        'Rio Grande do Sul',
        'São Paulo'
    ]

    return (
        <Card sx={{ mt: 4 }}>
            <CardContent>
                <div className='flex flex-col gap-4'>
                    <Typography variant='body2' className='flex justify-between'>
                        <strong>Dados MAPA - Última atualização ({sipeAgro?.dataImportacao ?? '----'})</strong>
                        <span>
                            Fonte dos dados:{' '}
                            <a
                                className='text-blue-500 hover:underline'
                                target='_blank'
                                href='https://www.gov.br/agricultura/pt-br/assuntos/insumos-agropecuarios/insumos-pecuarios/alimentacao-animal/registro-cadastro'
                            >
                                link
                            </a>
                        </span>
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Razão Social:</strong> {sipeAgro?.razaoSocial?.toUpperCase()}
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Registro SIPEAGRO:</strong> {sipeAgro?.registroSipeAgro}
                    </Typography>
                    <Typography variant='caption'>
                        <strong>SIPOA:</strong> {regioesSipoa[sipeAgro?.sipoa - 1]}
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Situação:</strong> {sipeAgro?.situacao}
                    </Typography>
                    <Typography variant='caption'>
                        <strong>Município:</strong> {`${sipeAgro?.municipio}/${sipeAgro?.uf}`}
                    </Typography>
                    <TableServices />
                </div>
            </CardContent>
        </Card>
    )
}

export default MapaSipeAgro

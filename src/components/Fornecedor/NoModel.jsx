import { Card, CardContent } from '@mui/material'
import { AiOutlineFieldTime } from 'react-icons/ai'

const NoModel = ({ values }) => {
    if (!values) return

    return (
        <Card>
            <CardContent>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <AiOutlineFieldTime size={60} className='text-yellow-600' />
                    <div className='flex flex-col items-center gap-1'>
                        <p className='text-2xl font-semibold'>Aguardando preenchimento do Fornecedor</p>
                        <p>Este formulário será preenchido pelo fornecedor</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-10 text-center pt-8'>
                        <div>
                            <label className='text-sm opacity-60'>Nome Fantasia</label>
                            <p className='text-lg'>{values.nomeFantasia}</p>
                        </div>
                        <div>
                            <label className='text-sm opacity-60'>Razão Social</label>
                            <p className='text-lg'>{values.razaoSocial}</p>
                        </div>
                        <div>
                            <label className='text-sm opacity-60'>CNPJ</label>
                            <p className='text-lg'>{values.cnpj}</p>
                        </div>
                        <div>
                            <label className='text-sm opacity-60'>Telefone</label>
                            <p className='text-lg'>{values.telefone ?? '--'}</p>
                        </div>
                        <div>
                            <label className='text-sm opacity-60'>E-mail</label>
                            <p className='text-lg'>{values.email ?? '--'}</p>
                        </div>
                        <div>
                            <label className='text-sm opacity-60'>Data de Cadastro</label>
                            <p className='text-lg'>{values.dataInicio}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default NoModel

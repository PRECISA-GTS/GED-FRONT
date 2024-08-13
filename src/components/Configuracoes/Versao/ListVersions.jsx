import { Skeleton } from '@mui/material'
import Link from 'next/link'
import { FaCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { api } from 'src/configs/api'

const ListVersions = () => {
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await api.post(`/configuracoes/versao/listVersions`)
            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='flex flex-col gap-8'>
            {data && data.length > 0 ? (
                data.map((version, indexV) => (
                    <div className='flex flex-col gap-1 '>
                        <div className='flex items-center gap-2 text-lg'>
                            <p>{version.nome}</p>
                            <p className='opacity-50'>({version.data})</p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            {version.itens.map((item, indexI) => (
                                <div className='ml-4 flex items-center gap-2'>
                                    <div>
                                        <FaCircle className='w-2 h-2' />
                                    </div>
                                    <p>
                                        {item.descricao}
                                        {item.link && (
                                            <Link
                                                href={item.link}
                                                target='_blank'
                                                className='text-[#4A8B57] ml-2 hover:underline'
                                            >
                                                Clique e saiba mais!
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <Skeleton variant='text' height={80} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant='text' height={80} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant='text' height={80} sx={{ fontSize: '1rem' }} />
                    <Skeleton variant='text' height={80} sx={{ fontSize: '1rem' }} />
                </>
            )}
        </div>
    )
}

export default ListVersions

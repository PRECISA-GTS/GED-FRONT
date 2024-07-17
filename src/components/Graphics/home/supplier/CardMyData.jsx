import { Avatar, Card, CardContent } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'
import Router from 'next/router'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'

const CardMyData = () => {
    const { settings } = useContext(SettingsContext)
    const { loggedUnity } = useContext(AuthContext)
    const mode = settings.mode
    const router = Router
    const [data, setData] = useState(null)

    const getData = async () => {
        try {
            const response = await api.post(`dashboard/fornecedor/myData`, {
                unidadeID: loggedUnity.unidadeID
            })

            //? Se ainda não possui categoria/risco, redirecionar pra /meus-dados
            if (response.data && response.data.possuiRisco !== 1) {
                router.push('/meus-dados')
                return
            }

            setData(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card
            onClick={() => router.push(`/meus-dados`)}
            className={`cursor-pointer ${
                mode === 'dark' ? 'hover:bg-[#232327]' : 'hover:bg-[#EEEEF1]'
            }  shadow-xl transition-all`}
        >
            <CardContent>
                <div className='space-y-4 p-1'>
                    <div className='flex gap-4 items-center'>
                        <Avatar
                            variant='rounded'
                            sx={{ width: 70, height: 70 }}
                            className={`p-0 ${mode === 'dark' ? '!bg-[#e0e0e0]' : '!bg-[#f5f5f5]'}`}
                        >
                            <img src={data?.logo ?? '/imageDefault/factory.svg'} alt='Imagem da logo da fábrica' />
                        </Avatar>
                        <div>
                            <p className='text-lg font-semibold'>Meus Dados</p>
                            <div className='space-y-1'>
                                <p>
                                    Última atualização em {data?.dataAtualizacao}
                                    <br />(
                                    {data?.quantidadeDias == 0
                                        ? 'Hoje'
                                        : data?.quantidadeDias == 1
                                        ? 'Ontem'
                                        : data?.quantidadeDias + ' dias'}
                                    )
                                </p>
                                <p>{data?.categoriaRisco}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CardMyData

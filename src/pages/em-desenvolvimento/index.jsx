import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ParametersContext } from 'src/context/ParametersContext'

const EmDesenvolvimento = () => {
    const { setTitle } = useContext(ParametersContext)

    useEffect(() => {
        setTitle({
            title: 'Em desenvolvimento',
            subtitle: {}
        })
    }, [])

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className='bg-black-200 p-8 rounded-lg '>
                <h1 className='text-2xl font-bold'>Em Desenvolvimento</h1>
                <p className='text-gray-600 mt-4'>Estamos trabalhando duro para trazer recursos incríveis em breve!</p>
                <img src='/UnderConstruction.svg' alt='Picareta em Manutenção' />
            </div>
        </div>
    )
}

export default EmDesenvolvimento

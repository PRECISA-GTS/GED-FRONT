const EmptyModels = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center justify-center h-[80vh]'>
                <p className='text-3xl font-bold'>Nenhum Modelo de Formulário cadastrado</p>
                <p className='opacity-50'>Acesse Configurações / Modelo de Formulário</p>
                <img src='/empty.svg' alt='Nenhum formulário cadastrado' className='w-1/2 md:w-1/4' />
            </div>
        </div>
    )
}

export default EmptyModels

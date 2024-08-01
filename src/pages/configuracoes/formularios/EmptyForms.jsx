import ListHeader from 'src/components/Defaults/ListHeader'

const EmptyForms = () => {
    return (
        <div className='flex flex-col gap-4'>
            <ListHeader btnBack btnNew type='new' />
            <div className='flex flex-col items-center justify-center h-[80vh]'>
                <p className='text-3xl font-bold'>Nenhum formulário cadastrado</p>
                <p className='opacity-50'>Clique no botão novo para cadastrar o primeiro formulário</p>
                <img src='/empty.svg' alt='Nenhum formulário cadastrado' className='w-1/2 md:w-1/4' />
            </div>
        </div>
    )
}

export default EmptyForms

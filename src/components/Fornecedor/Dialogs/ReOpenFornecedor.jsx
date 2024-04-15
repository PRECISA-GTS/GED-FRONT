import Input from 'src/components/Form/Input'

const ReOpenFornecedor = ({ control, register }) => {
    return (
        <div>
            <Input
                name='obs'
                title='Observação'
                register={register}
                control={control}
                defaultValue=''
                multiline
                rows={6}
            />
        </div>
    )
}

export default ReOpenFornecedor

import Input from 'src/components/Form/Input'

const DialogReOpenForm = ({ form }) => {
    return (
        <div>
            <Input name='obs' title='Observação' defaultValue='' multiline rows={3} form={form} />
        </div>
    )
}

export default DialogReOpenForm

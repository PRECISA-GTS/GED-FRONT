import { FormGroup } from '@mui/material'
import { useState } from 'react'
import Input from 'src/components/Form/Input'
import SwitchLabel from 'src/components/Form/SwitchLabel'

const FormNotification = ({ form, data, control, setValue, register, errors }) => {
    const [hasEmail, setHasEmail] = useState(true)
    setValue('emailDestinatario', data.email)

    return (
        <div className='flex flex-col gap-2 pt-2'>
            {hasEmail && (
                <Input name='emailDestinatario' type='email' title='E-mail do destinatário' required form={form} />
            )}
            <Input name='assunto' title='Assunto' required={true} defaultValue='' form={form} />
            <Input name='descricao' title='Descrição' multiline rows={3} required defaultValue='' form={form} />
            <FormGroup row>
                <SwitchLabel
                    name='email'
                    title='E-mail'
                    value={true}
                    register={register}
                    onChange={() => setHasEmail(!hasEmail)}
                />
                <SwitchLabel name='alerta' title='Alerta' value={true} register={register} />
            </FormGroup>
        </div>
    )
}

export default FormNotification

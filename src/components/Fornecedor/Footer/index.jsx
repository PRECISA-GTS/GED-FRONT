import { Card, CardContent, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'

const FooterFields = ({ modeloID, values, fields, disabled, register, errors, setValue, control }) => {
    const [dateStatus, setDateStatus] = useState({})
    const [profissionaisAprova, setProfissionaisAprova] = useState([])

    const getProfissionais = async () => {
        const response = await api.post(`/cadastros/profissional/getProfissionaisAssinatura`, {
            formularioID: 1, // fornecedor
            modeloID: modeloID
        })
        setProfissionaisAprova(response.data.aprova)
    }

    useEffect(() => {
        getProfissionais()
    }, [])

    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    {/* Data de abertura */}
                    <DateField
                        xs={12}
                        md={2}
                        title='Data da avaliação'
                        name={`fieldsFooter.dataAvaliacao`}
                        type='date'
                        value={values?.dataAvaliacao}
                        disabled={disabled}
                        register={register}
                        control={control}
                        typeValidation='dataPassado'
                        daysValidation={365}
                        errors={errors?.fieldsFooter?.['dataAvaliacao']}
                    />

                    {/* Hora de Abertura */}
                    <Input
                        xs={12}
                        md={2}
                        title='Hora da avaliação'
                        name={`fieldsFooter.horaAvaliacao`}
                        type='time'
                        disabled={disabled}
                        register={register}
                        control={control}
                        errors={errors?.fieldsFooter?.['horaAvaliacao']}
                    />

                    {/* Profissional responsável */}
                    <Select
                        xs={12}
                        md={8}
                        title='Profissional que aprova'
                        name={`fieldsFooter.profissionalAprova`}
                        type='string'
                        options={profissionaisAprova}
                        value={values?.profissionalAprova}
                        disabled={disabled}
                        register={register}
                        setValue={setValue}
                        control={control}
                        errors={errors?.fieldsFooter?.['profissionalAprova']}
                    />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default FooterFields

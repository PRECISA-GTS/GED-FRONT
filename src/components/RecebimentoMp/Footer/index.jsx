import { Card, CardContent, Grid } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import { unix } from 'moment'
import InfoDepartamentos from 'src/components/Defaults/Formularios/InfoDepartamentos'

const RecebimentoMpFooterFields = ({ modeloID, values, disabled, register, errors, setValue, control }) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [profissionaisAprova, setProfissionaisAprova] = useState([])

    const getProfissionaisDepartamentos = async () => {
        const response = await api.post(`/cadastros/departamento/getProfissionaisDepartamentosAssinatura`, {
            formularioID: 2, // recebimento de mp
            modeloID: modeloID,
            unidadeID: loggedUnity.unidadeID
        })
        setProfissionaisAprova(response.data.conclui)
        setDefaultProfissional(response.data.conclui)
    }

    const setDefaultProfissional = arrProfissionais => {
        const profissionalID = user.profissionalID //? Profissional logado
        const profissional = arrProfissionais.find(profissional => profissional.id === profissionalID)
        if (profissional && profissional.id > 0) setValue('fieldsFooter.profissional', profissional)
    }

    useEffect(() => {
        getProfissionaisDepartamentos()
    }, [])

    return (
        <Card>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                        <InfoDepartamentos data={values?.departamentos ?? []} />
                    </Grid>

                    {/* Data de abertura */}
                    <DateField
                        xs={12}
                        md={2}
                        title='Data da conclusão'
                        name={`fieldsFooter.dataConclusao`}
                        type='date'
                        value={values?.dataConclusao ?? new Date()}
                        disabled={disabled}
                        register={register}
                        control={control}
                        typeValidation='dataPassado'
                        daysValidation={365}
                        errors={errors?.fieldsFooter?.dataConclusao}
                    />

                    {/* Hora de Abertura */}
                    <Input
                        xs={12}
                        md={2}
                        title='Hora da conclusão'
                        name={`fieldsFooter.horaConclusao`}
                        type='time'
                        disabled={disabled}
                        register={register}
                        control={control}
                        errors={errors?.fieldsFooter?.horaConclusao}
                    />

                    {/* Profissional responsável */}
                    <Select
                        xs={12}
                        md={8}
                        title='Profissional que aprova'
                        name={`fieldsFooter.profissional`}
                        type='string'
                        options={profissionaisAprova ?? []}
                        // value={values?.profissional}
                        disabled={disabled}
                        register={register}
                        setValue={setValue}
                        control={control}
                        errors={errors?.fieldsFooter?.profissional}
                    />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RecebimentoMpFooterFields

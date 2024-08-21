import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Fields from 'src/components/Defaults/Formularios/Fields'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import { api } from 'src/configs/api'
import { getCurrentDate, getCurrentTime } from 'src/configs/defaultConfigs'
import InfoSetores from 'src/components/Defaults/Formularios/InfoSetores'

const HeaderFields = ({
    modeloID,
    values,
    fields,
    disabled,
    register,
    errors,
    setValue,
    control,
    getValues,
    getAddressByCep
}) => {
    const [profissionaisPreenche, setProfissionaisPreenche] = useState([])

    const getProfissionais = async () => {
        const response = await api.post(`/cadastros/profissional/getProfissionaisAssinatura`, {
            formularioID: 1,
            modeloID: modeloID
        })
        setProfissionaisPreenche(response.data.preenche)
    }

    useEffect(() => {
        getProfissionais()
        if (values && !values.data) {
            setValue('fieldsHeader.data', getCurrentDate())
        }
        if (values && !values.hora) {
            setValue('fieldsHeader.hora', getCurrentTime())
        }
    }, [values])

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <InfoSetores data={values?.setores ?? []} />
            </Grid>

            <Input
                xs={12}
                md={2}
                title='Data da abertura'
                name={`fieldsHeader.abertoPor.dataInicio`}
                value={values.abertoPor.dataInicio}
                disabled={true}
                register={register}
                control={control}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />
            <Input
                xs={12}
                md={2}
                title='Hora da abertura'
                name={`fieldsHeader.abertoPor.horaInicio`}
                value={values.abertoPor.dataInicio}
                type='time'
                disabled={true}
                register={register}
                control={control}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />
            <Input
                xs={12}
                md={8}
                title='Aberto por'
                name={`fieldsHeader.abertoPor.profissional.nome`}
                value={values?.abertoPor?.profissional?.nome}
                disabled={true}
                register={register}
                control={control}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Data da avaliação */}
            <DateField
                xs={12}
                md={2}
                title='Data da avaliação'
                name={`fieldsHeader.data`}
                type='date'
                value={values?.data ?? getCurrentDate()}
                disabled={disabled}
                register={register}
                control={control}
                typeValidation='dataPassado'
                daysValidation={365}
                errors={errors?.fieldsHeader?.['data']}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Hora da avaliacao */}
            <Input
                xs={12}
                md={2}
                title='Hora da avaliação'
                name={`fieldsHeader.hora`}
                value={values?.data ?? getCurrentTime()}
                type='time'
                disabled={disabled}
                register={register}
                control={control}
                errors={errors?.fieldsHeader?.['hora']}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Profissional responsável */}
            {/* <Select
                xs={12}
                md={4}
                title='Profissional preenchimento'
                name={`fieldsHeader.profissionalPreenche`}
                type='string'
                options={profissionaisPreenche}
                value={values?.profissionalPreenche}
                disabled={disabled}
                register={register}
                setValue={setValue}
                control={control}
                errors={errors?.fieldsHeader?.['profissionalPreenche']}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            /> */}

            {/* CNPJ */}
            <Input
                xs={12}
                md={4}
                title='CNPJ'
                name={`fieldsHeader.cnpj`}
                type='string'
                mask='cnpj'
                disabled={true}
                register={register}
                control={control}
                errors={errors?.fieldsHeader?.['cnpj']}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Razao Social */}
            <Input
                xs={12}
                md={4}
                title='Razão Social'
                name={`fieldsHeader.razaoSocial`}
                type='string'
                disabled={disabled}
                register={register}
                control={control}
                errors={errors?.fieldsHeader?.['razaoSocial']}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Nome fantasia */}
            <Input
                xs={12}
                md={4}
                title='Nome Fantasia'
                name={`fieldsHeader.nomeFantasia`}
                type='string'
                disabled={disabled}
                register={register}
                control={control}
                errors={errors?.fieldsHeader?.['nomeFantasia']}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Fields dinâmicos */}
            <Fields
                register={register}
                errors={errors}
                setValue={setValue}
                control={control}
                getValues={getValues}
                fields={fields}
                values={fields}
                getAddressByCep={getAddressByCep}
                disabled={disabled}
            />
        </Grid>
    )
}

export default HeaderFields

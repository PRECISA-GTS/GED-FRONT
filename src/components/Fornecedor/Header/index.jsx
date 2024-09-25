import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import Fields from 'src/components/Defaults/Formularios/Fields'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import { api } from 'src/configs/api'
import { getCurrentDate, getCurrentTime } from 'src/configs/defaultConfigs'
import InfoDepartamentos from 'src/components/Defaults/Formularios/InfoDepartamentos'
import CheckLabel from 'src/components/Form/CheckLabel'

const HeaderFields = ({ form, modeloID, values, fields, disabled, getAddressByCep }) => {
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
            form.setValue('fieldsHeader.data', getCurrentDate())
        }
        if (values && !values.hora) {
            form.setValue('fieldsHeader.hora', getCurrentTime())
        }
    }, [values])

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <InfoDepartamentos data={values?.departamentos ?? []} />
            </Grid>

            {/* <Input
                xs={12}
                md={2}
                title='Data da abertura'
                name={`fieldsHeader.abertoPor.dataInicio`}
                value={values.abertoPor.dataInicio}
                disabled={true}
                register={register}
                control={control}
                alertRequired
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
                alertRequired
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
                alertRequired
            /> */}

            {/* Data da avaliação */}
            <DateField
                xs={12}
                md={2}
                title='Data da avaliação'
                name={`fieldsHeader.data`}
                type='date'
                value={values?.data ?? getCurrentDate()}
                disabled={disabled}
                typeValidation='dataPassado'
                daysValidation={365}
                form={form}
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
                form={form}
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
                title={values.cpf ? 'CPF' : 'CNPJ'}
                name={`fieldsHeader.cnpj`}
                type='string'
                mask={values.cpf ? 'cpf' : 'cnpj'}
                disabled={true}
                form={form}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Razao Social */}
            <Input
                xs={12}
                md={4}
                title={values.cpf ? 'Nome' : 'Razão Social'}
                name={`fieldsHeader.razaoSocial`}
                type='string'
                disabled={disabled}
                form={form}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Nome fantasia */}
            <Input
                xs={12}
                md={4}
                title={values.cpf ? 'Apelido' : 'Nome fantasia'}
                name={`fieldsHeader.nomeFantasia`}
                type='string'
                disabled={disabled}
                form={form}
                alertRequired //! Apenas pinta o campo de vermelho, não valida
            />

            {/* Fields dinâmicos */}
            <Fields fields={fields} values={fields} getAddressByCep={getAddressByCep} disabled={disabled} form={form} />

            {values.prestadorServico && (
                <CheckLabel
                    md={4}
                    title='Prestador de serviço terceirizado'
                    name={`fields.prestadorServico`}
                    value={true}
                    form={form}
                    disabled
                    helpText='Fornecedor é um prestador de serviços terceirizado (produto é opcional)'
                />
            )}
        </Grid>
    )
}

export default HeaderFields

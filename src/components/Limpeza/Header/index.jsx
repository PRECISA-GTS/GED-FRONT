import { Card, CardContent, Grid } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import Fields from 'src/components/Defaults/Formularios/Fields'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import HeaderInfo from './Info'
import InfoSetores from 'src/components/Defaults/Formularios/InfoSetores'

const HeaderFields = ({ form, limpezaID, modelo, values, fields, disabled }) => {
    const { user } = useContext(AuthContext)
    const [profissionaisPreenchimento, setProfissionaisPreenchimento] = useState([])

    const getProfissionais = async () => {
        const response = await api.post(`/cadastros/profissional/getProfissionaisAssinatura`, {
            formularioID: 4, // limpeza
            modeloID: modelo.id
        })
        setProfissionaisPreenchimento(response.data.preenche)
        setDefaultProfissional(response.data.preenche)
    }

    const setDefaultProfissional = arrProfissionais => {
        const profissionalID = user.profissionalID //? Profissional logado
        const profissional = arrProfissionais.find(profissional => profissional.id === profissionalID)
        if (profissional && profissional.id > 0) form.setValue('fieldsHeader.profissional', profissional)
    }

    useEffect(() => {
        getProfissionais()
    }, [])

    return (
        <>
            <Grid container alignItems='stretch' spacing={4}>
                {/* Bloco esquerda (cabeçalho) */}
                <Grid item xs={12} md={10}>
                    <Card style={{ height: '100%' }}>
                        {/* Header */}
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sx={{ textAlign: 'right' }}>
                                    <InfoSetores data={values?.setores ?? []} />
                                </Grid>

                                {/* Inputs fixos */}
                                {/* Data de abertura */}
                                {/* <DateField
                                    xs={12}
                                    md={2}
                                    title='Data da abertura'
                                    name={`fieldsHeader.abertoPor.dataInicio`}
                                    type='date'
                                    value={values?.abertoPor?.dataInicio}
                                    disabled
                                    control={control}
                                />
                                <Input
                                    xs={12}
                                    md={2}
                                    title='Hora da abertura'
                                    name={`fieldsHeader.abertoPor.horaInicio`}
                                    type='time'
                                    disabled
                                    register={register}
                                    control={control}
                                />
                                <Input
                                    xs={12}
                                    md={8}
                                    title='Profissional que abriu'
                                    name={`fieldsHeader.abertoPor.profissional.nome`}
                                    value={values?.abertoPor?.profissional?.nome}
                                    disabled
                                    register={register}
                                    control={control}
                                /> */}
                                {/* Inputs com preenchimento */}
                                {/* Data de avaliação */}
                                <DateField
                                    xs={12}
                                    md={2}
                                    title='Data da avaliação'
                                    name={`fieldsHeader.data`}
                                    type='date'
                                    value={values?.data ?? new Date()}
                                    disabled={disabled}
                                    typeValidation='dataPassado'
                                    daysValidation={365}
                                    form={form}
                                />
                                {/* Hora de avaliação */}
                                <Input
                                    xs={12}
                                    md={2}
                                    title='Hora da avaliação'
                                    name={`fieldsHeader.hora`}
                                    type='time'
                                    disabled={disabled}
                                    form={form}
                                />
                                {/* Profissional que preenche */}
                                <Select
                                    xs={12}
                                    md={4}
                                    title='Profissional preenchimento'
                                    name={`fieldsHeader.profissional`}
                                    type='string'
                                    options={profissionaisPreenchimento}
                                    // value={profissionaisPreenchimento[1]}
                                    disabled={disabled}
                                    form={form}
                                />
                                {/* Fields dinâmicos */}
                                <Fields fields={fields} values={fields} disabled={disabled} form={form} />
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Bloco direita (informações) */}
                <Grid item xs={12} md={2}>
                    <HeaderInfo value={null} />
                </Grid>
            </Grid>
        </>
    )
}

export default HeaderFields

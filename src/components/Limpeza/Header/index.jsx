import { Card, CardContent, Grid } from '@mui/material'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
import CustomFields from 'src/components/Defaults/Formularios/CustomFields'
import InfoDepartamentos from 'src/components/Defaults/Formularios/InfoDepartamentos'
import { useContext, useEffect, useState } from 'react'
import Select from 'src/components/Form/Select'
import { api } from 'src/configs/api'
import { AuthContext } from 'src/context/AuthContext'
import CheckLabel from 'src/components/Form/CheckLabel'

const Header = ({ form, data, disabled }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [departamentos, setDepartamentos] = useState([])
    const [profissionais, setProfissionais] = useState([])
    const [setores, setSetores] = useState([])
    const [equipamentos, setEquipamentos] = useState([])
    const [produtos, setProdutos] = useState([])
    const [fornecedores, setFornecedores] = useState([])

    if (!data) return

    const getDepartamentos = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post('/cadastros/departamento', { unidadeID: loggedUnity.unidadeID })
            setDepartamentos(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getProfissionais = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/cadastros/profissional/getProfissionais`, {
                unidadeID: loggedUnity.unidadeID
            })
            setProfissionais(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getSetores = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/cadastros/setor/getSetores`, { unidadeID: loggedUnity.unidadeID })
            setSetores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getEquipamentos = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/cadastros/equipamento/getEquipamentos`, {
                unidadeID: loggedUnity.unidadeID
            })
            setEquipamentos(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getProdutosLimpeza = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/cadastros/produto/getProdutosLimpeza`, {
                unidadeID: loggedUnity.unidadeID
            })
            setProdutos(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getFornecedores = async () => {
        try {
            if (!loggedUnity) return

            const response = await api.post(`/formularios/fornecedor/getFornecedores`, {
                unidadeID: loggedUnity.unidadeID
            })
            setFornecedores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDepartamentos()
        getProfissionais()
        getSetores()
        getEquipamentos()
        getProdutosLimpeza()
        getFornecedores()
    }, [loggedUnity])

    return (
        <Card>
            <CardContent>
                <Grid container spacing={6} className='items-center'>
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                        <InfoDepartamentos data={data?.departamentosPreenchimento ?? []} />
                    </Grid>

                    <DateField
                        xs={12}
                        md={2}
                        title='Data Inicial'
                        type='date'
                        required
                        name={`header.dataInicio`}
                        value={data.dataInicio}
                        disabled={disabled}
                        typeValidation='dataPassado'
                        daysValidation={999999}
                        form={form}
                    />
                    <Input
                        xs={12}
                        md={2}
                        title='Hora Inicial'
                        name={`header.horaInicio`}
                        type='time'
                        required
                        disabled={disabled}
                        form={form}
                    />
                    <DateField
                        xs={12}
                        md={2}
                        title='Data Final'
                        type='date'
                        required
                        name={`header.dataFim`}
                        value={data.dataFim}
                        disabled={disabled}
                        typeValidation='dataPassado'
                        daysValidation={999999}
                        form={form}
                    />
                    <Input
                        xs={12}
                        md={2}
                        title='Hora Final'
                        name={`header.horaFim`}
                        type='time'
                        required
                        disabled={disabled}
                        form={form}
                    />
                    <CheckLabel
                        xs={6}
                        md={4}
                        title='Prestador de serviço'
                        name={`header.prestadorServico`}
                        value={data.prestadorServico}
                        form={form}
                        disabled={disabled}
                        helpText='Limpeza realizada por uma empresa terceira'
                    />
                    {form.watch('header.prestadorServico') && (
                        <Select
                            xs={12}
                            md={4}
                            title='Fornecedor'
                            name={`header.fornecedor`}
                            value={data?.fornecedor}
                            options={fornecedores ?? []}
                            form={form}
                        />
                    )}
                    {!form.watch('header.prestadorServico') && (
                        <>
                            <Select
                                xs={12}
                                md={4}
                                title='Departamento'
                                name={`header.departamento`}
                                value={data?.departamento}
                                options={departamentos ?? []}
                                form={form}
                            />
                            <Select
                                xs={12}
                                md={4}
                                title='Profissional'
                                name={`header.profissional`}
                                value={data?.profissional}
                                options={profissionais ?? []}
                                form={form}
                            />
                        </>
                    )}
                    <Select
                        xs={12}
                        md={4}
                        title='Setor'
                        name={`header.setor`}
                        value={data?.setor}
                        required
                        alertRequired
                        options={setores ?? []}
                        form={form}
                    />
                    <Select
                        xs={12}
                        md={4}
                        title='Equipamento(s)'
                        name={`header.equipamentos`}
                        value={data?.equipamentos}
                        multiple
                        required
                        options={equipamentos ?? []}
                        form={form}
                    />
                    <Select
                        xs={12}
                        md={4}
                        title='Produtos utilizados'
                        name={`header.produtos`}
                        value={data?.produtos}
                        multiple
                        helpText='Equipamentos que foram utilizados pra realizar a limpeza do setor'
                        options={produtos ?? []}
                        form={form}
                    />
                    <CheckLabel
                        xs={6}
                        md={2}
                        title='Limpeza'
                        name={`header.limpeza`}
                        value={data.limpeza}
                        form={form}
                        disabled
                    />
                    <CheckLabel
                        xs={6}
                        md={2}
                        title='Higienização'
                        name={`header.higienizacao`}
                        value={data.higienizacao}
                        form={form}
                        disabled={disabled}
                    />

                    {/* Fields dinamicos */}
                    <CustomFields form={form} fields={data.fields} disabled={disabled} />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Header

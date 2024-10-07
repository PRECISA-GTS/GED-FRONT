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
import CustomChip from 'src/@core/components/mui/chip'

const Header = ({ form, data, disabled }) => {
    const { loggedUnity } = useContext(AuthContext)
    const [departamentos, setDepartamentos] = useState([])
    const [profissionais, setProfissionais] = useState([])
    const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([])
    const [setores, setSetores] = useState([])
    const [equipamentos, setEquipamentos] = useState([])
    const [equipamentosFiltrados, setEquipamentosFiltrados] = useState([])
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
            filterProfessionals(data?.departamento, response.data, false)
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
            filterEquipments(data?.setor, response.data, false)
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

            const response = await api.post(`/formularios/fornecedor/getFornecedoresPrestadorServico`, {
                unidadeID: loggedUnity.unidadeID
            })
            setFornecedores(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const filterProfessionals = (value, profissionais, clear) => {
        const filteredProfessionals = profissionais.filter(p => {
            if (p.departamentos) {
                const departamentosArray = p.departamentos.split(',').map(Number)
                return departamentosArray.includes(value?.id)
            }
            return false
        })
        setProfissionaisFiltrados(filteredProfessionals)
        if (clear) form.setValue('header.profissional', null)
    }

    const filterEquipments = (value, equipamentos, clear) => {
        const filteredEquipments = equipamentos.filter(e => {
            if (e.setores) {
                const setoresArray = e.setores.split(',').map(Number)
                return setoresArray.includes(value?.id)
            }
            return false
        })
        setEquipamentosFiltrados(filteredEquipments)
        if (clear) form.setValue('header.equipamentos', [])
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
                    <Grid item xs={12} md={6}>
                        <div className='flex gap-2'>
                            <CustomChip
                                size='small'
                                HeaderFiel
                                skin='light'
                                color={data.status.color}
                                label={data.status.label}
                                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                            />
                            <CustomChip
                                size='small'
                                HeaderFiel
                                skin='light'
                                label={data.modelo.nome}
                                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
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
                    {form.getValues('header.prestadorServico') && (
                        <Select
                            xs={12}
                            md={4}
                            title='Fornecedor prestador de serviço'
                            name={`header.fornecedor`}
                            value={data?.fornecedor}
                            options={fornecedores ?? []}
                            disabled={disabled}
                            form={form}
                            helpText='Todos os fornecedor ativos prestadores de serviço'
                        />
                    )}
                    {!form.getValues('header.prestadorServico') && (
                        <>
                            <Select
                                xs={12}
                                md={4}
                                title='Departamento responsável pela limpeza'
                                name={`header.departamento`}
                                onChange={value => filterProfessionals(value, profissionais, true)}
                                disabled={disabled}
                                required
                                value={data?.departamento}
                                options={departamentos ?? []}
                                form={form}
                            />
                            <Select
                                xs={12}
                                md={4}
                                title='Profissional responsável pela limpeza'
                                name={`header.profissional`}
                                disabled={disabled}
                                value={data?.profissional}
                                options={profissionaisFiltrados ?? []}
                                form={form}
                            />
                        </>
                    )}
                    <Grid item md={form.watch('header.prestadorServico') ? 8 : 4}></Grid>
                    <Select
                        xs={12}
                        md={4}
                        title='Setor que foi limpo'
                        name={`header.setor`}
                        value={data?.setor}
                        disabled={disabled}
                        onChange={value => filterEquipments(value, equipamentos, true)}
                        required
                        options={setores ?? []}
                        form={form}
                        helpText='Setor que foi limpo pelo profissional responsável pela limpeza'
                    />
                    <Select
                        xs={12}
                        md={4}
                        title='Equipamento(s) que foram limpos'
                        name={`header.equipamentos`}
                        value={data?.equipamentos}
                        disabled={disabled}
                        multiple
                        options={equipamentosFiltrados ?? []}
                        form={form}
                        helpText='Equipamentos que foram limpos pelo profissional responsável pela limpeza'
                    />
                    <Grid item md={4}></Grid>
                    <Select
                        xs={12}
                        md={4}
                        title='Produtos utilizados'
                        name={`header.produtos`}
                        disabled={disabled}
                        value={data?.produtos}
                        multiple
                        helpText='Produtos que foram utilizados pra realizar a limpeza do setor'
                        options={produtos ?? []}
                        form={form}
                    />
                    <CheckLabel
                        xs={6}
                        md={2}
                        title='Limpeza'
                        name={`header.limpeza`}
                        value={data.limpeza}
                        checked
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

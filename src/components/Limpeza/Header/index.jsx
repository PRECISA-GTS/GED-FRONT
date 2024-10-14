import { Card, CardContent, Grid } from '@mui/material'
import Input from 'src/components/Form/Input'
import DateField from 'src/components/Form/DateField'
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

    useEffect(() => {
        getDepartamentos()
        getProfissionais()
        getSetores()
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
                    {form.watch('header.prestadorServico') && (
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
                    {!form.watch('header.prestadorServico') && (
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
                    <Select
                        xs={12}
                        md={4}
                        title='Setor que foi limpo'
                        name={`header.setor`}
                        value={data?.setor}
                        disabled={disabled}
                        // onChange={value => filterEquipments(value, equipamentos, true)}
                        required
                        options={setores ?? []}
                        form={form}
                        helpText='Setor que foi limpo pelo profissional responsável pela limpeza'
                    />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Header

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { api } from 'src/configs/api'
import Icon from 'src/@core/components/icon'
import Input from 'src/components/Form/Input'
import { useEffect } from 'react'

const SectionTwo = ({ handleNext, handlePrev, setDataGlobal, dataGlobal }) => {
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
    })

    const onSubmit = value => {
        //Todo: Pra não bugar campos quando carrega endereço pelo CEP
        setDataGlobal({
            ...dataGlobal,
            sectionTwo: {
                ...dataGlobal.sectionTwo,
                ...value
            }
        })
        handleNext()
    }

    const getCep = async (cep) => {
        if (cep.length === 9) {
            api.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
                setAddress(response.data)
            })
        }
    }

    const setAddress = (address) => {
        setValue('logradouro', address?.logradouro)
        setValue('bairro', address?.bairro)
        setValue('cidade', address?.localidade)
        setValue('uf', address?.uf)
    }

    useEffect(() => {

        setValue('telefone', dataGlobal?.sectionTwo?.telefone)
        setValue('cep', dataGlobal?.sectionTwo?.cep)
        setValue('logradouro', dataGlobal?.sectionTwo?.logradouro)
        setValue('numero', dataGlobal?.sectionTwo?.numero)
        setValue('complemento', dataGlobal?.sectionTwo?.complemento)
        setValue('bairro', dataGlobal?.sectionTwo?.bairro)
        setValue('cidade', dataGlobal?.sectionTwo?.cidade)
        setValue('uf', dataGlobal?.sectionTwo?.uf)
    }, [])

    return (
        dataGlobal && (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant='h5'>Informações opcionais</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Insira as informações opcionais</Typography>
                </Box>
                <Grid container spacing={5}>
                    <Input
                        xs={12}
                        md={6}
                        title='Telefone'
                        name='telefone'
                        defaultValue={dataGlobal?.sectionTwo?.telefone}
                        mask='telefone'
                        control={control}
                        errors={errors?.telefone}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Cep'
                        name='cep'
                        defaultValue={dataGlobal?.sectionTwo?.cep}
                        mask='cep2'
                        control={control}
                        errors={errors?.cnpj}
                        onChange={(value) => getCep(value)}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Rua'
                        name='logradouro'
                        defaultValue={dataGlobal?.sectionTwo?.logradouro}
                        control={control}
                        errors={errors?.logradouro}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Número'
                        name='numero'
                        defaultValue={dataGlobal?.sectionTwo?.numero}
                        control={control}
                        errors={errors?.numero}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Complemento'
                        name='complemento'
                        defaultValue={dataGlobal?.sectionTwo?.complemento}
                        control={control}
                        errors={errors?.complemento}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Bairro'
                        name='bairro'
                        defaultValue={dataGlobal?.sectionTwo?.bairro}
                        control={control}
                        errors={errors?.bairro}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Cidade'
                        name='cidade'
                        defaultValue={dataGlobal?.sectionTwo?.cidade}
                        control={control}
                        errors={errors?.cidade}
                    />
                    <Input
                        xs={12}
                        md={6}
                        title='Estado'
                        name='uf'
                        defaultValue={dataGlobal?.sectionTwo?.uf}
                        control={control}
                        errors={errors?.uf}
                        mask='estado'
                    />
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                color='secondary'
                                variant='contained'
                                onClick={handlePrev}
                                startIcon={<Icon icon='mdi:chevron-left' fontSize={20} />}
                            >
                                Anterior
                            </Button>
                            <Button type='submit' variant='contained' onClick={handleSubmit} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
                                Proximo
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form >
        )
    )
}

export default SectionTwo

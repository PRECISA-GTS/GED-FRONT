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
  const form = useForm({
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
    form.setValue('logradouro', address?.logradouro)
    form.setValue('bairro', address?.bairro)
    form.setValue('cidade', address?.localidade)
    form.setValue('uf', address?.uf)
  }

  useEffect(() => {

    form.setValue('telefone', dataGlobal?.sectionTwo?.telefone)
    form.setValue('cep', dataGlobal?.sectionTwo?.cep)
    form.setValue('logradouro', dataGlobal?.sectionTwo?.logradouro)
    form.setValue('numero', dataGlobal?.sectionTwo?.numero)
    form.setValue('complemento', dataGlobal?.sectionTwo?.complemento)
    form.setValue('bairro', dataGlobal?.sectionTwo?.bairro)
    form.setValue('cidade', dataGlobal?.sectionTwo?.cidade)
    form.setValue('uf', dataGlobal?.sectionTwo?.uf)
  }, [])

  return (
    dataGlobal && (
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
            form={form}
          />
          <Input
            xs={12}
            md={6}
            title='Cep'
            name='cep'
            defaultValue={dataGlobal?.sectionTwo?.cep}
            mask='cep2'
            form={form}
            onChange={(value) => getCep(value)}
          />
          <Input
            xs={12}
            md={6}
            title='Rua'
            name='logradouro'
            defaultValue={dataGlobal?.sectionTwo?.logradouro}
            form={form}
          />
          <Input
            xs={12}
            md={6}
            title='Número'
            name='numero'
            defaultValue={dataGlobal?.sectionTwo?.numero}
            form={form}
          />
          <Input
            xs={12}
            md={6}
            title='Complemento'
            name='complemento'
            defaultValue={dataGlobal?.sectionTwo?.complemento}
            form={form}
          />
          <Input
            xs={12}
            md={6}
            title='Bairro'
            name='bairro'
            defaultValue={dataGlobal?.sectionTwo?.bairro}
            form={form}
          />
          <Input
            xs={12}
            md={6}
            title='Cidade'
            name='cidade'
            defaultValue={dataGlobal?.sectionTwo?.cidade}
            form={form}
          />
          <Input
            xs={12}
            md={6}
            title='Estado'
            name='uf'
            defaultValue={dataGlobal?.sectionTwo?.uf}
            form={form}
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
              <Button type='submit' variant='contained' onClick={form.handleSubmit} endIcon={<Icon icon='mdi:chevron-right' fontSize={20} />}>
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

import { Grid, Card, CardContent, Button, CardHeader } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomSelect from 'src/components/Form/CustomSelect'
import { api } from 'src/configs/api'

const InitialSteps = () => {
    const [categories, setCategories] = useState([])
    const form = useForm()
    const selectedCategory = form.watch('categorie')
    const selectedRisk = form.watch('risk')

    const getRisks = category => {
        const risks = categories.find(row => row.name === category)?.riscos
        return risks
    }

    const getData = async () => {
        const response = await api.get(`/configuracoes/formularios/fornecedor/getCategories`)
        setCategories(response.data)
    }

    const handleSubmit = () => {
        console.log('enviiia e busca modelo...')
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Card>
            <CardContent className='space-y-1'>
                <Grid container spacing={4}>
                    <CustomSelect
                        xs={12}
                        md={6}
                        title='Categoria'
                        name='categorie'
                        form={form}
                        options={categories}
                        value={selectedCategory}
                        onChange={newValue => {
                            form.setValue('categorie', newValue)
                            form.setValue('risk', null)
                        }}
                    />

                    {selectedCategory && (
                        <CustomSelect
                            key={selectedCategory}
                            xs={12}
                            md={6}
                            title='Risco'
                            name='risk'
                            form={form}
                            options={getRisks(selectedCategory)}
                            value={selectedRisk}
                            onChange={newValue => form.setValue('risk', newValue)}
                        />
                    )}
                </Grid>

                <Grid container spacing={4}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant='contained' onClick={handleSubmit} disabled={!selectedRisk}>
                            Confirmar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default InitialSteps

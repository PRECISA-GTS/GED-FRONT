import { Button, Grid } from '@mui/material'
import { RouteContext } from 'src/context/RouteContext'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import CardList from 'src/components/Defaults/Cards/CardList'
import ListHeader from 'src/components/Defaults/ListHeader'
import DialogDefault from 'src/components/Defaults/Dialogs/DialogDefault'
import LinkForms from '../LinkForms'
import Router from 'next/router'
import { api } from 'src/configs/api'
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

const SelectModel = ({ values }) => {
    const [openConfig, setOpenConfig] = useState(false)
    const { setId } = useContext(RouteContext)
    const { loggedUnity } = useAuth()
    const router = Router
    const staticUrl = router.pathname
    const form = useForm({ mode: 'onChange' })
    const [linkedsForm, setLinkedsForm] = useState([])

    const goToForm = id => {
        setId(id)
    }

    const getLinkingForms = async () => {
        try {
            const response = await api.post(`${staticUrl}/getLinkingForms`, { unidadeID: loggedUnity.unidadeID })
            console.log('🚀 ~ getLinkingForms: ', response.data)
            form.reset(response.data.result)
            setLinkedsForm(response.data.arrLinkedsForm)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async data => {
        const formatData = {
            riscos: data,
            unidadeID: loggedUnity.unidadeID
        }
        try {
            const response = await api.post(`${staticUrl}/updateLinkingForms`, formatData)
            if (response.status === 200) {
                toast.success('Formulários vinculados com sucesso!')
                await getLinkingForms() // Atualiza os dados após o envio do formulário
            }
        } catch (error) {
            toast.error('Erro ao vincular formulários!')
        } finally {
            setOpenConfig(false)
        }
    }

    useEffect(() => {
        getLinkingForms()
    }, [])

    return (
        <>
            <ListHeader
                btnConfig
                btnBack
                btnNew
                type='new'
                partialRoute={false}
                handleOpenConfig={() => setOpenConfig(true)}
            />
            <Grid container spacing={4}>
                {values &&
                    values.map((value, index) => (
                        <CardList
                            key={index}
                            xs={12}
                            md={3}
                            icon='fluent:form-multiple-48-regular'
                            id={value.id}
                            title={value.nome}
                            subtitle={`Ciclo de ${value.ciclo} dias`}
                            action='edit'
                            handleClick={() => goToForm(value.id)}
                            linkedsForms={linkedsForm}
                        />
                    ))}
            </Grid>

            {openConfig && (
                <DialogDefault
                    open={openConfig}
                    onClose={() => setOpenConfig(false)}
                    size='sm'
                    fullWidth
                    title='Vincular Formulários'
                    DialogActionsChildren={
                        <div className='flex items-center gap-2'>
                            <Button onClick={() => setOpenConfig(false)}>Fechar</Button>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={form.handleSubmit(onSubmit)}
                                disabled={form.formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </div>
                    }
                >
                    <LinkForms form={form} onSubmit={onSubmit} />
                </DialogDefault>
            )}
        </>
    )
}

export default SelectModel

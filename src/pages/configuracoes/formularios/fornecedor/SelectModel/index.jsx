import { Alert, Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import Loading from 'src/components/Loading'
import Select from 'src/components/Form/Select'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import FormHeader from 'src/components/Defaults/FormHeader'
import { SettingsContext } from 'src/@core/context/settingsContext'
import { useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import Router from 'next/router'
import CardList from 'src/components/Defaults/Cards/CardList'
import ListHeader from 'src/components/Defaults/ListHeader'
import DialogDefault from 'src/components/Defaults/Dialogs/DialogDefault'
import LinkForms from '../LinkForms'

const SelectModel = ({ values }) => {
    const { user, loggedUnity } = useContext(AuthContext)
    const [openConfig, setOpenConfig] = useState(false)
    const { setId } = useContext(RouteContext)
    const [models, setModels] = useState([])
    const [model, setModel] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const router = Router
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode

    const goToForm = id => {
        setId(id)
    }

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
                            title={value.nome}
                            subtitle={`Ciclo de ${value.ciclo} dias`}
                            action='edit'
                            handleClick={() => goToForm(value.id)}
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
                            <Button variant='contained' color='primary' onClick={() => setOpenConfig(false)}>
                                Salvar
                            </Button>
                        </div>
                    }
                >
                    <LinkForms onClose={() => setOpenConfig(false)} />
                </DialogDefault>
            )}
        </>
    )
}

export default SelectModel

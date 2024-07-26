// ** MUI Imports
import Grid from '@mui/material/Grid'
import { ParametersContext } from 'src/context/ParametersContext'
import { AuthContext } from 'src/context/AuthContext'
import { useContext, useEffect } from 'react'
import Factory from 'src/components/Graphics/home/factory'
import Supplier from 'src/components/Graphics/home/supplier'
import { useFilter } from 'src/context/FilterContext'

const Home = () => {
    const { setTitle } = useContext(ParametersContext)
    const { user } = useContext(AuthContext)
    const { startFilter } = useFilter()

    useEffect(() => {
        startFilter()
        setTitle({
            title: 'Início',
            subtitle: ''
        })
    }, [])

    return user.papelID === 1 ? (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Factory />
            </Grid>
        </Grid>
    ) : user.papelID === 2 ? (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Supplier />
            </Grid>
        </Grid>
    ) : null
}

export default Home

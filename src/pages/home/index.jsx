// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { ParametersContext } from 'src/context/ParametersContext'
import { AuthContext } from 'src/context/AuthContext'
import { useContext, useEffect } from 'react'
import Factory from 'src/components/Graphics/home/factory'
import Supplier from 'src/components/Graphics/home/supplier'

const Home = () => {
    const { setTitle } = useContext(ParametersContext)
    const { user } = useContext(AuthContext)

    console.log('user', user)

    useEffect(() => {
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

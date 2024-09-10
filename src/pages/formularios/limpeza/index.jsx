import { useEffect, useContext, useState } from 'react'
import { api } from 'src/configs/api'
import Table from 'src/components/Defaults/Table'
import FormLimpeza from 'src/components/Limpeza/FormLimpeza'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'

import Loading from 'src/components/Loading'

// ** Next
import { useRouter } from 'next/router'

// ** Configs
import { configColumns } from 'src/configs/defaultConfigs'
import { useFilter } from 'src/context/FilterContext'
import Filters from './Filters'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'

const Limpeza = () => {
    const { user, loggedUnity } = useContext(AuthContext)
    const router = useRouter()
    const currentLink = router.pathname
    const { setTitle } = useContext(ParametersContext)
    const { id } = useContext(RouteContext)
    const { startFilter, setFilteredData, filteredData, setData } = useFilter()

    const getList = async () => {
        await api
            .get(`${currentLink}/getList/${loggedUnity.unidadeID}/${user.papelID}/${user.usuarioID}`)
            .then(response => {
                setFilteredData(response.data)
                setData(response.data)
                setTitle({
                    icon: 'carbon:clean',
                    title: 'Limpeza e Higienização',
                    subtitle: {
                        id: id,
                        count: response.data.length,
                        new: false
                    }
                })
            })
    }

    useEffect(() => {
        getList()
        startFilter(<Filters />)
    }, [id])

    const arrColumns = [
        {
            headerName: 'ID',
            field: 'id',
            size: 0.1
        },
        {
            headerName: 'Data',
            field: 'data',
            size: 0.1,
            type: 'date'
        },
        {
            headerName: 'Modelo',
            field: 'modelo',
            size: 0.2
        },
        {
            headerName: 'Status',
            field: {
                name: 'status',
                cor: 'cor'
            },
            size: 0.2,
            type: 'statusSteps'
        }
    ]

    const columns = configColumns(currentLink, arrColumns)

    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            {/* Exibe loading enquanto não existe result */}
            {!filteredData ? (
                <Loading show />
            ) : //? Se tem id, exibe o formulário
            id && id > 0 ? (
                <FormLimpeza id={id} />
            ) : (
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label='lab API tabs example'>
                            <Tab label='Limpeza e Higienização' value='1' />
                            <Tab label='Não Conformidade' value='2' />
                        </TabList>
                    </Box>
                    <TabPanel value='1'>
                        <Table result={filteredData} columns={columns} />
                    </TabPanel>
                    <TabPanel value='2'>Não conformidade...</TabPanel>
                </TabContext>
            )}
        </>
    )
}

export default Limpeza

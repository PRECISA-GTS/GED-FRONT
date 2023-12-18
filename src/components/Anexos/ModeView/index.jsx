import { useRef, useContext, useState, useEffect } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'
import AnexoGrid from './AnexoGrid'
import AnexoList from './AnexoList'
import AnexoListMultiple from './AnexoListMultiple'
import { Card, CardContent, Typography, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material'
import IconList from 'src/icon/IconList'
import IconGrid from 'src/icon/IconGrid'

const ModeView = ({ values }) => {
    //* Controles do anexo
    const [selectedItem, setSelectedItem] = useState(null)
    console.log('🚀 ~ selectedItem:', selectedItem)
    const { settings } = useContext(SettingsContext)
    const modeTheme = settings.mode
    const fileInputRef = useRef(null)
    const handleFileClick = item => {
        fileInputRef.current.click()
        setSelectedItem(item)
    }
    useEffect(() => {
        fileInputRef.current.value = ''
    }, [values.handleFileSelect])

    //* Controles do toggle do modo de visualização
    // ** State
    const [mode, setMode] = useState('list')
    const handleMode = (event, newMode) => {
        setMode(newMode)
    }

    return (
        <Card sx={{ mt: 4 }}>
            <CardContent>
                <div className='flex justify-between items-center mb-2'>
                    <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
                        {values.grupo.nome}
                        <Typography variant='body2' sx={{ mb: 2 }}>
                            {values.grupo.descricao}
                        </Typography>
                    </Typography>
                    <div>
                        <ToggleButtonGroup exclusive color='primary' value={mode} onChange={handleMode}>
                            <ToggleButton value='list'>
                                <IconList />
                            </ToggleButton>
                            <ToggleButton value='grid'>
                                <IconGrid />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </div>

                <Grid container spacing={4}>
                    {values.grupo.itens.map((item, indexItem) =>
                        mode === 'list' ? (
                            <AnexoListMultiple
                                modeTheme={modeTheme}
                                key={`${values.indexGrupo}-${indexItem}`}
                                handleFileClick={handleFileClick}
                                selectedItem={selectedItem}
                                inputRef={fileInputRef}
                                //
                                item={item}
                                loadingFile={values.loadingFile}
                                grupo={values.grupo}
                                indexBlock={values.indexGrupo}
                                indexItem={indexItem}
                                handleFileSelect={values.handleFileSelect}
                                handleRemove={values.handleRemove}
                                folder={values.folder}
                                error={values.error}
                                disabled={values.disabled}
                            />
                        ) : (
                            <AnexoGrid
                                modeTheme={modeTheme}
                                key={`${values.indexGrupo}-${indexItem}`}
                                handleFileClick={handleFileClick}
                                selectedItem={selectedItem}
                                inputRef={fileInputRef}
                                //
                                item={item}
                                loadingFile={values.loadingFile}
                                grupo={values.grupo}
                                indexGrupo={values.indexGrupo}
                                indexItem={indexItem}
                                handleFileSelect={values.handleFileSelect}
                                handleRemove={values.handleRemove}
                                folder={values.folder}
                                error={values.error}
                                disabled={values.disabled}
                            />
                        )
                    )}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ModeView

import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Grid, Typography } from '@mui/material'
import { useEffect, useState, useContext } from 'react'
import { SettingsContext } from 'src/@core/context/settingsContext'
import Icon from 'src/@core/components/icon'

import PermissionMenu from './PermissionMenu'

const Permissions = ({
    unit,
    indexUnit,
    expanded,
    expandedItem,
    handleChange,
    handleChangeItem,
    control,
    register,
    setValue
}) => {
    const { settings } = useContext(SettingsContext)
    const mode = settings.mode
    return (
        <Accordion
            expanded={expanded === `panel-${indexUnit}`}
            onChange={handleChange(`panel-${indexUnit}`)}
            sx={{
                border: `${mode === 'dark' ? '1px solid #65656E' : '1px solid #C5C6CD'}`,
                boxShadow: 'none'
            }}
        >
            <AccordionSummary
                id='controlled-panel-header-1'
                aria-controls='controlled-panel-content-1'
                expandIcon={<Icon icon='mdi:chevron-down' />}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <Typography>Permissões de Acesso</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {unit.menu &&
                    unit.menu.map((menuGroup, indexMenuGroup) => (
                        <>
                            {/* Divisor */}
                            <Grid container spacing={5} sx={{ my: 2 }}>
                                <Grid item xs={4} md={8}>
                                    <Typography variant='body2'>{menuGroup.nome}</Typography>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                        Ler
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                        Inserir
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                        Editar
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={1}>
                                    <Typography variant='body2' sx={{ textAlign: 'center' }}>
                                        Excluir
                                    </Typography>
                                </Grid>
                            </Grid>
                            {menuGroup.menu &&
                                menuGroup.menu.map((menu, indexMenu) => (
                                    <PermissionMenu
                                        key={indexMenu}
                                        menu={menu}
                                        indexUnit={indexUnit}
                                        indexMenuGroup={indexMenuGroup}
                                        expandedItem={expandedItem}
                                        handleChangeItem={handleChangeItem}
                                        indexMenu={indexMenu}
                                        register={register}
                                        setValue={setValue}
                                    />
                                ))}
                        </>
                    ))}
            </AccordionDetails>
        </Accordion>
    )
}

export default Permissions

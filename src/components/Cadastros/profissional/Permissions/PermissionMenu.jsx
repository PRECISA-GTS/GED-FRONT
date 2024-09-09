import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'
import PermissionSubmenu from './PermissionSubmenu'
import Check from 'src/components/Form/Check'

const PermissionMenu = ({ form, menu, indexMenuGroup, indexMenu, expandedItem, handleChangeItem }) => {
    return menu.rota ? (
        <>
            {/* Menu com rota => seleciona permissões */}
            <Grid container spacing={5} sx={{ my: 2 }}>
                {/* Menu título */}
                <Grid item xs={4} md={8}>
                    <Typography variant='subtitle1'>{menu.nome}</Typography>
                </Grid>

                {/* Hidden rota */}
                <input
                    type='hidden'
                    value={menu.rota}
                    name={`menu[${indexMenuGroup}].menu[${indexMenu}].rota`}
                    {...form.register(`menu[${indexMenuGroup}].menu[${indexMenu}].rota`)}
                />

                {/* Ler */}
                <Check
                    xs={2}
                    md={1}
                    name={`menu[${indexMenuGroup}].menu[${indexMenu}].ler`}
                    value={menu.ler}
                    form={form}
                    edit={`menu[${indexMenuGroup}].menu[${indexMenu}].edit`}
                />

                {/* Inserir */}
                <Check
                    xs={2}
                    md={1}
                    name={`menu[${indexMenuGroup}].menu[${indexMenu}].inserir`}
                    value={menu.inserir}
                    form={form}
                    edit={`menu[${indexMenuGroup}].menu[${indexMenu}].edit`}
                />

                {/* Editar */}
                <Check
                    xs={2}
                    md={1}
                    name={`menu[${indexMenuGroup}].menu[${indexMenu}].editar`}
                    value={menu.editar}
                    form={form}
                    edit={`menu[${indexMenuGroup}].menu[${indexMenu}].edit`}
                />

                {/* Excluir */}
                <Check
                    xs={2}
                    md={1}
                    name={`menu[${indexMenuGroup}].menu[${indexMenu}].excluir`}
                    value={menu.excluir}
                    form={form}
                    edit={`menu[${indexMenuGroup}].menu[${indexMenu}].edit`}
                />
            </Grid>
        </>
    ) : (
        <>
            {/* Menu sem rota => accordion pra abrir submenu */}
            <Accordion
                expanded={expandedItem === `item-${indexMenuGroup}-${indexMenu}`}
                onChange={handleChangeItem(`item-${indexMenuGroup}-${indexMenu}`)}
                sx={{
                    border: '1px solid #e0e0e0',
                    boxShadow: 'none'
                }}
            >
                <AccordionSummary
                    id='controlled-panel-header-1'
                    aria-controls='controlled-panel-content-1'
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Typography>{menu.nome}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {menu.submenu &&
                        menu.submenu.map((submenu, indexSubmenu) => (
                            <PermissionSubmenu
                                form={form}
                                key={indexSubmenu}
                                submenu={submenu}
                                indexMenuGroup={indexMenuGroup}
                                indexMenu={indexMenu}
                                indexSubmenu={indexSubmenu}
                            />
                        ))}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default PermissionMenu

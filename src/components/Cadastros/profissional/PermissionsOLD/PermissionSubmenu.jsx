import { Grid, Typography } from '@mui/material'
import Check from 'src/components/Form/Check'

const PermissionSubmenu = ({ submenu, indexUnit, indexMenuGroup, indexMenu, indexSubmenu, register, setValue }) => {
    return (
        <Grid
            container
            spacing={5}
            sx={{
                my: 2
            }}
        >
            {/* Submenu título */}
            <Grid item xs={4} md={8}>
                <Typography variant='subtitle1'>{submenu.nome}</Typography>
            </Grid>

            {/* Hidden rota */}
            <input
                type='hidden'
                value={submenu.rota}
                name={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].rota`}
                {...register(
                    `units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].rota`
                )}
            />

            {/* Ler */}
            <Check
                xs={2}
                md={1}
                name={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].ler`}
                value={submenu.ler}
                register={register}
                setValue={setValue}
                edit={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].edit`}
            />

            {/* Inserir */}
            <Check
                xs={2}
                md={1}
                name={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].inserir`}
                value={submenu.inserir}
                register={register}
                setValue={setValue}
                edit={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].edit`}
            />

            {/* Editar */}
            <Check
                xs={2}
                md={1}
                name={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].editar`}
                value={submenu.editar}
                register={register}
                setValue={setValue}
                edit={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].edit`}
            />

            {/* Excluir */}
            <Check
                xs={2}
                md={1}
                name={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].excluir`}
                value={submenu.excluir}
                register={register}
                setValue={setValue}
                edit={`units[${indexUnit}].menu[${indexMenuGroup}].menu[${indexMenu}].submenu[${indexSubmenu}].edit`}
            />
        </Grid>
    )
}

export default PermissionSubmenu

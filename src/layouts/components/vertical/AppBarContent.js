// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { AuthContext } from 'src/context/AuthContext'
import { NotificationContext } from 'src/context/NotificationContext'
import { useContext, useState } from 'react'

import { toast } from 'react-hot-toast'

// ** Next Import
import { useRouter } from 'next/router'


// ** Components
import Autocomplete from 'src/layouts/components/vertical/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import FormHeader from 'src/components/Defaults/FormHeader'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Button, Snackbar, Typography } from '@mui/material'
import DialogSelectUnit from 'src/components/Defaults/Dialogs/DialogSelectUnit'

const AppBarContent = props => {
    // ** Props
    const { hidden, settings, saveSettings, toggleNavVisibility } = props
    const { title } = useContext(ParametersContext)
    const { id, setId } = useContext(RouteContext)
    const { notifications } = useContext(NotificationContext)

    const { user, setLoggedUnity, loggedUnity, unitsUser, getRoutes, getMenu } = useContext(AuthContext)

    // ** Hooks
    const router = useRouter()

    // Controla troca de unidade
    const [openModal, setOpenModal] = useState(false);
    const [unity, setSelectedUnit] = useState(null);
    const handleCloseModalSelectUnits = () => setOpenModal(false);

    // Troca de unidade
    const handleConfirmUnity = () => {
        // Atualizar contexto e localStorage
        setLoggedUnity(unity)
        localStorage.setItem('loggedUnity', JSON.stringify(unity))

        getMenu(unity?.papelID)

        // Recebe usuário e unidade e seta rotas de acordo com o perfil
        getRoutes(user.usuarioID, unity?.unidadeID, user.admin, unity?.papelID)

        setOpenModal(false)
        router.replace('/home')
        toast.success('Unidade alterada com sucesso!')
    }

    return (
        <>
            {/* App Bar Content */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className='w-full mx-4 py-1 '>
                <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    {hidden && !settings.navHidden ? (
                        <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
                            <Icon icon='mdi:menu' />
                        </IconButton>
                    ) : null}
                    <Autocomplete hidden={hidden} settings={settings} />
                </Box>
                <Box className='app-title' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ fontWeight: 700 }} >{title.title}</Typography>
                    <Typography variant='caption'>
                        {title.subtitle.new ? `Novo` : title.subtitle.id ? `ID: ${title.subtitle.id}` : title.subtitle.count ? `Total de registros: ${title.subtitle.count}` : ``}
                    </Typography>
                    {/* todo migalhas de pão */}
                    {/* <BreadcrumbsBasic /> */}
                </Box>
                <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
                    <div className='hidden sm:block'>
                        {
                            unitsUser && unitsUser.length > 1 ? (
                                <Button
                                    color="secondary"
                                    endIcon={<Icon icon='material-symbols:keyboard-arrow-down-rounded' />}
                                    onClick={() => setOpenModal(true)}
                                    style={{ textTransform: 'none' }}>
                                    {loggedUnity?.nomeFantasia}
                                </Button>
                            ) : (
                                <Button
                                    color="secondary"
                                    style={{
                                        textTransform: 'none',
                                        pointerEvents: 'none'
                                    }}>
                                    {`${loggedUnity?.nomeFantasia} - ${user?.nome}`}
                                </Button>
                            )
                        }
                    </div>
                    <div className='hidden sm:block'>
                        <ModeToggler settings={settings} saveSettings={saveSettings} />
                    </div>
                    <div className='hidden sm:block'>
                        <NotificationDropdown settings={settings} notifications={notifications} />
                    </div>

                    <UserDropdown settings={settings} />

                </Box>
            </Box >

            <DialogSelectUnit
                openModal={openModal}
                handleClose={handleCloseModalSelectUnits}
                handleSubmit={handleConfirmUnity}
                unidades={unitsUser}
                setSelectedUnit={setSelectedUnit}
            />
        </>
    )
}

export default AppBarContent
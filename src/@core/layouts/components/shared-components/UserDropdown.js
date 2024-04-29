// ** React Imports
import { useState, Fragment, useContext } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { AuthContext } from 'src/context/AuthContext'
import { RouteContext } from 'src/context/RouteContext'
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth, user } from 'src/hooks/useAuth'
import DialogSelectUnit from 'src/components/Defaults/Dialogs/DialogSelectUnit'
import { toast } from 'react-hot-toast'
import ModeToggler from './ModeToggler'
import NotificationDropdown from './NotificationDropdown'
import { NotificationContext } from 'src/context/NotificationContext'
import DialogNewPasswordProfessional from 'src/components/Defaults/Dialogs/DialogNewPasswordProfessional'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
    // ** Props
    const { user, setLoggedUnity, loggedUnity, unitsUser, getRoutes, getMenu } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null)
    // Controla troca de unidade
    const { saveSettings, settings } = useSettings()
    const mode = settings.mode
    const [unity, setSelectedUnit] = useState(null);
    const { notifications } = useContext(NotificationContext)
    const handleCloseModalSelectUnits = () => setOpenModal(false);
    // mostrar opções da lista
    const [open, setOpen] = useState(false)
    // modal troca de unidade
    const [openModal, setOpenModal] = useState(false);
    // modal nova senha
    const [openModalNewPassword, setOpenModalNewPassword] = useState(false)


    // Troca de unidade
    const handleConfirmUnity = () => {
        // Atualizar contexto e localStorage
        setLoggedUnity(unity)
        localStorage.setItem('loggedUnity', JSON.stringify(unity))

        getMenu(unity?.papelID)

        // Recebe usuário e unidade e seta rotas de acordo com o perfil
        getRoutes(user.usuarioID, unity?.unidadeID, user.admin, unity?.papelID)

        setOpenModal(false)
        handleDropdownClose()
        router.replace('/home')
        toast.success('Unidade alterada com sucesso!')
    }

    // ** States
    const { setId } = useContext(RouteContext)

    // ** Hooks
    const router = useRouter()
    const { logout } = useAuth()

    // ** Vars
    const { direction } = settings

    const handleDropdownOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleDropdownClose = (url) => {
        if (url) {
            router.push(url)
        }
        if (!openModalNewPassword) {
            setAnchorEl(null)
        }
    }

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            mr: 2,
            fontSize: '1.375rem',
            color: 'text.primary'
        }
    }

    const handleLogout = () => {
        logout()
        handleDropdownClose()
        setId(null)
    }

    return (
        <Fragment>
            {
                user && (
                    <>
                        <Badge
                            overlap='circular'
                            onClick={handleDropdownOpen}
                            sx={{ ml: 2, cursor: 'pointer' }}
                            badgeContent={<BadgeContentSpan />}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                        >
                            <Avatar
                                alt={user.nome}
                                onClick={handleDropdownOpen}
                                sx={{ width: 30, height: 30 }}
                                src={user.imagem}
                            />
                        </Badge>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => handleDropdownClose()}
                            sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
                            anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                        >
                            <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Badge
                                        overlap='circular'
                                        badgeContent={<BadgeContentSpan />}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                    >
                                        <Avatar
                                            alt='John Doe'
                                            src={user.imagem}
                                            sx={{ width: '2.5rem', height: '2.5rem' }}
                                        />
                                    </Badge>
                                    <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: 600 }}>{user.nome}</Typography>
                                        <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                            {user.profissao}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Divider sx={{ mt: '0 !important' }} />

                            <MenuItem>
                                <div
                                    className='block sm:hidden -ml-2'
                                    onClick={() => setOpen(!open)}
                                >
                                    <NotificationDropdown settings={settings} notifications={notifications} open={open} />
                                    <span>
                                        Notificações
                                    </span>
                                </div>
                            </MenuItem>

                            <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                                <Box sx={styles}
                                    onClick={() => {
                                        handleDropdownClose(user.papelID === 1 ? `/cadastros/profissional` : `/meus-dados`)
                                        setId(user.papelID === 1 ? user.profissionalID : null)
                                    }}>

                                    <Icon icon='mdi:account-outline' />
                                    Meus Dados
                                </Box>
                            </MenuItem>

                            {/* Alterar senha */}
                            <div className=''>
                                <MenuItem sx={{ p: 0 }} >
                                    <Box sx={styles}
                                        onClick={() => {
                                            setOpenModalNewPassword(true)
                                        }}
                                    >
                                        <Icon icon='uil:padlock' />
                                        Alterar senha
                                    </Box>
                                </MenuItem>
                            </div>

                            {/* Modal trocar senha */}
                            <DialogNewPasswordProfessional
                                openModal={openModalNewPassword}
                                handleClose={() => setOpenModalNewPassword(false)}
                                setOpenModalNewPassword={setOpenModalNewPassword}
                                handleDropdownClose={handleDropdownClose}
                                usuarioID={user.usuarioID}
                            />

                            {/* troca de unidade quando mobile */}
                            {user.papelID === 1 && (
                                <div className='block md:hidden'>

                                    <MenuItem sx={{ p: 0 }} >
                                        <Box sx={styles}
                                            onClick={() => {
                                                setOpenModal(true)
                                            }}
                                        >
                                            <Icon icon='mdi:account-outline' />
                                            Trocar unidade
                                        </Box>
                                    </MenuItem>
                                </div>
                            )}
                            <div className='block md:hidden'>
                                <MenuItem sx={{ p: 0, pl: 2 }} >
                                    <div className="flex items-center" >
                                        <ModeToggler settings={settings} saveSettings={saveSettings} text={true} />
                                    </div>
                                </MenuItem>
                            </div>
                            {/* Modal que abre ao clicar em Trocar unidade */}
                            <DialogSelectUnit
                                openModal={openModal}
                                handleClose={handleCloseModalSelectUnits}
                                handleSubmit={handleConfirmUnity}
                                unidades={unitsUser}
                                setSelectedUnit={setSelectedUnit}
                            />
                            <MenuItem
                                onClick={handleLogout}
                                sx={{ p: 0 }}
                            >
                                <Box sx={styles}
                                    onClick={() => {
                                        setOpenModalNewPassword(true)
                                    }}
                                >
                                    <Icon icon='mdi:logout-variant' />
                                    Sair
                                </Box>
                            </MenuItem>

                        </Menu>
                    </>
                )
            }
        </Fragment >
    )
}

export default UserDropdown

import { useState, Fragment, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import CustomChip from 'src/@core/components/mui/chip'
import { Checkbox, FormControlLabel } from '@mui/material'
import { RouteContext } from 'src/context/RouteContext'
import { NotificationContext } from 'src/context/NotificationContext'
import { AuthContext } from 'src/context/AuthContext'
import Router from 'next/router'
import { api } from 'src/configs/api'
import toast from 'react-hot-toast'
import { Howl } from 'howler';

const Menu = styled(MuiMenu)(({ theme }) => ({
    '& .MuiMenu-paper': {
        width: 380,
        overflow: 'hidden',
        marginTop: theme.spacing(4),
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    '& .MuiMenu-list': {
        padding: 0
    }
}))


const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
    }
}))


const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    maxHeight: 344
})


const MenuItemTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    flex: '1 1 100%',
    overflow: 'hidden',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: theme.spacing(0.75)
}))

const MenuItemSubtitle = styled(Typography)({
    flex: '1 1 100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }) => {
    if (hidden) {
        return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
        return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
    }
}

const NotificationDropdown = props => {
    const [notifications, setNotifications] = useState([]);
    const { settings, open } = props
    const [anchorEl, setAnchorEl] = useState(null)
    const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
    const [notificationsRead, setNotificationsRead] = useState([])
    const { setId } = useContext(RouteContext)
    const { user, loggedUnity } = useContext(AuthContext)
    const router = Router

    const { direction } = settings
    const handleDropdownOpen = event => {
        setAnchorEl(event?.currentTarget)
    }

    // Faz update das notificação, seta como lida
    const notificationUpdate = async (data) => {
        try {
            const response = await api.put("notificacao/updateData", data);
            const message = notificationsRead.length == 0 ? 'Notificação lida com sucesso!' : 'Notificações lidas com sucesso!'
            getDataNotification()
            toast.success(message)
            setNotificationsRead([])
        } catch (error) {
            console.error("Error fetching notification data:", error);
        }
    }

    // Seta no estado o id das notificações selecionadas
    const handleChangeNotification = async (notification, isChecked) => {
        if (isChecked) {
            setNotificationsRead(prevState => [...prevState, notification.notificacaoID]);
        } else {
            setNotificationsRead(prevState =>
                prevState.filter(id => id !== notification.notificacaoID)
            );
        }
    };

    // Fecha modal de notificações e chama funções
    const handleDropdownClose = async (notification) => {
        // localStorage.setItem('unreadNotifications', notification.length);
        setAnchorEl(null)
        const data = [notification.notificacaoID]
        // Verifica se notifição clicada tem url
        if (notification && notification.url && notificationsRead.length == 0) {
            notificationUpdate(data)
            setId(notification.urlID ?? null)
            router.push(notification.url)
        }
        if (notificationsRead.length > 0) {
            notificationUpdate(notificationsRead)
        }
    }

    // Gera o som de notificação
    const playNotificationSound = () => {
        const sound = new Howl({
            src: ['/sounds/message.mp3'],
            volume: 1,
        });
        sound.play();
    };

    // Verifica se o length do localStorage é igual do response.data se diferente ou maior gera o som de notificação
    const verifyNewNotification = (data) => {
        const unreadNotifications = localStorage.getItem('unreadNotifications');
        if (unreadNotifications != data.length && data.length > unreadNotifications) {
            playNotificationSound()
        }
        setTimeout(() => {
            setNotifications(data)
            localStorage.setItem('unreadNotifications', data.length);
        }, 2500);
    }

    // Busca as notificações do banco de dados
    const getDataNotification = async () => {
        if (user && loggedUnity) {
            const data = {
                unidadeID: loggedUnity.unidadeID,
                usuarioID: user.usuarioID
            }
            try {
                const response = await api.post("notificacao/getData", data);
                verifyNewNotification(response.data);
            } catch (error) {
                console.error("Erro ao atualizar notificações:", error);
            }
        }
    };

    // Chama a função getDataNotification a cada 5 segundos para verificar se tem novas notificações
    useEffect(() => {
        getDataNotification();
        const intervalId = setInterval(() => {
            getDataNotification();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Fragment>
            <IconButton color='inherit' aria-haspopup='true' aria-controls='customized-menu' onClick={handleDropdownOpen} className='relative'>
                <Badge
                >
                    {
                        notifications && notifications.length > 0 && (
                            <div className='absolute right-[10px] top-1'>
                                <span class="relative flex justify-center items-center h-3 w-3 -top-1 -right-[10px]">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full h-[9px] w-[9px] bg-red-500"></span>
                                </span>
                            </div>
                        )
                    }
                    <Icon icon='mdi:bell-outline' />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
            >
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Notificaçõesss</Typography>
                        <CustomChip
                            skin='light'
                            size='small'
                            color='primary'
                            label={`${notifications?.length} novas`}
                            sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
                        />
                    </Box>
                </MenuItem>
                <ScrollWrapper hidden={hidden}>
                    {notifications?.map((notification, index) => (

                        <MenuItem key={index} sx={{ position: 'relative' }}>

                            <Box sx={{ width: '95%', display: 'flex', alignItems: 'center' }} onClick={() => { notification.url ? handleDropdownClose(notification) : null }}>

                                <Icon icon={notification.icone} style={{ color: notification.cor }} fontSize={24} />

                                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>

                                    <MenuItemTitle>{notification.titulo}</MenuItemTitle>
                                    <MenuItemSubtitle variant='body2'>{notification.descricao}</MenuItemSubtitle>

                                    <div className='flex items-center gap-2'>
                                        <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                                            {notification.dataFormatada}
                                        </Typography>
                                        {
                                            notification.url && (
                                                <CustomChip
                                                    skin='light'
                                                    size='small'
                                                    color='primary'
                                                    label={
                                                        <div className="flex items-center gap-1">
                                                            <Icon icon='ci:external-link' fontSize={14} style={{ color: '#4a8b57' }} />
                                                            <Typography variant='caption' color='primary' >Acessar</Typography>
                                                        </div>
                                                    }
                                                    sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
                                                />
                                            )
                                        }
                                    </div>
                                </Box>
                            </Box>
                            <Box sx={{ position: 'absolute', right: '-8px', display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontSize: '10px', opacity: '.6' }} >
                                    Ler
                                </Typography>
                                <FormControlLabel
                                    control={<Checkbox name='color-secondary' color='primary' size='small' onChange={e => handleChangeNotification(notification, e.target.checked)} />}
                                />
                            </Box>

                        </MenuItem>
                    ))}
                </ScrollWrapper>
                <MenuItem
                    disableRipple
                    disableTouchRipple
                    sx={{
                        py: 3.5,
                        borderBottom: 0,
                        cursor: 'default',
                        userSelect: 'auto',
                        backgroundColor: 'transparent !important',
                        borderTop: theme => `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Button fullWidth variant='contained' onClick={handleDropdownClose}>
                        NOTIFICAÇÕES
                    </Button>
                </MenuItem>
            </Menu>
        </Fragment >
    )
}

export default NotificationDropdown

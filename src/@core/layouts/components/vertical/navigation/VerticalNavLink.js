// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import { styled, useTheme } from '@mui/material/styles'
import ListItemButton from '@mui/material/ListItemButton'

import { RouteContext } from 'src/context/RouteContext'

// ** Configs Import
import themeConfig from 'src/configs/themeConfig'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'

// ** Util Import
import { handleURLQueries } from 'src/@core/layouts/utils'
import { useContext } from 'react'

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ mode, theme }) => ({
    width: '100%',
    borderRadius: 8,
    transition: 'padding-left .25s ease-in-out',
    '&.active': {
        '&, &:hover': {
            backgroundColor: mode === 'light' ? '#cde9e2' : '#123230',
            '&.Mui-focusVisible': {
                backgroundColor: '#F00',
            }
        },
        '& .MuiTypography-root': {
            fontWeight: 400,
            color: `${theme.palette.primary.main}`
        },
        '& .MuiListItemIcon-root': {
            color: `${theme.palette.primary.main}`,
            fontWeight: 400
        }
    }
}))

const MenuItemTextMetaWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
})

const VerticalNavLink = ({
    item,
    parent,
    navHover,
    settings,
    navVisible,
    isSubToSub,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth
}) => {

    //* ID do contexto
    const { setId } = useContext(RouteContext)

    // ** Hooks
    const theme = useTheme()
    const router = useRouter()

    // ** Vars
    const { mode, navCollapsed } = settings
    const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon

    const conditionalIconColor = () => {
        if (mode === 'semi-dark') {
            return {
                color: `rgba(${theme.palette.customColors.dark}, ${parent ? 0.6 : 0.87})`
            }
        } else
            return {
                color: parent ? 'text.secondary' : 'text.primary'
            }
    }

    const conditionalBgColor = () => {
        if (mode === 'semi-dark') {
            return {
                '&:hover': {
                    backgroundColor: `rgba(${theme.palette.primary.bg}, 0.05)`
                }
            }
        } else return {}
    }

    const isNavLinkActive = () => {
        if (router.pathname === item.path || handleURLQueries(router, item.path)) {
            return true
        } else {
            return false
        }
    }

    return (
        <CanViewNavLink navLink={item}>
            <ListItem
                disablePadding
                className='nav-link'
                disabled={item.disabled || false}
                sx={{
                    mt: 1.5,
                    transition: 'padding .25s ease-in-out',
                    px: parent ? '0 !important' : `${theme.spacing(navCollapsed && !navHover ? 2 : 3)} !important`
                }}
            >
                <MenuNavLink
                    mode={mode}
                    component={Link}
                    {...(item.disabled && { tabIndex: -1 })}
                    className={isNavLinkActive() ? 'active' : ''}
                    href={item.path === undefined ? '/' : `${item.path}`}
                    {...(item.openInNewTab ? { target: '_blank' } : null)}
                    onClick={e => {
                        if (item.path === undefined) {
                            e.preventDefault()
                            e.stopPropagation()
                        }
                        if (navVisible) {
                            toggleNavVisibility()
                        }
                        //* Limpa ID do contexto
                        setId(null)
                    }}
                    sx={{
                        py: 3.4,
                        gap: 2,
                        ...conditionalBgColor(),
                        ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
                        pr: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 3,
                        pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 4,
                    }}
                >
                    {isSubToSub ? null : (
                        <ListItemIcon
                            sx={{
                                ...conditionalIconColor(),
                                transition: 'margin .25s ease-in-out',
                                ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
                                ...(parent ? { ml: 2, mr: 4 } : {}),
                                '& svg': {
                                    ...(!parent ? { fontSize: '1.6rem' } : { fontSize: '1rem' }),
                                    ...(parent && item.icon ? { fontSize: '1.3rem' } : {})
                                }
                            }}
                        >
                            <UserIcon icon={icon} />
                        </ListItemIcon>
                    )}

                    <MenuItemTextMetaWrapper
                        sx={{
                            ...(isSubToSub ? { ml: 8 } : {}),
                            ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
                        }}
                    >
                        <Typography
                            {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                                noWrap: true
                            })}
                            sx={{ fontWeight: 400 }}
                        >
                            <Translations text={item.title} />
                        </Typography>
                        {item.badgeContent ? (
                            <Chip
                                size='small'
                                label={item.badgeContent}
                                color={item.badgeColor || 'primary'}
                                sx={{ ml: 1.5, '& .MuiChip-label': { px: 2.5, lineHeight: 1.385, textTransform: 'capitalize' } }}
                            />
                        ) : null}
                    </MenuItemTextMetaWrapper>
                </MenuNavLink>
            </ListItem>
        </CanViewNavLink>
    )
}

export default VerticalNavLink

import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import Layout from 'src/@core/layouts/Layout'

// ** Navigation Imports
import VerticalNavItems from 'src/components/DynamicMenu'
import HorizontalNavItems from 'src/navigation/horizontal'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'
import { AuthContext } from 'src/context/AuthContext'
import { useContext } from 'react'
import { Alert, Button, Snackbar } from '@mui/material'

const UserLayout = ({ children, contentHeightFixed }) => {

  // ** Hooks
  const { settings, saveSettings } = useSettings()
  const { newVersionAvailable, setNewVersionAvailable, setOpenModalUpdate, openModalUpdate, latestVersionState, setLatestVersionState } = useContext(AuthContext)

  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  //! Atualiza a versão do sistema, da reload na página e salva no localStorage
  const ClickUpdateAcept = () => {
    localStorage.setItem('latestVersion', newVersionAvailable.version)
    setNewVersionAvailable({ status: false, version: '' })
    setLatestVersionState(newVersionAvailable.version)
    window.location.reload()
  }

  //! Fecha modal de atualização
  const handleClose = () => {
    setOpenModalUpdate(false)
  };

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()
          },
          appBar: {
            content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}
      {
        //! Mostra se tiver uma nova versão do sistema
      }
      {

        <Snackbar
          open={openModalUpdate}
          onClose={handleClose}
          autoHideDuration={null}
        >
          <Alert
            sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#303033' }}
            elevation={3}
            variant='filled'
            onClose={handleClose}
          >
            Nova versão disponível, deseja atualizar para {newVersionAvailable.version} ?
            <Button color="primary" variant='contained' size="small" onClick={ClickUpdateAcept} sx={{ ml: 4 }}>
              Atualizar
            </Button>
          </Alert>
        </Snackbar>

      }
    </Layout>
  )
}

export default UserLayout

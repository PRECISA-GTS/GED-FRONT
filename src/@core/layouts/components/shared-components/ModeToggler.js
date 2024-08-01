// ** MUI Imports
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const ModeToggler = props => {
  // ** Props
  const { settings, saveSettings, text } = props

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode: mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Icon icon={settings.mode === 'dark' ? 'line-md:moon-to-sunny-outline-loop-transition' : 'line-md:sunny-outline-to-moon-loop-transition'} />
      {
        text && (
          <p className='text-base pl-2'>{settings.mode === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</p>
        )
      }
    </IconButton>
  )
}

export default ModeToggler

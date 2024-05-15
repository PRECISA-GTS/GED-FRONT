Pegar temas e cores do sistema

import { useTheme } from '@mui/material/styles'
const theme = useTheme()

exemplos de uso:

1- hover:
sx={{"&:hover": {backgroundColor: theme.palette.action.hover}}}

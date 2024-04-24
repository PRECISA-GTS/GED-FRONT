import { Box, Typography } from '@mui/material'

const FormFornecedorConclusion = ({ values }) => {
    console.log('🚀 ~ FormFornecedorConclusion values:', values)

    return (
        <Box display='flex' flexDirection='column' sx={{ gap: 4 }}>
            <Typography variant='body2'>
                <strong>E-mail enviado para: </strong> {values?.email}
            </Typography>
            <Typography variant='body2'>
                <strong>Link do formulário: </strong> {values?.link}
            </Typography>
        </Box>
    )
}

export default FormFornecedorConclusion

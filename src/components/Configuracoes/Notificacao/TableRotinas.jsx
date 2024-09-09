import {
    Card,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Checkbox,
    Box,
    CardContent,
    Typography
} from '@mui/material'
import Check from 'src/components/Form/Check'

const TableRotinas = ({ category, values, form }) => {
    return (
        <TableContainer>
            <Table sx={{ minWidth: 500 }}>
                <TableHead
                    sx={{
                        backgroundColor: theme => (theme.palette.mode === 'light' ? 'grey.50' : 'background.default')
                    }}
                >
                    <TableRow>
                        <TableCell sx={{ py: 3, width: '60%' }}>Rotina</TableCell>
                        <TableCell sx={{ py: 3 }} align='center'>
                            E-mail
                        </TableCell>
                        <TableCell sx={{ py: 3 }} align='center'>
                            Alerta
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {values &&
                        values.map((item, index) => (
                            <TableRow key={index} hover>
                                <TableCell>{item.nome}</TableCell>
                                <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Check
                                        xs={1}
                                        md={1}
                                        name={`[${category}].rotinas.[${index}].email`}
                                        value={item.email}
                                        form={form}
                                    />
                                </TableCell>
                                <TableCell align='center' sx={{ pt: '0 !important', pb: '0 !important' }}>
                                    <Check
                                        xs={1}
                                        md={1}
                                        name={`[${category}].rotinas.[${index}].alerta`}
                                        value={item.alerta}
                                        form={form}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableRotinas

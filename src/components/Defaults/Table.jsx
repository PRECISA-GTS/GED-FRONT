import { Card, CardContent } from '@mui/material'
import TableFilter from 'src/views/table/data-grid/TableFilter'

const Table = ({ result, columns, btnNew = true, btnPrint = true, btnBack, openModal, modalLog }) => {
    return (
        <Card>
            <CardContent sx={{ pt: '0' }}>
                <TableFilter
                    rows={result}
                    columns={columns}
                    modalLog={modalLog}
                    buttonsHeader={{
                        btnNew: btnNew,
                        btnPrint: btnPrint,
                        btnBack: btnBack,
                        openModal: openModal
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default Table

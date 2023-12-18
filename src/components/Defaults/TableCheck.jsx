import { Card, CardContent } from '@mui/material'
import TableFilterCheck from 'src/views/table/data-grid/TableFilterCheck'
// import TableSelection from 'src/views/table/data-grid/TableSelection'

const TableCheck = ({
    result,
    columns,
    btnNew = true,
    btnPrint = true,
    btnSave = true,
    handleSave,
    selectedRows,
    setSelectedRows,
    hasChange,
    setHasChange,
    openModal
}) => {
    return (
        <Card>
            <CardContent sx={{ pt: '0' }}>
                <TableFilterCheck
                    rows={result}
                    columns={columns}
                    buttonsHeader={{
                        btnNew: btnNew,
                        btnPrint: btnPrint,
                        btnSave: btnSave,
                        handleSave: handleSave,
                        openModal: openModal
                    }}
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    hasChange={hasChange}
                    setHasChange={setHasChange}
                />
            </CardContent>
        </Card>
    )
}

export default TableCheck

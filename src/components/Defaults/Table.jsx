import { Card, CardContent } from '@mui/material'
import TableFilter from 'src/views/table/data-grid/TableFilter'

const Table = ({
    result,
    columns,
    btnNew = true,
    btnPrint = true,
    btnBack,
    openModal,
    modalLog,
    btnNewModal,
    handleNewModal,
    status,
    setStatus
}) => {
    return (
        <Card className='h-full'>
            <CardContent sx={{ pt: '0', height: '100%' }}>
                <TableFilter
                    rows={result}
                    columns={columns}
                    modalLog={modalLog}
                    buttonsHeader={{
                        btnNew: btnNew,
                        btnPrint: btnPrint,
                        btnBack: btnBack,
                        openModal: openModal,

                        btnNewModal: btnNewModal,
                        handleNewModal: handleNewModal,

                        status: status,
                        setStatus: setStatus
                    }}
                />
            </CardContent>
        </Card>
    )
}

export default Table

import { useContext, useState } from 'react';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar';
import { RouteContext } from 'src/context/RouteContext';
import DialogLog from 'src/components/Defaults/Dialogs/DialogLog';
import { useFilter } from 'src/context/FilterContext';

const TableFilter = ({ rows, columns, buttonsHeader, modalLog }) => {
    const {
        handleSearch,
        pageSize,
        setPageSize,
        searchText,
        filteredData,
        setData,
        data,
    } = useFilter()

    const { setId } = useContext(RouteContext);
    const [rowSelected, setRowSelected] = useState(null)
    const [openModalLog, setOpenModalLog] = useState(false)
    setData(rows);


    // ordena as linhas, do status inativo ficam por ultimo
    const sortedData = data.slice().sort((a, b) => {
        if (a.status === 'Inativo' && b.status !== 'Inativo') {
            return 1;
        } else if (a.status !== 'Inativo' && b.status === 'Inativo') {
            return -1;
        }
        return 0;
    });

    // Função para converter a data do formato 'dd/mm/YYYY' para 'YYYY-MM-DD'
    function formatDateForComparison(date) {
        const parts = date.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    //? Varre array columns, verificando se existe type date, se sim, formata data com formatDateForComparison
    columns.map((column) => {
        if (column.type === 'date') {
            column.sortComparator = (v1, v2) => {
                const date1 = formatDateForComparison(v1);
                const date2 = formatDateForComparison(v2);
                return date1.localeCompare(date2);
            };
        }
    });

    // Função ativada ao clicar na linha
    const handleClickRow = (row) => {
        if (modalLog) {
            setRowSelected(row)
            setOpenModalLog(true)
        } else {
            setId(row.id);
        }
    };

    return (
        <>
            <DataGrid
                localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                autoHeight
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
                components={{ Toolbar: QuickSearchToolbar }}
                rows={searchText ? filteredData : sortedData}
                onCellClick={(params, event) => {
                    handleClickRow(params.row)
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                sx={{
                    '& .MuiDataGrid-cell': { cursor: 'pointer', overflow: 'scroll' }
                }}
                componentsProps={{
                    toolbar: {
                        buttonsHeader: buttonsHeader,
                    }
                }}
            />
            {/* Modal que abre com informações do log */}
            <DialogLog
                open={openModalLog}
                handleClose={() => setOpenModalLog(false)}
                row={rowSelected}
            />
        </>
    );
};

export default TableFilter;

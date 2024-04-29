import { useContext, useEffect, useState } from 'react'
import { DataGrid, ptBR } from '@mui/x-data-grid'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { ParametersContext } from 'src/context/ParametersContext'
import { RouteContext } from 'src/context/RouteContext'
import { useFilter } from 'src/context/FilterContext'

const TableFilterCheck = ({ rows, columns, buttonsHeader, selectedRows, setSelectedRows, hasChange, setHasChange }) => {
    const {
        handleSearch,
        pageSize,
        setPageSize,
        searchText,
        filteredData,
        setData,
        data
    } = useFilter()


    // ** States
    setData(rows)

    return (
        <DataGrid
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            checkboxSelection
            autoHeight
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
            components={{ Toolbar: QuickSearchToolbar }}
            rows={searchText ? filteredData : data}
            onCellClick={(params, event) => {
                setSelectedRows(prevSelectedRows => {
                    if (prevSelectedRows.indexOf(params.id) === -1) {
                        return [...prevSelectedRows, params.id];
                    }
                    return prevSelectedRows.filter(id => id !== params.id);
                });
                setHasChange(true);
            }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}

            //* Tratando itens selecionados
            selectionModel={selectedRows}
            onSelectionModelChange={(newSelectionModel) => {
                setSelectedRows(newSelectionModel);
                setHasChange(true);
            }}

            sx={{
                '& .MuiDataGrid-cell': { cursor: 'pointer', overflow: 'scroll' }
            }}
            componentsProps={{
                toolbar: {
                    value: searchText,
                    clearSearch: () => handleSearch(''),
                    onChange: event => handleSearch(event.target.value),
                    buttonsHeader: buttonsHeader,
                    hasChange: hasChange,
                }
            }}
        />
    )
}

export default TableFilterCheck

import { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { NoContent } from "./.."

interface IProps {
    columns: GridColDef[],
    rows: object[]
}

const Table: FC<IProps> = ({ columns, rows }) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                components={{
                    NoRowsOverlay: NoContent,
                }}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
};

export default Table;
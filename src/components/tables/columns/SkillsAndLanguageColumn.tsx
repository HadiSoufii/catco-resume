import { GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

import { RemovalModal } from "../../windows";
import { ISkillsAndLanguageColumn } from '../../../interfaces';

const SkillsAndLanguageColumn = (fields: ISkillsAndLanguageColumn, handleDelete: (id: number) => Promise<void>):
    GridColDef<any, any, any>[] => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'آیدی شناسایی', width: 100, align: "center" },
        {
            field: fields.field1, headerName: fields.headerNameField1, width: 200, headerAlign: "center", align: "center"
        },
        { field: fields.field2, headerName: fields.headerNameField2, width: 200, headerAlign: "center", align: "center" },
        {
            field: 'action',
            headerName: 'دستورات',
            width: 300,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Box>
                        <Button variant='outlined' color='info' sx={{ mx: 1 }}>
                            <Link to={`${fields.linkEdit}${params.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                ویرایش
                            </Link>
                        </Button>
                        <RemovalModal id={params.row.id} titleModal={params.row[fields.field1]}
                            descriptionModal={`آیا از حذف ${params.row[fields.field1]} مطمئن هستید ؟`}
                            handleDelete={handleDelete}
                        />
                    </Box>
                );
            },
        },
    ];

    return columns;
};

export default SkillsAndLanguageColumn;
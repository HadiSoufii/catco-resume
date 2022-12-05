import { GridColDef } from '@mui/x-data-grid';
import { Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import jMoment from "moment-jalaali";

import { RemovalModal } from "../../windows";
import { IAchievementsColumn } from '../../../interfaces';

const AchievementsColumn = (fields: IAchievementsColumn, handleDelete: (id: number) => Promise<void>):
    GridColDef<any, any, any>[] => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'آیدی شناسایی', width: 100, align: "center" },
        { field: fields.field1, headerName: fields.headerNameField1, width: 200, headerAlign: "center", align: "center" },
        { field: fields.field2, headerName: fields.headerNameField2, width: 200, headerAlign: "center", align: "center" },
        {
            field: 'startDate', headerName: fields.headerNameFieldStartDate, width: 200, headerAlign: "center", align: "center",
            renderCell: (params) => {
                return (
                    <>
                        {
                            <Typography>{jMoment(params.row.startDate).format('dddd jD jMMMM jYYYY')}</Typography>
                        }
                    </>
                )
            }
        },
        {
            field: 'endDate', headerName: fields.headerNameFieldEndDate, width: 200, headerAlign: "center", align: "center",
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.endDate ? <Typography>{jMoment(params.row.endDate).format('dddd jD jMMMM jYYYY')}</Typography> :
                                <Typography>{fields.messageEndDate}</Typography>
                        }
                    </>
                )
            }
        },
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

export default AchievementsColumn;
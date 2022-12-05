import { GridColDef } from '@mui/x-data-grid';
import { Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

import { RemovalModal } from "../../windows";

const UserColumn = (action: boolean, handleDeleteUser?: (userId: number) => Promise<void>):
    GridColDef<any, any, any>[] => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'آیدی شناسایی', width: 100, align: "center" },
        { field: 'fullName', headerName: 'نام و نام خانوادگی', width: 200, headerAlign: "center", align: "center" },
        { field: 'userName', headerName: 'نام کاربری', width: 200, headerAlign: "center", align: "center" },
        {
            field: 'isAdmin', headerName: 'دسترسی مدیریت', width: 200, headerAlign: "center", align: "center",
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.isAdmin ? <Typography>✅</Typography> : <Typography>⛔</Typography>
                        }
                    </>
                )
            }
        },
    ];

    const columnAction: GridColDef = {
        field: 'action',
        headerName: 'دستورات',
        width: 350,
        sortable: false,
        renderCell: (params) => {
            return (
                <Box>
                    <Button variant='outlined' color='info' sx={{ mx: 1 }}>
                        <Link to={`/admin/users/edituser/${params.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            ویرایش
                        </Link>
                    </Button>
                    <Button variant='outlined' color='warning' sx={{ mx: 1 }}>
                        <Link to={`/admin/users/changepassword/${params.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            ویرایش پسورد
                        </Link>
                    </Button>
                    <RemovalModal id={params.row.id} titleModal={params.row.fullName}
                        descriptionModal={`آیا از حذف ${params.row.fullName} مطمئن هستید ؟`}
                        handleDelete={handleDeleteUser || (async (id: number) => { })}
                    />
                </Box>
            );
        },
    }

    if (action) return [...columns, columnAction]

    return columns;
};

export default UserColumn;
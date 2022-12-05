import { GridColDef } from '@mui/x-data-grid';
import { Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";
import jMoment from "moment-jalaali";

import { RemovalModal } from "../../windows";

const ProjectColumn = (handleDeleteProject: (projectId: number) => Promise<void>):
    GridColDef<any, any, any>[] => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'آیدی شناسایی', width: 100, align: "center" },
        { field: 'projectTitle', headerName: 'نام پروژه', width: 200, headerAlign: "center", align: "center" },
        {
            field: 'projectDate', headerName: 'تاریخ شروع پروژه', width: 200, headerAlign: "center", align: "center",
            renderCell: (params) => {
                return (
                    <>
                        {
                            <Typography>{jMoment(params.row.projectDate).format('dddd jD jMMMM jYYYY')}</Typography>
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
                            <Link to={`/admin/resume/projects/editProject/${params.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                ویرایش
                            </Link>
                        </Button>
                        <RemovalModal id={params.row.id} titleModal={params.row["projectTitle"]}
                            descriptionModal={`آیا از حذف ${params.row.projectTitle} مطمئن هستید ؟`}
                            handleDelete={handleDeleteProject}
                        />
                    </Box>
                );
            },
        },
    ];

    return columns;
};

export default ProjectColumn;
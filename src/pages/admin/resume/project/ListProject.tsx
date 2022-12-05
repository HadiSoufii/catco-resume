import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, ProjectColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { IProject } from '../../../../interfaces';
import { projects as projectApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const ListProject = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [projects, setProjects] = useImmer<IProject[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { data, status } = await projectApi.getAllProjectByUserId(userId);
                if (data && status === 200 && data.length > 0)
                    setProjects(data);

                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                setLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleDeleteProject = async (projectId: number) => {
        const projectsBackup = [...projects];
        try {
            setProjects(() => projects.filter((p) => p.id !== projectId));
            const { status } = await projectApi.deleteProject(projectId);
            toast.success("پروژه با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setProjects(projectsBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setProjects(projectsBackup);
        }
    }

    return (
        <>
            <Helmet>
                <title>پروژه ها</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/projects/addProject" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد نمونه کار
                            </Link>
                        </Button>
                        <Table columns={ProjectColumn(handleDeleteProject)} rows={projects} />
                    </>
                )
            }
        </>
    );
};

export default ListProject;
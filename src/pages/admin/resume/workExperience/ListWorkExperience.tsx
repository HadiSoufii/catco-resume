import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, AchievementsColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { IAchievementsColumn, IWorkExperience } from '../../../../interfaces';
import { workExperiences as workExperienceApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const ListWorkExperience = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [workExperiences, setWorkExperiences] = useImmer<IWorkExperience[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { data, status } = await workExperienceApi.getAllWorkExperienceByUserId(userId);
                if (data && status === 200 && data.length > 0) {
                    setWorkExperiences(data);
                }
                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                setLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleDeleteWorkExperience = async (workExperienceId: number) => {
        const workExperiencesBackup = [...workExperiences];
        try {
            setWorkExperiences(() => workExperiences.filter((w) => w.id !== workExperienceId));
            const { status } = await workExperienceApi.deleteWorkExperience(workExperienceId);
            toast.success("سابقه شغلی با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setWorkExperiences(workExperiencesBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setWorkExperiences(workExperiencesBackup);
        }
    }

    const propColumns: IAchievementsColumn = {
        field1: 'jobTitle',
        headerNameField1: 'عنوان شغل',
        field2: 'companyName',
        headerNameField2: 'نام شرکت',
        headerNameFieldStartDate: 'تاریخ شروع کار',
        headerNameFieldEndDate: 'تاریخ پایان کار',
        messageEndDate: 'هنوز مشغول به کار هستم',
        linkEdit: '/admin/resume/workExperiences/editWorkExperience/',
    }

    return (
        <>
            <Helmet>
                <title>سوابق کاری</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/workExperiences/addWorkExperience" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد سابقه کاری
                            </Link>
                        </Button>
                        <Table columns={AchievementsColumn(propColumns, handleDeleteWorkExperience)} rows={workExperiences} />
                    </>
                )
            }
        </>
    );
};

export default ListWorkExperience;
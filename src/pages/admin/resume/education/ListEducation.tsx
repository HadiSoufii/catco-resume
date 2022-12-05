import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, AchievementsColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { IAchievementsColumn, IEducation } from '../../../../interfaces';
import { educations as educationApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const ListEducation = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [educations, setEducations] = useImmer<IEducation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return;
                }

                const { data, status } = await educationApi.getAllEducationByUserId(userId);
                if (data && status === 200 && data.length > 0) {
                    setEducations(data);
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

    const handleDeleteEducation = async (educationId: number) => {
        const educationsBackup = [...educations];
        try {
            setEducations(() => educations.filter((e) => e.id !== educationId));
            const { status } = await educationApi.deleteEducation(educationId);
            toast.success("مدرک با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setEducations(educationsBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setEducations(educationsBackup);
        }
    }

    const propColumns: IAchievementsColumn = {
        field1: 'educationTitle',
        headerNameField1: 'عنوان رشته تحصیلی',
        field2: 'nameOfInstitution',
        headerNameField2: 'نام محل تحصیل',
        headerNameFieldStartDate: 'سال شروع تحصیلی',
        headerNameFieldEndDate: 'سال فارغ التحصیلی',
        messageEndDate: 'هنوز در حال تحصیل هستم',
        linkEdit: '/admin/resume/educations/editEducation/',
    }

    return (
        <>
            <Helmet>
                <title>تحصیلات</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/educations/addEducation" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد تحصیلات
                            </Link>
                        </Button>
                        <Table columns={AchievementsColumn(propColumns, handleDeleteEducation)} rows={educations} />
                    </>
                )
            }
        </>
    );
};

export default ListEducation;
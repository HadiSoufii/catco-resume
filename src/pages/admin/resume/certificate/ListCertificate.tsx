import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, AchievementsColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { IAchievementsColumn, ICertificate } from '../../../../interfaces';
import { certificates as certificateApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const ListCertificate = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [certificates, setCertificates] = useImmer<ICertificate[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { data, status } = await certificateApi.getAllCertificateByUserId(userId);
                if (data && status === 200 && data.length > 0) {
                    setCertificates(data);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleDeleteCertificate = async (certificateId: number) => {
        const certificatesBackup = [...certificates];
        try {
            setCertificates(() => certificates.filter((c) => c.id !== certificateId));
            const { status } = await certificateApi.deleteCertificate(certificateId);
            toast.success("مدرک با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setCertificates(certificatesBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setCertificates(certificatesBackup);
        }
    }

    const propColumns: IAchievementsColumn = {
        field1: 'certificateTitle',
        headerNameField1: 'عنوان مدرک',
        field2: 'nameOfInstitution',
        headerNameField2: 'نام موسسه اعطا کننده',
        headerNameFieldStartDate: 'تاریخ شروع اعتبار مدرک',
        headerNameFieldEndDate: 'تاریخ پایان اعتبار مدرک',
        messageEndDate: 'این مدرک تاریخ انقضا ندارد',
        linkEdit: '/admin/resume/certificates/editCertificate/',
    }

    return (
        <>
            <Helmet>
                <title>مدرک ها</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/certificates/addCertificate" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد مدرک
                            </Link>
                        </Button>
                        <Table columns={AchievementsColumn(propColumns, handleDeleteCertificate)} rows={certificates} />
                    </>
                )
            }
        </>
    );
};

export default ListCertificate;
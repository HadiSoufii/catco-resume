import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, SkillsAndLanguageColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { ISoftSkill, ISkillsAndLanguageColumn } from '../../../../interfaces';
import { softSkills as softSkillApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const ListSoftSkill = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [softSkills, setSoftSkills] = useImmer<ISoftSkill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { data, status } = await softSkillApi.getAllSoftSkillByUserId(userId);
                if (data && status === 200 && data.length > 0) {
                    setSoftSkills(data);
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

    const handleDeleteSoftSkill = async (softSkillId: number) => {
        const softSkillsBackup = [...softSkills];
        try {
            setSoftSkills(() => softSkills.filter((s) => s.id !== softSkillId));
            const { status } = await softSkillApi.deleteSoftSkill(softSkillId);
            toast.success("مهارت نرم با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setSoftSkills(softSkillsBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setSoftSkills(softSkillsBackup);
        }
    }

    const propColumns: ISkillsAndLanguageColumn = {
        field1: 'skillTitle',
        headerNameField1: 'نام مهارت نرم',
        field2: 'skillLevel',
        headerNameField2: 'امتیاز',
        linkEdit: '/admin/resume/softSkills/editSoftSkill/',
    }

    return (
        <>
            <Helmet>
                <title>مهارت های نرم</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/softSkills/addSoftSkill/" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد مهارت
                            </Link>
                        </Button>
                        <Table columns={SkillsAndLanguageColumn(propColumns, handleDeleteSoftSkill)} rows={softSkills} />
                    </>
                )
            }
        </>
    );
};

export default ListSoftSkill;
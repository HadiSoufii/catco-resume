import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, SkillsAndLanguageColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { ISkill, ISkillsAndLanguageColumn } from '../../../../interfaces';
import { skills as skillApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';

const ListSkill = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [skills, setSkills] = useImmer<ISkill[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { data, status } = await skillApi.getAllSkillByUserId(userId);
                if (data && status === 200 && data.length > 0) {
                    setSkills(data);
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

    const handleDeleteSkill = async (skillId: number) => {
        const skillsBackup = [...skills];
        try {
            setSkills(() => skills.filter((s) => s.id !== skillId));
            const { status } = await skillApi.deleteSkill(skillId);
            toast.success("مهارت با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setSkills(skillsBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setSkills(skillsBackup);
        }
    }

    const propColumns: ISkillsAndLanguageColumn = {
        field1: 'skillTitle',
        headerNameField1: 'نام مهارت',
        field2: 'LevelProgress',
        headerNameField2: 'میزان پیشرفت',
        linkEdit: '/admin/resume/skills/editSkill/',
    }

    return (
        <>
            <Helmet>
                <title>مهارت ها</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/skills/addSkill" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد مهارت
                            </Link>
                        </Button>
                        <Table columns={SkillsAndLanguageColumn(propColumns, handleDeleteSkill)} rows={skills} />
                    </>
                )
            }
        </>
    );
};

export default ListSkill;
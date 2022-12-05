import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, SkillsAndLanguageColumn } from "../../../../components/tables";
import { Loading } from "../../../../components";

import { ILanguage, ISkillsAndLanguageColumn } from '../../../../interfaces';
import { languages as languageApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';

const ListLanguage = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [languages, setLanguages] = useImmer<ILanguage[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { data, status } = await languageApi.getAllLanguageByUserId(userId);
                if (data && status === 200 && data.length > 0) {
                    setLanguages(data);
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

    const handleDeleteLanguage = async (languageId: number) => {
        const languagesBackup = [...languages];
        try {
            setLanguages(() => languages.filter((l) => l.id !== languageId));
            const { status } = await languageApi.deleteLanguage(languageId);
            toast.success("زبان با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setLanguages(languagesBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setLanguages(languagesBackup);
        }
    }

    const propColumns: ISkillsAndLanguageColumn = {
        field1: 'languageTitle',
        headerNameField1: 'نام زبان',
        field2: 'languageLevel',
        headerNameField2: 'امتیاز',
        linkEdit: '/admin/resume/languages/editLanguage/',
    }

    return (
        <>
            <Helmet>
                <title>زبان ها</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/resume/languages/addLanguage/" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد زبان
                            </Link>
                        </Button>
                        <Table columns={SkillsAndLanguageColumn(propColumns, handleDeleteLanguage)} rows={languages} />
                    </>
                )
            }
        </>
    );
};

export default ListLanguage;
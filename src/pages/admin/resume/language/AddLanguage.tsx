import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "../../../../components";
import { LanguageForm } from "./../../../../components/resume";

import { ILanguage } from '../../../../interfaces';
import { languages as languageApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const AddLanguage = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [language] = useState<ILanguage>({
        userId: userId,
        languageTitle: "",
        languageLevel: 2,
    });
    const [userLanguages, setUserLanguages] = useState<string[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { status, data } = await languageApi.getAllLanguageByUserId(userId);
                if (data && status === 200 && data.length > 0)
                    setUserLanguages(data.map(languages => languages.languageTitle));
                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/languages");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ILanguage): Promise<void> => {
        try {
            setLoading(true);

            const { status } = await languageApi.createLanguage({ ...values, userId: userId });
            if (status === 201) {
                toast.success("زبان با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/languages");
                return
            }

            setLoading(false);
        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setLoading(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>ایجاد زبان</title>
            </Helmet>
            {
                loading ? <Loading /> : <LanguageForm language={language} handleSubmitForm={handleSubmitForm}
                    userLanguages={userLanguages} />
            }
        </>
    );
};

export default AddLanguage;
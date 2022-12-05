import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "../../../../components";
import { LanguageForm } from "./../../../../components/resume";

import { ILanguage } from '../../../../interfaces';
import { languages as languageApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';

const EditLanguage = () => {
    const navigate = useNavigate();
    const { languageId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [language, setLanguage] = useState<ILanguage>({
        userId: userId,
        languageTitle: "",
        languageLevel: 2,
    });


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);

                const { data, status } = await languageApi.getLanguageByLanguageId(parseInt(languageId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("زبان پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/languages");
                        return
                    }
                    setLanguage(data);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/languages");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ILanguage) => {
        try {
            setLoading(true);

            const { status } = await languageApi.updateLanguage(
                parseInt(languageId || "0"), values);
            if (status === 200) {
                toast.success("زبان با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش زبان</title>
            </Helmet>
            {
                loading ? <Loading /> : <LanguageForm language={language} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditLanguage;
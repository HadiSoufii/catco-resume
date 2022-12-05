import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { SkillForm } from "./../../../../components/resume";

import { ISkill } from '../../../../interfaces';
import { skills as skillApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const AddSkill = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [skill] = useState<ISkill>({
        userId: userId,
        skillTitle: "",
        LevelProgress: 50
    });

    useEffect(() => {
        if (!isCompletedForms) {
            toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
            navigate("/admin/userpanel");
            return
        }
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ISkill): Promise<void> => {
        try {
            setLoading(true);
            const { status } = await skillApi.createSkill({ ...values, userId: userId });
            if (status === 201) {
                toast.success("مهارت با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/skills");
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
                <title>ایجاد مهارت</title>
            </Helmet>
            {
                loading ? <Loading /> : <SkillForm skill={skill} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default AddSkill;
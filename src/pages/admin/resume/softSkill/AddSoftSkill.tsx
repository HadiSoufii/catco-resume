import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { SoftSkillsForm } from "./../../../../components/resume";

import { ISoftSkill } from '../../../../interfaces';
import { softSkills as softSkillApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const AddSoftSkill = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [softSkill] = useState<ISoftSkill>({
        userId: userId,
        skillTitle: "",
        skillLevel: 2,
    });
    const [userSoftSkills, setUserSoftSkills] = useState<string[]>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { status, data } = await softSkillApi.getAllSoftSkillByUserId(userId);
                if (data && status === 200 && data.length > 0)
                    setUserSoftSkills(data.map(softSkills => softSkills.skillTitle));

                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/languages");
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ISoftSkill): Promise<void> => {
        try {
            setLoading(true);

            const { status } = await softSkillApi.createSoftSkill({ ...values, userId: userId });
            if (status === 201) {
                toast.success("مهارت نرم با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/softSkills");
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
                <title>ایجاد مهارت نرم</title>
            </Helmet>
            {
                loading ? <Loading /> : <SoftSkillsForm softSkill={softSkill} handleSubmitForm={handleSubmitForm}
                    userSoftSkills={userSoftSkills} />
            }
        </>
    );
};

export default AddSoftSkill;
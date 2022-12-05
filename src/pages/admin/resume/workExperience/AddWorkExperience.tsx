import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { EmploymentRecordForm } from "./../../../../components/resume";

import { IWorkExperience } from '../../../../interfaces';
import { workExperiences as workExperienceApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';

const AddWorkExperience = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [workExperience] = useState<IWorkExperience>({
        userId: userId,
        jobTitle: "",
        companyName: "",
        companyPhoto: "",
        jobDescription: "",
        startDate: new Date(),
        endDate: new Date(),
        jobTags: []
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

    const handleSubmitForm = async (values: IWorkExperience): Promise<void> => {
        try {
            setLoading(true);
            const { status } = await workExperienceApi.createWorkExperience({ ...values, userId: userId });
            if (status === 201) {
                toast.success("سابقه شغلی با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/workExperiences");
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
                <title>ایجاد سابقه کاری</title>
            </Helmet>
            {
                loading ? <Loading /> : <EmploymentRecordForm EmploymentRecord={workExperience} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default AddWorkExperience;
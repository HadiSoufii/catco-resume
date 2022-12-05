import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { EducationForm } from "./../../../../components/resume";

import { IEducation } from '../../../../interfaces';
import { educations as educationApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const AddEducation = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [education] = useState<IEducation>({
        userId: userId,
        educationTitle: "",
        nameOfInstitution: "",
        educationDescription: "",
        average: "",
        startDate: new Date(),
        endDate: new Date(),
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

    const handleSubmitForm = async (values: IEducation): Promise<void> => {
        try {
            setLoading(true);
            const { status } = await educationApi.createEducation({ ...values, userId: userId });
            if (status === 201) {
                toast.success("تحصیلات با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/educations");
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
                <title>ایجاد تحصیلات</title>
            </Helmet>
            {
                loading ? <Loading /> : <EducationForm education={education} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default AddEducation;
import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { EducationForm } from "./../../../../components/resume";

import { IEducation } from '../../../../interfaces';
import { educations as educationApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const EditEducation = () => {
    const navigate = useNavigate();
    const { educationId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [education, setEducation] = useState<IEducation>({
        userId: userId,
        educationTitle: "",
        nameOfInstitution: "",
        educationDescription: "",
        average: "",
        startDate: new Date(),
        endDate: new Date(),
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await educationApi.getEducationByEducationId(parseInt(educationId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("تحصیلات پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/educations");
                        return
                    }
                    setEducation(data);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/educations");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: IEducation) => {
        try {
            setLoading(true);
            const { status } = await educationApi.updateEducation(
                parseInt(educationId || "0"), values);
            if (status === 200) {
                toast.success("تحصیلات با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش تحصیلات</title>
            </Helmet>
            {
                loading ? <Loading /> : <EducationForm education={education} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditEducation;
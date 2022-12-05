import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { EmploymentRecordForm } from "./../../../../components/resume";

import { IWorkExperience } from '../../../../interfaces';
import { workExperiences as workExperienceApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const EditWorkExperience = () => {
    const navigate = useNavigate();
    const { workExperienceId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [workExperience, setWorkExperience] = useState<IWorkExperience>({
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

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await workExperienceApi.getWorkExperienceByWorkExperienceId(parseInt(workExperienceId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("سابقه شغلی پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/workExperiences");
                        return
                    }
                    setWorkExperience(data);
                }
                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/workExperiences");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: IWorkExperience) => {
        try {
            setLoading(true);

            const { status } = await workExperienceApi.updateWorkExperience(
                parseInt(workExperienceId || "0"), values);
            if (status === 200) {
                toast.success("سابقه شغلی با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش سابقه کاری</title>
            </Helmet>
            {
                loading ? <Loading /> : <EmploymentRecordForm EmploymentRecord={workExperience} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditWorkExperience;
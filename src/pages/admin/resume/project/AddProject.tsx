import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { ProjectForm } from "./../../../../components/resume";

import { IProject } from '../../../../interfaces';
import { projects as projectApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const AddProject = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [project] = useState<IProject>({
        userId: userId,
        projectTitle: "",
        projectLink: "",
        projectDate: new Date(),
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

    const handleSubmitForm = async (values: IProject): Promise<void> => {
        try {
            setLoading(true);
            const { status } = await projectApi.createProject({ ...values, userId: userId });
            if (status === 201) {
                toast.success("پروژه با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/projects");
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
                <title>ایجاد نمونه کار</title>
            </Helmet>
            {
                loading ? <Loading /> : <ProjectForm project={project} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default AddProject;
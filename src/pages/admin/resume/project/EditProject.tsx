import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { ProjectForm } from "./../../../../components/resume";

import { IProject } from '../../../../interfaces';
import { projects as projectApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const EditProject = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [project, setProject] = useState<IProject>({
        userId: userId,
        projectTitle: "",
        projectLink: "",
        projectDate: new Date(),
    });


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await projectApi.getProjectByProjectId(parseInt(projectId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("پروژه پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/projects");
                        return
                    }
                    setProject(data);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/projects");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: IProject) => {
        try {
            setLoading(true);

            const { status } = await projectApi.updateProject(
                parseInt(projectId || "0"), values);
            if (status === 200) {
                toast.success("پروژه با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش نمونه کار</title>
            </Helmet>
            {
                loading ? <Loading /> : <ProjectForm project={project} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditProject;
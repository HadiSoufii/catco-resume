import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { SkillForm } from "./../../../../components/resume";

import { ISkill } from '../../../../interfaces';
import { skills as skillApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const EditSkill = () => {
    const navigate = useNavigate();
    const { skillId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [skill, setSkill] = useState<ISkill>({
        userId: userId,
        skillTitle: "",
        LevelProgress: 50
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await skillApi.getSkillBySkillId(parseInt(skillId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("مهارت پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/skills");
                        return
                    }
                    setSkill(data);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/skills");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ISkill) => {
        try {
            setLoading(true);

            const { status } = await skillApi.updateSkill(
                parseInt(skillId || "0"), values);
            if (status === 200) {
                toast.success("مهارت با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش مهارت</title>
            </Helmet>
            {
                loading ? <Loading /> : <SkillForm skill={skill} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditSkill;
import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { SoftSkillsForm } from "./../../../../components/resume";

import { ISoftSkill } from '../../../../interfaces';
import { softSkills as softSkillApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const EditSoftSkill = () => {
    const navigate = useNavigate();
    const { softSkillId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [softSkill, setSoftSkill] = useState<ISoftSkill>({
        userId: userId,
        skillTitle: "",
        skillLevel: 2,
    });


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await softSkillApi.getSoftSkillBySoftSkillId(parseInt(softSkillId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("مهارت نرم پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/softSkills");
                        return
                    }
                    setSoftSkill(data);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/softSkills");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ISoftSkill) => {
        try {
            setLoading(true);

            const { status } = await softSkillApi.updateSoftSkill(
                parseInt(softSkillId || "0"), values);
            if (status === 200) {
                toast.success("مهارت نرم با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش مهارت نرم</title>
            </Helmet>
            {
                loading ? <Loading /> : <SoftSkillsForm softSkill={softSkill} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditSoftSkill;
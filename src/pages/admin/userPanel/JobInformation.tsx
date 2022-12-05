import { useState, useEffect, FC, Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import { UserJobInformationForm } from '../../../components/user';

import { EmploymentStatus, JobType } from '../../../helpers';
import { IJob } from '../../../interfaces';
import { jobs as jobApi } from "./../../../services/api/apiService";
import { AdminContext } from "./../../../services/contexts";

interface IProps {
    setStep?: Dispatch<SetStateAction<number>>,
}
const JobInformation: FC<IProps> = ({ setStep }) => {
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);

    const userId = userLocalStorage?.userId || 0;
    const navigate = useNavigate();

    const [job, setJob] = useState<IJob>({
        userId: userId,
        EmploymentStatus: EmploymentStatus.ActiveSearch,
        JobType: JobType.FullTime,
        EmploymentCities: []
    });

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                if (!isCompletedForms) {
                    toast.info("برای دسترسی به این بخش باید فرم های پنل کاربر تکمیل کنید", { icon: "❕" });
                    navigate("/admin/userpanel");
                    return
                }

                const { status, data } = await jobApi.getJobByUserId(userId);
                if (status === 200 && data.length > 0) {
                    setJob(data[0])
                } else {
                    throw Error("No data found");
                }

                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/userpanel");
            }
        }

        if (setStep) {
            setJob({ ...job, userId: userId });
            setLoading(false);
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [])

    const handleAddJob = async (values: IJob) => {
        try {
            setLoading(true);
            const { status } = await jobApi.createJob(values);
            if (status === 201) {
                toast.success("اطلاعات شغلی با موفقیت ثبت شد", { icon: "✅" });
                if (setStep)
                    setStep(3);
            }
            setLoading(false);
        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setLoading(false);
        }
    }

    const handleUpdateJob = async (values: IJob) => {
        try {
            setLoading(true);

            const { status } = await jobApi.updateJob(values.id || 0, values);
            if (status === 200) {
                toast.success("اطلاعت با موفقیت ویرایش شد", { icon: "✅" });
                navigate("/admin/userpanel");
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
            {
                loading ? <Loading /> :
                    <UserJobInformationForm job={job} handleSubmitForm={setStep ? handleAddJob : handleUpdateJob} />
            }
        </>
    );
};

export default JobInformation;
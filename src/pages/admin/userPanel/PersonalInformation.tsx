import { useState, useEffect, FC, Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import { UserPersonalInformationForm } from '../../../components/user';

import { ServiceStatus } from '../../../helpers';
import { IPersonal } from '../../../interfaces';
import { personals as personalApi } from "./../../../services/api/apiService";
import { AdminContext } from "./../../../services/contexts";

interface IProps {
    setStep?: Dispatch<SetStateAction<number>>,
}

const PersonalInformation: FC<IProps> = ({ setStep }) => {
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);

    const userId = userLocalStorage?.userId || 0;
    const navigate = useNavigate();

    const [personal, setPersonal] = useState<IPersonal>({
        userId: userId,
        birthDay: new Date(),
        gender: "آقا",
        maritalStatus: "متاهل",
        serviceStatus: ServiceStatus.None
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

                const { status, data } = await personalApi.getPersonalByUserId(userId);
                if (status === 200 && data.length > 0) {
                    setPersonal(data[0])
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
            setPersonal({ ...personal, userId: userId });
            setLoading(false);
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [])

    const handleAddPersonal = async (values: IPersonal) => {
        try {
            setLoading(true);
            const { status } = await personalApi.createPersonal(values);
            if (status === 201) {
                toast.success("اطلاعات فردی با موفقیت ثبت شد", { icon: "✅" });
                if (setStep)
                    setStep(2);
            }
            setLoading(false);
        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setLoading(false);
        }
    }

    const handleUpdatePersonal = async (values: IPersonal) => {
        try {
            setLoading(true);

            const { status } = await personalApi.updatePersonal(values.id || 0, values);
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
                    <UserPersonalInformationForm personal={personal} handleSubmitForm={setStep ? handleAddPersonal : handleUpdatePersonal} />
            }
        </>
    );
};

export default PersonalInformation;
import { useState, useEffect, FC, Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import { UserContactInformationForm } from '../../../components/user';

import { IContact } from '../../../interfaces';
import { contacts as contactApi } from '../../../services/api/apiService';
import { AdminContext } from "./../../../services/contexts"

interface IProps {
    setStep?: Dispatch<SetStateAction<number>>,
}

const ContactInformation: FC<IProps> = ({ setStep }) => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [contact, setContact] = useState<IContact>({
        userId: userId,
        address: "",
        email: "",
        mobile: "",
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

                const { status, data } = await contactApi.getContactByUserId(userId);
                if (status === 200 && data.length > 0) {
                    setContact(data[0])
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
            setContact({ ...contact, userId: userId });
            setLoading(false);
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [])

    const handleAddContact = async (values: IContact) => {
        try {
            setLoading(true);
            const { status } = await contactApi.createContact(values);
            if (status === 201) {
                toast.success("اطلاعات تماس با موفقیت ثبت شد", { icon: "✅" });
                if (setStep)
                    setStep(1);
            }
            setLoading(false);
        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setLoading(false);
        }
    }

    const handleUpdateContact = async (values: IContact) => {
        try {
            setLoading(true);

            const { status } = await contactApi.updateContact(values.id || 0, values);
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
                    <UserContactInformationForm contact={contact}
                        handleSubmitForm={setStep ? handleAddContact : handleUpdateContact} />
            }
        </>
    );
};

export default ContactInformation;
import { useState, useEffect, FC, Dispatch, SetStateAction, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Loading } from '../../../components';
import { UserLinksInformationForm } from '../../../components/user';

import { ILink } from '../../../interfaces';
import { links as linkApi } from "./../../../services/api/apiService";
import { AdminContext } from "./../../../services/contexts";

interface IProps {
    setStep?: Dispatch<SetStateAction<number>>,
}

const LinksInformation: FC<IProps> = ({ setStep }) => {
    const { loading, setLoading, userLocalStorage, isCompletedForms, setIsCompletedForms } = useContext(AdminContext);

    const userId = userLocalStorage?.userId || 0;
    const navigate = useNavigate();

    const [links, setLinks] = useState<ILink>({
        userId: userId,
        stackOverflow: "",
        gitHub: "",
        gitLab: "",
        linkdein: ""
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

                const { status, data } = await linkApi.getLinkByUserId(userId);
                if (status === 200 && data.length > 0) {
                    setLinks(data[0])
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
            setLinks({ ...links, userId: userId });
            setLoading(false);
        } else {
            fetchData();
        }
        // eslint-disable-next-line
    }, [])

    const handleAddLinks = async (values: ILink) => {
        try {
            setLoading(true);
            const { status } = await linkApi.createlink(values);
            if (status === 201) {
                toast.success("اطلاعات لینکها با موفقیت ثبت شد", { icon: "✅" });
                setIsCompletedForms(true);
                if (setStep)
                    setStep(4);
            }
            setLoading(false);
        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setLoading(false);
        }
    }

    const handleUpdateLinks = async (values: ILink) => {
        try {
            setLoading(true);

            const { status } = await linkApi.updatelink(values.id || 0, values);
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
                    <UserLinksInformationForm links={links} handleSubmitForm={setStep ? handleAddLinks : handleUpdateLinks} />
            }
        </>
    );
};

export default LinksInformation;
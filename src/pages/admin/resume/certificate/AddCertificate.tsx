import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { CertificateForm } from "./../../../../components/resume";

import { ICertificate } from '../../../../interfaces';
import { certificates as certificateApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const AddCertificate = () => {
    const navigate = useNavigate();
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [certificate] = useState<ICertificate>({
        userId: userId,
        certificateTitle: "",
        nameOfInstitution: "",
        certificateDescription: "",
        certificateLink: "",
        startDate: new Date(),
        endDate: new Date(),
        certificateTags: []
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

    const handleSubmitForm = async (values: ICertificate): Promise<void> => {
        try {
            setLoading(true);
            const { status } = await certificateApi.createCertificate({ ...values, userId: userId });
            if (status === 201) {
                toast.success("مدرک با موفقیت اضافه شد", { icon: "✅" });
                navigate("/admin/resume/certificates");
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
                <title>ایجاد مدرک</title>
            </Helmet>
            {
                loading ? <Loading /> : <CertificateForm certificate={certificate} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default AddCertificate;
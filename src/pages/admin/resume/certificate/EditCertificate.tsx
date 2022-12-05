import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../../components";
import { CertificateForm } from "./../../../../components/resume";

import { ICertificate } from '../../../../interfaces';
import { certificates as certificateApi } from '../../../../services/api/apiService';
import { AdminContext } from '../../../../services/contexts';


const EditCertificate = () => {
    const navigate = useNavigate();
    const { certificateId } = useParams();
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);
    const userId = userLocalStorage?.userId || 0;

    const [certificate, setCertificate] = useState<ICertificate>({
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

        const fetchData = async () => {
            try {
                setLoading(true);
                const { data, status } = await certificateApi.getCertificateByCertificateId(parseInt(certificateId || "0"));
                if (data && status === 200) {
                    if (data.userId !== userId) {
                        toast.info("مدرک پیدا نشد", { icon: "❕" });
                        navigate("/admin/resume/certificates");
                        return
                    }
                    setCertificate(data);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/resume/certificates");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: ICertificate) => {
        try {
            setLoading(true);
            const { status } = await certificateApi.updateCertificate(
                parseInt(certificateId || "0"), values);
            if (status === 200) {
                toast.success("مدرک با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش مدرک</title>
            </Helmet>
            {
                loading ? <Loading /> : <CertificateForm certificate={certificate} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditCertificate;
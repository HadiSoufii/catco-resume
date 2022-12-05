import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../components";
import { UserPasswordChangeForm } from "./../../../components/user";

import { hashPassword, comparePassword } from '../../../utils/hashPassword';
import { IPassword } from '../../../interfaces';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';

const EditPassword = () => {
    const { loading, setLoading, userLocalStorage, isCompletedForms } = useContext(AdminContext);

    const userId = userLocalStorage?.userId || 0;
    const navigate = useNavigate();

    const [hashOldPassword, setHashOldPassword] = useState<string>("");
    const [password, setPassword] = useState<IPassword>({
        oldPassword: "",
        password: "",
        rePassword: "",
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

                const { data: dataUser } = await userApi.getUserByUserId(userId);
                if (dataUser && !dataUser.isDelete) {
                    setHashOldPassword(dataUser.password);
                } else {
                    throw Error();
                }

                setLoading(false);
            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/userpanel");
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleSubmitForm = async (values: IPassword) => {
        try {
            setLoading(true);

            const successOldPassword = await comparePassword(values.oldPassword, hashOldPassword);

            if (!successOldPassword) {
                setPassword(values);
                toast.error("رمز عبور قبلی اشتباه است", { icon: "⛔" });
                setLoading(false);
                return
            }

            const hash = await hashPassword(values.password);

            const { status } = await userApi.changePasswordByUserId(userId, hash);
            if (status === 200) {
                toast.success("کلمه عبور کاربر با موفقیت ویرایش شد", { icon: "✅" });
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
            <Helmet>
                <title>ویرایش کلمه عبور</title>
            </Helmet>
            {
                loading ? <Loading /> : <UserPasswordChangeForm password={password} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditPassword;
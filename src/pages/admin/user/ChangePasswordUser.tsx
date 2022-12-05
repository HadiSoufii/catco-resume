import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../components";
import { UserPasswordChangeForm } from "./../../../components/user";

import { hashPassword } from '../../../utils/hashPassword';
import { IPassword } from '../../../interfaces';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';

const ChangePasswordUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const { loading, setLoading } = useContext(AdminContext);
    const password: IPassword = {
        oldPassword: " ",
        password: "",
        rePassword: "",
    }


    const handleSubmitForm = async (values: IPassword) => {
        try {
            setLoading(true);
            const hash = await hashPassword(values.password);

            const { status } = await userApi.changePasswordByUserId(parseInt(userId || "0"), hash);
            if (status === 200) {
                toast.success("کلمه عبور کاربر با موفقیت ویرایش شد", { icon: "✅" });
                navigate("/admin/users");
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

export default ChangePasswordUser;
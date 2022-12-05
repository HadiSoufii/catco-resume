import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from "react-toastify";

import { ILocalStorage, ILogin } from '../interfaces';
import { comparePassword } from '../utils/hashPassword';
import { users as userApi, links as linkApi } from '../services/api/apiService';

import { Loading, LoginForm } from "../components";

import { useAuth } from "./../services/auth/Auth";
import { AdminContext } from '../services/contexts';

const Login = () => {
    const { loading, setLoading, userLocalStorage, setUserLocalStorage, setIsCompletedForms } = useContext(AdminContext);

    const location = useLocation();
    const navigate = useNavigate();
    const { createLocalStorage } = useAuth();

    const [login, setLogin] = useState<ILogin>({
        userName: '',
        password: '',
    });

    useEffect(() => {
        setLoading(true);
        if (userLocalStorage !== undefined && location.state === null) {
            navigate("/notfound");
            toast.info("شما قبلا لاگین کرده اید", { icon: "❕" });
        } else if (userLocalStorage !== undefined && location.state !== "" && userLocalStorage.isAdmin)
            navigate(location.state);
        else if (userLocalStorage !== undefined && location.state !== "")
            toast.error("شما به این بخش دسترسی ندارید", { icon: "⛔" });
        setLoading(false);
        // eslint-disable-next-line
    }, [])

    const handleSubmitForm = async (values: ILogin): Promise<void> => {
        try {
            setLoading(true);

            const { data, status } = await userApi.getUserByUserName(values.userName.toLowerCase());

            if (data.length > 0 && status === 200 && !data[0].isDelete) {
                const successPassword = await comparePassword(values.password, data[0].password);
                if (successPassword) {
                    const addUserLocalStroage: ILocalStorage = {
                        userId: data[0].id || 0,
                        aboutMe: data[0].aboutMe,
                        avatar: data[0].avatar,
                        fullName: data[0].fullName,
                        userName: data[0].userName,
                        isAdmin: data[0].isAdmin,
                        isDelete: data[0].isDelete
                    }

                    const { status: statusLinks, data: dataLinks } = await linkApi.getLinkByUserId(data[0].id || 0);
                    if (statusLinks === 200 && dataLinks.length > 0) {
                        setIsCompletedForms(true);
                    }

                    setUserLocalStorage(addUserLocalStroage);
                    createLocalStorage(addUserLocalStroage);
                    toast.success("شما با موفقیت لاگین شدید", { icon: "✅" });
                    navigate(location.state ? location.state : "admin/userPanel");
                } else {
                    setLogin({ ...values })
                    toast.warning("کاربری با مشخصات وارد شده پیدا نشد", { icon: "⚠" });
                }
            } else {
                setLogin({ ...values })
                toast.warning("کاربری با مشخصات وارد شده پیدا نشد", { icon: "⚠" });
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
        }
    }

    return (
        <>
            <Helmet>
                <title>ورود به بخش مدیریت</title>
            </Helmet>
            {
                loading ? <Loading /> : <LoginForm login={login} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default Login;
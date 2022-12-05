import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../components";
import { UserForm } from "./../../../components/user";

import { ILocalStorage, IUser } from '../../../interfaces';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';

const EditAccount = () => {
    const { loading, setLoading, userLocalStorage, setUserLocalStorage, isCompletedForms } = useContext(AdminContext);

    const userId = userLocalStorage?.userId || 0;
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        fullName: "",
        userName: "",
        avatar: "",
        password: "",
        aboutMe: '',
        me: [],
        isShowResume: false,
        isAdmin: false,
        isDelete: false
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

                const { data, status } = await userApi.getUserByUserId(userId);
                if (data && status === 200 && !data.isDelete) {
                    setUser(data);
                } else {
                    throw Error("No data found");
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

    const checkingUserName = async (userId: number, userName: string) => {
        const { data } = await userApi.getUserByUserName(userName);
        if (data.length > 0 && data[0].id !== userId)
            return true;
        return false;
    }

    const handleSubmitForm = async (values: IUser) => {
        try {
            setLoading(true);

            const isExistUserName = await checkingUserName(user.id || 0, values.userName);
            if (isExistUserName) {
                setUser(values);
                toast.info("نام کاربری موجود میباشد. لطفا نام کاربری را تغییر دهید", { icon: "❕" });
                setLoading(false);
                return
            }

            const { status, data } = await userApi.updateUserByUserAndUserId(values, user.id || 0);
            if (status === 200 && data) {
                const updateUserLocalStorage: ILocalStorage = {
                    userId: data.id || 0,
                    aboutMe: data.aboutMe,
                    avatar: data.avatar,
                    fullName: data.fullName,
                    userName: data.userName,
                    isAdmin: data.isAdmin,
                    isDelete: data.isDelete,
                }
                setUserLocalStorage(updateUserLocalStorage);
                toast.success("حساب کاربری با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش حساب کاربری</title>
            </Helmet>
            {
                loading ? <Loading /> : <UserForm user={user} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditAccount;
import { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../components";
import { UserForm } from "./../../../components/user";

import { IUser } from '../../../interfaces';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';


const EditUser = () => {
    const navigate = useNavigate();

    const { loading, setLoading } = useContext(AdminContext);
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
    const { userId } = useParams();

    useEffect(() => {

        const fetchData = async () => {
            try {

                setLoading(true);
                const { data, status } = await userApi.getUserByUserId(parseInt(userId || "0"));
                if (data && status === 200 && !data.isDelete) {
                    setUser(data);
                } else {
                    toast.warning("کاربری پیدا نشد، احتمالا کاربر حذف شده باشد", { icon: "⚠" });
                    navigate("/admin/users");
                    return
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/admin/users");
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

            const isExistUserName = await checkingUserName(parseInt(userId || "0"), values.userName);
            if (isExistUserName) {
                setUser(values);
                toast.info("نام کاربری موجود میباشد. لطفا نام کاربری را تغییر دهید", { icon: "❕" });
                setLoading(false);
                return
            }

            const { status } = await userApi.updateUserByUserAndUserId({ ...values, userName: values.userName.toLowerCase() },
                parseInt(userId || "0"));
            if (status === 200) {
                toast.success("کاربر با موفقیت ویرایش شد", { icon: "✅" });
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
                <title>ویرایش کاربر</title>
            </Helmet>
            {
                loading ? <Loading /> : <UserForm user={user} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default EditUser;
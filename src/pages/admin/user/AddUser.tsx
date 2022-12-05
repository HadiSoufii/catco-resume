import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import { Loading } from "./../../../components";
import { UserForm } from "./../../../components/user";

import { IUser } from '../../../interfaces';
import { hashPassword } from '../../../utils/hashPassword';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';


const AddUser = () => {
    const navigate = useNavigate();

    const { loading, setLoading } = useContext(AdminContext);
    const [user, setUser] = useState<IUser>({
        fullName: '',
        userName: '',
        avatar: '',
        password: '',
        aboutMe: '',
        me: [],
        isShowResume: false,
        isAdmin: false,
        isDelete: false
    });

    useEffect(() => {
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    const checkingUserName = async (userName: string): Promise<boolean> => {
        const { data } = await userApi.getUserByUserName(userName);
        if (data.length > 0)
            return true;
        return false;
    }

    const handleSubmitForm = async (values: IUser): Promise<void> => {
        try {
            setLoading(true);

            const isExistUserName = await checkingUserName(values.userName);
            if (isExistUserName) {
                setUser(values);
                toast.info("نام کاربری موجود میباشد. لطفا نام کاربری را تغییر دهید", { icon: "❕" });
                setLoading(false);
                return
            }

            const hash = await hashPassword(values.password);

            const { status } = await userApi.createUser({ ...values, userName: values.userName.toLowerCase(), password: hash });
            if (status === 201) {
                toast.success("کاربر با موفقیت اضافه شد", { icon: "✅" });
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
                <title>ایجاد کاربر</title>
            </Helmet>
            {
                loading ? <Loading /> : <UserForm user={user} handleSubmitForm={handleSubmitForm} />
            }
        </>
    );
};

export default AddUser;
import { useState, useMemo, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../layouts/AdminLayout';
import AdminContentContainer from './AdminContentContainer';

import { AdminAppbar } from '../../components/appbar';
import { AdminDrawer } from '../../components/drawer';

import { AdminContext } from "../../services/contexts";
import { ILocalStorage } from '../../interfaces';
import { useAuth } from '../../services/auth/Auth';
import { users as userApi, links as linkApi } from "../../services/api/apiService"

const AdminContainer = () => {
    const navigate = useNavigate();
    const { getLocalStorage, createLocalStorage } = useAuth();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [isCompletedForms, setIsCompletedForms] = useState<boolean>(true);
    const [userLocalStorage, setUserLocalStorage] = useState<ILocalStorage>();

    const currentUser = getLocalStorage("user");
    useMemo(async () => {
        try {
            if (currentUser !== null && (userLocalStorage === undefined || currentUser !== userLocalStorage)) {
                setUserLocalStorage(currentUser);

                const { status, data } = await linkApi.getLinkByUserId(currentUser.userId);
                if (status === 200 && data.length < 1) {
                    setIsCompletedForms(false);
                }
            } else if (currentUser === null) {
                setIsCompletedForms(false);
            }
        } catch (error) {
            navigate("/");
            toast.error("مشکلی در سمت سرور پیش آمده است لطفا بعدا تلاش کنید", { icon: "⛔" });
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (currentUser != null) {
                    const { data, status } = await userApi.getUserByUserId(userLocalStorage?.userId || 0);
                    if (!data || data.isDelete) {
                        toast.warning("حساب شما پیدا نشد به احتمال زیاد توسط مدیریت حذف شده باشید", { icon: "⚠" });
                        navigate("/");
                        return
                    } else if (data && status === 200 && !data.isDelete) {
                        const user: ILocalStorage = {
                            userId: data?.id || 0,
                            aboutMe: data.aboutMe,
                            avatar: data.avatar,
                            fullName: data.fullName,
                            userName: data.userName,
                            isAdmin: data.isAdmin,
                            isDelete: data.isDelete
                        }
                        if (!(JSON.stringify(user) === JSON.stringify(currentUser))) {
                            setUserLocalStorage(user);
                            createLocalStorage(user);
                        }
                    }
                }
            } catch (error) {
                toast.error("مشکلی در سمت سرور پیش آمده است لطفا بعدا تلاش کنید", { icon: "⛔" });
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);


    return (
        <AdminContext.Provider value={{
            drawerOpen,
            setDrawerOpen,
            loading,
            setLoading,
            isCompletedForms,
            setIsCompletedForms,
            userLocalStorage,
            setUserLocalStorage
        }}>
            <AdminLayout>
                <CssBaseline />
                <AdminAppbar />
                <AdminDrawer />

                <AdminContentContainer>
                    <Outlet />
                </AdminContentContainer>

            </AdminLayout>
        </AdminContext.Provider >
    );
};

export default AdminContainer;
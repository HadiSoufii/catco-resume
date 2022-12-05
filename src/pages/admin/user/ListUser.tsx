import { useEffect, useContext } from 'react';
import { useImmer } from "use-immer";
import { Button, } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import { Table, UserColumn } from "./../../../components/tables";
import { Loading } from "./../../../components";

import { IUser } from '../../../interfaces';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';

const ListUser = () => {
    const { loading, setLoading } = useContext(AdminContext);
    const [users, setUsers] = useImmer<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(true);
                const { data, status } = await userApi.getUsers();
                if (data && status === 200) {
                    const filterUsers: IUser[] = data.filter(item => !item.isDelete);
                    setUsers(filterUsers);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                setLoading(false);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const handleDeleteUser = async (userId: number) => {
        const usersBackup = [...users];
        try {
            setUsers(() => users.filter((c) => c.id !== userId));
            const { status } = await userApi.deleteUserByUserId(userId);
            toast.success("کاربر با موفقیت حذف شد", { icon: "✅" });

            if (status !== 200) {
                setUsers(usersBackup);
            }

        } catch (error) {
            toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
            setUsers(usersBackup);
        }
    }

    return (
        <>
            <Helmet>
                <title>لیست کاربران</title>
            </Helmet>
            {
                loading ? <Loading /> : (
                    <>
                        <Button variant='outlined' color='secondary' sx={{
                            my: 3,
                        }}>
                            <Link to="/admin/users/adduser" style={{ textDecoration: "none", color: "inherit" }}>
                                ایجاد کاربر
                            </Link>
                        </Button>
                        <Table columns={UserColumn(true, handleDeleteUser)} rows={users} />
                    </>
                )
            }
        </>
    );
};

export default ListUser;
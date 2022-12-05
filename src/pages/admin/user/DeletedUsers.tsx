import { useEffect, useState, useContext } from 'react';
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';

import { Table, UserColumn } from "./../../../components/tables";
import { Loading } from "./../../../components";

import { IUser } from '../../../interfaces';
import { users as userApi } from '../../../services/api/apiService';
import { AdminContext } from '../../../services/contexts';

const DeletedUsers = () => {
    const { loading, setLoading } = useContext(AdminContext);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(true);
                const { data, status } = await userApi.getUsers();
                if (data && status === 200) {
                    const filterUsers: IUser[] = data.filter(item => item.isDelete);
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

    return (
        <>
            <Helmet>
                <title>کاربران حذف شده</title>
            </Helmet>
            {
                loading ? <Loading /> : <Table columns={UserColumn(false)} rows={users} />
            }
        </>
    );
};

export default DeletedUsers;
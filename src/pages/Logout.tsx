import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


import { Loading } from "../components";

import { useAuth } from "./../services/auth/Auth";
import { AdminContext } from '../services/contexts';


const Logout = () => {
    const { loading, setLoading, userLocalStorage } = useContext(AdminContext);

    const navigate = useNavigate();
    const { removeLocalStorage } = useAuth();

    useEffect(() => {
        setLoading(true);
        if (userLocalStorage === undefined) {
            toast.info("شما لاگین نیستید", { icon: "❕" });
            navigate("/notfound");
        }
        else if (userLocalStorage !== undefined) {
            removeLocalStorage("user");
            toast.success("با موفقیت از حساب خود خارج شدید", { icon: "✅" });
            navigate("/")
        }
        setLoading(false);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                loading && <Loading />
            }
        </>
    );
};

export default Logout;
import { FC, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AdminContext } from "./../services/contexts";

interface IProps {
    element: JSX.Element,
    isAdmin: boolean
}

const ProtectedRoute: FC<IProps> = ({ element, isAdmin }) => {
    const location = useLocation();
    const { userLocalStorage } = useContext(AdminContext);
    {
        if ((userLocalStorage !== undefined && isAdmin === false) ||
            (userLocalStorage !== undefined && isAdmin === true && userLocalStorage.isAdmin)) {
            return element;
        } else {
            return <Navigate to="/admin/login" state={location.pathname} />
        }
    }
};

export default ProtectedRoute;
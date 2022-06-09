import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './../../App';

const PrivateRoute = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    if(!loggedInUser.email){
        return <Navigate to="/login" state={{ path: location.pathname }} replace />
    }
    return (
        children
    );
};

export default PrivateRoute;



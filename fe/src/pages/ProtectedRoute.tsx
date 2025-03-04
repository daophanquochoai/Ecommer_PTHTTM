import React, {useContext} from 'react';
import {AppContext} from "../context/AppContext.tsx";
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute : React.FC = ({element : Component}) => {
    const location = useLocation()
    const {isLogin}  = useContext(AppContext);
    return isLogin ? (Component) : <Navigate to={'/login'} relative state={{from:location}} />
};

export default ProtectedRoute;
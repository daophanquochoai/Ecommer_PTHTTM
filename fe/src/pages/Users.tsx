import React from 'react';
import {Outlet} from "react-router-dom";

const Users : React.FC = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};     

export default Users;
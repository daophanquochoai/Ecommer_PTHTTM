import React from 'react';
import {Outlet} from "react-router-dom";

const ContactManage : React.FC = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default ContactManage;
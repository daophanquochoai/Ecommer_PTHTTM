import React from 'react';
import {Outlet} from "react-router-dom";

const Settings : React.FC = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Settings;
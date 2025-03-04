import React, {useContext} from 'react';
import {Outlet} from "react-router-dom";
import {AppContext} from "../context/AppContext.tsx";

const Settings : React.FC = () => {

    const {info} = useContext(AppContext)

    return (
        <>
            {
                info.role == "ADMIN" &&
                <div>
                    <Outlet />
                </div>
            }
        </>
    );
};

export default Settings;
import React from 'react';
import { Breadcrumb } from 'antd';
import {NavLink} from "react-router-dom";
const BreadCrumb : React.FC = () => {
    return (
        <Breadcrumb
            className={'font-bold text-xs md:text-base'}
            items={[
                {
                    title: <NavLink to={'/'}>HOME</NavLink>,
                },
                {
                    title: <span className={'text-red-500'}>CONTACT</span>,
                }
            ]}
        />
    );
};

export default BreadCrumb;
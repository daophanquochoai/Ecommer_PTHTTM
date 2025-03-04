import React from 'react';
import { Breadcrumb } from 'antd';
import {NavLink} from "react-router-dom";
const BreadCrumb : React.FC = ({bread}) => {
    return (
        <Breadcrumb
            className={'font-bold text-xs md:text-base'}
            items={bread}
        />
    );
};

export default BreadCrumb;
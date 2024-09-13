import React from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import TitleAbout from "../components/Contact/TitleAbout.tsx";
import FormMap from "../components/Contact/FormMap.tsx";
import {NavLink} from "react-router-dom";
const bread: object  = [
    {
        title: String,
    },
    {
        title: String,
    }
]
const Contact : React.FC = () => {
    const bread: object  = [
        {
            title: <NavLink to={'/'}>HOME</NavLink>,
        },
        {
            title: <span className={'text-red-500'}>CONTACT</span>,
        }
    ]
    return (
        <div className={'mx-[5%] mt-3'}>
            <BreadCrumb bread={bread}/>
            <TitleAbout />
            <FormMap />
        </div>
    );
};

export default Contact;
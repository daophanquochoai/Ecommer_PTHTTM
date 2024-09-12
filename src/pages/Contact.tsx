import React from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import TitleAbout from "../components/CONTACT/TitleAbout.tsx";
import FormMap from "../components/CONTACT/FormMap.tsx";

const Contact : React.FC = () => {
    return (
        <div className={'mx-[5%]'}>
            <BreadCrumb />
            <TitleAbout />
            <FormMap />
        </div>
    );
};

export default Contact;
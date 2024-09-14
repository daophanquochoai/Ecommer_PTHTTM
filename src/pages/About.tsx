import React from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {GrBlockQuote} from "react-icons/gr";
import {AiOutlineMinus} from "react-icons/ai";
import Poster from "../components/About/Poster.tsx";
import Choose from "../components/About/Choose.tsx";
import ClientSay from "../components/About/ClientSay.tsx";
import OurTeam from "../components/About/OurTeam.tsx";
import Policy from "../components/Body/Policy.tsx";

const bread : object[] = [
    {
        title: <NavLink to={'/'}>HOME</NavLink>,
    },
    {
        title: <span className={'text-red-500'}>ABOUT US</span>,
    }
]
const About = () => {

    return (
        <>
        <div className={'mt-3 mb-[190px]'}>
            <div className={'mx-[5%]'}>
                <BreadCrumb bread={bread}/>
                <Poster />
                <Choose />
            </div>
            <ClientSay />
            <div  className={'mx-[5%]'}>
                <OurTeam/>
            </div>
            <Policy />
        </div>
            </>
    );
};

export default About;
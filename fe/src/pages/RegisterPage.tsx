import React,{useContext} from 'react';
import Register from "../components/Login_Register/Register.tsx";
import {AppContext} from "../context/AppContext.tsx";
import {Link} from "react-router-dom";

const RegisterPage : React.FC = () => {
    const {logo} = useContext(AppContext);
    return (
        <div className={'flex flex-col items-center justify-center pb-20 bg-gray-200'}>
            <div className='w-full items-center bg-white flex h-20'>
                <Link to={'/'} className='ml-20' >
                    <img className={'w-[100px]'} src={logo} alt={"logo"}/>
                </Link>
                <p className={'ml-3 text-xl font-bold'}>Account</p>
            </div>
            <div className={'mt-10 items-center bg-white flex flex-col justify-center shadow_register rounded-xl overflow-hidden'}>
                <div className={'bg-red-500 w-full text-center p-3'}>
                    <p className={'text-2xl text-white font-bold'}>REGISTER</p>
                </div>
                <div className={'p-6'}>
                    <Register />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
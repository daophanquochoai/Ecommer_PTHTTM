import React,{useContext} from 'react';
import Forget from "../components/Login_Register/Forget.tsx";
import {AppContext} from "../context/AppContext.tsx";
import {Link} from "react-router-dom";

const ForgetPage : React.FC = () => {
    const {logo} = useContext(AppContext);
    return (
        <div className={'flex flex-col items-center justify-center pb-80 bg-gray-200'}>
            <div className='w-full items-center bg-white flex h-20'>
                <Link to={'/'} className='ml-20' >
                    <img className={'w-[100px]'} src={logo} alt={"logo"}/>
                </Link>
                <p className={'ml-3 text-xl font-bold'}>Account</p>
            </div>
            <div className={'mt-10 items-center bg-white flex flex-col justify-center shadow_register rounded-xl overflow-hidden'}>
                <div className={'bg-red-500 w-full text-center p-3'}>
                    <p className={'text-white text-2xl'}>RESET YOUR PASSWORD</p>
                </div>
                <div className={'p-4'}>
                    <Forget />
                </div>
            </div>
        </div>
    );
};

export default ForgetPage;
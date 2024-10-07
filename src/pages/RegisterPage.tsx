import React from 'react';
import Register from "../components/Login_Register/Register.tsx";

const RegisterPage : React.FC = () => {
    return (
        <div className={'flex items-center justify-center h-[100vh]'}>
            <div className={'items-center flex flex-col justify-center shadow_register rounded-xl overflow-hidden'}>
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
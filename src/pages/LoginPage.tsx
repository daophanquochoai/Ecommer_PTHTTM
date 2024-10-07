import React from 'react';
import Login from "../components/Login_Register/Login.tsx";

const LoginPage : React.FC = () => {
    return (
        <div className={'flex items-center justify-center flex-col h-[100vh]'}>
            <div className={'border items-center flex flex-col justify-center'}>
                <div className={'bg-red-500 w-full p-6 text-center'}>
                    <p className={'text-3xl text-white'}>LOGIN</p>
                </div>
                <div className={'p-12'}>
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
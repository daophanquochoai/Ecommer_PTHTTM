import React from 'react';
import Login from "../components/Login_Register/Login.tsx";

const LoginPage : React.FC = () => {
    return (
        <div className={'flex items-center justify-center py-8 flex-col'}>
            <div className={'border p-6 items-center flex flex-col justify-center bg-red-100'}>
                <p className={'text-2xl text-red-500 mb-4 font-bold'}>LOGIN</p>
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;
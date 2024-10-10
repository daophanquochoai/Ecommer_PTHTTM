import React from 'react';
import Forget from "../components/Login_Register/Forget.tsx";

const ForgetPage : React.FC = () => {
    return (
        <div className={'flex items-center justify-center h-[100vh]'}>
            <div className={'shadow_register flex flex-col items-center rounded-xl overflow-hidden'}>
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
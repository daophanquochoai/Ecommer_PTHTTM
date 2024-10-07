import React, {useContext} from 'react';
import Login from "../components/Login_Register/Login.tsx";
import {AppContext} from "../context/AppContext.tsx";
import {Link} from "react-router-dom";
import {Divider, Button} from 'antd';
import {FacebookFilled, GithubFilled} from '@ant-design/icons';

const LoginPage : React.FC = () => {
    const {logo} = useContext(AppContext);
    return (
        <div className={'flex items-center justify-center flex-col pb-20 bg-gray-200'}>
            <div className='w-full items-center bg-white flex h-20'>
                <Link to={'/'} className='ml-20' >
                    <img className={'w-[100px]'} src={logo} alt={"logo"}/>
                </Link>
                <p className={'ml-3 text-xl font-bold'}>Account</p>
            </div>
            <div className={'mt-10 pb-10 items-center bg-white flex flex-col justify-center shadow_register rounded-xl overflow-hidden'}>
                <div className={'bg-red-500 w-full p-6 text-center'}>   
                    <p className={'text-3xl font-bold text-white'}>Log In</p>
                    <p className={'text-xl italic text-white mt-3'}>Become a part of our community!</p>
                </div>
                <div className={'p-12 -mb-20'}>
                    <Login />
                </div>
                <Divider>or</Divider>
                <Button 
                    className='w-1/2'
                    variant="outlined"
                    onClick={() => alert('Sign in with Facebook')}
                >
                    <FacebookFilled />
                    Sign in with Facebook
                </Button>
                <Button 
                    className='w-1/2 mt-4'
                    variant="outlined"
                    onClick={() => alert('Sign in with Github')}
                >
                    <GithubFilled />
                    Sign in with Github
                </Button>
            </div>
        </div>
    );
};

export default LoginPage;
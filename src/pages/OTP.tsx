import React, {useEffect, useState} from 'react';
import {Button, Flex, Form, FormProps, Input, Spin, Typography} from 'antd';
import type { GetProps } from 'antd';
import {toast} from "react-toastify";
import {loginAccount} from "../Utils/Helper.tsx";
import {useNavigate} from "react-router-dom";

type OTPProps = GetProps<typeof Input.OTP>;

const { Title } = Typography;


type FieldType = {
    password?: string;
    repassword?: string;
};


const Otp : React.FC = () => {
    const [time, setTime] = useState<number>(60);
    const [text, setText] = useState<string>('');
    const [reSend, setReSend] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigate();
    const [theme, setTheme] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(prevTime => {
                if (prevTime === 0) {
                    clearInterval(intervalId); // Clear the interval once time reaches 0
                    return prevTime; // Prevent time from going below 0
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [reSend]);
    const onChange: OTPProps['onChange'] = (text) => {
        console.log('onChange:', text);
        setText(text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    const handleReSend = () => {
        setTime(60);
        // action
        setReSend( e => e-1);
    }

    const handleSubmit = () => {
        setTheme(1)
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        if( values.repassword !== values.password ){
            toast.error("Password not equal with RePassword!!")
            setIsLoading(false)
            return;
        }
        navigation('/login');

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        toast.error("Field didn't filled!!")
    };

    return (
        <div className={'flex h-[100vh] justify-center items-center'}>
            <div className={`shadow_register ${ theme !== 0 && 'hidden'}`}>
                <div className={'bg-red-500 p-2 items-center flex justify-center'}>
                    <p className={'text-2xl text-white font-bold'}>OPT</p>
                </div>
                <div className={'flex flex-col justify-center items-center p-4 gap-6'}>
                    <p className={'text-red-300 text-xl'}>{time}</p>
                    <Input.OTP mask="*" {...sharedProps} length={4} disabled={time === 0} size={"large"}/>
                    {
                        time === 0 ?
                            <button className={'text-white border-2 border-red-500 bg-red-500 hover:bg-white hover:text-red-500 px-2 py-1 rounded-xl'} onClick={ () => handleReSend()}>Resend</button>
                            :
                            <button className={'text-white border-2 border-red-500 bg-red-500 hover:bg-white hover:text-red-500 px-2 py-1 rounded-xl'} onClick={ () => handleSubmit()}>Submit</button>
                    }
                </div>
            </div>
            <div className={`shadow_register ${theme !== 1 && 'hidden'}`}>
                <div className={'bg-red-500 p-2 items-center flex justify-center px-5'}>
                    <p className={'text-2xl text-white font-bold'}>Change Password</p>
                </div>
                <Spin tip={'Changing...'} spinning={isLoading}>
                    <div className={'flex flex-col justify-center items-center p-4 gap-2'}>
                        <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                        >
                            <Form.Item label="New Password"
                                       name="password"
                                       rules={[{ required: true, message: 'Please input your new password!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Accept Password"
                                       name="repassword"
                                       rules={[{ required: true, message: 'Please input password again!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item className={'flex items-center justify-center'}>
                                <Button type="primary" htmlType="submit" danger className={'min-w-[200px]'}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Spin>
            </div>
        </div>
    );
};

export default Otp;
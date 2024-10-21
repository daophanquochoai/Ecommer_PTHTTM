import React, {useContext, useState} from 'react';
import type { FormProps } from 'antd';
import {Button, Checkbox, Form, Input, Spin} from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
import {loginAccount, parseJwt} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";

type FieldType = {
    username?: string;
    password?: string;
};

const Login : React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setIsLogin} = useContext(AppContext)
    const navigation = useNavigate();
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        if( values.username === undefined || values.password === undefined) {
            toast.error("Fill full account!!")
            setIsLoading(false);
            return;
        }
        const data = await loginAccount(values.username, values.password);
        if( data.data.code != 200 ){
            toast.error("Don't Authentication!!")
            setIsLoading(false)
        }else{
            localStorage.setItem("accessToken", data.data.accessToken)
            localStorage.setItem("refreshToken", data.data.refreshToken)
            const token = parseJwt(localStorage.getItem("accessToken"))
            if( token.role === 'ADMIN' || token.role === "PRODUCTMANAGER"){
                scroll(0,0)
                navigation('/admin')
                return
            }
            setIsLogin(true)
            navigation('/');
            scroll(0,0)
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
       toast.error("Field didn't filled!!")
    };

    return (
        <Spin tip={"Login..."} spinning={isLoading}>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout={'vertical'}
                className={''}
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    className={'w-[200px] sm:w-[400px] md:w-[600px]'}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password/>
                </Form.Item>
                <div className={'mb-4'}>
                    <div className={'text-gray-400'}>
                        <NavLink to={'/register'} className={'hover:text-red-500'}>
                            Đăng kí tại đây
                        </NavLink>
                    </div>
                    <div className={'text-gray-400'}>
                        <NavLink to={'/forget'} className={'hover:text-red-500'}>
                            Quên mật khẩu?
                        </NavLink>
                    </div>
                </div>
                <Form.Item className={'flex items-center justify-center'}>
                    <Button type="primary" htmlType="submit" danger className={'min-w-[200px]'}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};

export default Login;
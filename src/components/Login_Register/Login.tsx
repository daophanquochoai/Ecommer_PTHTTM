import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import {NavLink} from "react-router-dom";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login : React.FC = () => {
    return (
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
                <Input/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
            >
                <Checkbox>Remember me</Checkbox>
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
    );
};

export default Login;
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import {NavLink} from "react-router-dom";

type FieldType = {
    email?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Forget : React.FC = () => {
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
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Please input your e-mail!' }]}
                className={'w-[200px] sm:w-[400px] md:w-[100%] text-xl'}
            >
                <Input />
            </Form.Item>
            <div className={'mb-4'}>
                <div className={'text-gray-400'}>
                    <NavLink to={'/login'} className={'hover:text-red-500'}>
                        Đăng nhập lại
                    </NavLink>
                </div>
            </div>
            <Form.Item className={'flex items-center justify-center'}>
                <Button type="primary" htmlType="submit" danger className={'min-w-[200px]'}>
                    Send my password
                </Button>
            </Form.Item>
            <p className={'text-gray-400 -mt-4 flex justify-center'}>Mật khẩu mới sẽ được gửi vào e-mail của bạn</p>
        </Form>
    );
};

export default Forget;
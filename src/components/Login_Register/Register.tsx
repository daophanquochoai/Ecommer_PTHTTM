import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Select,
    Upload,
} from 'antd';
import {NavLink} from "react-router-dom";

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="86">+84</Option>
        </Select>
    </Form.Item>
);
const Register : React.FC = () => {
    return (
        <Form
            layout="vertical"
            style={{ maxWidth: 600 }}
        >
            <div className={'flex gap-2'}>
                <Form.Item label="First name">
                    <Input />
                </Form.Item>
                <Form.Item label="Last name">
                    <Input />
                </Form.Item>
            </div>
            <Form.Item label="Email">
                <Input/>
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload action="/upload.do" maxCount={1} listType="picture-card">
                    <button style={{ border: 0, background: 'none' }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                </Upload>
            </Form.Item>
            <div className={'mb-4'}>
                <div className={'text-gray-400'}>
                    <NavLink to={'/login'} className={'hover:text-red-500'}>
                        Đăng nhập tại đây
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

export default Register;
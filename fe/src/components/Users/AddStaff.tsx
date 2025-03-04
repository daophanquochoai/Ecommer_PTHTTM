import React, { useState }  from 'react';
import {Upload, Input, Select, Form, Button} from "antd";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

const bread : object[] = [
    {
        title : <NavLink to={'/admin/users'}>Users</NavLink>
    },
    {
        title : <NavLink to={'/admin/users/staff'}>Staff</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Add Staff</span>
    }
]
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

const AddStaff: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };

    return (
        <div>
            <BreadCrumb bread={bread} />
            <div className='grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr] gap-10 mt-5'>
                <div>
                    <p className='font-bold'>Staff info</p>
                    <Form layout="vertical">
                        <div className={'flex gap-2'}>
                            <Form.Item label="First name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Last name">
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item label="Email">
                            <Input required />
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            <Input required addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Role">
                            <Select 
                                defaultValue="Select role"
                                style={{width: '200px'}}
                                options={[
                                    {
                                        value: 'role-order',
                                        label: 'Order manager',
                                    },
                                    {
                                        value: 'role-product',
                                        label: 'Product manager',
                                    },
                                    {
                                        value: 'role-payment',
                                        label: 'Payment manager',
                                    },
                                    {
                                        value: 'role-customer',
                                        label: 'Customer manager',
                                    },
                                    {
                                        value: 'role-admin',
                                        label: 'Administrator',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Avatar" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" maxCount={1} listType="picture-card">
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <Form.Item className={'flex items-center justify-center'}>
                            <Button type="primary" htmlType="submit" onClick={start} loading={loading} className={'min-w-[200px] mt-5'}>
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddStaff;
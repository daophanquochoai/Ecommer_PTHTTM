import React, { useState } from 'react';
import {NavLink} from "react-router-dom";
import {Image, Radio, Input, Button, Form, Select, Upload,} from "antd";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import type { RadioChangeEvent } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const bread : object[] = [
    {
        title : <NavLink to={'/admin/users'}>Users</NavLink>
    },
    {
        title : <NavLink to={'/admin/users/staff'}>Staff</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Staff Detail</span>
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
        <Select style={{ width: 70 }} defaultValue="+84" >
            <Option value="86">+84</Option>
        </Select>
    </Form.Item>
);
const StaffDetail : React.FC = () => {
    const [value, setValue] = useState('active');
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };
    const [fileList, setFileList] = useState([
        {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://cdn1.iconfinder.com/data/icons/office-and-internet-3/49/248-512.png',
        },
    ]);
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    return (
        <div>
            <BreadCrumb bread={bread} />
            <div className='grid grid-cols-1 md:grid-cols-[1.5fr_1.5fr_1fr] gap-10 mt-5'>
                <div>
                    <p className='font-bold'>Staff info</p>
                    <Form layout="vertical">
                        <div className={'flex gap-2'}>
                            <Form.Item label="First name">
                                <Input placeholder='Nguyễn'/>
                            </Form.Item>
                            <Form.Item label="Last name">
                                <Input placeholder='Văn A'/>
                            </Form.Item>
                        </div>
                        <Form.Item label="Email">
                            <Input required placeholder='nguyenvana@gmail.com'/>
                        </Form.Item>
                        <Form.Item label="Phone Number">
                            <Input required addonBefore={prefixSelector} style={{ width: '100%' }} placeholder='0987654321'/>
                        </Form.Item>
                        <Form.Item label="Role">
                            <Select 
                                defaultValue="Payment manager"
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
                            <Upload action="/upload.do" maxCount={1} listType="picture-card" fileList={fileList} onChange={handleChange}>
                                <button style={{ border: 0, background: 'none' }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </button>
                            </Upload>
                        </Form.Item>
                        <p className='font-bold mt-5'>Account status</p>
                        <div className='bg-white p-2 mt-2 shadow-lg border border-gray-200 rounded-lg'>
                            <Radio.Group onChange={onChange} value={value} className='flex flex-col'>
                                <Radio value={'active'}>Active</Radio>
                                <Radio value={'temp-locked'}>
                                    <div className='grid grid-cols-1 md:grid-cols-[2fr_3fr] flex items-center'>
                                        Temporarily locked
                                        {value === 'temp-locked' ? <Input required placeholder="Reason" style={{ width: 200 }} /> : null}
                                    </div>
                                </Radio>
                                <Radio value={'locked'}>
                                    <div className='grid grid-cols-1 md:grid-cols-[2fr_3fr] flex items-center'>
                                        Locked
                                        {value === 'locked' ? <Input required placeholder="Reason" style={{ width: 200 }} /> : null}
                                    </div>
                                </Radio>
                            </Radio.Group>
                        </div>
                        <Form.Item className={'flex items-center justify-center'}>
                            <Button type="primary" htmlType="submit" onClick={start} loading={loading} className={'min-w-[200px] mt-5'}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <p className='font-bold'>Activity history</p>  
                    <div className='bg-white p-2 w-full mt-2 shadow-lg border border-gray-200 rounded-lg'>

                    </div>  
                </div>
            </div>
        </div>
    );
};
export default StaffDetail;
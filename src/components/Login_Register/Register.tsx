import React, {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form, GetProp,
    Input, message,
    Select,
    Upload, UploadProps,
} from 'antd';
import {NavLink} from "react-router-dom";
import {toast} from "react-toastify";

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Select.Option value="86">+84</Select.Option>
        </Select>
    </Form.Item>
);

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        toast.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const Register : React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('')

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setImageUrl(info.file.response);
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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
            <Form.Item 
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
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
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={'http://localhost:8080/api/image'}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
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
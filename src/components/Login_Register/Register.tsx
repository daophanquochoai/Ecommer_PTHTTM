import React, {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form, FormProps, GetProp,
    Input, message,
    Select, Spin,
    Upload, UploadProps,
} from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {loginAccount, registerAccount} from "../../Utils/Helper.tsx";


type FieldType = {
    firstName?: string;
    lastName?:string;
    phone?:string;
    email?:string;
    username?: string;
    password?: string;
};


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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const navigation = useNavigate()

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

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        if(values.username == undefined || values.password == undefined || values.firstName == undefined || values.lastName == undefined || values.email == undefined  || values.phone == undefined)
        {
            toast.error("All field required!")
            setIsLoading(false)
            return
        }
        const data = await registerAccount(values.username, values.password, values.firstName, values.lastName, values.email, values.phone, imageUrl);
        console.log(data.data.code)
        if( data.data.code != 200 ){
            toast.error("Don't Authentication!!")
            setIsLoading(false)
        }else{
            navigation('/login');
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        toast.error("Field didn't filled!!")
    };

    return (
       <Spin spinning={isLoading} tip={"Registing..."}>
           <Form
               layout="vertical"
               style={{ maxWidth: 600 }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}

           >
               <div className={'flex gap-2'}>
                   <Form.Item label="First name" name="firstName" required>
                       <Input />
                   </Form.Item>
                   <Form.Item label="Last name" name="lastName" required>
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
                   name="password"
                   label="Password"
                   rules={[{ required: true, message: 'Please input your password!' }]}
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
                       name="image_url"
                       listType="picture-circle"
                       className="avatar-uploader"
                       showUploadList={false}
                       action={'http://localhost:3000/upload'}
                       beforeUpload={beforeUpload}
                       onChange={handleChange}
                   >
                       {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: "50%" }} /> : uploadButton}
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
       </Spin>
    );
};

export default Register;
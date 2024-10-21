import React, {useState} from 'react';
import type { FormProps } from 'antd';
import {Button, Form, Input, Spin} from 'antd';
import {NavLink, useNavigate} from "react-router-dom";
import {forgetPassword} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

type FieldType = {
    email?: string;
};
const Forget : React.FC = () => {

    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if( values.email === undefined ){
            toast.error("Email not empty!!")
        }
        setIsLoading(true)
        const response = await forgetPassword(values.email);
        setIsLoading(false)
        if( response.code === "ERR_NETWORK"){
            toast.error("NETWORK DON'T CONNECTED!!")
            return;
        }
        if( response.data.code === 200 ){
            navigation('/otp?email=' + values.email)
        }else{
            toast.error(response.data.message)
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
       toast.error(errorInfo.values.email)
    };
    return (
       <Spin spinning={isLoading} tip={"Send..."}>
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
                   required={true}
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
       </Spin>
    );
};

export default Forget;
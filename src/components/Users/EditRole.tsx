import React, {useState} from 'react';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {Checkbox, Input, Form, Button} from "antd";

const bread : object[] = [
    {
        title : <NavLink to={'/admin/users'}>Users</NavLink>
    },
    {
        title : <NavLink to={'/admin/users/staff'}>Staff</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Edit Role</span>
    }
]
const permissions = ['View', 'Create', 'Edit', 'Delete', 'Manage'];
const modules = ['Product', 'Order', 'Payment', 'Customer', 'Report', 'Website content', 'System settings'];

const EditRole : React.FC = () => {
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
                    <Form layout="vertical">
                        <Form.Item label="Role name">
                            <Input required placeholder='Administrator' />
                        </Form.Item>
                        <div className={'flex gap-20'}>
                            <Form.Item label="Permissions">
                                <Checkbox.Group options={permissions} className='flex flex-col' defaultValue={permissions} />
                            </Form.Item>
                            <Form.Item label="Modules"> 
                                <Checkbox.Group options={modules} className='flex flex-col' defaultValue={modules} />
                            </Form.Item>
                        </div>
                        <Form.Item className={'flex items-center justify-center'}>
                            <Button type="primary" htmlType="submit" onClick={start} loading={loading} className={'min-w-[200px] mt-5'}>
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditRole;
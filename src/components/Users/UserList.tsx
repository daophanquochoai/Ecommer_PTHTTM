import React from 'react';
import {
    RightOutlined, 
    TeamOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import {NavLink} from "react-router-dom";

const UserList : React.FC = () => {
    return (
        <>
            <div>
                <p className='font-bold text-xs md:text-base'>Users</p>
                <NavLink to={'/admin/users/customer'}>
                    <div className='bg-white p-2 w-full h-full mt-2 flex shadow-lg border border-gray-200 rounded-lg cursor-default hover:bg-gray-50'>
                        <TeamOutlined style={{ fontSize: '32px' }} className='p-2'/>
                        <div className="flex flex-col w-full ml-3">
                            <p>Customer</p>
                            <p className='text-sm text-gray-400'>Customer list, customer details, customer wishlist</p>
                        </div>
                        <div className="flex justify-end w-full">
                            <RightOutlined />
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/admin/users/staff'}>
                    <div className='bg-white p-2 w-full h-full mt-2 flex shadow-lg border border-gray-200 rounded-lg cursor-default hover:bg-gray-50'>
                        <SolutionOutlined style={{ fontSize: '32px' }} className='p-2'/>
                        <div className="flex flex-col w-full ml-3">
                            <p>Staff</p>
                            <p className='text-sm text-gray-400'>Staff list, staff details, role list</p>
                        </div>
                        <div className="flex justify-end w-full">
                            <RightOutlined />
                        </div>
                    </div>
                </NavLink>
            </div>
        </>
    );
};

export default UserList;
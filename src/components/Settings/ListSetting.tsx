import React from 'react';
import {
    RightOutlined, 
    DesktopOutlined,
    PhoneOutlined,
    FieldTimeOutlined,
    PayCircleOutlined
} from '@ant-design/icons';
import {NavLink} from "react-router-dom";

const ListSetting : React.FC = () => {
    return (
        <>
            <div>
                <p className='font-bold text-xs md:text-base'>Settings</p>
                <NavLink to={'/admin/settings/about-web'}>
                    <div className='bg-white p-2 w-full h-full mt-2 flex shadow-lg border border-gray-200 rounded-lg cursor-default hover:bg-gray-50'>
                        <DesktopOutlined style={{ fontSize: '32px' }} className='p-2'/>
                        <div className="flex flex-col w-full ml-3">
                            <p>About website</p>
                            <p className='text-sm text-gray-400'>Website name, Website logo</p>
                        </div>
                        <div className="flex justify-end w-full">
                            <RightOutlined />
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/admin/settings/contact-info'}>
                    <div className='bg-white p-2 w-full h-full mt-2 flex shadow-lg border border-gray-200 rounded-lg cursor-default hover:bg-gray-50'>
                        <PhoneOutlined style={{ fontSize: '32px' }} className='p-2'/>
                        <div className="flex flex-col w-full ml-3">
                            <p>Contact information</p>
                            <p className='text-sm text-gray-400'>Address, support phone number, contact email</p>
                        </div>
                        <div className="flex justify-end w-full">
                            <RightOutlined />
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/admin/settings/time-language'}>
                    <div className='bg-white p-2 w-full h-full mt-2 flex shadow-lg border border-gray-200 rounded-lg cursor-default hover:bg-gray-50'>
                        <FieldTimeOutlined style={{ fontSize: '32px' }} className='p-2'/>
                        <div className="flex flex-col w-full ml-3">
                            <p>Time & language</p>
                            <p className='text-sm text-gray-400'>System time zones, preferred languages, default country or region</p>
                        </div>
                        <div className="flex justify-end w-full">
                            <RightOutlined />
                        </div>
                    </div>
                    </NavLink>
                <NavLink to={'/admin/settings/payment'}>
                    <div className='bg-white p-2 w-full h-full mt-2 flex shadow-lg border border-gray-200 rounded-lg cursor-default hover:bg-gray-50'>
                        <PayCircleOutlined style={{ fontSize: '32px' }} className='p-2'/>
                        <div className="flex flex-col w-full ml-3">
                            <p>Payment</p>
                            <p className='text-sm text-gray-400'>Currency, configure payment method</p>
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

export default ListSetting;
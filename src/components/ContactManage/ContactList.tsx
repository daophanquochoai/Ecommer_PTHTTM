import React from 'react';
import {NavLink} from "react-router-dom";
import {MailOutlined} from '@ant-design/icons';

const ContactList : React.FC = () => {
    return (
        <>
            <div>
                <p className='font-bold text-xs md:text-base'>Contact</p>
                <NavLink to={'/admin/contact/:id'}>
                    <div className={'bg-white mt-3 group shadow-lg cursor-pointer border border-gray-200 hover:border-black'}>
                        <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr_6fr_1fr] items-center'>
                            <MailOutlined style={{ fontSize: '32px' }} className={'p-2 text-gray-400 group-hover:text-black'} />
                            <p className={'font-bold'}>nguyenvanb@gmail.com</p>
                            <p className={'font-bold mr-5'}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Complaint about recent service
                            </p>
                            <p className={'font-bold'}>Nov 10</p>
                        </div>
                    </div>
                </NavLink>
                <NavLink to={'/admin/contact/:id'}>
                    <div className={'bg-gray-80 mt-3 group shadow-lg cursor-pointer border border-gray-200 hover:border-black'}>
                    <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr_6fr_1fr] items-center'>
                            <MailOutlined style={{ fontSize: '32px' }} className={'p-2 text-gray-400 group-hover:text-black'} />
                            <p>lethic@gmail.com</p>
                            <p className={'mr-5'}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                Technical support needed
                            </p>
                            <p>Nov 9</p>
                        </div>
                    </div>
                </NavLink>
            </div>
            
        </>
    );
};

export default ContactList;
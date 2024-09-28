import React, {useState} from 'react';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {Button} from 'antd';

const bread = [
    {
        title : <NavLink to={'/admin/settings'}>Settings</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Contact information</span>
    }
]

const ContactInfo : React.FC = () => {
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
            <form>
                <p className='font-bold mt-5'>Address</p>
                <input required placeholder='139 Brook Drive South Richmond Hill, NY' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white' />
                <p className='font-bold mt-5'>Support phone number</p>
                <input required placeholder='(+084) 779-127-667' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white' />
                <p className='font-bold mt-5'>Contact email</p>
                <input required placeholder='dpquochoai@gmail.com' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white' />
                <div>
                    <Button type="primary" onClick={start} loading={loading} className='mt-5 ml-2'>
                        Apply
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ContactInfo;
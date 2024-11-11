import React from 'react';
import {NavLink} from "react-router-dom";
import BreadCrumb from "../Body/BreadCrumb.tsx";
const bread = [
    {
        title : <NavLink to={'/admin/contact'}>Contact</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Response Contact</span>
    }
]

const ResponseContact : React.FC = () => {
    return (
        <div>
            <BreadCrumb bread={bread} />
            <div className={'grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 p-6'}>
                <div>
                    <p className='font-bold text-xs md:text-base'>Customer Contact</p> 
                    <div className='bg-white p-2 border border-gray-200 rounded-lg mt-5'>
                        <p className='text-2xl'>Complaint about recent service</p>
                        <p className='font-bold mt-2'>Nguyen Van B</p>
                        <div className='flex justify-end'>
                            <p className='text-sm text-gray-400 mt-0.5 mr-5'>nguyenvanb@gmail.com</p>
                            <p className='text-sm text-gray-400 mt-0.5 ml-5'>9:00 November 10, 2024</p>
                        </div>
                        <p className='mt-2'>
                            Hello,<br />
                            <br />
                            I'm writing to express my disappointment with the recent service I received. The product I ordered was damaged upon arrival, and the customer service response was not satisfactory. I would appreciate it if you could address this issue promptly.<br />
                            <br />
                            Thank you,<br />
                            Nguyễn Văn B<br />
                            Email: nguyenvanb@gmail.com
                        </p>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-xs md:text-base'>Response Contact</p>
                    <form className='bg-white p-2 border border-gray-200 rounded-lg mt-5'>
                        <div className='grid grid-cols-[1fr_4fr] items-center mb-5'>
                            <label className='font-bold'>To <span className='text-red-500'>*</span></label>
                            <input required className='p-2 outline-0 border-b-2 border-red-500' 
                                value='nguyenvanb@gmail.com'
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_4fr] items-center mb-5'>
                            <label className='font-bold'>Title <span className='text-red-500'>*</span></label>
                            <input required className='p-2 outline-0 border-b-2 border-red-500' 
                                value='Response to complaint about recent service'
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_4fr] items-center mb-5'>
                            <label className='font-bold'>Response <span className='text-red-500'>*</span></label>
                            <textarea className='p-2 outline-0 border-b-2 border-red-500 h-36' />
                        </div>
                        <div>
                            <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'} >RESPONSE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResponseContact;
import React from 'react';
import {NavLink} from "react-router-dom";
import {Image, Button} from "antd";
import {UserOutlined, CalendarOutlined} from '@ant-design/icons';

const BlogList : React.FC = () => {
    return (
        <>
            <div>
                <p className='font-bold text-xs md:text-base'>Blogs</p>
                <NavLink to={'/admin/blogs/add-blog'}>
                    <Button type="primary" className='mt-4'>
                        New Blog
                    </Button>
                </NavLink>
                <NavLink to={'/admin/blogs/:id'}>
                    <div className={'bg-white mt-3 group shadow-lg cursor-pointer border border-gray-200 rounded-lg'}>
                        <div className={'grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4 p-6 items-center'}>
                            <Image
                                width={200}
                                height={134}
                                src="https://demo-60.woovinapro.com/wp-content/uploads/2019/07/blog-2.jpg"
                                preview={false}
                                className='p-1 transition-all duration-300 group-hover:scale-105'
                            />
                            <div className={'grid gap-4'}>
                                <h2 className={'group-hover:text-red-500 transition-all duration-300 text-base md:text-2xl lg:text-3xl font-bold'}>Sample post with format link</h2>
                                <hr className={'border-1 border-gray-400'}/>
                                <div className={'flex justify-end'}>
                                    <UserOutlined/>
                                    <p className={'text-[15px] text-red-500 font-bold'}>&nbsp;admin</p>
                                </div>
                                <div className={'flex justify-end'}>
                                    <CalendarOutlined/>
                                    <p className={'text-[15px] text-red-500 font-bold'}>&nbsp;November 8, 2024</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </NavLink>
            </div>
            
        </>
    );
};

export default BlogList;
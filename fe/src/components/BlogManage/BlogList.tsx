import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {Image, Button, Pagination} from "antd";
import {UserOutlined, CalendarOutlined} from '@ant-design/icons';
import {getListBlog} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";

type Blog = {
    blog_id : number,
    content : string,
    image_url : string,
    createdAt : string,
    title : string
}

const BlogList : React.FC = () => {
    const [data, setData] = useState<Blog[]>([]);
    const [pageTotal, setPageTotal] = useState<number>(0);
    const {page, setPage} = useContext(AppContext);
    const [searchKey, setSearchKey] = useState<string>('');

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListBlog(page);
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            // console.log(response);
            setPageTotal(response.data.totalPage)
            const arrBlogs : Blog[] = [];
            if(response.data.code == 200)
            {
                response.data.data.forEach(item => {
                    arrBlogs.push({
                        blog_id : item.blog_id,
                        content : item.content,
                        image_url : item.image_url ? JSON.parse(item.image_url)[0] : "",
                        createdAt : new Date(item.createdAt).toLocaleDateString(),
                        title : item.title
                    })
                })
                setData(arrBlogs);
            }
            else
            {
                toast.error("Error get data's blogs");
            }
        }
        fetchApi();
    }, [page]);

    // console.log(data);
    const filteredContacts = data.filter(blog =>
        blog.title.toLowerCase().includes(searchKey.toLowerCase())
    );

    return (
        <>
            <div>
                <p className='font-bold text-xs md:text-base'>Blogs</p>
                <NavLink to={'/admin/blogs/add-blog'}>
                    <Button type="primary" className='mt-4'>
                        New Blog
                    </Button>
                </NavLink>
                <div className="flex justify-end">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchKey}
                        onChange={e => setSearchKey(e.target.value)}
                        className="border p-2 mb-3 w-[50%] rounded-[5px]"
                    />
                </div>
                {filteredContacts.map((item, index) => (
                    <NavLink to={`/admin/blogs/${item.blog_id}`} key={index}>
                        <div className={'bg-white mt-3 group shadow-lg cursor-pointer border border-gray-200 rounded-lg'}>
                            <div className={'grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-4 p-6 items-center'}>
                                <Image
                                    width={200}
                                    height={134}
                                    src={item.image_url}
                                    preview={false}
                                    className='p-1 transition-all duration-300 group-hover:scale-105'
                                />
                                <div className={'grid gap-4'}>
                                    <h2 className={'group-hover:text-red-500 transition-all duration-300 text-base md:text-2xl lg:text-3xl font-bold'}>{item.title}</h2>
                                    <hr className={'border-1 border-gray-400'}/>
                                    <div className={'flex justify-end'}>
                                        <UserOutlined/>
                                        <p className={'text-[15px] text-red-500 font-bold'}>&nbsp;admin</p>
                                    </div>
                                    <div className={'flex justify-end'}>
                                        <CalendarOutlined/>
                                        <p className={'text-[15px] text-red-500 font-bold'}>&nbsp;{item.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className={'p-5 flex items-center justify-center w-full'}>
                <div>
                    <Pagination
                        current={page + 1}
                        onChange={e => setPage(e - 1)}
                        total={pageTotal*8}
                        showSizeChange={false}
                        defaultPageSize={8}
                        responsive={true}
                    />
                </div>
            </div>

        </>
    );
};
export default BlogList;
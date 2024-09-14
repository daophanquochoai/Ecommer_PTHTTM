import React, {useState} from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import BlogsItem from "../components/Blogs/BlogsItem.tsx";
import ListCategory from "../components/Product/ListCategory.tsx";
import SubBlogItem from "../components/Blogs/SubBlogItem.tsx";
import {Pagination} from "antd";


const bread = [
    {
        title : <NavLink to={'/'}>HOME</NavLink>
    },
    {
        title : <span className={'text-red-500'}>BLOGS</span>
    }
]

const Blogs : React.FC = () => {
    const [page, setPage] = useState<number>(1)
    return (
        <div className={'mx-[5%] mt-2'}>
            <BreadCrumb bread={bread}/>
            <div className={'p-8 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6'}>
                <div>
                    <BlogsItem />
                    <BlogsItem />
                    <BlogsItem />
                    <BlogsItem />
                    <BlogsItem />
                    <BlogsItem />
                    <div className={'p-5 flex items-center justify-center w-full'}>
                        <div>
                            <Pagination
                                current={page}
                                onChange={e => setPage(e)}
                                total={100}
                                showSizeChanger={false}
                                defaultPageSize={8}
                                responsive={true}
                            />
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <div className={'p-4 bg-white'}>
                        <span className={'pb-2 border-b-2 border-red-500 text-xs sm:text-base lg:text-2xl font-bold'}>Product categories</span>
                        <input className={'mt-6 outline-0 p-2 border w-full'} placeholder={'Search'}/>
                    </div>
                    <div>
                        <ListCategory />
                    </div>
                    <div className={'p-4 bg-white'}>
                        <span className={'pb-2 border-b-2 border-red-500 text-xs sm:text-base lg:text-2xl font-bold'}>Product categories</span>
                        <div className={'mt-6 grid gap-3 max-h-[400px] overflow-y-scroll'}>
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                            <SubBlogItem />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs ;
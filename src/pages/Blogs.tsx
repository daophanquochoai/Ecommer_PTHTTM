import React, {useEffect, useState} from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import BlogsItem from "../components/Blogs/BlogsItem.tsx";
import ListCategory from "../components/Product/ListCategory.tsx";
import SubBlogItem from "../components/Blogs/SubBlogItem.tsx";
import {Pagination} from "antd";
import {getBlog, getBlogByPage, getBlogByRecent} from "../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import Skeleton from "react-loading-skeleton";


const bread = [
    {
        title : <NavLink to={'/'}>HOME</NavLink>
    },
    {
        title : <span className={'text-red-500'}>BLOGS</span>
    }
]

type Blog = {
    blog_id : number,
    content : string,
    image_url : string,
    createdAt : string,
    title : string
}
const Blogs : React.FC = () => {
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [blogSource, setBlogSource] = useState<Blog[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)
    const [loadingSub, setLoadingSub] = useState<boolean>(false)
    const [subSource, setSubSource] = useState<Blog[]>([])


    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            const response = await getBlogByPage(page);
            setLoading(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const arr : Blog[] = []
                response.data.data.forEach( item => {
                    arr.push({
                            blog_id : item.blog_id,
                            content : item.content,
                            image_url : JSON.parse(item.image_url) === null ? '' : JSON.parse(item.image_url)[0],
                            createdAt : new Date(item.createdAt).toLocaleDateString(),
                            title : item.title
                        }
                    )
                })
                setBlogSource(arr)
                setTotalPage(response.data.totalPage)
            }else{
                toast.error(response.data.message)
            }
        }
        fetchBlog()
    }, [page]);

    useEffect(() => {
        const fetchBlogRecent = async () => {
            setLoadingSub(true)
            const response = await getBlogByRecent();
            setLoadingSub(false);
            console.log(response)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const arr : Blog[] = []
                response.data.data.forEach( item => {
                    arr.push({
                            blog_id : item.blog_id,
                            content : item.content,
                            image_url : JSON.parse(item.image_url) === null ? '' : JSON.parse(item.image_url)[0],
                            createdAt : new Date(item.createdAt).toLocaleDateString(),
                            title : item.title
                        }
                    )
                })
                setSubSource(arr)
            }else{
                toast.error(response.data.message)
            }
        }
        fetchBlogRecent()
    }, []);
    return (
        <div className={'mx-[5%] mt-2'}>
            <BreadCrumb bread={bread}/>
            <div className={'p-8 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6'}>
                <div>
                    {
                        loading ?
                            <>
                                <Skeleton className={'h-[300px]'}/>
                            </>
                            :
                            <>
                                {
                                    blogSource.map( (item, index) =>
                                        <BlogsItem {...item} key={index}/>
                                    )
                                }
                            </>
                    }

                    <div className={'p-5 flex items-center justify-center w-full'}>
                        <div>
                            {!loading && <Pagination
                                current={page}
                                onChange={e => {scroll(0,0); setPage(e)}}
                                total={totalPage*5}
                                showSizeChanger={false}
                                defaultPageSize={5}
                                responsive={true}
                            />}
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                    <div className={'p-4 bg-white'}>
                        <span className={'pb-2 border-b-2 border-red-500 text-xs sm:text-base lg:text-2xl font-bold'}>Search</span>
                        <input className={'mt-6 outline-0 p-2 border w-full'} placeholder={'Search'}/>
                    </div>
                    <div>
                        <ListCategory />
                    </div>
                    <div className={'p-4 bg-white'}>
                        <span className={'pb-2 border-b-2 border-red-500 text-xs sm:text-base lg:text-2xl font-bold'}>Recent Post</span>
                        <div className={'mt-6 grid gap-3 max-h-[400px] overflow-y-scroll'}>
                            {
                                loadingSub ?
                                    <>
                                    </>
                                    :
                                    <>
                                        {
                                            subSource.map( item =>
                                                <SubBlogItem {...item}/>
                                            )
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs ;
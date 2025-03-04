import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";

type Blog = {
    blog_id : number,
    content : string,
    image_url : string,
    createdAt : string,
    title : string
}
const BlogsItem : React.FC = ( props : Blog) => {
    return (
        <div className={'bg-white group cursor-pointer border'}>
            <div className={'grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 p-6 items-center'}>
                <img className={'transition-all duration-300 group-hover:scale-105'} src={props.image_url} alt={''}/>
                <div className={'grid gap-4'}>
                    <h2 className={'group-hover:text-red-500 transition-all duration-300 text-base md:text-2xl lg:text-3xl font-bold'}>{props.title}</h2>
                    <p className={'group-hover:text-gray-500 text-gray-400'}>{props.content}</p>
                    <hr className={'border-1 border-gray-400'}/>
                    <div className={'flex justify-end'}>
                        <p className={'text-[15px] text-red-500 font-bold'}>{props.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogsItem;
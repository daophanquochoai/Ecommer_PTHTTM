import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";


type Blog = {
    blog_id : number,
    content : string,
    image_url : string,
    createdAt : string,
    title : string
}
const SubBlogItem : React.FC = ( props : Blog) => {
    return (
        <div className={'group cursor-pointer'}>
            <div className={'grid grid-cols-[1fr_2fr] items-center gap-4'}>
                <img className={'group-hover:scale-105 transition-all duration-300'} src={props.image_url} alt={''}/>
                <div className={'flex flex-col items-center'}>
                    {props.title}
                </div>
            </div>
        </div>
    );
};

export default SubBlogItem;
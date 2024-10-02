import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";

const SubBlogItem : React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className={'group cursor-pointer'}>
            <div className={'grid grid-cols-[1fr_2fr] items-center gap-4'}>
                {
                    isLoading ?
                        <Skeleton className={'h-[60px]'}/>
                        :
                        <img className={'group-hover:scale-105 transition-all duration-300'} src={'https://demo-60.woovinapro.com/wp-content/uploads/2019/07/blog-2.jpg'} alt={''}/>
                }
                <div className={'flex flex-col items-center'}>
                    {}
                </div>
            </div>
        </div>
    );
};

export default SubBlogItem;
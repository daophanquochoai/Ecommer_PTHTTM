import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";

const BlogsItem : React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className={'bg-white group cursor-pointer border'}>
            <div className={'grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 p-6 items-center'}>
                {
                    isLoading ?
                        <Skeleton className={'h-[220px]'}/>
                        :
                        <img className={'transition-all duration-300 group-hover:scale-105'} src={'https://demo-60.woovinapro.com/wp-content/uploads/2019/07/blog-2.jpg'} alt={''}/>

                }
                <div className={'grid gap-4'}>
                    {
                        isLoading ?
                            <>
                                <Skeleton />
                                <Skeleton count={4}/>
                                <Skeleton />
                            </>
                            :
                            <>
                                <h2 className={'group-hover:text-red-500 transition-all duration-300 text-base md:text-2xl lg:text-3xl font-bold'}>Sample post with format link</h2>
                                <p className={'group-hover:text-gray-500 text-gray-400'}>Phasellus sit amet elits sem. Maecenas eleifend exid id magna pretium tincidunt. Nam vel venenatis odio. Sed in metus eu dui gravida elementum. Fusce vehicula mauris quis interdum consequat. In cursus est faucibus odio auctor dapibus. Aliquam interdum, lacus et euismod volutpat, enim metus hendrerit turpis, a maximus erat sem nec orci. Proin suscipit ullamcorper mattis. Sed vehicula sit amet risus hendrerit viverra.</p>
                                <hr className={'border-1 border-gray-400'}/>
                                <div className={'flex justify-end'}>
                                    <p className={'text-[15px] text-red-500 font-bold'}>May 10, 2023</p>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogsItem;
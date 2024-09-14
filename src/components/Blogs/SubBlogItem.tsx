import React from 'react';

const SubBlogItem : React.FC = () => {
    return (
        <div className={'group cursor-pointer'}>
            <div className={'grid grid-cols-[1fr_2fr] items-center gap-4'}>
                <img className={'group-hover:scale-105 transition-all duration-300'} src={'https://demo-60.woovinapro.com/wp-content/uploads/2019/07/blog-2.jpg'} alt={''}/>
                <div className={'flex flex-col items-center'}>
                    <h4 className={'font-[600] group-hover:text-red-500 transition-all duration-300'}>Sample post with format link</h4>
                    <p className={'text-xs text-gray-400 group-hover:text-black transition-all duration-300'}>May 10, 2023</p>
                </div>
            </div>
        </div>
    );
};

export default SubBlogItem;
import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const SearchItem : React.FC= () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
            {
                isLoading ?
                    <>
                        <Skeleton className={'w-[100px] h-[110px]'}/>
                        <Skeleton className={'w-[100px] h-[20px]'}/>
                    </>
                    :
                    <>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </>
            }
        </div>
    );
};

export default SearchItem;
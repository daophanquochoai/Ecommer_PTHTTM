import React, {useEffect, useState} from 'react';
import {Rate} from "antd";
import Skeleton from "react-loading-skeleton";

type Props = {
    sale : number,
    image : string,
    like : boolean,
    title : string,
    star : number,
    price : number,
    priceOld : number,
    selled : number
}

const ProductRate : React.FC= ( props : Props ) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(false);
    }, [props]);

    return (
        <div>
            <div className={'grid grid-cols-[1fr_2fr] items-center gap-4 py-2 cursor-pointer group'}>
                <div>
                    {
                        isLoading ?
                            <Skeleton className={'w-full h-[90px]'}/>
                            :
                            <img src={props.image} alt={props.title} className={'group-hover:scale-105 transition-all duration-300'}/>
                    }
                </div>
                <div>
                    {
                        isLoading ?
                            <Skeleton className={'h-[30px]'}/>
                            :
                            <p className={'shortcut'}>{props.title}</p>
                    }
                    <div className={'flex'}>
                        {isLoading ?
                            <Skeleton className={'h-[20px] w-[100px]'}/>
                            :
                            <Rate disabled defaultValue={props.star} rootClassName={'text-xs md:text-base lg:text-xl'}/>
                        }
                    </div>
                    <div className={'flex justify-between mt-2'}>
                        {
                            isLoading ?
                                <>
                                    <Skeleton className={'h-[20px] w-[40px]'}/>
                                    <Skeleton className={'h-[20px] w-[40px]'}/>
                                </>
                                :
                                <>
                                    <del className={'text-gray-400'}>${props.priceOld.toLocaleString()}đ</del>
                                    <span className={'font-bold'}>${props.price.toLocaleString()}đ</span>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductRate ;
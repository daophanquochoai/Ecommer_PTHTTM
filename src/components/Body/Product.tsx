import React, {useState} from 'react';
import {Rate} from "antd";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import AddCart from './AddCart.tsx';
import AddWishlist from './AddWishlist.tsx';
import QuickView from './QuickView.tsx';

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
const Product : React.FC = ( props : Props ) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate()

    return (
        <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
            <div className={'relative'}>
                <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>{props.sale}%</span>
                {
                    isLoading ?
                        <Skeleton className={'w-full h-[200px]'}/>
                        :
                        <img src={props.image} className={'w-full h-full object-center'} alt={''}/>
                }
                {
                    !isLoading && <>
                        <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                            <AddCart />
                            <AddWishlist />
                            <QuickView {...props} />
                        </div>
                    </>
                }
            </div>
            <div onClick={()=>{
                scrollTo(0,0);
                {!isLoading && navigate(`/category/${[props.title]}`)}
            }} className={'p-2 z-10 relative bg-white'}>
                <div>
                    {
                        isLoading ?
                            <Skeleton className={'h-[40px]'}/>
                            :
                            <h4 className={'text-[11px] md:text-xl font-bold shortcut'}>{props.title}</h4>
                    }
                </div>
                <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                    <div className={'flex'}>
                        {
                            isLoading   ?
                                <Skeleton className={'w-[110px] h-[20px]'}/>
                                :
                                <Rate disabled defaultValue={props.star} />
                        }
                    </div>
                    {
                        isLoading ?
                            <Skeleton className={'h-[20px] w-[50px]'}/>
                            :
                            <p className={'text-[11px] sm:text-base text-gray-400'}>{props.selled} Sold</p>
                    }
                </div>
                <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                    {
                        isLoading  ?
                            <>
                                <Skeleton className={'w-[40px] h-[20px]'}/>
                                <Skeleton className={'w-[40px] h-[20px]'}/>
                            </>
                            :
                            <>
                                <p className={'text-[11px] sm:text-base'}>${props.price}</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>${props.priceOld}</del>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;
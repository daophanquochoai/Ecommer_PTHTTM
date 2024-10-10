import React from 'react';
import {Rate} from "antd";
import {useNavigate} from "react-router-dom";
import AddCart from './AddCart.tsx';
import AddWishlist from './AddWishlist.tsx';
import QuickView from './QuickView.tsx';
import Skeleton from "react-loading-skeleton";

type Props = {
    sale : number | undefined,
    image : string | undefined,
    like : boolean | undefined,
    title : string | undefined,
    star : number | undefined,
    price : number | undefined,
    priceOld : number | undefined,
    selled : number | undefined,
    isLoading: boolean
}
const ProductGrib : React.FC = ( props : Props ) => {

    const navigate = useNavigate()
    return (
        <div className={'px-7'}>
            <div className={'border grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_3fr] hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                <div className={'relative'}>
                    <span className={`absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm ${props.sale === 0 && "hidden"}`}>{props.sale}%</span>
                    {
                        props.isLoading ?
                            <Skeleton className={'w-full h-[200px]'}/>
                            :
                            <img src={props.image} className={'w-full h-full object-center'} alt={''}/>
                    }
                    {
                        !props.isLoading &&
                        <>
                            <div className={'flex flex-col absolute h-full bg-white right-[-68px] top-0 p-3 items-center justify-center gap-3 group-hover:right-0 transition-all duration-300'}>
                                <AddCart />
                                <AddWishlist />
                                <QuickView {...props} />
                            </div>
                        </>
                    }
                </div>
                <div onClick={()=>{
                    scrollTo(0,0);
                    navigate(`/category/${[props.title]}`)
                }} className={'p-7 flex flex-col gap-4 z-10 relative bg-white'}>
                    <div>
                        {
                            props.isLoading ?
                                <Skeleton className={'h-[40px]'}/>
                                :
                                <h4 className={'text-[11px] text-base md:text-xl font-bold shortcut'}>{props.title}</h4>
                        }
                    </div>
                    <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                        <div className={'flex'}>
                            {
                                props.isLoading   ?
                                    <Skeleton className={'w-[110px] h-[20px]'}/>
                                    :
                                    <Rate disabled defaultValue={props.star} />
                            }
                        </div>
                        {
                            props.isLoading ?
                                <Skeleton className={'h-[20px] w-[50px]'}/>
                                :
                                <p className={'text-[11px] sm:text-base text-gray-400'}>{props.selled} Sold</p>
                        }
                    </div>
                    <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                        {
                            props.isLoading  ?
                                <>
                                    <Skeleton className={'w-[40px] h-[20px]'}/>
                                    <Skeleton className={'w-[40px] h-[20px]'}/>
                                </>
                                :
                                <>
                                    <p className={'text-[11px] sm:text-base'}>${props.price.toLocaleString()}</p>
                                    <del className={'text-[11px] sm:text-base text-gray-400'}>${props.priceOld}</del>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGrib;
import React, {useContext, useEffect, useState} from 'react';
import {Rate} from "antd";
import {useNavigate} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import AddCart from './AddCart.tsx';
import AddWishlist from './AddWishlist.tsx';
import QuickView from './QuickView.tsx';
import {addItemToCart} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";

type Props = {
    id : number,
    sale : number | undefined,
    image : string | undefined,
    like : boolean | undefined,
    title : string | undefined,
    star : number | undefined,
    price : number | undefined,
    priceOld : number | undefined,
    selled : number | undefined,
    isLoading: boolean,
    setPrductData: Function,
    dataProduct: object
}
const Product : React.FC = ( props : Props ) => {
    const navigate = useNavigate()

    useEffect(() => {
        // console.log(props)
    }, []);

    return (
        <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
            <div className={'relative h-[50%]'}>
                <span className={`${props.sale === null && 'hidden'} absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm ${props.sale == 0 && 'hidden'}`}>{props.sale}%</span>
                {
                    props.isLoading ?
                        <Skeleton className={'w-full h-[200px]'}/>
                        :
                        <img src={props.image} className={'w-full h-full object-center'} alt={''}/>
                }
                {
                    !props.isLoading && <>
                        <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                            <AddCart {...props}/>
                            <AddWishlist {...props}/>
                            <QuickView {...props} />
                        </div>
                    </>
                }
            </div>
            <div onClick={()=>{
                scrollTo(0,0);
                {!props.isLoading && navigate(`/category/${[props.id]}`)}
            }} className={'p-2 z-10 relative bg-white'}>
                <div>
                    {
                        props.isLoading ?
                            <Skeleton className={'h-[40px]'}/>
                            :
                            <h4 className={'text-[11px] md:text-xl font-bold shortcut'}>{props.title}</h4>
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
                            <p className={` text-[11px] sm:text-base text-gray-400`}>{props.selled} Sold</p>
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
                                <p className={'text-[11px] sm:text-base'}>{props.price.toLocaleString()}đ</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>{props.priceOld.toLocaleString()}đ</del>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;
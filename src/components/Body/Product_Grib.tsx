import React from 'react';
import {CiHeart, CiSearch, CiShoppingCart} from "react-icons/ci";
import {Rate} from "antd";
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
const ProductGrib = ( props : Props ) => {
    return (
        <div className={'px-7'}>
            <div className={'border grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_3fr] hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                <div className={'relative'}>
                    <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>{props.sale}%</span>
                    <img src={props.image} className={'w-full h-full object-center'} alt={''}/>
                    <div className={'flex flex-col absolute h-full bg-white right-[-68px] top-0 p-3 items-center justify-center gap-3 group-hover:right-0 transition-all duration-300'}>
                        <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                        <CiHeart className={`text-2xl ${props.like ? 'text-red-500' : ''} hover:text-red-500 cursor-pointer`} />
                        <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                    </div>
                </div>
                <div className={'p-7 flex flex-col gap-4 z-10 relative bg-white'}>
                    <div>
                        <h4 className={'text-[11px] text-base md:text-xl font-bold shortcut'}>{props.title}</h4>
                    </div>
                    <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                        <div className={'flex'}>
                            <Rate disabled defaultValue={props.star} />
                        </div>
                        <p className={'text-[11px] sm:text-base text-gray-400'}>{props.selled} Sold</p>
                    </div>
                    <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                        <p className={'text-[11px] sm:text-base'}>${props.price}</p>
                        <del className={'text-[11px] sm:text-base text-gray-400'}>${props.priceOld}</del>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGrib;
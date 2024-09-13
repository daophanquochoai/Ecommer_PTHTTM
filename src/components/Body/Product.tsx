import React from 'react';
import {CiHeart, CiSearch, CiShoppingCart, CiStar} from "react-icons/ci";
import {Rate} from "antd";
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate()

    return (
        <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
            <div className={'relative'}>
                <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>{props.sale}%</span>
                <img src={props.image} className={'w-full h-full object-center'} alt={''}/>
                <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                    <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                    <CiHeart className={`text-2xl ${props.like ? 'text-red-500' : ''} hover:text-red-500 cursor-pointer`} />
                    <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                </div>
            </div>
            <div onClick={()=>{
                scrollTo(0,0);
                navigate(`/category/${[props.title]}`)
            }} className={'p-2 z-10 relative bg-white'}>
                <div>
                    <h4 className={'text-[11px] md:text-xl font-bold shortcut'}>{props.title}</h4>
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
    );
};

export default Product;
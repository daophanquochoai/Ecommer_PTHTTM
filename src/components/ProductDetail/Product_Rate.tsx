import React from 'react';
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

const ProductRate : React.FC= ( props : Props ) => {
    return (
        <div>
            <div className={'grid grid-cols-[1fr_2fr] items-center gap-4 py-2 cursor-pointer group'}>
                <div>
                    <img src={props.image} alt={props.title} className={'group-hover:scale-105 transition-all duration-300'}/>
                </div>
                <div>
                    <p className={'shortcut'}>{props.title}</p>
                    <div className={'flex'}>
                        <Rate disabled defaultValue={props.star} rootClassName={'text-xs md:text-base lg:text-xl'}/>
                    </div>
                    <div className={'flex justify-between mt-2'}>
                        <del className={'text-gray-400'}>${props.priceOld}</del>
                        <span className={'font-bold'}>${props.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductRate ;
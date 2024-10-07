import React, {useEffect, useState} from 'react';
import ListCategory from "./ListCategory.tsx";
import Price from "./Price.tsx";
import Star from "./Star.tsx";
import RenderProduct from "./RenderProduct.tsx";
import {FaFilter} from "react-icons/fa";

const ListProduct : React.FC = () => {
    const  [filter, setFilter] = useState<boolean>(false);

    return (
        <div className={'mt-8'}>
            <div className={'grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr]'}>
                {/* Left */}
                <div className={'mb-8'}>
                    <button onClick={() => setFilter(!filter)} className={`flex items-center gap-2 p-2  md:hidden ${filter ? 'bg-red-500 text-white' : 'border-2 bg-white border-red-500 text-red-500'}`}><FaFilter /> Filter</button>
                    <div className={`${filter ?'block' : 'hidden'} md:block`}>
                        <ListCategory />
                        <Price />
                        <Star />
                    </div>
                </div>
                {/* Right */}
                <div>
                    <RenderProduct />
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
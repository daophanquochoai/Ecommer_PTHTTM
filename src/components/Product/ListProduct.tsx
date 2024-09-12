import React from 'react';
import ListCategory from "./ListCategory.tsx";
import Price from "./Price.tsx";
import Star from "./Star.tsx";
import RenderProduct from "./RenderProduct.tsx";

const ListProduct : React.FC = () => {
    return (
        <div className={'mt-8'}>
            <div className={'grid grid-cols-[1fr_3fr]'}>
                {/* Left */}
                <div>
                    <ListCategory />
                    <Price />
                    <Star />
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
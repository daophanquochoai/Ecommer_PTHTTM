import React from 'react';
import Product from "../Body/Product.tsx";

const RelateProduct : React.FC = () => {
    const Props = {
        sale : 20,
        image : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg',
        like : true,
        title : 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
        star : 4,
        price : 100,
        priceOld : 120,
        selled : 8
    }
    return (
        <div className={'mx-4'}>
            <div>
                <span className={'text-base md:text-xl font-bold pb-2 border-b-2 border-red-500'}>Related products</span>
                <hr className={'my-2 border-1'}/>
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-8'}>
                <Product {...Props}/>
                <Product {...Props}/>
                <Product {...Props}/>
                <Product {...Props}/>
                <Product {...Props}/>
            </div>
        </div>
    );
};

export default RelateProduct;
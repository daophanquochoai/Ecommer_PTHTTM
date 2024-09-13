import React from 'react';
import Product_Grib from "../Body/Product_Grib.tsx";
import Product_Rate from "./Product_Rate.tsx";

const TopRating : React.FC= () => {
    const Props  = {
        sale : 20,
        image : 'https://5.imimg.com/data5/SELLER/Default/2021/5/GD/KV/CW/106693272/sup-game-box-400-in-1.jpg',
        like : true,
        title : 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
        star : 4,
        price : 100,
        priceOld : 120,
        selled : 8
    }
    return (
        <div className={'bg-white p-4'}>
            <div>
                <div>
                    <span className={'pb-2 border-b-2 border-red-500 text-base md:text-2xl font-bold'}>Top Rating</span>
                </div>
                <div className={'flex flex-col mt-8 max-h-[490px] overflow-y-scroll'}>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                    <Product_Rate {...Props}/>
                </div>
            </div>
        </div>
    );
};

export default TopRating;
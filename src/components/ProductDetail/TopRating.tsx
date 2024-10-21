import React, {useEffect, useState} from 'react';
import Product_Grib from "../Body/Product_Grib.tsx";
import Product_Rate from "./Product_Rate.tsx";
import {getTopRating} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

const TopRating : React.FC= () => {

    const [topRatedProducts, setTopRatedProducts] = useState<any[]>([]);

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


    useEffect(() => {
        const fetchApi = async () => {
            const response = await getTopRating();
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.code === 200)
            {
                setTopRatedProducts(response.data);
            }
        };

        fetchApi()
    }, []);

    return (
        <div className={'bg-white p-4'}>
            <div>
                <div>
                    <span className={'pb-2 border-b-2 border-red-500 text-base md:text-2xl font-bold'}>Top Rating</span>
                </div>
                <div className={'flex flex-col mt-8 max-h-[490px] overflow-y-scroll'}>
                    {topRatedProducts.length > 0 && topRatedProducts.map((item) => (
                        <Product_Rate
                            key={item.product_id}
                            sale={item.discount || 0}
                            image={JSON.parse(item.image_url)[0]}
                            title={item.product_title}
                            star={item.rating}
                            price={item.price_unit}
                            priceOld={item.price_unit + (item.discount || 0)}
                            selled={item.quantity}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopRating;
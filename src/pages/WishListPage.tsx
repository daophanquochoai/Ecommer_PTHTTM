import React, {useContext, useEffect, useState} from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import Policy from "../components/Body/Policy.tsx";
import Wish from "../components/WishList/Wish.tsx";
import {addProductToCart, getCart, getWishList} from "../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../context/AppContext.tsx";

const bread : object[] = [
    {
        title : <NavLink to={'/'}>HOME</NavLink>
    },
    {
        title : <span className={'text-red-500'}>WISHLIST</span>
    }
]

interface DataType {
    key : React.Key
    Product: object;
    Price: number;
}

interface DataType2 {
    key: number;
    Product: object;
    Price: number;
    Quantity: number;
}
const WishListPage : React.FC = () => {

    const [productIds, setProductIds] = useState<number[]>([])
    const [dataSource, setDataSource] = useState<DataType[]>([])
    const {cart,setCart} = useContext(AppContext)
    const handleAddCart = async () => {
        const response = await addProductToCart(productIds);
        if( response.code === "ERR_NETWORK"){
            toast.error("Server Failt!!")
            return;
        }
        if( response.data.code === 200 ){
            setDataSource( dataSource.filter( item => !productIds.includes(item.key)));
            toast.success("Add cart success!!")

            const response2 = await getCart();
            if( response.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response2.data.code === 200 ){
                const data : DataType2[] = []
                response2.data.data.forEach( (item, index) => {
                    data.push({
                        key : item.cart_item_id,
                        Product: {
                            'image' : item.infoProduct.image_url,
                            'title' : item.infoProduct.product_title
                        },
                        Price: item.infoProduct.price_unit,
                        Quantity: item.ordered_quantity
                    })
                })
                setCart(data)
            }else {
                toast.error(response2.data.message)
            }
        }else{
            toast.error(response.data.message)
        }
    }

    return (
        <div className={'mx-[5%] mt-3'}>
            <BreadCrumb bread={bread}/>
            <div className={'bg-white mt-4 p-6'}>
                <div className={'mb-6'}>
                    <span className={'text-xl font-[700] border-b-2 border-red-500 pb-1'}>Default wishlist</span>
                </div>
                <Wish setProductIds={setProductIds} dataSource={dataSource} setDataSource={setDataSource}/>
                <div className={'mt-6 mb-2 flex items-center justify-end'}>
                    <button onClick={() => handleAddCart()} className={'bg-black text-white text-base px-4 py-2 hover:bg-red-500 transition-all duration-300'}>ADD SELECTED TO CART</button>
                </div>
                <hr/>
            </div>
            <Policy />
        </div>
    );
};

export default WishListPage;
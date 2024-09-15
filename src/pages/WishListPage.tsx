import React from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import Policy from "../components/Body/Policy.tsx";
import Wish from "../components/WishList/Wish.tsx";

const bread : object[] = [
    {
        title : <NavLink to={'/'}>HOME</NavLink>
    },
    {
        title : <span className={'text-red-500'}>WISHLIST</span>
    }
]

const WishListPage : React.FC = () => {
    return (
        <div className={'mx-[5%] mt-3'}>
            <BreadCrumb bread={bread}/>
            <div className={'bg-white mt-4 p-6'}>
                <div className={'mb-6'}>
                    <span className={'text-xl font-[700] border-b-2 border-red-500 pb-1'}>Default wishlist</span>
                </div>
                <Wish />
                <div className={'mt-6 mb-2 flex items-center justify-end'}>
                    <button className={'bg-black text-white text-base px-4 py-2 hover:bg-red-500 transition-all duration-300'}>ADD SELECTED TO CART</button>
                </div>
                <hr/>
            </div>
            <Policy />
        </div>
    );
};

export default WishListPage;
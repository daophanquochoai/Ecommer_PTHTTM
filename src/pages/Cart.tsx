import React from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import TableItem from "../components/Cart/TableItem.tsx";
import TableProcess from "../components/Cart/TableProcess.tsx";

const bread : object[] = [
    {
        title: <NavLink to={'/'}>HOME</NavLink>,
    },
    {
        title: <span className={'text-red-500'}>CART</span>,
    }
]

const Cart : React.FC = () => {
    return (
        <div className={'mx-[5%] mt-3'}>
            <div>
                <BreadCrumb bread={bread}/>
                <div className={'grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-3'}>
                    <div>
                        <TableItem />
                    </div>
                    <div>
                        <TableProcess />
                        <button className={'text-white bg-black w-full p-2 mt-3 hover:bg-red-500 transition-all duration-300'}>PROCEES TO CHECKOUT</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cart;
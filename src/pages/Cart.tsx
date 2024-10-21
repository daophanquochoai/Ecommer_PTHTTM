import React, {useContext, useState} from 'react';
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import TableItem from "../components/Cart/TableItem.tsx";
import TableProcess from "../components/Cart/TableProcess.tsx";
import Policy from "../components/Body/Policy.tsx";
import {AppContext} from "../context/AppContext.tsx";

const bread : object[] = [
    {
        title: <NavLink to={'/'}>HOME</NavLink>,
    },
    {
        title: <span className={'text-red-500'}>CART</span>,
    }
]

const Cart : React.FC = () => {
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate();
    const {cart} = useContext(AppContext)

    //function
    const handleAcceptCart = () => {
        navigate('/acceptCart')
        scroll(0,0)
    }


    return (
        <div className={'mx-[5%] mt-3'}>
            <div>
                <BreadCrumb bread={bread}/>
                <div className={'grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-3'}>
                    <div>
                        <TableItem setTotal={setTotal}/>
                    </div>
                    <div>
                        <TableProcess total={total}/>
                        <button disabled={cart.length === 0} onClick={() => handleAcceptCart()} className={'text-white bg-black w-full p-2 mt-3 hover:bg-red-500 transition-all duration-300'}>PROCEES TO CHECKOUT</button>
                    </div>
                </div>
                <Policy />
            </div>
        </div>
    )
};

export default Cart;
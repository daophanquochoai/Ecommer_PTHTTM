import React, {ChangeEvent} from 'react';
import {IoClose} from "react-icons/io5";
import {Cascader, Spin, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import CartSub from "./CartSub.tsx";


type Props = {
    openCart: boolean,
    setOpenCart: (number: number)=>void
}

const CartModel:React.FC = (props : Props) => {
    const {openCart, setOpenCart} = props;
    const navigate = useNavigate();

    return (
        <div className={`${!openCart  ? 'right-[-400px]' : 'right-0'} transition-all duration-300 fixed bg-white z-20 h-[100vh] w-[400px] top-0 p-4`}>
            <div className={'flex justify-end text-3xl cursor-pointer'}>
                <IoClose onClick={() => setOpenCart(0)}/>
            </div>
            <div>
                <div>
                    <h3 className={'text-xl text-red-500 border-b-2 border-red-500'}>My Cart</h3>
                </div>
                <ul className={'mt-6 flex flex-col gap-4 h-[400px] overflow-y-scroll'}>
                    <CartSub/>
                    <CartSub/>
                    <CartSub/>
                    <CartSub/>
                    <CartSub/>
                    <CartSub/>
                </ul>
                <button className={'mt-6 w-full bg-red-500 p-2 text-xl text-white'} onClick={ () => { navigate('/cart'); setOpenCart(0)}}>Go to Cart</button>
            </div>
        </div>
    );
};

export default CartModel;
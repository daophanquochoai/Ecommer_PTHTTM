import React from 'react';
import {removeItemInCart} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

const CartSub : React.FC = (props) => {

    // console.log(props);

    const handleRemoveItem = async ( id : number) => {
        const response = await removeItemInCart(id);
        if( response.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            props.setDataCart(props.dataCart.filter( item => item.cart_item_id !== id))
            toast.success("Removed product successfully!")
        }else {
            toast.error(response.data.message)
        }
    }

    return (
        <li className={'flex items-center gap-4 border-b-2 pb-2'}>
            <img src={props.item.Product.image ? JSON.parse(props.item.Product.image)[0] : ""} alt={'image'} className={'w-[60px] h-[60px]'}/>
            <p className={'shortcut'}>{props.item.Product.title}</p>
            <input type={'number'} className={'border-2 w-[50px] h-[40px] text-center flex outline-red-400 ps-3'} value={props.item.Quantity}/>
            <button className={'px-3 py-1 bg-red-500'} onClick={() => handleRemoveItem(props.item.cart_item_id)}>-</button>
        </li>
    );
};

export default CartSub;
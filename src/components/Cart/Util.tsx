import React, {useState} from 'react';
import {toast} from "react-toastify";
type Props = {
    item : number
}

const Util : React.FC = ( props : Props ) => {
    const [quantity, setQuantity] = useState<number>(props.item)
    const downHandler = () => {
        if( quantity === 0 ){
            toast('Quantity high than 0!!')
        }else{
            setQuantity(quantity-1)
        }
    }
    const upHandler = () => {
        setQuantity(quantity + 1)
    }
    return (
        <div className={'flex gap-2 items-center justify-center'}>
            <button className={'border-2 px-3 py-1'} onClick={() => downHandler()}>-</button>
            <p>{quantity}</p>
            <button className={'border-2 px-3 py-1'} onClick={() => upHandler()}>+</button>
        </div>
    );
};

export default Util;
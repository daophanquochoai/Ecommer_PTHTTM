import React, {useState} from 'react';
import {toast} from "react-toastify";
import {qunit} from "globals";
type Props = {
    quantity : object,
    setQuantity : Function,
    id: number
}

const Util : React.FC = ( props: Props ) => {
    const numb = props.quantity.find( item => item.key === props.id).Quantity
    const downHandler = () => {
        if( numb === 1 ){
            toast('Quantity high than 1!!')
        }else{
            props.setQuantity( props.quantity.map( item =>{
                if( item.key === props.id ){
                    item.Quantity -= 1
                }
                return item;
            }));
        }
    }
    const upHandler = () => {
        props.setQuantity( props.quantity.map( item =>{
            if( item.key === props.id ){
                item.Quantity += 1
            }
            return item;
        }));
    }
    return (
        <div className={'flex gap-2 items-center justify-center'}>
            <button className={'border-2 px-3 py-1'} onClick={downHandler}>-</button>
            <p>{numb}</p>
            <button className={'border-2 px-3 py-1'} onClick={upHandler}>+</button>
        </div>
    );
};

export default Util;
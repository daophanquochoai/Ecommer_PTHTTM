import React from 'react';

const CartSub : React.FC = () => {
    return (
        <li className={'flex items-center gap-4 border-b-2 pb-2'}>
            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg'} alt={'image'} className={'w-[60px] h-[60px]'}/>
            <p className={'shortcut'}>Hair Remover Shaver with Extra Replacement Head (Blue)</p>
            <input type={'number'} className={'border-2 w-[50px] h-[40px] text-center flex outline-red-400 ps-3'} value={10}/>
            <button className={'px-3 py-1 bg-red-500'}>-</button>
        </li>
    );
};

export default CartSub;
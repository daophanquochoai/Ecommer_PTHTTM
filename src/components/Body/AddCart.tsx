import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Modal} from "antd";
import type { MenuProps } from 'antd';
import {CiShoppingCart} from "react-icons/ci";
import {NavLink} from "react-router-dom";
import {CheckCircleTwoTone} from '@ant-design/icons';
import {addItemToCart} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className='text-red-500'>
          Add to cart
        </p>
      ),
    },
];
type Props = {
    id : number,
    sale : number | undefined,
    image : string | undefined,
    like : boolean | undefined,
    title : string | undefined,
    star : number | undefined,
    price : number | undefined,
    priceOld : number | undefined,
    selled : number | undefined,
    isLoading: boolean
}


const AddCart: React.FC = (props : Props) => {
    const [open, setOpen] = useState(false);
    const {cart,setCart} = useContext(AppContext)
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
        
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleAddToCart = async ( id:number, quantity : number) => {
        const response = await addItemToCart(id, quantity);
        if( response.code === "ERR_NETWORK"){
            toast.error("Server Failt!!")
            return;
        }
        console.log(response)
        if(response.data.code === 200 ){
            let item = cart.find( item => item.key === id)
            if( item !== undefined ){
                item.Quantity += 1;
                setCart([
                    ...cart.filter(item => item.key !== id),
                    item
                ])
            }else{
                const image = [];
                image.push(props.image)
                item =    {
                    key : props.id,
                    Product: {
                        'image' : JSON.stringify(image),
                        'title' : props.title
                    },
                    Price: props.price,
                    Quantity : 1
                }
                setCart([
                    ...cart,
                    item
                ])
            }
            showModal();
        }else if( response.data.code === 401 ){
            //
        }else{}

    }

    return (
        <div>
            <Dropdown menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
                <CiShoppingCart onClick={ () => handleAddToCart(props.id, 1)} className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" />
            </Dropdown>
            <Modal
                open={open}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className={'flex flex-col items-center justify-center'}>
                    <CheckCircleTwoTone twoToneColor="#ff0000" style={{ fontSize: '100px'}} />
                    <p className='font-bold mt-5 text-2xl'>Item added to your cart</p>
                    <p className='text-gray-400 mt-2'>2 ITEMS IN THE CART <span className='text-gray-900'>($238.00)</span></p>
                    <div className={'flex gap-10 mt-7'}>
                        <button onClick={handleCancel} className='bg-red-500 hover:bg-black text-white py-2 px-4'>
                            CONTINUE SHOPPING
                        </button>
                        <NavLink to={'/cart'}>
                            <button onClick={handleOk} className='bg-black hover:bg-red-500 text-white py-2 px-4'>
                                GO TO THE CART
                            </button>
                        </NavLink>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddCart;
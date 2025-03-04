import React, {ChangeEvent, useContext, useEffect} from 'react';
import {IoClose} from "react-icons/io5";
import {Cascader, Spin, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import CartSub from "./CartSub.tsx";
import {AppContext} from "../../context/AppContext.tsx";
import {getCart} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";


type Props = {
    openCart: boolean,
    setOpenCart: (number: number)=>void
}

interface DataType {
    cart_item_id: number,
    key: number;
    Product: object;
    Price: number;
    Quantity: number;
}

const CartModel:React.FC = (props : Props) => {
    const {openCart, setOpenCart} = props;
    const navigate = useNavigate();
    const {cart, setCart} = useContext(AppContext);

    useEffect(() => {
        const fetchCart = async () => {
            const response = await getCart();
            if( response.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            // console.log("-------------------------cart-----------------------", response.data)
            if( response.data.code === 200 ){
                const data : DataType[] = []
                response.data.data.forEach( (item, index) => {
                    data.push({
                        cart_item_id : item.cart_item_id,
                        key : item.product_id,
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
                toast.error(response.data.message)
            }
        }
        fetchCart()
    }, []);

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
                    {
                        cart.map((item, index) => (
                            <CartSub key={index} item={item} dataCart={cart} setDataCart={setCart}/>
                        ))
                    }

                </ul>
                <button className={'mt-6 w-full bg-red-500 p-2 text-xl text-white'} onClick={ () => { navigate('/cart'); setOpenCart(0)}}>Go to Cart</button>
            </div>
        </div>
    );
};

export default CartModel;
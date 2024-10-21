import React, {useContext, useEffect, useState} from 'react';
import {Table, TableColumnsType, TableProps} from "antd";
import Util from "./Util.tsx";
import {getCart, removeItemInCart} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";
type Props = {
    setTotal : Function,
}
interface DataType {
    key: number;
    Product: object;
    Price: number;
    Quantity: number;
}

const TableItem : React.FC = (props : Props) => {
    const [quantity, setQuantity] = useState<object>({})
    const {cart, setCart} = useContext(AppContext)

    const handleRemoveItem = async ( id : number) => {
        const response = await removeItemInCart(id);
        if( response.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            setCart(cart.filter( item => item.key !== id))
        }else {
            toast.error(response.data.message)
        }
    }


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Product', dataIndex: 'Product', key: 'product',
            render : (item) => {
                return <div className={'flex items-center gap-2'}>
                    <img className={'w-[50px] h-[50px]'} src={JSON.parse(item.image)[0]}/>
                    <p className={'shortcut text-xs'}>{item.title}</p>
                </div>
            },
            align : 'center'
        },
        { title: 'Price', dataIndex: 'Price', key: 'Price',
            render : (item) => <p className={'text-center'}>{item}</p>,
            align : 'center',
            className : 'flex items-center justify-center',
            responsive : ['md']
        },
        { title: 'Quantity', key: 'Quantity',
            align : 'center',
            render : (item : DataType) => (
                <Util id={item.key} quantity={cart} setQuantity={setCart}/>
            ),
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            render : (item : DataType) => <p>{item.Price * item.Quantity}</p>,
            align : 'center',
            className : 'flex items-center justify-center'
        },
        {
            title: 'Action',
            key: 'action',
            render : (item : DataType) => <button className={'bg-red-500 text-white px-2 py-1'} onClick={ () => handleRemoveItem(item.key)}>Remove</button>,
            align : "center"
        },
    ];

    useEffect(() => {
        let sum : number = 0;
        cart.length > 0 && cart.forEach( (item) => {
            sum += item.Price * item.Quantity
        })
        props.setTotal(sum)
    }, [quantity, cart]);
    useEffect(() => {
        const fetchCart = async () => {
            const response = await getCart();
            if( response.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const data : DataType[] = []
                response.data.data.forEach( (item, index) => {
                    data.push({
                        key : item.cart_item_id,
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
    const onChange = (e) => {
        console.log(e)
    }
    return (
        <Table
            columns={columns}
            scroll={{ y: 240 }}
            dataSource={cart}
            virtual
            pagination={false}
            rowHoverable={false}
        />
    );
};

export default TableItem;
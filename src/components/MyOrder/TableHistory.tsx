import React, {useContext, useEffect, useState} from 'react';
import {Table, TableColumnsType} from "antd";
import Util from "../Cart/Util.tsx";
import {addItemToCart, getOrdersHistory} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";

interface DataType {
    key: React.Key;
    Product: object;
    Price: number;
    Time : string;
}

const data: DataType[] = [
    {
        key: 1,
        Product: {
            'image' : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
            'title' : 'Microsoft Xbox One S Controller - Gears 5 Kait Diaz'
        },
        Price: 32,
        Time: '10/03/2003'
    },
    {
        key : 2,
        Product: {
            'image' : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
            'title' : 'Microsoft Xbox One S Controller - Gears 5 Kait Diaz'
        },
        Price: 32,
        Time : '10/03/2003'
    }
];
const TableHistory : React.FC = () => {

    const {cart,setCart} = useContext(AppContext);
    const [data, setData] = useState<DataType[]>([]);

    const handleAddToCart = async ( id:number, quantity : number) => {
        const response = await addItemToCart(id, quantity);
        if( response.code === "ERR_NETWORK"){
            toast.error("Server Failt!!")
            return;
        }
        console.log(response)
        if(response.data.code === 200 ){
            let item = cart.find( item => item.key === id)
            console.log("cart: ", cart);
            if( item !== undefined ){
                // console.log("item EXIST=========== ", item)
                item.Quantity += 1;
                setCart([
                    ...cart.filter(item => item.key !== id),
                    item
                ])
            }else{
                const infoProduct = data.find(d => d.Product.id === id);
                const title = infoProduct.Product.title || "";
                const image = [];
                image.push(infoProduct.Product.image || "")
                item = {
                    key: id,
                    Product: {
                        image: JSON.stringify(image),
                        title: title,
                    },
                    Price: data.find(d => d.key === id)?.Price || 0,
                    Quantity: 1,
                };
                // console.log("item ELSE=========== ", item)
                setCart([
                    ...cart,
                    item
                ])
            }
        }else if( response.data.code === 401 ){
            //
        }else{}

    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getOrdersHistory();

            console.log(result);
            if( result.code === "ERR_NETWORK"){
                toast.error("NETWORK ...!!")
                return;
            }

            if( result.code === 200){
                // Xử lý dữ liệu từ API để phù hợp với DataType
                const transformedData: DataType[] = result.data.flatMap((order: any, index: number) =>
                    order.orderItems.map((item: any) => ({
                        key: `${order.order_id}-${item.product_id}-${index}`,
                        Product: {
                            id: item.product_id,
                            image: JSON.parse(item.image_url)[0],
                            title: item.product_title
                        },
                        Price: item.newPrice,
                        Time: order.order_date
                    }))
                );

                setData(transformedData);
                return;
            }
            else
            {
                toast.error("ERROR ORDER HISTORY...!!")
                return;
            }

        };

        fetchData();
    }, []);


    const columns: TableColumnsType<DataType> = [
        {
            title: 'Product',
            dataIndex: 'Product',
            key: 'product',
            render: (item) => (
                <div className={'flex items-center gap-2'}>
                    <img className={'w-[50px] h-[50px]'} src={item.image} alt={item.title} />
                    <p className={'shortcut text-xs'}>{item.title}</p>
                </div>
            ),
            align: 'center',
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            render: (item) => <p className={'text-center'}>{item.toLocaleString()}</p>,
            align: 'center',
            className: 'flex items-center justify-center',
            responsive: ['md'],
        },
        {
            title: 'Time',
            dataIndex: 'Time',
            key: 'Time',
            align: 'center',
            render: (item) => <p>{new Date(item).toLocaleDateString()}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (item: DataType) => {
                const handleClick = () => handleAddToCart(item.Product.id, 1);
                return (
                    <button onClick={handleClick} className={'px-4 py-2 bg-red-500 text-white'}>
                        Buy
                    </button>
                );
            },
            align: 'center',
            className: 'flex items-center justify-center',
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                scroll={{ y: 240 }}
                dataSource={data}
                virtual
                pagination={false}
                rowHoverable={false}
            />
        </div>
    );
};

export default TableHistory;
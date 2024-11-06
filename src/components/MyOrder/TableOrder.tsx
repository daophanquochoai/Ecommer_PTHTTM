import React, { useEffect, useState } from 'react';
import {Button, Modal, Table} from 'antd';
import {getOrdersRecent, userCancelOrder} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {CheckCircleTwoTone} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

// Định nghĩa kiểu dữ liệu
interface ProductType {
    title: string;
    image: string;
    newPrice: number;
    ordered_quantity: number;
}

interface OrderType {
    order_id: number;
    orderItems: ProductType[];
    order_status: number;
}

// Cột của bảng
const columns = [
    {
        title: 'Product',
        dataIndex: 'Product',
        key: 'product',
        render: (item: ProductType) => (
            <div className="flex items-center gap-2">
                <img className="w-[50px] h-[50px]" src={item.image} alt={item.title} />
                <p className="shortcut text-xs">{item.title}</p>
            </div>
        ),
        align: 'center',
    },
    {
        title: 'Price',
        dataIndex: 'Price',
        key: 'price',
        render: (item: number) => <p className="text-center">{item.toLocaleString()} VND</p>,
        align: 'center',
    },
    {
        title: 'Quantity',
        dataIndex: 'Quantity',
        key: 'quantity',
        align: 'center',
        render: (item: number) => <p>{item}</p>,
    },
    {
        title: 'Subtotal',
        key: 'subtotal',
        render: (item) => {
            const price = Number(item.Product.newPrice) || 0;
            const quantity = Number(item.Quantity) || 0;

            const subtotal = price * quantity;

            return <p>{subtotal.toLocaleString()} VND</p>;
        },
        align: 'center',
    },
];

// Component chính
const TableOrder = (props) => {
    const [data, setData] = useState<OrderType[]>([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const [orderID, setOrderID] = useState(0);

    const showModal = (orderId) => {
        setOrderID(orderId);
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    const onExpand = (expanded, record) => {
        if (expanded) {
            // Nếu hàng được mở, chỉ cho phép mở một hàng
            // console.log(record["order_status"]);
            props.setCurrent(Number(record["order_status"]))
            setExpandedRowKeys([record.order_id]); // Đặt hàng mở thành hàng hiện tại
        } else {
            // Nếu hàng bị đóng, xóa nó khỏi danh sách mở
            setExpandedRowKeys([]);
            props.setCurrent(-1)
            // console.log(-1)
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getOrdersRecent();

                // console.log(result);
                if( result.code === "ERR_NETWORK"){
                    toast.error("NETWORK ...!!")
                    return;
                }

                if (result.code === 200) {
                    const formattedData = result.data.map((order) => ({
                        order_id: order.order_id,
                        orderItems: order.orderItems.map((item) => ({
                            title: item.product_title,
                            image: JSON.parse(item.image_url)[0], // Lấy hình ảnh đầu tiên
                            newPrice: item.newPrice,
                            ordered_quantity: item.ordered_quantity,
                        })),
                        order_status: order.index,
                    }));

                    setData(formattedData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCancelOrder = async () => {
        toast.success("Hủy đơn hàng thành công");
        const result = await userCancelOrder(orderID);

        console.log(result);
        if( result.code === "ERR_NETWORK"){
            toast.error("NETWORK ...!!")
            return;
        }

        if (result.code === 200) {
            console.log(data)
            const newData = data.filter(item => item.order_id != orderID);
            console.log(newData)
            setData(newData);
        }
        else if(result.code !== 200)
        {
            toast.error(result.message);
        }
        handleCancel();
    };

    const expandedRowRender = (orderItems: ProductType[]) => {
        const orderData = orderItems.map(item => ({
            Product: item,
            Price: item.newPrice,
            Quantity: item.ordered_quantity,
        }));

        return <Table columns={columns} dataSource={orderData} pagination={false} rowKey="title" />;
    };

    const tableData = data.map(order => ({
        key: order.order_id,
        order_id: order.order_id,
        orderItems: order.orderItems,
        order_status: order.order_status
    }));

    return (
        <>
            <Modal
                open={open}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className={'flex flex-col items-center justify-center'}>
                    <CheckCircleTwoTone twoToneColor="#ff0000" style={{ fontSize: '100px'}} />
                    <p className='font-bold mt-5 text-2xl'>Do you want to cancel order with ID {orderID}?</p>
                    <div className={'flex gap-10 mt-7'}>
                        <button onClick={() => handleCancelOrder()} className='bg-red-500 hover:bg-black text-white py-2 px-4'>
                            CONTINUE
                        </button>
                    </div>
                </div>
            </Modal>
            <Table
                columns={[
                    {  dataIndex: 'order_id', key: 'order_id',  align: 'center',
                        render: (text,  record : OrderType) => (
                            <div className="flex justify-between items-center">
                                {/* Hiển thị Order ID ở giữa */}
                                <span className="flex-1 text-center">Order ID: <b>{text}</b></span>

                                <Button
                                    className="px-4 py-2 bg-red-500 text-white"
                                    onClick={() => showModal(record.order_id)}
                                >
                                    Cancel order
                                </Button>
                            </div>
                        ),
                    }
                ]}
                dataSource={tableData}
                expandedRowRender={({ orderItems }) => expandedRowRender(orderItems)}
                rowKey="order_id"
                pagination={false}
                onExpand={onExpand} // Gọi hàm khi mở/đóng hàng
                expandedRowKeys={expandedRowKeys} // Chỉ định hàng nào đang mở
            />
        </>
    );
};

export default TableOrder;

import React, {useEffect, useState} from 'react';
import {getAllOrders, getOrderStatus, updateOrderStatus} from "../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {Button, Modal, Pagination, Table, TableColumnsType} from "antd";

type DataType = {
    "order_id": number,
    "cart_id": number,
    "order_desc": string,
    "order_date": string,
    "order_fee": number,
    "address": string,
    "name" : string,
    "phone": string,
    "infoPayment": {
        "payment_id": number,
            "order_id": number,
            "is_payed": {
                "type": string,
                "data": number[]
            },
        "method_payment": string,
        "payment_status": string,
        "payment_status_id" : number
    },
}


type OrderStatus = {
    "id": number,
    "status": string
}

const OrderManage = () => {

    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1)

    const [orderStatus, setOrderStatus] = useState<OrderStatus[]>([])

    const [orderChoose, setOrderChoose] = useState<DataType>();

    //modal
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedOrderStatus, setSelectedOrderStatus] = useState<number>(0);

    const showLoading = async () => {
        setLoading(true)
        const response = await updateOrderStatus(orderChoose?.order_id, selectedOrderStatus);
        setLoading(false)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            setDataSource( dataSource.map( item => {
                if( item.order_id === orderChoose?.order_id){
                    item.infoPayment.payment_id = selectedOrderStatus;
                    item.infoPayment.payment_status = orderStatus.filter(i => i.id == selectedOrderStatus)[0].status
                }
                return item;
            }))
            setOpen(false);
            toast.success("UPDATE ORDER SUCCESS")
        }else{
            toast.error(response.data.message);
        }
    };

    const handleChooseOrder = (orderId : number) => {
        const order = dataSource.filter( item => item.order_id === orderId)
        if( order === undefined){
            toast.warning(`Order ${orderId} Not Found`)
            return
        }
        setSelectedOrderStatus(order[0].infoPayment.payment_status_id)
        setOrderChoose(order[0])
        setOpen(true)
    }


    //useEffect
    useEffect(() => {
        const fetchOrderStatus = async () => {
            const response = await getOrderStatus();
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const arr : OrderStatus[] = []
                response.data.data.forEach( item => {
                    if( item.status !== 'CANCEL USER'){
                        arr.push({
                            "id": item.id,
                            "status": item.status === "CANCEL MANAGER" ? "CANCEL" : item.status
                        })
                    }
                })
                setOrderStatus(arr)
            }else{
                toast.error(response.data.message)
            }
        }
        fetchOrderStatus()
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            const response = await getAllOrders();
            setLoading(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const arr : DataType[] = []
                response.data.data.forEach( item => {
                    arr.push({
                            "order_id": item.order_id,
                            "cart_id": item.cart_id,
                            "order_desc": item.order_desc,
                            "order_date": item.order_date,
                            "order_fee": item.order_fee,
                            "address": item.address,
                            "name" : item.infoUser.last_name + ' ' + item.infoUser.first_name,
                            "phone": item.phone,
                            "infoPayment": {
                                "payment_id": item.infoPayment.payment_id,
                                "order_id": item.infoPayment.order_id,
                                "is_payed": {
                                    "type": item.infoPayment.is_payed.type,
                                    "data": item.infoPayment.is_payed.data
                                },
                                "method_payment": item.infoPayment.method_payment,
                                "payment_status": item.infoPayment.payment_status === "CANCEL MANAGER" ? "CANCEL" : item.infoPayment.payment_status,
                                "payment_status_id" : item.infoPayment.payment_status_id
                            },
                        }
                    )
                })
                setTotalPage(response.data.totalPage)
                setDataSource(arr)
            }else{
                toast.error(response.data.message)
            }
        }
        fetchOrder()
    }, []);

    // table

    const columns: TableColumnsType<DataType> = [
        {
            title: 'STT',
            align : 'center',
            render : (item : DataType) => <button onClick={() => handleChooseOrder(item.order_id)}>{item.order_id}</button>
        },
        { title: 'NAME',
            render : (item) => <button onClick={() => handleChooseOrder(item.order_id)} className={'text-center font-bold'}>{item.name}</button>,
            align : 'center'
        },
        { title: 'ORDER TIME', dataIndex: 'order_date', key: 'Time',
            align : 'center',
        },
        { title: 'ADDRESS',
            render : (item) => <button onClick={() => handleChooseOrder(item.order_id)} className={'text-center font-bold'}>{item.address}</button>,
            align : 'center',

        },
        { title: 'PHONE', dataIndex: 'phone', key: 'phone',
            align : 'center',
            render: (item) => item && <button onClick={() => handleChooseOrder(item.order_id)} className={'text-pink-400 border-2 border-pink-500'}>{item}</button>
        },
        { title: 'PAYMENT', key: 'phone',
            render : (item : DataType) => <button onClick={() => handleChooseOrder(item.order_id)} className={'text-purple-500 border-2 border-purple-500'}>{item.infoPayment.method_payment}</button>,
            align : 'center',
        }
        ,
        { title: 'STATUS', key: 'status',
            render : (item : DataType) => <button onClick={() => handleChooseOrder(item.order_id)} className={`border-2 ${item.infoPayment.payment_status === 'DELIVERIED' ? 'text-green-500 border-green-500' : item.infoPayment.payment_status === 'SHIPING' ? 'text-yellow-400 border-yellow-400' : 'text-red-500'} font-bold `}>{item.infoPayment.payment_status}</button>,
            align : 'center',
        }
    ];
    return (
        <div>
            <div className={'mb-6'}>
                <p className={'text-black font-bold text-xl'}>Order List</p>
            </div>
            <div>
                <Table dataSource={dataSource} loading={loading} columns={columns} pagination={false}/>
                <div className={'p-5 flex items-center justify-center w-full'}>
                    <div>
                        {!loading && <Pagination
                            current={page}
                            onChange={e => setPage(e)}
                            total={totalPage*8}
                            showSizeChange={false}
                            defaultPageSize={8}
                            responsive={true}
                        />}
                    </div>
                </div>
            </div>
            <Modal
                title={<p className={'text-xl font-bold text-red-500'}>ORDER {orderChoose?.order_id}</p>}
                footer={
                    <Button type="primary" onClick={showLoading}>
                        UPDATE
                    </Button>
                }
                open={open}
                onCancel={() => setOpen(false)}
            >
                <div className={'flex flex-col gap-4'}>
                    <div className={'flex gap-6'}>
                        <div>
                            <p className={'font-bold'}>NAME :</p>
                            <p>Quoc Hoai</p>
                        </div>
                        <div>
                            <p className={'font-bold'}>ORDER TIME : </p>
                            <p>{orderChoose?.order_date}</p>
                        </div>
                    </div>
                    <div className={'flex gap-6'}>
                        <div>
                            <p className={'font-bold'}>ORDER DESCRIPTION :</p>
                            <p>{orderChoose?.order_desc}</p>
                        </div>
                        <div>
                            <p className={'font-bold'}>PAYMENT :</p>
                            <p>{orderChoose?.infoPayment?.method_payment}</p>
                        </div>
                    </div>
                    <div className={'flex gap-6'}>
                        <div>
                            <p className={'font-bold'}>ADDRESS :</p>
                            <p>{orderChoose?.address}</p>
                        </div>
                        <div>
                            <p className={'font-bold'}>TOTAL PRICE :</p>
                            <p>{orderChoose?.order_fee}</p>
                        </div>
                    </div>
                    <div>
                        <p className={'font-bold'}>ORDER STATUS :</p>
                        <select
                            className={`outline-0  ${orderChoose?.infoPayment.payment_status === 'DELIVERIED' ? 'text-green-500 border-green-500' : orderChoose?.infoPayment.payment_status === 'SHIPING' ? 'text-yellow-400 border-yellow-400' : 'text-red-500'}`}
                            value={selectedOrderStatus} onChange={(e) => setSelectedOrderStatus(e.target.value)}>
                            {
                                orderStatus.map( item =>
                                    <option className={`${item.status === 'DELIVERIED' ? 'text-green-500 border-green-500' : item.status === 'SHIPING' ? 'text-yellow-400 border-yellow-400' : 'text-red-500'}`} value={item.id}>{item.status}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OrderManage;
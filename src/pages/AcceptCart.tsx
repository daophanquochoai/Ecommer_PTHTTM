import React, {useContext, useEffect, useState} from 'react';
import {IoMdArrowRoundBack} from "react-icons/io";
import {AppContext} from "../context/AppContext.tsx";
import {Radio, Table, TableProps, TreeSelect} from "antd";
import Util from "../components/Cart/Util.tsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {orderPost} from "../Utils/Helper.tsx";

interface DataType {
    key: number;
    Product: object;
    Price: number;
    Quantity: number;
}

const AcceptCart = () => {
    // bien
    const {cart, info} = useContext(AppContext);
    const [total, setTotal] = useState<number>(0);
    const [methodPayement, setMethodPayment] = useState<number>(1)
    const [addressDefault, setAddressDefault] = useState<number>(0);
    const [descrption, setDescription] = useState<string>('');
    const [phone, setPhone] = useState<string>("");

    const [treeData, setTreeData] = useState([])
    //table
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Product', dataIndex: 'Product', key: 'product',
            render : (item) => (
                <div className={'flex items-center gap-2 ps-[35%]'}>
                    <img className={'w-[50px] h-[50px]'} src={JSON.parse(item.image)[0]}/>
                    <p className={'shortcut text-xs'}>{item.title}</p>
                </div>
            ),
            align : 'center'
        },
        { title: 'Quantity', key: 'Quantity',
            align : 'center',
            render : (item : DataType) => (
                <p>{item.Quantity}</p>
            ),
        }
    ];


    const onChange = (newValue: string) => {
        setAddressDefault(newValue)
    };

    const navigate = useNavigate();

    const handlePaymentCart = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if(!accessToken)
        {
            toast.error("Order unsuccessfuly!");
            navigate("/login");
        }
        const dataToSend = {
            method_payment: methodPayement,
            infoCustomer: {
                address: addressDefault,
                note: descrption,
                phone: phone
            }
        };

        console.log(dataToSend);
        const fetchApi = async () => {
            const response = await orderPost(dataToSend);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            console.log(response);
            if(response.data.code === 200)
            {
                toast.success("Order successfully!");
                navigate("/")
                scroll(0,0)
            }
            else
            {
                toast.error(response.data.message);
            }
        }
        fetchApi()
    }

    //useEffect
    useEffect(() => {
        let sum : number = 0;
        cart.length > 0 && cart.forEach( (item) => {
            sum += item.Price * item.Quantity
        })
        setTotal(sum)
    }, []);

    useEffect(() => {
        const arr = []
       info.addresses.forEach(item => {
            if( item.default_address == 1 ) setAddressDefault(item.address_id)
            arr.push({
                value: item.address_id,
                title: item.address_name,
            })
       });
        setTreeData(arr)
    }, [info]);

    useEffect(() => {
        setPhone(info.phone)
    }, []);

    const handleChangeRadio = (e) => {
        setMethodPayment(e.target.value);
    }

    useEffect(() => {
        console.log(cart)
    }, []);
    return (
        <div>
            <div className={'flex items-center gap-2 text-xl font-bold text-red-500 mx-12 mt-4'}>
                <IoMdArrowRoundBack />
                <p>BACK</p>
            </div>
            <div className={'text-center mt-6 mb-2'}>
                <p className={'text-red-500 text-2xl font-bold'}>ACCEPT ORDER</p>
            </div>
            <div className={'mx-[25%] my-3'}>
                <Table dataSource={cart} columns={columns} pagination={false} bordered/>
            </div>
            <div className={'flex justify-center items-start m-auto w-[50%] gap-4'}>
                <div className={'border-2 p-4 flex-1'}>
                    <div className={'flex flex-col gap-2 border-b-2 p-2 items-center '}>
                        <p className={'text-red-500 font-bold'}>PAYMENT</p>
                        <Radio.Group value={methodPayement} onChange={(e) => handleChangeRadio(e)} className={'flex-col flex'}>
                            <Radio value={1}>Payment upon received</Radio>
                            <Radio value={2}>Momo</Radio>
                        </Radio.Group>
                    </div>
                    <div className={'p-2 border-b-2 flex-1'}>
                        <p className={'text-red-500 font-bold flex flex-col items-center'}>ADDRESS</p>
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={addressDefault}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onChange}
                            treeData={treeData}
                            // onPopupScroll={onPopupScroll}
                        />
                    </div>
                    <div className={'flex flex-col items-center p-2'}>
                        <p className={'font-bold text-red-500 mb-2'}>NOTED</p>
                        <input value={descrption} onChange={(e) => setDescription(e.target.value)} className={'border-b-2 border-red-500 outline-0 text-center'} placeholder={"Your noted for us"}/>
                    </div>
                    <div className={'flex flex-col items-center p-2'}>
                        <p className={'font-bold text-red-500 mb-2'}>Phone</p>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className={'border-b-2 border-red-500 outline-0 text-center'} placeholder={"Your noted for us"}/>
                    </div>
                </div>
                <div className={'flex flex-col p-4 border-2 min-w-[300px] flex-1'}>
                    <div className={'flex items-center justify-between'}>
                        <p className={'text-red-500 font-bold text-xl'}>Số tiền :</p>
                        <p className={'text-gray-500'}>{total.toLocaleString()}đ</p>
                    </div>
                    <div className={'flex justify-between items-center'}>
                        <p className={'text-red-500 font-bold text-xl'}>Phí vận chuyển :</p>
                        <p className={'text-gray-500'}>0đ</p>
                    </div>
                    <div className={'flex justify-between items-center'}>
                        <p className={'text-red-500 font-bold text-xl'}>Tổng tiền :</p>
                        <p className={'text-gray-500'}>{total.toLocaleString()}đ</p>
                    </div>
                </div>
            </div>
            <div className={'text-center mx-[25%] mt-6'}>
                <button className={'w-full py-1 border-2 border-green-500 bg-green-500 text-white font-bold hover:text-green-500 hover:bg-white'} onClick={handlePaymentCart}>PAYMENT</button>
            </div>
        </div>
    );
};

export default AcceptCart;
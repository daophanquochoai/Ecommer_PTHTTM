import React, {useEffect, useState} from 'react';
import {Table,Button, TableColumnsType} from "antd";
import {getWishList, removeProductInWishList} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

interface DataType {
    key : React.Key
    Product: object;
    Price: number;
}


interface Product {
    "product_id": number;
    "category_id": number;
    "product_title": string;
    "product_desc":  string;
    "image_url": string;
    "price_unit": number;
    "quantity": number;
    "status": string;
    "slug": string;
    "discount": number;
}

type Props = {
    setProductIds : Function,
    dataSource : DataType[],
    setDataSource : Function
}

const Wish : React.FC = (props: Props ) => {


    const {
        setProductIds,
        dataSource,
        setDataSource} = props;

    // useEffect
    useEffect(() => {
        const fetchWishList = async () => {
            const response = await getWishList();
            if( response.code === "ERR_NETWORK"){
                toast.error("NETWORK DON'T CONNECTED!!!")
                return;
            }
            if( response.data.code === 200 ){
                const arr : DataType[] = []
                response.data.data.forEach( item => {
                    arr.push(  {
                        key : item.product_id,
                        Product: {
                            'image' : JSON.parse(item.image_url)[0],
                            'title' : item.product_title
                        },
                        Price: item.price_unit,
                    },)
                })
                setDataSource(arr);
            }else{
                toast.error(response.data.message);
            }
        }
        fetchWishList()
    }, []);

    const handleRemove = async (key : number) => {
        const response  = await removeProductInWishList(key);
        if( response.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            toast.success("Product removed!!!");
            setDataSource(dataSource.filter( item => item.key !== key))
        }else{
            toast.error(response.data.message)
        }
    }

    //function
    const columns: TableColumnsType<DataType> = [
        {
            title: 'Product', dataIndex: 'Product', key: 'product',
            render : (item) => (
                <div className={'flex justify-start gap-2'}>
                    <img className={'w-[50px] h-[50px]'} src={item.image}/>
                    <p className={'shortcut text-xs'}>{item.title}</p>
                </div>
            ),
            align: "center"
        },
        { title: 'Price', dataIndex: 'Price', key: 'Price',
            render : (item) => <p className={'text-center'}>{item}</p>,
            align : 'center',
            responsive : ['sm']
        },
        {
            title: 'Action',
            key: 'action',
            render : (item) => <Button type="primary" danger onClick={(e) => handleRemove(item.key) }>Remove</Button>,
            align : 'center',
        },
    ];
    const onChange = (e) => {
        setProductIds(e);

    }
    return (
        <Table
            columns={columns}
            scroll={{ y: 240 }}
            dataSource={dataSource}
            virtual
            rowSelection={
                {
                    type: 'checkbox',
                    columnWidth: 48,
                    onChange : onChange
                }
            }
            pagination={false}
            rowHoverable={false}
        />
    );
};

export default Wish;
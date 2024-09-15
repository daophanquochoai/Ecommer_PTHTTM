import React from 'react';
import {Table, TableColumnsType} from "antd";
import Util from "./Util.tsx";
interface DataType {
    key: React.Key;
    Product: object;
    Price: number;
    Quantity: number;
}
const columns: TableColumnsType<DataType> = [
    {
        title: 'Product', dataIndex: 'Product', key: 'product',
        render : (item) => (
            <div className={'flex items-center gap-2'}>
                <img className={'w-[50px] h-[50px]'} src={item.image}/>
                <p className={'shortcut text-xs'}>{item.title}</p>
            </div>
        ),
        align : 'center'
    },
    { title: 'Price', dataIndex: 'Price', key: 'Price',
        render : (item) => <p className={'text-center'}>{item}</p>,
        align : 'center',
        className : 'flex items-center justify-center',
        responsive : ['md']
    },
    { title: 'Quantity', dataIndex: 'Quantity', key: 'Quantity',
        align : 'center',
        // className : 'flex items-center justify-center',
        render : (item) => (
            <Util item={item}/>
        ),
    },
    {
        title: 'Subtotal',
        key: 'subtotal',
        render : (item : DataType) => <p>{item.Price * item.Quantity}</p>,
        align : 'center',
        className : 'flex items-center justify-center'
    },
];
const data: DataType[] = [
    {
        key: 1,
        Product: {
            'image' : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
            'title' : 'Microsoft Xbox One S Controller - Gears 5 Kait Diaz'
        },
        Price: 32,
        Quantity: 2
    },
    {
        key : 2,
        Product: {
            'image' : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
            'title' : 'Microsoft Xbox One S Controller - Gears 5 Kait Diaz'
        },
        Price: 32,
        Quantity: 2
    }
];
const TableItem : React.FC = () => {
    const onChange = (e) => {
        console.log(e)
    }
    return (
        <Table
            columns={columns}
            scroll={{ y: 240 }}
            dataSource={data}
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

export default TableItem;
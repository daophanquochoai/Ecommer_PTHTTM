import React from 'react';
import {Table,Button, TableColumnsType} from "antd";

interface DataType {
    key : React.Key
    Product: object;
    Price: number;
    Date: string;
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
        responsive : ['sm']
    },
    { title: 'Date', dataIndex: 'Date', key: 'Date',
        align : 'center',
        responsive : ['md']
    },
    {
        title: 'Action',
        key: 'action',
        render : () => <Button type="primary" danger>Remove</Button>,
        align : 'center',
    },
];
const data: DataType[] = [
    {
        key : 1,
        Product: {
            'image' : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
            'title' : 'Microsoft Xbox One S Controller - Gears 5 Kait Diaz'
        },
        Price: 32,
        Date: '10-04-2003'
    },
    {
        key : 2,
        Product: {
            'image' : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
            'title' : 'Microsoft Xbox One S Controller - Gears 5 Kait Diaz'
        },
        Price: 32,
        Date: '10-04-2003'
    }
];
const Wish : React.FC = () => {
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

export default Wish;
import React from 'react';
import {Table, TableProps} from "antd";
interface DataType {
    key: string;
    name: string;
}


const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Cart totals',
        colSpan: 2,
        dataIndex: 'key',
        render : (item) => <p className={'text-base text-center font-[400]'}>{item}</p>,
    },
    {
        title: 'Cart totals',
        colSpan: 0,
        dataIndex: 'name',
        render : (item) => <p className={'text-base text-gray-500'}>{item}</p>
    },
];
const data: DataType[] = [
    {
        key: 'Subtotal',
        name: '$216.90'
    },
    {
        key: 'Shipping: Kee Kij Store',
        name: '$216.90'
    },
    {
        key: 'Total',
        name: '$216.90'
    }
]
const TableProcess : React.FC = () => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={false}
        />
    );
};

export default TableProcess;
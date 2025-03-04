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
type Props = {
    total : number
}
const TableProcess : React.FC = ( props : Props) => {
    const data: DataType[] = [
        {
            key: 'Price',
            name: `${props.total}đ`
        },
        {
            key: 'Total',
            name: `${props.total}đ`
        }
    ]
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
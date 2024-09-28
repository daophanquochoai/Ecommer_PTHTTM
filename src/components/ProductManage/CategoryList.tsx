import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {NavLink} from "react-router-dom";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
}

const columns: TableColumnsType<DataType> = [
    {
      title: 'CATEGORY NAME',
      dataIndex: 'name',
      render: (text: string) => <a><NavLink to='/admin/products/edit-category'>{text}</NavLink></a>,
    },
  ];
  
const data: DataType[] = [
    {
      key: '1',
      name: 'Computers & Technologies',
    },
    {
      key: '2',
      name: 'Babies & Moms',
    },
    {
      key: '3',
      name: 'Sport & Outdoor',
    },
    {
        key: '4',
        name: 'Books & Office',
      },
];

const CategoryList : React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <Flex gap="middle" vertical>
        <div>
            <p className='font-bold text-xs md:text-base'>Product Categories</p>
        </div>
        <Flex align="center" gap="middle">
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
            Delete
            </Button>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </Flex>
        <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={data} />
        <NavLink to='/admin/products/add-category'>      
            <button className='text-white bg-black w-full p-2 mt-3 hover:bg-red-500 transition-all duration-300'>
                ADD NEW CATEGORY
            </button>
        </NavLink>
        </Flex>
  );
};

export default CategoryList;
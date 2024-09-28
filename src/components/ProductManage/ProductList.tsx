import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {NavLink} from "react-router-dom";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    name: string;
    sold: number;
    stock: number;
    expire: string;
}

const columns: TableColumnsType<DataType> = [
    {
      title: 'PRODUCT NAME',
      dataIndex: 'name',
      render: (text: string) => <a><NavLink to='/admin/products/edit-product'>{text}</NavLink></a>,
    },
    {
      title: 'UNIT SOLD',
      dataIndex: 'sold',
    },
    {
      title: 'IN STOCK',
      dataIndex: 'stock',
    },
    {
        title: 'EXPIRE DATE',
        dataIndex: 'expire',
    },
  ];
  
const data: DataType[] = [
    {
      key: '1',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
      sold: 1000,
      stock: 500,
      expire: '21 Sep 2077',
    },
    {
      key: '2',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
      sold: 1000,
      stock: 500,
      expire: '21 Sep 2077',
    },
    {
      key: '3',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
      sold: 1000,
      stock: 500,
      expire: '21 Sep 2077',
    },
    {
      key: '4',
      name: 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
      sold: 1000,
      stock: 500,
      expire: '21 Sep 2077',
    },
];

const ProductList : React.FC = () => {
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
              <p className='font-bold text-xs md:text-base'>Products</p>
          </div>
          <Flex align="center" gap="middle">
              <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
              Delete
              </Button>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
          </Flex>
          <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={data} />
          <NavLink to='/admin/products/add-product'>
              <button type="submit" className='text-white bg-black w-full p-2 mt-3 hover:bg-red-500 transition-all duration-300'>
                  ADD NEW PRODUCT
              </button>
          </NavLink>
        </Flex>
  );
};

export default ProductList;
import React, {useState} from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import {Button, Flex, Table} from 'antd';
import {AppstoreAddOutlined} from '@ant-design/icons';
import {NavLink} from "react-router-dom";

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
    key: React.Key;
    role: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'ROLE',
        dataIndex: 'role',
        render: (text: string) => <a><NavLink to='/admin/users/staff/edit-role'>{text}</NavLink></a>,
    },
];

const data: DataType[] = [
    {
        key: '1',
        role: 'Order manager',
    },
    {
        key: '2',
        role: 'Product manager',
    },
    {
        key: '3',
        role: 'Payment manager',
    },
    {
        key: '4',
        role: 'Customer manager',
    },
    {
        key: '5',
        role: 'Administrator',
    },
];

const RoleList : React.FC = () => {
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
        <div className='w-1/4 gap-4 mt-2'>
            <Flex gap="middle" vertical>    
                <Flex align="center" gap="middle">
                    <NavLink to={'/admin/users/staff/add-role'}>
                        <Button>
                            <AppstoreAddOutlined />
                            Add
                        </Button>
                    </NavLink>
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Delete
                    </Button>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
                </Flex>
                <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={data} />
            </Flex>
        </div>
    );
};

export default RoleList;
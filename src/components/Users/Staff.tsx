import React, {useState} from 'react';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {Button, Flex, Table, Select} from 'antd';   
import type { TableColumnsType, TableProps } from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import {FaFilter} from "react-icons/fa";
import RoleList from './RoleList.tsx';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const bread = [
    {
        title : <NavLink to={'/admin/users'}>Users</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Staff</span>
    }
]

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    role: string;
    status: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'NAME',
        dataIndex: 'name',
        render: (text: string) => <a><NavLink to='/admin/users/staff/detail'>{text}</NavLink></a>,
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
    }, 
    {
        title: 'ROLE',
        dataIndex: 'role',
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
    },
];
  
const data: DataType[] = [
    {
      key: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      role: 'Payment manager',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      role: 'Payment manager',
      status: 'Active',
    },
    {
      key: '3',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      role: 'Payment manager',
      status: 'Active',
    },
    {
      key: '4',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      role: 'Payment manager',
      status: 'Active',
    },
];

const Staff : React.FC = () => {
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
    const  [filter, setFilter] = useState<boolean>(false);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <BreadCrumb bread={bread} />
            <p className='font-bold mt-5'>Staff list</p>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-2'>
                <Flex gap="middle" vertical>
                    <Flex align="center" gap="middle">
                        <NavLink to={'/admin/users/staff/add-staff'}>
                            <Button>
                                <UserAddOutlined />
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
                <div>
                    <button onClick={() => setFilter(!filter)} className={`flex items-center gap-2 p-2  md:display ${filter ? 'bg-red-500 text-white' : 'border-2 bg-white border-red-500 text-red-500'}`}><FaFilter /> Filter</button>
                    <div className={`${filter ?'block' : 'hidden'}`}>
                        <form> 
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Name:</p>
                                <input className='w-11/12 mt-2 p-2 outline-0 border-2 col-span-2' />
                            </div>
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Email:</p>
                                <input className='w-11/12 mt-2 p-2 outline-0 border-2 col-span-2' />
                            </div>
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Role:</p>
                                <Select 
                                    className='mt-2'
                                    defaultValue="Select role"
                                    style={{
                                        width: '200px',
                                        height : '40px'
                                    }}
                                    options={[
                                        {
                                            value: 'role-order',
                                            label: 'Order manager',
                                        },
                                        {
                                            value: 'role-product',
                                            label: 'Product manager',
                                        },
                                        {
                                            value: 'role-payment',
                                            label: 'Payment manager',
                                        },
                                        {
                                            value: 'role-customer',
                                            label: 'Customer manager',
                                        },
                                        {
                                            value: 'role-admin',
                                            label: 'Administrator',
                                        },
                                    ]}
                                />
                            </div>
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Status:</p>
                                <Select 
                                    className='mt-2'
                                    defaultValue="Select status"
                                    style={{
                                        width: '200px',
                                        height : '40px'
                                    }}
                                    options={[
                                        {
                                            value: 'active',
                                            label: 'Active',
                                        },
                                        {
                                            value: 'temp-locked',
                                            label: 'Temporarily locked',
                                        },
                                        {
                                            value: 'locked',
                                            label: 'Locked',
                                        },
                                        ]}
                                />
                            </div>  
                            <div className='flex justify-center mt-5 pb-5'>
                                <Button type="primary">
                                    Search
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <p className='font-bold mt-5'>Role list</p>
            <RoleList />
        </div>
    );
};

export default Staff;
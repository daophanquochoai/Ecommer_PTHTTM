import React, {useState} from 'react';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {Button, Flex, Table, Select, DatePicker} from 'antd';   
import type { TableColumnsType } from 'antd';
import {FaFilter} from "react-icons/fa";

const bread = [
    {
        title : <NavLink to={'/admin/users'}>Users</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Customer</span>
    }
]
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

interface DataType {
    key: React.Key;
    username: string;
    email: string;
    phone: string;
    status: string;
    register: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'USERNAME',
        dataIndex: 'username',
        render: (text: string) => <a><NavLink to='/admin/users/customer/detail'>{text}</NavLink></a>,
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
    }, 
    {
        title: 'PHONE NUMBER',
        dataIndex: 'phone',
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
    },
    {
        title: 'REGISTRATION DATE',
        dataIndex: 'register',
    },
  ];
  
const data: DataType[] = [
    {
      key: '1',
      username: 'ngocquy',
      email: 'ngocquy.19082003@gmail.com',
      phone: '0123456789',
      status: 'Active',
      register: '21 Sep 2024',
    },
    {
      key: '2',
      username: 'ngocquy',
      email: 'ngocquy.19082003@gmail.com',
      phone: '0123456789',
      status: 'Active',
      register: '21 Sep 2024',
    },
    {
      key: '3',
      username: 'ngocquy',
      email: 'ngocquy.19082003@gmail.com',
      phone: '0123456789',
      status: 'Active',
      register: '21 Sep 2024',
    },
    {
      key: '4',
      username: 'ngocquy',
      email: 'ngocquy.19082003@gmail.com',
      phone: '0123456789',
      status: 'Active',
      register: '21 Sep 2024',
    },
];

const Customer : React.FC = () => {
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };
    const  [filter, setFilter] = useState<boolean>(false);

    return (
        <div>
            <BreadCrumb bread={bread} />
            <p className='font-bold mt-5'>Customer list</p>
            <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mt-2'>
                <Flex gap="middle" vertical>
                    <Table<DataType> columns={columns} dataSource={data} />
                </Flex>
                <div>
                    <button onClick={() => setFilter(!filter)} className={`flex items-center gap-2 p-2  md:display ${filter ? 'bg-red-500 text-white' : 'border-2 bg-white border-red-500 text-red-500'}`}><FaFilter /> Filter</button>
                    <div className={`${filter ?'block' : 'hidden'}`}>
                        <form> 
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Username:</p>
                                <input className='w-11/12 mt-2 p-2 outline-0 border-2 col-span-2' />
                            </div>
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Email:</p>
                                <input className='w-11/12 mt-2 p-2 outline-0 border-2 col-span-2' />
                            </div>
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Phone number:</p>
                                <input className='w-11/12 mt-2 p-2 outline-0 border-2 col-span-2' />
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
                            <div className='grid gap-1 grid-cols-3'>
                                <p className='font-bold mt-5 ml-2'>Registration date:</p>
                                <RangePicker className='w-11/12 mt-2 p-2 outline-0 border-2 col-span-2' format={dateFormat} />
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
        </div>
    );
};

export default Customer;
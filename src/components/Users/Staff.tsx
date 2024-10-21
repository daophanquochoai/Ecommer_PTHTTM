import React, {useEffect, useState} from 'react';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {Button, Flex, Table, Select} from 'antd';   
import type { TableColumnsType, TableProps } from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import {FaFilter} from "react-icons/fa";
import RoleList from './RoleList.tsx';
import {getEmployee} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

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

interface Employee {
    key: number;
    firstname: string;
    lastname: string;
    image: string;
    phone: string;
    email: string;
    username: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'NAME',
        align: 'center',
        render: (item : Employee) => <a><NavLink to='/admin/users/staff/detail'>{item.lastname + ' ' + item.firstname}</NavLink></a>,
    },
    {
        title: 'EMAIL',
        align: 'center',
        dataIndex: 'email',
    }, 
    {
        title: 'PHONE',
        align: 'center',
        dataIndex: 'phone',
    },
    {
        title: 'USERNAME',
        align : "center",
        dataIndex: 'username',
    },
];


const Staff : React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<Employee[]>([])

    useEffect(() => {
        const fetchInfoUser = async () => {
            setLoading(true)
            const response = await getEmployee();
            setLoading(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            if( response.data.code === 200 ){
                const arr : Employee[] = []
                response.data.data.forEach( item => {
                    arr.push(  {
                        key: item.admin_id,
                        firstname : item.first_name,
                        lastname : item.last_name,
                        image : item.image_url,
                        phone : item.phone,
                        email : item.email,
                        username : item.username
                    })
                })
                setDataSource(arr)
            }else{
                toast.error(response.data.message);
            }
            console.log(response)
        }
        fetchInfoUser()
    }, []);

    const  [filter, setFilter] = useState<boolean>(false);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
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
                        <Button type="primary" disabled={!hasSelected} loading={loading}>
                            Delete
                        </Button>
                    </Flex>
                    <Table<DataType> columns={columns} dataSource={dataSource} />
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
        </div>
    );
};

export default Staff;
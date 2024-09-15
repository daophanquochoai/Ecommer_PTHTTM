import React, {useState} from 'react';
import {Pagination, Table} from "antd";

import {Button, TableColumnsType} from "antd";
import Util from "../components/Cart/Util.tsx";
interface DataType {
    key: React.Key;
    firstname: string;
    lastname: string;
    image: string;
    phone: string;
    email: string;
    username: string;
}
const columns: TableColumnsType<DataType> = [
    {
        title: 'firstname', dataIndex: 'firstname', key: 'firstname',
        align : 'center',
        responsive : ['md']
    },
    {
        title: 'lastname', dataIndex: 'lastname', key: 'lastname',
        align : 'center',
    },
    {
        title: 'image', dataIndex: 'image', key: 'image',
        align : 'center',
        render : (item) => <img className={'w-[40px] h-[40px]'} src={item}/>
    },
    {
        title: 'phone', dataIndex: 'phone', key: 'phone',
        align : 'center'
    },
    {
        title: 'email', dataIndex: 'email', key: 'email',
        align : 'center'
    },
    {
        title: 'username', dataIndex: 'username', key: 'username',
        align : 'center'
    },
    {
        title: 'Action',
        key: 'Action',
        align : 'center',
        render : (item : DataType) => (
            <div>
                <Button type={"primary"} danger>DELETE</Button>
                <Button danger>RESET</Button>
            </div>
        )
    },
];

const data: DataType[] = [
    {
        key: 1,
        firstname : "dao phan",
        lastname : 'quoc hoai',
        image : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
        phone : '0779127667',
        email : 'hoai23828@gmail.com',
        username : 'quochoai'
    },
    {
        key: 1,
        firstname : "dao phan",
        lastname : 'quoc hoai',
        image : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
        phone : '0779127667',
        email : 'hoai23828@gmail.com',
        username : 'quochoai'
    },
    {
        key: 1,
        firstname : "dao phan",
        lastname : 'quoc hoai',
        image : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42-300x313.jpg',
        phone : '0779127667',
        email : 'hoai23828@gmail.com',
        username : 'quochoai'
    }
];

const Employee : React.FC = () => {
    const [page, setPage] = useState<number>(1)
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
            <div className={'p-5 flex items-center justify-center w-full'}>
                <div>
                    <Pagination
                        current={page}
                        onChange={e => setPage(e)}
                        total={100}
                        showSizeChanger={false}
                        defaultPageSize={8}
                        responsive={true}
                    />
                </div>
            </div>
        </>
    );
};

export default Employee;
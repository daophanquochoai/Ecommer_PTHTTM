import React, {useEffect, useState} from 'react';
import {Pagination, Table} from "antd";

import {Button, TableColumnsType} from "antd";
import {deleteEmpl, getEmployee, resetPasswordForEmployee} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
interface DataType {
    key: number;
    firstname: string;
    lastname: string;
    image: string;
    phone: string;
    email: string;
    username: string;
}


const Employee : React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<DataType[]>([])

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
                const arr : DataType[] = []
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

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Frist Name', dataIndex: 'firstname', key: 'firstname',
            align : 'center',
            responsive : ['md']
        },
        {
            title: 'Last Name', dataIndex: 'lastname', key: 'lastname',
            align : 'center',
        },
        {
            title: 'Image', dataIndex: 'image', key: 'image',
            align : 'center',
            render : (item) => <img className={'w-[40px] h-[40px]'} src={item}/>
        },
        {
            title: 'Phone', dataIndex: 'phone', key: 'phone',
            align : 'center'
        },
        {
            title: 'Email', dataIndex: 'email', key: 'email',
            align : 'center'
        },
        {
            title: 'Username', dataIndex: 'username', key: 'username',
            align : 'center'
        },
        {
            title: 'Action',
            key: 'Action',
            align : 'center',
            render : (item : DataType) => (
                <div>
                    <Button type={"primary"} danger onClick={() => handleDeleteEmpl(item.key)}>DELETE</Button>
                    <Button primary onClick={() => handleResetPassword(item.key)}>RESET</Button>
                </div>
            )
        },
    ];
    // function
    const handleDeleteEmpl= async (id : number) => {
        setLoading(true)
        const response = await deleteEmpl(id);
        setLoading(false)
        console.log(response)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            toast.success("Delete Employee Success")
            setDataSource(dataSource.filter(item => item.key !== id))
        }else{
            toast.error(response.data.message)
        }
    }
    const handleResetPassword = async (id : number) => {
        setLoading(true)
        const response = await resetPasswordForEmployee(id);
        setLoading(false)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            toast.success("Reset Employee Success")
        }else{
            toast.error(response.data.message)
        }
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
            />
        </>
    );
};

export default Employee;
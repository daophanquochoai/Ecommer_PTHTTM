import React, {useEffect, useState} from 'react';
import {Modal, Pagination, Table} from "antd";

import {Button, TableColumnsType} from "antd";
import {deleteEmpl, getEmployee, resetPasswordForEmployee} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {SiQuicklook} from "react-icons/si";
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

    // modal
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <div className={'flex justify-between items-center mb-4'}>
                <button onClick={() => setOpen(true)} className={'text-white border-2 border-red-500 bg-red-500 px-4 rounded py-1 hover:text-red-500 hover:bg-white'}>ADD</button>
                <div>
                    <div></div>
                    <div className={'flex items-center gap-2'}>
                        <input placeholder={'Search user'} className={'outline-0 border-0 bg-primary border-b-2 border-red-500'}/>
                        <SiQuicklook className={'text-2xl text-red-500 cursor-pointer'}/>
                    </div>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
            />
            <Modal
                title={<p>Add Employee</p>}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <label>First name :</label>
                    <input />
                </div>
                <div>
                    <label>Last name :</label>
                    <input />
                </div>
                <div>
                    <label>Email :</label>
                    <input />
                </div>
                <div>
                    <label>Username :</label>
                    <input />
                </div>
                <div>
                    <label>First name :</label>
                    <input />
                </div>
                <div>
                    <label>First name :</label>
                    <input />
                </div>
            </Modal>
        </>
    );
};

export default Employee;
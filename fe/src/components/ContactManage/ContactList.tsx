import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {MailOutlined} from '@ant-design/icons';
import {getListContact} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {Pagination} from "antd";
import {AppContext} from "../../context/AppContext.tsx";

type Contact = {
    contact_id : number,
    fullName : string,
    email : string,
    createdAt : string,
    title : string,
    isResponsed: number
}
const ContactList : React.FC = () => {

    const [dataContact, setDataContact] = useState<Contact[]>([]);

    const [pageTotal, setPageTotal] = useState<number>(0);
    const {page, setPage} = useContext(AppContext);

    const [searchKey, setSearchKey] = useState<string>('');

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListContact(page);
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            // console.log(response);
            setPageTotal(response.data.totalPage)
            const arr : Contact[] = [];
            if(response.data.code == 200)
            {
                response.data.data.forEach(item => {
                    arr.push({
                        contact_id : item.contact_id,
                        fullName : item.fullName,
                        email : item.email,
                        createdAt : new Date(item.createdAt).toLocaleDateString(),
                        title : item.title,
                        isResponsed: item.isResponsed
                    })
                })
                setDataContact(arr);
            }
            else
            {
                toast.error("Error get data's blogs");
            }
        };
        fetchApi();
    }, [page]);

    const filteredContacts = dataContact.filter(contact =>
        contact.title.toLowerCase().includes(searchKey.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchKey.toLowerCase())
    );


    // console.log(dataContact);

    return (
        <>
            <div>
                <p className='font-bold text-xs md:text-base'>Contact</p>
                <div className="flex justify-end">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchKey}
                        onChange={e => setSearchKey(e.target.value)}
                        className="border p-2 mb-3 w-[50%] rounded-[5px]"
                    />
                </div>
                {
                    filteredContacts.map((item, index) => (
                        <NavLink key={index} to={`/admin/contact/${item.contact_id}`}>
                            <div className={`${item.isResponsed ?  "bg-gray-80" : "bg-white"}  mt-3 group shadow-lg cursor-pointer border border-gray-200 hover:border-black`}>
                                <div className='grid grid-cols-1 md:grid-cols-[1fr_3fr_6fr_1fr] items-center'>
                                    <MailOutlined style={{ fontSize: '32px' }} className={'p-2 text-gray-400 group-hover:text-black'} />
                                    <p className={'font-bold'}>{item.email}</p>
                                    <p className={'font-bold mr-5'}
                                       style={{
                                           whiteSpace: 'nowrap',
                                           overflow: 'hidden',
                                           textOverflow: 'ellipsis'
                                       }}
                                    >
                                        {item.title}
                                    </p>
                                    <p className={'font-bold'}>{item.createdAt}</p>
                                </div>
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <div className={'p-5 flex items-center justify-center w-full'}>
                <div>
                    <Pagination
                        current={page + 1}
                        onChange={e => setPage(e - 1)}
                        total={pageTotal*8}
                        showSizeChange={false}
                        defaultPageSize={8}
                        responsive={true}
                    />
                </div>
            </div>
        </>
    );
};
export default ContactList;
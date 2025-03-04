import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {toast} from "react-toastify";
import {getDetailContact, responseContact} from "../../Utils/Helper.tsx";
const bread = [
    {
        title : <NavLink to={'/admin/contact'}>Contact</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Response Contact</span>
    }
]

type Contact = {
    contact_id : number,
    fullName : string,
    email : string,
    createdAt : string,
    title : string,
    isResponsed: number,
    content: string
}

const ResponseContact : React.FC = () => {

    const params = useParams();
    const [dataDetailContact, setDataDetailContact] = useState<object>({});
    const [dataResponse, setDataResponse] = useState<string>("")

    const contactId : number = parseInt(params.id as string);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailContact(contactId);

            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            console.log(response);

            if(response.data.code == 200)
            {
                const dataFetch = response.data.data;
                setDataDetailContact({
                    contact_id : dataFetch.contact_id,
                    fullName : dataFetch.fullName,
                    email : dataFetch.email,
                    createdAt : new Date(dataFetch.createdAt).toLocaleString(),
                    title : dataFetch.title,
                    isResponsed: dataFetch.isResponsed,
                    content: dataFetch.content
                })
            }
            else
            {
                toast.error("Error get data's contact");
            }
        }
        fetchApi();
    }, []);

    // console.log(dataDetailContact);

    const handleResponse = (e) => {
        e.preventDefault();
        if(!dataResponse.trim())
        {
            toast.error("Content not empty!!");
            return;
        };
        // const reponseTo = dataDetailContact.email;
        // const titleResponse = "[RESPONSE]: " + dataDetailContact.title;
        // const contentResponse = dataResponse;

        const data = {
            reponseTo : dataDetailContact.email,
            titleResponse : "[RESPONSE]: " + dataDetailContact.title,
            contentResponse : dataResponse
        }

        const fetchApi = async () => {
            const response = await responseContact(contactId, data);
            console.log(response);
            // setLoadingProduct(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.data.code === 200)
            {
                toast.success("Response success!!")
                navigate(`/admin/contact`)
            }
            else {
                toast.error(response.data.message);
            }
        }

        fetchApi()
    }

    return (
        <div>
            <BreadCrumb bread={bread} />
            <div className={'grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 p-6'}>
                <div>
                    <p className='font-bold text-xs md:text-base'>Customer Contact</p>
                    <div className='bg-white p-2 border border-gray-200 rounded-lg mt-5'>
                        <p className='text-2xl'>{dataDetailContact.title}</p>
                        <p className='font-bold mt-2'>{dataDetailContact.fullName}</p>
                        <div className='flex justify-end'>
                            <p className='text-sm text-gray-400 mt-0.5 mr-5'>{dataDetailContact.email}</p>
                            <p className='text-sm text-gray-400 mt-0.5 ml-5'>{dataDetailContact.createdAt}</p>
                        </div>
                        <p className='mt-2'>
                            {dataDetailContact.content}
                            {/*Hello,<br />*/}
                            {/*<br />*/}

                            {/*<br />*/}
                            {/*Thank you,<br />*/}
                            {/*Nguyễn Văn B<br />*/}
                            {/*Email: nguyenvanb@gmail.com*/}
                        </p>
                    </div>
                </div>
                <div>
                    <p className='font-bold text-xs md:text-base'>Response Contact</p>
                    <form className='bg-white p-2 border border-gray-200 rounded-lg mt-5' onSubmit={handleResponse}>
                        <div className='grid grid-cols-[1fr_4fr] items-center mb-5'>
                            <label className='font-bold'>To <span className='text-red-500'>*</span></label>
                            <input required className='p-2 outline-0 border-b-2 border-red-500'
                                   value={dataDetailContact.email}
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_4fr] items-center mb-5'>
                            <label className='font-bold'>Title <span className='text-red-500'>*</span></label>
                            <input required className='p-2 outline-0 border-b-2 border-red-500'
                                   value={dataDetailContact.title}
                            />
                        </div>
                        <div className='grid grid-cols-[1fr_4fr] items-center mb-5'>
                            <label className='font-bold'>Response <span className='text-red-500'>*</span></label>
                            <textarea className='p-2 outline-0 border-b-2 border-red-500 h-36'
                                onChange={e=> setDataResponse(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'} >RESPONSE</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ResponseContact;
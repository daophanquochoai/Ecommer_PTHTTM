import React, {useEffect, useState} from 'react';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import {Button} from 'antd';
import {settingAboutWebsite, settingAboutWebsite_PATCH, settingContactInformation_PATCH} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

const bread = [
    {
        title : <NavLink to={'/admin/settings'}>Settings</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Contact information</span>
    }
]

type ContactInfomation = {
    id : number,
    address : string,
    supportPhoneNumber : string,
    contactEmail : string,
}

const ContactInfo : React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<object>({});
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const response = await settingAboutWebsite();
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            // console.log(response);
            if(response.data.code == 200)
            {
                if(response.data.data != null)
                {
                    let dataObject : ContactInfomation = {
                        id: response.data.data.id,
                        address : response.data.data.address,
                        supportPhoneNumber : response.data.data["contact_phone"],
                        contactEmail : response.data.data["contact_email"],
                    }
                    setData(dataObject);
                }
            }
            else
            {
                toast.error("Error get contact information to setting");
            }
        }
        fetchApi();
    }, []);

    // console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();

        const dataUpdate = {
            address : data.address,
            contact_phone : data.supportPhoneNumber,
            contact_email: data.contactEmail,
        };

        console.log(dataUpdate);

        const fetchApi = async () => {
            const response= await settingContactInformation_PATCH(dataUpdate);
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.data.code === 200)
            {
                toast.success("Update success!!")
            }
            else
            {
                toast.success("Update Failt!!")
            }
        }
        fetchApi()

    }

    return (
        <div>
            <BreadCrumb bread={bread} />
            <form onSubmit={handleSubmit}>
                <p className='font-bold mt-5'>Address</p>
                <input required placeholder='139 Brook Drive South Richmond Hill, NY' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white'
                       defaultValue={data?.address || ''}
                       onChange={(e) =>
                           setData({
                              ...data,
                               address: e.target.value,
                           })
                       }
                />
                <p className='font-bold mt-5'>Support phone number</p>
                <input required placeholder='(+084) 779-127-667' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white'
                       defaultValue={data?.supportPhoneNumber || ''}
                       onChange={(e) =>
                           setData({
                               ...data,
                               supportPhoneNumber: e.target.value,
                           })
                       }
                />
                <p className='font-bold mt-5'>Contact email</p>
                <input required placeholder='dpquochoai@gmail.com' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white'
                       defaultValue={data?.contactEmail || ''}
                       onChange={(e) =>
                           setData({
                               ...data,
                               contactEmail: e.target.value,
                           })
                       }
                />
                <div>
                    {/*<Button type="primary" onSubmit={handleSubmit} onClick={start} loading={loading} className='mt-5 ml-2'>*/}
                    {/*    Apply*/}
                    {/*</Button>*/}
                    <button
                        type="submit"
                        className={'bg-black hover:bg-red-500 text-white py-2 px-4 mt-5'}
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactInfo;
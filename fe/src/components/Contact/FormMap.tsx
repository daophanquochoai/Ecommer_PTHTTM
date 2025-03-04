import React, {useState} from 'react';
import {Form, Spin} from "antd";
import {toast} from "react-toastify";
import {submitInfoCustomer} from "../../Utils/Helper.tsx";


type Info = {
    name : string,
    email : string,
    title : string,
    message : string
}
const FormMap : React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const [data, setData] = useState<Info>({ name : '',
                                                            email : '',
                                                            title : '',
                                                            message : ''})

    const handleAddInfo = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await submitInfoCustomer(data.name, data.email, data.title, data.message);
        setLoading(false)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Netword don't connected!!")
            return;
        }
        if( response.data.code === 200 ){
            setData({ name : '',
                email : '',
                title : '',
                message : ''})
            toast.success("WE WILL CONNECT SOON..")
        }else{
            toast.error(response.data.message)
        }
    }
    return (
        <div className={'grid grid-cols-1 lg:grid-cols-2 mt-8 bg-white'}>
            {/*  Map */}
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5201415897695!2d106.78408977462828!3d10.847986989305152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2sPosts%20and%20Telecommunications%20Institute%20of%20Technology%20HCM%20Branch!5e0!3m2!1sen!2sus!4v1726124634527!5m2!1sen!2sus"
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        className={'w-full h-[600px]'}
                ></iframe>
            </div>
            {/*   Form  */}
            <div className={'p-12'}>
               <Spin className={'Submiting'} spinning={loading}>
                   <form onSubmit={(e) => handleAddInfo(e)} className={'grid grid-cols-1 gap-9'}>
                       <div className={'flex flex-col md:flex-row gap-9 justify-between'}>
                           <div className={'flex flex-col gap-2 flex-1'}>
                               <label className={'text-2xl'}>Your Name <span className={'text-red-500'}>*</span></label>
                               <input value={data.name} onChange={(e) => setData({...data, name : e.target.value})} required={true} placeholder={'Nguyen Van A'} className={'p-2 outline-0 border-2'}/>
                           </div>
                           <div className={'flex flex-col gap-2 flex-1'}>
                               <label className={'text-2xl'}>Your Email</label>
                               <input type={"email"} value={data.email} onChange={(e) => setData({...data, email : e.target.value})}  placeholder={"youremail@gmail.com"} className={'p-2 outline-0 border-2'}/>
                           </div>
                       </div>
                       <div className={'flex gap-2 flex-col'}>
                           <label className={'text-2xl'}>Subject</label>
                           <input value={data.title} onChange={(e) => setData({...data, title : e.target.value})}  className={'p-2 outline-0 border-2'}/>
                       </div>
                       <div className={'flex flex-col gap-2'}>
                           <label className={'text-2xl'}>Your Message</label>
                           <textarea value={data.message} onChange={(e) => setData({...data, message : e.target.value})}  className={'outline-0 border-2 h-36 p-3'} />
                       </div>
                       <div>
                           <button className={'w-full md:w-auto bg-black hover:bg-red-500 text-white py-2 px-4'}>Send Message</button>
                       </div>
                   </form>
               </Spin>
            </div>
        </div>
    );
};

export default FormMap;
import React, {useEffect, useState} from 'react';
import {Upload} from "antd";
import {GrUploadOption} from "react-icons/gr";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import { Image, Button} from 'antd';
import {toast} from "react-toastify";
import {addBlog, editBlog, getListBlog, settingAboutWebsite, settingAboutWebsite_PATCH} from "../../Utils/Helper.tsx";

const bread = [
    {
        title : <NavLink to={'/admin/settings'}>Settings</NavLink>
    },
    {
        title : <span className={'text-red-500'}>About website</span>
    }
]

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

type AboutWebsite = {
    id : number,
    logo_website : string,
    name_website : string,
}

const AboutWeb : React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<object>({});

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        // {
        // uid: '-1',
        // name: 'image.png',
        // status: 'done',
        // url: 'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png',
        // },
    ]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        };
    const handleChange = ({ fileList: newFileList }) => {
        console.log("Phản hồi server:", newFileList);
        const uploadedFile = newFileList.find(
            (item) => item.status === "done" && item.response
        );

        if (uploadedFile) {
            const url = uploadedFile.response;
            setFileList([
                {
                    uid: uploadedFile.uid,
                    name: uploadedFile.name,
                    url: url,
                },
            ]);
        } else {
            setFileList(newFileList); // Cập nhật trạng thái đang tải
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const response = await settingAboutWebsite();
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            console.log(response);
            if(response.data.code == 200)
            {
                if(response.data.data != null)
                {
                    let dataObject : AboutWebsite = {
                        id: response.data.data.id,
                        logo_website : response.data.data.logo,
                        name_website : response.data.data.name,
                    }
                    setData(dataObject);
                    // console.log("------------------");
                    if(response.data.data.logo)
                    {
                        setFileList([{
                            uid: Date.now().toString(),
                            name: response.data.data.logo,
                            url: response.data.data.logo,
                        }]);
                    }
                }
            }
            else
            {
                toast.error("Error get about website to setting");
            }
        }
        fetchApi();
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("chạy vào đây")
        // fileList.map(item => console.log(item));
        const list_url_images = fileList.map(item => item.url);
        // console.log(list_url_images[0])
        const dataUpdate = {
            logo : list_url_images[0],
            name : data.name_website,
        };

        const fetchApi = async () => {
            // setLoadingProduct(true)
            const response= await settingAboutWebsite_PATCH(dataUpdate);
            // console.log(response);
            // setLoadingProduct(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.data.code === 200)
            {
                toast.success("Update success!!")
                // navigate(`/admin/products/${product_id.id}}`)
            }
            else
            {
                toast.success("Update Failt!!")
            }
        }
        fetchApi()
        // console.log(dataUpdate);
    }

    return (
        <div>
            <BreadCrumb bread={bread} />
            {/*<div className='mt-5 flex'>*/}
            {/*    <Image*/}
            {/*        width={200}*/}
            {/*        src="https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png"*/}
            {/*        className='bg-white'*/}
            {/*    />*/}
            {/*    <p className='mt-2 ml-6 text-2xl'>Mekog E-commerce</p>*/}
            {/*</div>*/}
            <form className='mt-5' onSubmit={handleSubmit}>
                <p className='font-bold'>Website name</p>
                <input
                    required
                    placeholder="Mekog E-commerce"
                    className="w-1/2 mt-2 p-2 outline-0 border-2 bg-white"
                    defaultValue={data?.name_website || ''}
                    onChange={(e) =>
                        setData({
                            id: data?.id || 0,
                            logo_website: data?.logo_website || '',
                            name_website: e.target.value, // Cập nhật giá trị
                        })
                    }
                />
                <p className='font-bold mt-5'>Website logo</p>
                <div className='w-1/2 mt-2 bg-white'>
                    <Upload
                        action={'http://localhost:3000/upload'}
                        name="image_url"
                        maxCount={1}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        <GrUploadOption />
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
                {/*<Button type="primary" onClick={start} loading={loading} className='mt-5 ml-2'>*/}
                {/*    Apply*/}
                {/*</Button>*/}
                <button
                    type="submit"
                    className={'bg-black hover:bg-red-500 text-white py-2 px-4 mt-5'}
                >
                    Apply
                </button>
            </form>
        </div>
    );
};

export default AboutWeb;
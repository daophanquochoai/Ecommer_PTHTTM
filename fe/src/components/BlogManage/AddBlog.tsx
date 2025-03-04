import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {GrUploadOption} from "react-icons/gr";
import { Image, Upload} from 'antd';
import {addBlog, editBlog} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
const bread = [
    {
        title : <NavLink to={'/admin/blogs'}>Blogs</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Add Blog</span>
    }
]
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const AddBlog : React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
    ]);
    const navigate = useNavigate();
    const [data, setData] = useState<object>({
        content : "",
        image_url : "",
        title : ""
    })
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const handleSubmit = (e) => {
        e.preventDefault();
        // fileList.map(item => console.log(item.response));
        if(!data.title.trim())
        {
            toast.error("Title not empty!");
            return;
        }
        const list_url_images = fileList.map(item => item.response);
        const newData = {
            title: data.title,
            content: data.content,
            image_url: list_url_images,
            createdAt: new Date()
        };
        // console.log(newData);
        const fetchApi = async () => {
            // setLoadingProduct(true)
            const response= await addBlog(newData);
            // console.log(response);
            // setLoadingProduct(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.data.code === 200)
            {
                toast.success("Create new blog success!!")
                navigate(`/admin/blogs`)
            }
            else
            {
                toast.error("Create new blog unsuccess!!")
            }
        }
        fetchApi()
    }


    return (
        <div>
            <BreadCrumb bread={bread} />
            <form className='grid grid-cols-1 gap-9 mt-9' onSubmit={handleSubmit}>
                <div className='flex flex-col w-1/2 gap-9'>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-bold'>Blog Title <span className='text-red-500'>*</span></label>
                        <input required className='p-2 outline-0 border-b-2 border-red-500'
                               onChange={e => setData({
                                   ...data,
                                   title: e.target.value
                               })}
                        />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-bold'>Blog Content <span className='text-red-500'>*</span></label>
                        <textarea className='p-2 outline-0 border-b-2 border-red-500 h-36'
                                  onChange={e => setData({
                                      ...data,
                                      content: e.target.value
                                  })}
                        />
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <p className='font-bold'>Blog Image <span className='text-red-500'>*</span></p>
                        <div>
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
                    </div>
                </div>
                <div>
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'} >ADD NEW BLOG</button>
                </div>
            </form>
        </div>
    );
};
export default AddBlog;
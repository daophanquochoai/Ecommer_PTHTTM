import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {GrUploadOption} from "react-icons/gr";
import { Image, Upload} from 'antd';

const bread = [
    {
        title : <NavLink to={'/admin/blogs'}>Blogs</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Edit Blog</span>
    }
]

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const EditBlog : React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://demo-60.woovinapro.com/wp-content/uploads/2019/07/blog-2.jpg',
        },
    ]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <div>
            <BreadCrumb bread={bread} />
            <form className='grid grid-cols-1 gap-9 mt-9'>
                <div className='flex flex-col w-1/2 gap-9'>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-bold'>Blog Title <span className='text-red-500'>*</span></label>
                        <input required className='p-2 outline-0 border-b-2 border-red-500' 
                            value='Sample post with format link'
                        />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-bold'>Blog Content <span className='text-red-500'>*</span></label>
                        <textarea className='p-2 outline-0 border-b-2 border-red-500 h-36' 
                            value='Phasellus ac sem eu mauris sodales tristique sed non ligula. Aenean in mauris ac libero condimentum vulputate quis ut sapien. Phasellus euismod mi eget interdum pellentesque. Maecenas molestie vitae risus vitae volutpat. Maecenas a velit rutrum, auctor quam et, commodo est. Cras leo sem, maximus non ex ac, porttitor egestas dolor. Fusce ut metus sodales, pellentesque diam sed, sodales massa. Nulla facilisi. Sed sed quam eget metus interdum condimentum non et odio.'
                        />
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <p className='font-bold'>Blog Image <span className='text-red-500'>*</span></p>
                        <div>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
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
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'} >EDIT NOW</button>
                </div>
            </form>
        </div>
    );
};

export default EditBlog;
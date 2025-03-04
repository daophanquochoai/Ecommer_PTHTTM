import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {GrUploadOption} from "react-icons/gr";
import { Image, Upload} from 'antd';
import {editBlog, EditProductAdmin, getBlogDetail, getListBlog} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
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

type Blog = {
    blog_id : number,
    content : string,
    image_url : string,
    createdAt : string,
    title : string
}
const EditBlog : React.FC = () => {
    const params = useParams();
    const [data, setData] = useState<object>({})
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://demo-60.woovinapro.com/wp-content/uploads/2019/07/blog-2.jpg',
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
        // console.log(newFileList);  // console.log là hiểu!! có nghĩa là có trạng thái của upload ảnh lên
        if( newFileList.filter( item => item.hasOwnProperty('status') && item.status === "done").length > 0 ){
            var item = newFileList.filter( item => item.hasOwnProperty('status') && item.status === "done")[0];
            // setFileList([
            //     {
            //         uid: new Date().toString(),
            //         name: item.name,
            //         url: item.response,
            //     }
            // ])
            // console.log("------------------update file--------------")
        }
        setFileList(newFileList);
    };

    const blogId : number = parseInt(params.id as string);
    // console.log(blogId);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getBlogDetail(blogId);
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Netword don't connected!!")
                return;
            }
            // console.log(response);

            if(response.data.code == 200)
            {
                const blog = response.data.data;
                setData({
                    blog_id : blog.blog_id,
                    content : blog.content,
                    image_url : blog.image_url ? JSON.parse(blog.image_url)[0] : "",
                    createdAt : new Date(blog.createdAt).toLocaleDateString(),
                    title : blog.title
                })
                if(blog.image_url)
                {
                    setFileList([{
                        uid: 1,
                        name: JSON.parse(blog.image_url)[0],
                        url: JSON.parse(blog.image_url)[0],
                    }]);
                }
            }
            else
            {
                toast.error("Error get data's blog");
            }
        }

        fetchApi();
    }, []);

    // console.log("ảnh: ", fileList)

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        // fileList.map(item => console.log(item.response));
        const list_url_images = fileList.map(item => item.response);
        const dataUpdate = {
            title: data.title,
            content: data.content,
            image_url: list_url_images
        };
        // console.log(dataUpdate);
        const fetchApi = async () => {
            // setLoadingProduct(true)
            const response= await editBlog(blogId, dataUpdate);
            console.log(response);
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
        }
        fetchApi()
    }

    return (
        <div>
            <BreadCrumb bread={bread} />
            <form className='grid grid-cols-1 gap-9 mt-9' onSubmit={handleSubmitEdit}>
                <div className='flex flex-col w-1/2 gap-9'>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-bold'>Blog Title <span className='text-red-500'>*</span></label>
                        <input required className='p-2 outline-0 border-b-2 border-red-500'
                               value={data.title}
                               onChange={e => setData({
                                   ...data,
                                   title: e.target.value
                               })}
                        />
                    </div>
                    <div className='flex gap-2 flex-col'>
                        <label className='font-bold'>Blog Content <span className='text-red-500'>*</span></label>
                        <textarea className='p-2 outline-0 border-b-2 border-red-500 h-36'
                                  value={data.content}
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
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'} >EDIT NOW</button>
                </div>
            </form>
        </div>
    );
};
export default EditBlog;
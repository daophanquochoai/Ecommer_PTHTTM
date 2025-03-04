import React, {useContext, useEffect, useState} from 'react';
import {Form, Select, Spin, TreeDataNode, TreeSelect, Upload, UploadProps} from "antd";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext.tsx";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {addCategoryByAdmin, getCategory} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

const bread = [
    {
        title : <NavLink to={'/admin/products'}>Products</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Add category</span>
    }
]

const AddCategory: React.FC = () => {
    const {categoryList, setCategoryList} = useContext(AppContext)
    const [category, setCategory] = useState< TreeDataNode[]>([]);
    const [loadingCategory, setLoadingCategory] = useState<boolean>(true)
    const [imageComment, setImageComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryTitle, setCategoryTitle] = useState<string>('')
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const navigate = useNavigate()

    const [categoryChoose, setCategoryChoose] = useState<number>(0)

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    //function
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false)
            setImageComment(info.file.response)
        }
    };
    const dip = (arr:object[], data : object[]) => {
        data.forEach(
            (d, index) => {
                const text = {
                    title: <li className={'text-[14px] md:text-xl text-gray-400 cursor-pointer hover:text-red-500'}>{d.category_title}</li>,
                    value : d.category_id
                }
                if( d.hasOwnProperty('children')){
                    text.children = []
                    dip(text.children, d.children);
                }
                // console.log(text)
                arr.push(text);
            }
        )
    }

    useEffect(() => {
        const createTreeCategory = ( data : object[]) => {
            const treeCategory : TreeDataNode[] = []
            dip(treeCategory, data)
            setCategory(treeCategory)
        }
        const fetchCategory = async () => {
            if( categoryList.length < 1 ){
                setLoadingCategory(true)
                const data = await getCategory();
                setLoadingCategory(false)
                if( data.code === "ERR_NETWORK"){
                    toast.error("Load Category Fail!!")
                    return;
                }
                if( data.code === 200 ){
                    setCategoryChoose(data.categories[0].category_id)
                    setCategoryList(data.categories)
                    createTreeCategory(data.categories)
                }else{
                    toast.error(data.message)
                }
                return;
            }
            createTreeCategory(categoryList)
            setLoadingCategory(false)
        }
        fetchCategory()
    }, []);

    const onSelect = (e) => {
        setCategoryChoose(e)
    }

    const addCategory = async (e) => {
        e.preventDefault()
        setLoadingSubmit(true)
        const response = await addCategoryByAdmin(categoryChoose, categoryTitle, imageComment);
        setLoadingSubmit(false)
        console.log(response)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("NETWORK DON'T CONNECTED!!")
            return;
        }
        if( response.data.code === 200 ){
            toast.success("ADD CATEGORY SUCCESSFULLY!!")
            navigate("/admin/products")
        }else{
            toast.error(response.data.message)
        }
    }
    return (
        <div>
            <BreadCrumb bread={bread} />
            <Spin spinning={loadingSubmit} tip={"Loading..."}>
                <form onSubmit={(e) => addCategory(e)} className='grid grid-cols-1 gap-9'>
                    <div className='flex flex-col md:flex-row gap-9'>
                        <div className='flex-1'>
                            <div className='flex gap-2 flex-col mb-4'>
                                <label className='text-2xl'>Nest category (Optional)</label>
                                <Spin tip={"Loading..."} spinning={loadingCategory}>
                                    <TreeSelect
                                        rootClassName={'w-full'}
                                        value={categoryChoose}
                                        onSelect={onSelect}
                                        treeData={category}
                                        id="category_id_tree"
                                    />
                                </Spin>
                            </div>
                            <div className='flex gap-2 flex-col mb-4'>
                                <label className='text-2xl'>Category Name <span className='text-red-500'>*</span></label>
                                <input value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} required className='p-2 outline-0 border-2' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 flex-1'>
                            <Upload
                                name="image_url"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="http://localhost:3000/upload"
                                onChange={handleChange}
                            >
                                {imageComment ? <img src={imageComment} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>
                    </div>
                    <div>
                        <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'}>ADD CATEGORY NOW</button>
                    </div>
                </form>
            </Spin>
        </div>
    );
};

export default AddCategory;
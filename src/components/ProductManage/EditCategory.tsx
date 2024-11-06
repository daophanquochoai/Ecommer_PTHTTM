import React, {useContext, useEffect, useState} from 'react';
import {Select, Spin, TreeDataNode, TreeSelect, Upload, UploadProps} from "antd";
import type { TableColumnsType } from 'antd';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink, useParams} from "react-router-dom";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {AppContext} from "../../context/AppContext.tsx";
import {editCategory, getCategory, getCategoryById} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

interface DataType {
    key: React.Key;
    name: string;
}

const bread = [
  {
      title : <NavLink to={'/admin/products'}>Products</NavLink>
  },
  {
      title : <span className={'text-red-500'}>Edit category</span>
  }
]

type Category = {
    category_id : number,
    category_title : string,
    image_url : string,
    parent_category_id : number
    status : string,
}

const init = {
    category_id : 0,
    category_title : '',
    image_url : '',
    parent_category_id : 0,
    status : '',
}

const EditCategory: React.FC = () => {

    //bien
    const {categoryList, setCategoryList} = useContext(AppContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [imageComment, setImageComment] = useState<string>('');
    const [loadingCategory, setLoadingCategory] = useState<boolean>(true)
    const [category, setCategory] = useState< Category>(init);
    const [categoryTree, setCategoryTree] = useState< TreeDataNode[]>([]);
    const [categoryChoose, setCategoryChoose] = useState<number>(0)

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
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

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

    const param = useParams();

    useEffect(() => {
        console.log(param)
    }, []);

    useEffect(() => {
        const createTreeCategory = ( data : object[]) => {
            const treeCategory : TreeDataNode[] = []
            dip(treeCategory, data)
            setCategoryTree(treeCategory)
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

    useEffect(() => {
        const fetchCategory = async () => {
            if( param === null ) return;
            setLoading(true)
            const data = await getCategoryById(param.id);
            setLoading(false)
            if( data.data.code === "ERR_NETWORK"){
                toast.error("Load Category Fail!!")
                return;
            }
            if( data.data.code === 200 ){
                setCategory(data.data.data)
                setImageComment(data.data.data.image_url)
                setCategoryChoose(data.data.data.parent_category_id)
            }else{
                toast.error(data.message)
            }
            return;
        }
        fetchCategory()
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(imageComment)
        console.log(categoryChoose)
        console.log(category.category_title)
        setLoading(true)
        const response = await editCategory(param.id, category.category_title, imageComment, categoryChoose);
        setLoading(false)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Load Category Fail!!")
            return;
        }
        console.log(response.data.code)
        if( response.data.code === 200 ){
            // pass'
            toast.success(response.data.message)
        }else{
            toast.error(response.message)
        }
    }
    const onSelect = (e) => {
        setCategoryChoose(e)
    }
    return (
        <div>
            <BreadCrumb bread={bread} />
            <form className='grid grid-cols-1 gap-9' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col md:flex-row gap-9'>
                    <div className='flex-1'>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Nest category (Optional)</label>
                            <Spin tip={"Loading..."} spinning={loadingCategory}>
                                <TreeSelect
                                    rootClassName={'w-full'}
                                    value={categoryChoose}
                                    onSelect={onSelect}
                                    treeData={categoryTree}
                                    id="category_id_tree"
                                />
                            </Spin>
                        </div>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Category Name <span className='text-red-500'>*</span></label>
                            <input value={category.category_title} onChange={(e) => setCategory({...category, category_title : e.target.value})} required placeholder='Babies & Moms' className='p-2 outline-0 border-2' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 flex-1 overflow-hidden overflow-hidden'>
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
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'}>UPDATE NOW</button>
                </div>
            </form>
        </div>
    );
};

export default EditCategory;
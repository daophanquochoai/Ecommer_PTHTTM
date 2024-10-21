import React, {useContext, useEffect, useState} from 'react';
import {
    Upload,
    DatePicker,
    Image,
    Select,
    Spin,
    TreeDataNode,
    Tree,
    TreeSelect,
    UploadProps,
    message,
    GetProp, UploadFile
} from "antd";
import {GrUploadOption} from "react-icons/gr";
import dayjs from 'dayjs';
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {addProductByAdmin, EditProductAdmin, getCategory, getProductDetail} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {AppContext} from "../../context/AppContext.tsx";

const dateFormat = 'DD/MM/YYYY';

type Product = {
    id : number,
    product_title : string,
    product_desc : string,
    category_id : number,
    quantity : number,
    price_unit : number,
    discount : number
}

const bread = [
    {
        title : <NavLink to={'/admin/products'}>Products</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Edit product</span>
    }
]

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [loadingCategory, setLoadingCategory] = useState<boolean>(true)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);
    const [loading, setLoading]  = useState<boolean>(false)
    const [productDetail, setProductDetail] = useState<Product>({
        category_id: 1,
        discount: 0,
        id: 0,
        price_unit: 0,
        product_desc: "",
        product_title: "",
        quantity: 0
    })
    const {categoryList, setCategoryList} = useContext(AppContext)
    const [category, setCategory] = useState< TreeDataNode[]>([]);
    //useEffet
    const handlePreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    const handleChange: UploadProps['onChange'] = ({fileList : newFileList}) => {
        if( newFileList.filter( item => item.hasOwnProperty('status') && item.status === "uploading").length > 0 ){
            setFileList(newFileList)
            return;
        }
        if( newFileList.filter( item => item.hasOwnProperty('status') && item.status === "done").length > 0 ){
            var item = newFileList.filter( item => item.hasOwnProperty('status') && item.status === "done")[0];
            console.log(        {
                uid: new Date(),
                name: item.name,
                url: item.response,
            })
            setFileList([
                ...newFileList.filter( item => !item.hasOwnProperty('status')),
                {
                    uid: new Date().toString(),
                    name: item.name,
                    url: item.response,
                }
            ])
        }
    };

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter(item => item.uid !== file.uid));
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
                const data = await getCategory();
                if( data.code === "ERR_NETWORK"){
                    toast.error("Load Category Fail!!")
                    return;
                }
                if( data.code === 200 ){
                    setProductDetail({
                        ...productDetail,
                        category_id: data.categories[0].category_id,
                    })
                    setCategoryList(data.categories)
                    createTreeCategory(data.categories)
                    setLoadingCategory(false)
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
        setProductDetail(
            {
                ...productDetail,
                category_id: e,
            }
        )
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const image_url : string[] = []
        fileList.forEach( item => {
            image_url.push(item.url)
        })
        setLoading(true)
        const response = await addProductByAdmin(productDetail, image_url);
        console.log(response)
        if( response.data.code === "ERR_NETWORK"){
            toast.error("Server Fail!!")
            return;
        }if( response.data.code === 200){
            navigate('/admin/products')
            toast.success("ADD PRODUCT SUCCESS")
        }else {
            toast.error(response.data.message)
        }
    }

    return (
        <div>
            <BreadCrumb bread={bread} />
            <Spin tip={"Creating..."} spinning={loading}>
                <form className='grid grid-cols-1 gap-9 mt-9' onSubmit={handleSubmitEdit}>
                    <div className='flex flex-col md:flex-row gap-9'>
                        <div className='flex-1'>
                            <div className='flex gap-2 flex-col mb-4'>
                                <label className='text-xl font-bold'>Product Name <span className='text-red-500'>*</span></label>
                                <input name="product_title" value={productDetail.product_title} onChange={e => setProductDetail(
                                    {
                                        ...productDetail,
                                        product_title: e.target.value,
                                    }
                                )} required className='p-2 outline-0 border-b-2 border-red-500' />
                            </div>
                            <div className='flex gap-2 flex-col mb-4'>
                                <label className='text-xl font-bold'>Description <span className='text-red-500'>*</span></label>
                                <textarea name="product_desc" value={productDetail.product_desc}
                                          onChange={e => setProductDetail(
                                              {
                                                  ...productDetail,
                                                  product_desc: e.target.value,
                                              }
                                          )}
                                          className='p-2 outline-0 border-b-2 border-red-500 h-36' />
                            </div>
                            <div className='flex gap-2 flex-col mb-4'>
                                <label className='text-xl font-bold'>Category</label>
                                <Spin tip={"Loading..."} spinning={loadingCategory}>
                                    <TreeSelect
                                        rootClassName={'w-full'}
                                        value={productDetail.category_id}
                                        onSelect={onSelect}
                                        treeData={category}
                                        id="category_id_tree"
                                    />
                                </Spin>
                            </div>
                            <div className='flex flex-col md:flex-row gap-9 justify-between'>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <label className='text-xl font-bold'>Price</label>
                                    <input name="price_unit"
                                           onChange={e => setProductDetail(
                                               {
                                                   ...productDetail,
                                                   price_unit : e.target.value as number
                                               }
                                           )}
                                           className={'p-2 outline-0 border-b-2 border-red-500'} value={productDetail.price_unit}/>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label className='text-xl font-bold'>Stock</label>
                                    <input name="quantity"
                                           onChange={e => setProductDetail(
                                               {
                                                   ...productDetail,
                                                   quantity : e.target.value as number
                                               }
                                           )}
                                           required value={productDetail.quantity} className={'p-2 outline-0 border-b-2 border-red-500'} />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <label className='text-xl font-bold'>Discount</label>
                                    <input name="discount" value={productDetail.discount}
                                           onChange={e => setProductDetail(
                                               {
                                                   ...productDetail,
                                                   discount : e.target.value as number
                                               }
                                           )}
                                           className={'p-2 outline-0 border-b-2 border-red-500'} />
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-col gap-4 flex-1'>
                            <div>
                                <Upload
                                    action={'http://localhost:3000/upload'}
                                    maxCount={4}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    // beforeUpload={beforeUpload}
                                    onRemove={handleRemove}
                                    name="image_url"
                                >
                                    {fileList.length < 4 && <GrUploadOption />}
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
                        <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'} >UPDATE NOW</button>
                    </div>
                </form>
            </Spin>
        </div>
    );
};

export default AddProduct;
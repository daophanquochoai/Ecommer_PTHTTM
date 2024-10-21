import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import ListCategory from "../components/Product/ListCategory.tsx";
import TopRating from "../components/ProductDetail/TopRating.tsx";
import Description from "../components/ProductDetail/Description.tsx";
import Description_Rate from "../components/ProductDetail/Description_Rate.tsx";
import Policy from "../components/Body/Policy.tsx";
import {TbTableOptions} from "react-icons/tb";
import {getDetailProduct} from "../Utils/Helper.tsx";
import {toast} from "react-toastify";
type Props = {
    title : string
}
const ProductDetail : React.FC = () => {


    const [option, setOption] = useState<boolean>(false)
    const [productData, setProductData] = useState<object>(null);
    const product_id = useParams();

    const bread : object[] = [
        {
            title : <NavLink to={'/'}>HOME</NavLink>
        },
        {
            title : <NavLink to={'/category'}>PRODUCT</NavLink>
        },
        {
            title : <span className={'text-red-500'}>{productData && productData.title}</span>
        }
    ]




    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailProduct(product_id.id);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.code === 200)
            {
                // tạo object comment
                let objectComment = {};
                const commentsData = response.data.comment;
                if(commentsData.length > 0)
                {
                    commentsData.forEach((comment) => {
                        objectComment[comment.infoUser.email] = {
                            rate: parseFloat(comment.star),
                            content : comment.content,
                            avatar: comment.infoUser.image_url,
                            first_name: comment.infoUser.first_name,
                            last_name: comment.infoUser.last_name,
                        }
                    });
                }
                // end tạo object comment

                setProductData({
                    id: response.data.product_id,
                    sale: response.data.discount || 0,
                    image: response.data.image_url,
                    like: response.like,
                    title: response.data.product_title,
                    star: response.data.rating,
                    price: response.data.newPrice,
                    priceOld: response.data.price_unit,
                    selled: response.quantityProductSold,
                    description: response.data.product_desc,
                    comments: objectComment,
                    commented: response.commented
                });

            }
            else {
                toast.error("render detail product err!")
            }
        };

        fetchApi();
    }, [product_id.id]);


    return (
        <div className={'mx-[5%] mt-3'}>
            <BreadCrumb bread={bread}/>
            <div className={'grid grid-cols-1 md:grid-cols-[1fr_3fr] mt-8 gap-6'}>
                <div>
                    <div onClick={()=>setOption(!option)} className={`flex md:hidden mb-4 items-center justify-center gap-2 px-4 py-2 border-2 ${option ? 'text-white bg-red-500' : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}><TbTableOptions /> OPTION</div>
                    <div className={` ${option ? 'grid' : 'hidden'} md:grid grid-cols-1 gap-6`}>
                        <ListCategory />
                        <TopRating />
                    </div>
                </div>
                <div>
                    {productData && <Description {...productData} />}
                    {productData && <Description_Rate {...productData} setProductData={setProductData} productData={productData}/>}
                </div>
            </div>
            <Policy />
        </div>
    );
};

export default ProductDetail;
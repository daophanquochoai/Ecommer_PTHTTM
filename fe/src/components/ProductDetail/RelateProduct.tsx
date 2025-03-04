import React, {useEffect, useState} from 'react';
import {getDetailProduct, getProductRelated} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import Product from "../Body/Product.tsx";
import {useParams} from "react-router-dom";

type Props = {
    productId : number;
}

interface ProductIner{
    id: number,
    sale: number,
    image: string,
    like: boolean,
    title: string,
    star: number,
    price: number,
    priceOld: number,
    selled: number,
    description: string,
}
const RelateProduct : React.FC = ( props : Props ) => {

    const [loading, setLoading] = useState(false)

    const [relatedProduct, setRelatedProduct] = useState<ProductIner[]>([])

    const param = useParams();
    // useEffect
    useEffect(() => {
        const productSave : ProductIner[] = [];
        const fetchApi = async (id : number) => {
            const response = await getDetailProduct(id);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.code === 200)
            {
                productSave.push({
                    id: response.data.product_id,
                    sale: response.data.discount || 0,
                    image: response.data.image_url ? (JSON.parse(response.data.image_url)[0]) : "",
                    like: response.like,
                    title: response.data.product_title,
                    star: response.rating,
                    price: response.data.newPrice,
                    priceOld: response.data.price_unit,
                    selled: response.quantityProductSold,
                    description: response.data.product_desc,
                });
            }
            else {
                toast.error("render detail product err!")
            }
        };
        const fetchRelatedProduct = async () => {
            setLoading(true);
            const response = await getProductRelated(param.id)
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.status === 200)
            {
                for (const pro of response.data) {
                    await fetchApi(pro.productId);
                }
                console.log(productSave);
                setRelatedProduct(productSave);
                setLoading(false)
            }
            else {
                toast.error("render detail product err!")
            }
        }
        fetchRelatedProduct()
    }, [param.id]);

    useEffect(() => {
        // console.log(relatedProduct)
    }, [relatedProduct]);

    const Props = {
        sale : 20,
        image : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg',
        like : true,
        title : 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
        star : 4,
        price : 100,
        priceOld : 120,
        selled : 8
    }
    return (
        <div className={'mx-4'}>
            <div>
                <span className={'text-base md:text-xl font-bold pb-2 border-b-2 border-red-500'}>Related products</span>
                <hr className={'my-2 border-1'}/>
            </div>
            <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-8'}>
                {
                    !loading ?
                        <>
                            {
                                relatedProduct.map( (pro, index) =>
                                    <Product {...pro} key={index}/>
                                )
                            }
                        </>
                        :
                        ""
                }
            </div>
        </div>
    );
};

export default RelateProduct;
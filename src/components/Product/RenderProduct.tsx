import React, {useContext, useEffect, useState} from 'react';
import { RxViewGrid } from "react-icons/rx";
import { CiViewTimeline } from "react-icons/ci";
import Product from "../Body/Product.tsx";
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import {Select} from "antd";
import Product_Grib from "../Body/Product_Grib.tsx";
import {getProduct} from "../../Utils/Helper.tsx";
import {AppContext} from "../../context/AppContext.tsx";

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
};

const RenderProduct: React.FC = () => {

    const [filter , setFilter] = useState<string>('Relate');
    const [grib, setGrib] = useState<boolean>(true);
    const [dataProduct, setDataProduct] = useState<object[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageTotal, setPageTotal] = useState<number>(0);
    const {search, price, rate, categoryChoose, page, setPage} = useContext(AppContext);

    useEffect(() => {
        setIsLoading(true);
        const fetchProduct = async () => {
            const data = await getProduct(categoryChoose,rate, price, search);
            const dataItem:object[] = [];
            setPageTotal(data.totalPage)
            data.data.forEach( product=> {
                dataItem.push({
                    sale : 20,
                    image : product.image_url,
                    like : false,
                    title : product.product_title,
                    star : 4,
                    price : product.price_unit,
                    priceOld : 120,
                    selled : 8,
                    productId: product.category_id
                })
            })
            setDataProduct(dataItem);
            setIsLoading(false)
        }
        fetchProduct()
    }, [categoryChoose,rate, price, search, page]);
    const filterHandler = (e) => {
        setFilter(e)
    }
    const items: object[] = [
        { value: 'Relate', label: <div>Relate</div> },
        { value: 'High', label: <div>High</div> },
        { value: 'Low', label: <div>Low</div> },
        { value: 'Star', label: <div>The Best Star</div> },
    ]
    return (
        <div className={'mx-4'}>
            <div className={'bg-white'}>
                <div className={'flex flex-col md:flex-row gap-2 justify-between items-center p-4'}>
                    <div className={'flex items-center gap-4'}>
                        <div onClick={() => setGrib(true)} className={`p-2 border-2 cursor-pointer ${grib ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}><RxViewGrid /></div>
                        <div onClick={()=>setGrib(false)} className={`p-2 border-2 text-xl cursor-pointer ${!grib ? 'bg-red-500 text-white' : 'hover:bg-red-500 hover:text-white'}`}><CiViewTimeline /></div>
                    </div>
                    <div>
                        <Select
                            style={{
                                width: '200px',
                                height : '40px'
                            }}
                            options={items}
                            value={filter}
                            status="error"
                            onChange={ (e)=> filterHandler(e)}
                        />
                    </div>
                </div>
                {/* render product */}
                <div className={`grid ${grib ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} p-4 gap-4`}>
                    {
                        grib ?
                            <>
                                {
                                    isLoading ?
                                        <>
                                            <Product isLoading={true}/>
                                            <Product isLoading={true}/>
                                            <Product isLoading={true}/>
                                            <Product isLoading={true}/>
                                            <Product isLoading={true}/>
                                        </>
                                        :
                                        <>
                                            {
                                                dataProduct.map( (product, index) =>
                                                    <Product sale={product.sale}
                                                             image={product.image}
                                                             like={product.like}
                                                             title={product.title}
                                                             star={product.star}
                                                             price={product.price}
                                                             priceOld={product.priceOld}
                                                             selled={product.selled}
                                                             key={index}/>
                                                )
                                            }
                                        </>
                                }
                            </>
                            :
                            <>
                                {
                                    isLoading ?
                                        <>
                                            <Product_Grib isLoading={true}/>
                                            <Product_Grib isLoading={true}/>
                                            <Product_Grib isLoading={true}/>
                                            <Product_Grib isLoading={true}/>
                                            <Product_Grib isLoading={true}/>
                                        </>
                                        :
                                        <>
                                            {
                                                dataProduct.map( (product, index) =>
                                                    <Product_Grib sale={product.sale}
                                                             image={product.image}
                                                             like={product.like}
                                                             title={product.title}
                                                             star={product.star}
                                                             price={product.price}
                                                             priceOld={product.priceOld}
                                                             selled={product.selled}
                                                             key={index}/>
                                                )
                                            }
                                        </>
                                }
                            </>
                    }
                </div>
                <div className={'p-5 flex items-center justify-center w-full'}>
                    <div>
                        <Pagination
                            current={page}
                            onChange={e => setPage(e)}
                            total={pageTotal*8}
                            showSizeChange={false}
                            defaultPageSize={8}
                            responsive={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenderProduct;

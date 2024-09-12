import React, { useState} from 'react';
import { RxViewGrid } from "react-icons/rx";
import { CiViewTimeline } from "react-icons/ci";
import Product from "../Body/Product.tsx";
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import {Select} from "antd";
import Product_Grib from "../Body/Product_Grib.tsx";

const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
};

const RenderProduct: React.FC = () => {

    const [filter , setFilter] = useState<string>('Relate');
    const [page, setPage] = useState<number>(1)
    const [grib, setGrib] = useState<boolean>(true)
    const filteHandler = (e) => {
        setFilter(e)
    }
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
                            onChange={ (e)=> filteHandler(e)}
                        />
                    </div>
                </div>
                {/* render product */}
                <div className={`grid ${grib ? 'sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} p-4 gap-4`}>
                    {
                        grib ?
                                <>
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                    <Product {...Props} />
                                </>
                            :
                            <>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                                <Product_Grib {...Props}/>
                            </>
                    }
                </div>
                <div className={'p-5 flex items-center justify-center w-full'}>
                    <div>
                        <Pagination
                            current={page}
                            onChange={e => setPage(e)}
                            total={100}
                            showSizeChanger={false}
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

import {FaCaretSquareLeft, FaCaretSquareRight, FaChevronRight, FaStar} from "react-icons/fa";
import Product from "./Product.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductHotTrend} from "../../Utils/Helper.tsx";
import Skeleton from "react-loading-skeleton";
type Props = {
    title : string
}

type ProductType = {
    id : number,
    sale : number,
    image : string,
    like : boolean,
    title : string,
    star : number,
    price : number,
    priceOld : number,
    selled : number
}

const ListProduct = (props : Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigation = useNavigate();
    const [dataSource, setDataSource] = useState<ProductType[]>([])
    const [startPos, setStartPos] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await getProductHotTrend();
            setLoading(false);
            if( response.data.code === 200 ){
                const arr : ProductType[] = []
                response.data.data.forEach( item => {
                    arr.push({
                        id : item.product_id,
                        sale : item.discount,
                        image : JSON.parse(item.image_url)[0],
                        like : item.like,
                        title : item.product_title,
                        star : item.rating,
                        price : item.newPrice,
                        priceOld : item.price_unit,
                        selled : item.total_quantity_sold
                    })
                })
                setDataSource(arr);
                setStartPos(0)
            }
        }
        fetchData()
    }, []);

    const handleDownOrUp = ( rise : number ) => {
        if( rise < 0 ){
            setStartPos( startPos - 1 > 0 ? startPos -1 : startPos)
        }else{
            setStartPos( startPos + 6 > dataSource.length ? startPos : startPos + 1 )
        }
    }

    return (
        <div className={'mx-[10%] mt-8'}>
            <div className={'bg-white w-full py-4'}>
                <div>
                    <div className={'flex mx-7 border-b-1 border-gray-500 flex-col gap-y-5 md:flex-row md:justify-between items-center'}>
                        <div className={'border-b-4 border-red-500'}>
                            <p className={'text-2xl md:text-3xl font-bold py-4 px-2'}>{props.title}</p>
                        </div>
                        {/*{ props.title === 'Flash Deals' ?*/}
                        {/*    <div className={'flex gap-2 items-center'}>*/}
                        {/*        <p className={'text-sm text-gray-500 md:text-base font-bold'}>End In :</p>*/}
                        {/*        <div className={'flex items-center gap-1'}>*/}
                        {/*            <div className={'bg-red-500 text-white p-1'}>10</div>*/}
                        {/*            <div className={'bg-red-500 text-white p-1'}>10</div>*/}
                        {/*            <div className={'bg-red-500 text-white p-1'}>10</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    : <></>*/}
                        {/*}*/}
                        <div className={'flex items-center gap-1 cursor-pointer'} onClick={ () => { scrollTo(0,0); navigation('/category')}}>
                            <p className={'text-sm md:text-base'}>View All</p>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4'}>
                    {
                        loading ?
                            <>
                                <Skeleton className={'h-[200px]'}/>
                                <Skeleton className={'h-[200px]'}/>
                                <Skeleton className={'h-[200px]'}/>
                                <Skeleton className={'h-[200px]'}/>
                                <Skeleton className={'h-[200px]'}/>
                            </>
                            :
                            <>
                                {
                                    dataSource.slice(startPos, startPos + 5 > 20 ? 20 : startPos + 5).map( item =>
                                        <Product {...item}     setPrductData={setDataSource} dataProduct={dataSource}/>
                                    )
                                }
                            </>
                    }
                </div>
                <div className={'flex items-center justify-end px-7'}>
                    <div className={'flex gap-3'}>
                        <FaCaretSquareLeft className={'text-2xl md:text-3xl cursor-pointer text-red-500'} onClick={() => handleDownOrUp(-1)}/>
                        <FaCaretSquareRight className={'text-2xl md:text-3xl cursor-pointer text-red-500'} onClick={() => handleDownOrUp(+1)}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
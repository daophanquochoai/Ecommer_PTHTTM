import Slider from "../components/Header/Slider.tsx";
import Trending from "../components/Body/Trending.tsx";
import Sale from "../components/Body/Sale.tsx";
import ListProduct from "../components/Body/ListProduct.tsx";
import Policy from "../components/Body/Policy.tsx";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext.tsx";
import {getDetailProduct, recommendForUser} from "../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {FaCaretSquareLeft, FaCaretSquareRight, FaChevronRight} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import Product from "../components/Body/Product.tsx";
import {useNavigate} from "react-router-dom";

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

const Home = () => {

    const {info} = useContext(AppContext);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<ProductType[]>([])
    const [startPos, setStartPos] = useState<number>(0)

    useEffect(() => {
        const arr : ProductType[] = []
        const fetchApi = async (id : number) => {
            const response = await getDetailProduct(id);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            // console.log(response);
            if(response.code === 200)
            {
                arr.push({
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
            // else {
            //     toast.error("render detail product err!")
            // }
        };
        const fetchRecommendForUser = async () => {
            setLoading(true);
            const response = await recommendForUser(info.user_id);
            setLoading(false)

            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            console.log(response)
            if(response.status === 200)
            {
                for (const pro of response.data) {
                    await fetchApi(pro.productId);
                }
                console.log(arr)
                setLoading(false)
                setDataSource(arr);
                setStartPos(0)
            }
            // else {
            //     toast.error("render detail product err!")
            // }
        }
        fetchRecommendForUser();
    }, [info]);

    const handleDownOrUp = ( rise : number ) => {
        if( rise < 0 ){
            setStartPos( startPos - 1 > 0 ? startPos -1 : startPos)
        }else{
            setStartPos( startPos + 6 > dataSource.length ? startPos : startPos + 1 )
        }
    }
    return (
        <>
            <div>
                <Slider/>
                <Trending />
                <Sale />
                <ListProduct title={'Hot trend'}/>
                <>
                    {info.user_id &&
                        <div className={'mx-[10%] mt-8'}>
                            <div className={'bg-white w-full py-4'}>
                                <div>
                                    <div className={'flex mx-7 border-b-1 border-gray-500 flex-col gap-y-5 md:flex-row md:justify-between items-center'}>
                                        <div className={'border-b-4 border-red-500'}>
                                            <p className={'text-2xl md:text-3xl font-bold py-4 px-2'}>Recommend for You</p>
                                        </div>
                                        <div className={'flex items-center gap-1 cursor-pointer'} onClick={ () => { scrollTo(0,0); navigate('/category')}}>
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
                    }

                </>
                <Policy />
            </div>
        </>
    );
};

export default Home;
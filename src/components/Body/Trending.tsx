import {FaRegStar} from "react-icons/fa";
import {GiClothes} from "react-icons/gi";
import {MdOutlineFastfood} from "react-icons/md";
import {useEffect, useState} from "react";
import SearchItem from "./SearchItem.tsx";
import Skeleton from "react-loading-skeleton";
import {getCategory, getProductByCategory} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {redirect} from "react-router-dom";

const Trending = () => {

    const [filter, setFilter] = useState<number>(0);
    const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(false);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false)
    const [category, setCategory] = useState<object[]>([]);
    const [product, setProduct] = useState<object[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            setIsLoadingCategory(true)
            const response = await getCategory();
            setIsLoadingCategory(false)
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if( response.code === 200 ){
                if( response.categories.length == 0 ) return;
                setFilter(response.categories[0].category_id)
                setCategory(response.categories)
            }else{
                toast.error(response.message)
            }
        }
        fetchCategory()
    }, []);
    useEffect(() => {
        const fetchProductByCategory = async () => {
            setIsLoadingProduct(true);
            const response = await getProductByCategory(filter);
            setIsLoadingProduct(false)
            if( response.data.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if( response.data.code === 200 ){
                setProduct(response.data.data);
            }else{
                toast.error(response.data.message)
            }
        }
        fetchProductByCategory()
    }, [filter]);
    return (
        <div className={'my-[40px]'}>
            <div className={'mx-[10%] bg-white'}>
                {/* top */}
                <div className={'flex gap-[5%] flex-col md:flex-row'}>
                    <div className={'p-2 text-center font-bold border-b-4 border-red-500 '}>
                        <p className={'text-2xl md:text-3xl'}>Search Trending</p>
                    </div>
                    <div className={'flex overflow-scroll w-full'}>
                        {
                            isLoadingCategory ?
                                <>
                                    <Skeleton className={'w-[100px] h-[100px]'}/>
                                </>
                                :
                                <>
                                    {
                                        category.map( item =>
                                            <div onClick={()=>setFilter(item.category_id)} className={`flex-shrink-0 flex flex-col cursor-pointer justify-center items-center w-[100px] md:w-[150px] p-1 md:p-2 ${ filter === item.category_id ? 'border-b-4 border-red-500 text-red-500' : ''}`}>
                                                <img src={item.image_url} className={'h-[40px] w-[40px]'}/>
                                                <p className={'text-sm md:text-xl mt-2'}>{item.category_title}</p>
                                            </div>
                                        )
                                    }
                                </>
                        }
                    </div>
                </div>
                {/*  bottom  */}
                <div className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 md:gap-4 p-4 overflow-y-scroll'}>
                    {
                        isLoadingProduct ?
                            <>
                                <Skeleton className={'h-[120px]'}/>
                            </>
                            :
                            <>
                                {
                                    product.map( item =>
                                        <SearchItem name={item.product_title} image={JSON.parse(item.image_url)[0]}/>
                                    )
                                }
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Trending;
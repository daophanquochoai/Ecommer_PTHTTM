import {FaRegStar} from "react-icons/fa";
import {GiClothes} from "react-icons/gi";
import {MdOutlineFastfood} from "react-icons/md";
import {useEffect, useState} from "react";
import SearchItem from "./SearchItem.tsx";
import Skeleton from "react-loading-skeleton";
import {getCategory} from "../../Utils/Helper.tsx";

const Trending = () => {

    const [filter, setFilter] = useState<string>('Hot Trending');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<object[]>([]);

    useEffect(() => {
        const fetchCategory = async () => {
            const data = await getCategory();
            setCategory(data.categories)
        }
        fetchCategory()
    }, []);
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
                            isLoading ?
                                <>
                                    <Skeleton className={'w-[100px] h-[100px]'}/>
                                </>
                                :
                                <>
                                    <div onClick={()=>setFilter('Hot Trending')} className={`flex-shrink-0 flex flex-col cursor-pointer justify-center items-center w-[100px] md:w-[150px] p-1 md:p-2 ${ filter === 'Hot Trending' ? 'border-b-4 border-red-500 text-red-500' : ''}`}>
                                        <FaRegStar className={'text-2xl md:text-3xl'}/>
                                        <p className={'text-sm md:text-xl mt-2'}>Hot Trending</p>
                                    </div>
                                    <div onClick={()=>setFilter('Cloth')} className={`flex-shrink-0 flex flex-col cursor-pointer justify-center items-center w-[100px] md:w-[150px] p-1 md:p-2 ${ filter === 'Cloth' ? 'border-b-4 border-red-500 text-red-500' : ''} `}>
                                        <GiClothes className={'text-3xl'}/>
                                        <p className={'text-sm md:text-xl mt-2'}>Cloth</p>
                                    </div>
                                    <div onClick={()=>setFilter('Food and Drink')} className={` flex-shrink-0 flex flex-col cursor-pointer justify-center items-center w-[100px] md:w-[150px] p-1 md:p-2 ${ filter === 'Food and Drink' ? 'border-b-4 border-red-500 text-red-500' : ''}`}>
                                        <MdOutlineFastfood className={'text-3xl'}/>
                                        <p className={'text-sm md:text-xl mt-2'}>Food & Drink</p>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                {/*  bottom  */}
                <div className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 md:gap-4 p-4 h-[370px] overflow-y-scroll'}>
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                    <SearchItem />
                </div>
            </div>
        </div>
    );
};

export default Trending;
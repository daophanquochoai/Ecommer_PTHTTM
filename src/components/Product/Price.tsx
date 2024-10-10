import React, {useContext, useEffect, useState} from 'react';
import {Slider} from "antd";
import {AppContext} from "../../context/AppContext.tsx";
import {getRangePrice} from "../../Utils/Helper.tsx";
import Skeleton from "react-loading-skeleton";
import {toast} from "react-toastify";
const Price : React.FC = () => {
    const {price, setPrice, setPage} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleTrans = (e) => {
       setPrice(e)
        setPage(0)
    }

    useEffect(() => {
        const fetchRangePrice = async () =>{
            const data = await getRangePrice();
            if( data.code === "ERR_NETWORK"){
                toast.error("Load Price Fail!!")
                return;
            }
            setPrice([data.fromPrice, data.toPrice]);
            setIsLoading(false)
        }
        fetchRangePrice()
    }, []);
    return (
        <div className={'bg-white mt-6 p-4'}>
            <div>
                <span className={'text-base md:text-2xl font-bold pb-2 border-b-2 border-red-500'}>Price</span>
            </div>
            <div className={'mt-6'}>
                {
                    isLoading ?
                        <>
                            <Skeleton />
                        </>
                        :
                        <>
                            <Slider range={{ draggableTrack: true }} max={price[1]}
                                    defaultValue={price}
                                    trackStyle={{ backgroundColor: "#ef4444" }}
                                    handleStyle={{ boxShadow: "#ef4444" }}
                            />
                        </>
                }
            </div>
            {
                isLoading ?
                    <>
                        <Skeleton className={'w-[50%]'}/>
                    </>
                    :
                    <>
                        <p className={'text-[14px]'}>Price : <span>{price[0].toLocaleString()}đ</span> — <span>{price[1].toLocaleString()}đ</span></p>
                    </>
            }
        </div>
    );
};

export default Price;
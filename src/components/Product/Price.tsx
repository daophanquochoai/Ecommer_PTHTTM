import React, {useContext, useEffect, useState} from 'react';
import {Slider} from "antd";
import {AppContext} from "../../context/AppContext.tsx";
import {getRangePrice} from "../../Utils/Helper.tsx";
import Skeleton from "react-loading-skeleton";
const Price : React.FC = () => {
    const {price, setPrice} = useContext(AppContext);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRangePrice = async () =>{
            const data = await getRangePrice();
        }
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
                            <Slider range={{ draggableTrack: true }} max={1000} defaultValue={price} onChange={(e) => setPrice(e)}
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
                        <p className={'text-[14px]'}>Price : <span>${price[0]}</span> — <span>${price[1]}</span></p>
                    </>
            }
        </div>
    );
};

export default Price;
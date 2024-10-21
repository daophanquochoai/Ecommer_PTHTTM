import React, {useEffect, useState} from 'react';
import {CiHeart} from "react-icons/ci";
import {FaRegShareFromSquare} from "react-icons/fa6";
import {toast} from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {getDetailProduct} from "../../Utils/Helper.tsx";
import {useParams} from "react-router-dom";
type Props = {
    sale : number,
    image : string,
    like : boolean,
    title : string,
    star : number,
    price : number,
    priceOld : number,
    selled : number,
    sizre : string[],
    description : string,
    comments : object
}
const Description : React.FC = ( props : Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [size, setSize] = useState<string>();
    const [count, setCount] = useState<number>(1);
    const [image, setImage] = useState<string>(props.image);
    const [data, setData] = useState<object>({});


    const downCount = () => {
        if( count === 1) {
            toast.warning('Quantity should high than 0 !')
        }
        else{
            setCount(count -1 );
        }
    }
    const riseCount = () => {
        // if( count === props) {
        //     toast.error('Quantity should high than 0 !')
        // }
        setCount(count + 1 );
    }

    useEffect(() => {
        setImage(props.image);
        setIsLoading(false);
    }, [props]);

    return (
        <div className={'p-4 bg-white'}>
            <div className={'grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4'}>
                <div className={'grid gap-4'}>
                    {
                        isLoading ?
                            <Skeleton className={'w-full h-[300px]'}/>
                            :
                            <img src={JSON.parse(image)[0]} alt="ảnh" className={'border cursor-pointer w-full h-full p-4 object-cover'}/>
                    }
                    <div className={'grid grid-cols-4 gap-4'}>
                        {
                            isLoading ?
                                <>
                                    <Skeleton className={'h-[60px]'}/>
                                    <Skeleton className={'h-[60px]'}/>
                                    <Skeleton className={'h-[60px]'}/>
                                    <Skeleton className={'h-[60px]'}/>
                                </>
                                :
                                <>
                                    {
                                        JSON.parse(image).map((img: string, index: number) => (
                                           <div>
                                               <img onClick={ ()=> setImage(img)} src={img} alt={props.title} className={'w-full h-full border-2 cursor-pointer p-1'}/>
                                           </div>
                                        ))
                                    }

                                    {/* <img  onClick={ (e)=> {setImage(e.target.currentSrc)}} src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-1.jpg'} alt={props.title} className={'border-2 cursor-pointer p-2'}/>*/}
                                    {/* <img onClick={ (e)=> {setImage(e.target.currentSrc)}} src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-2.jpg'} alt={props.title} className={'border-2 cursor-pointer p-2'}/>*/}
                                    {/* <img onClick={ (e)=> {setImage(e.target.currentSrc)}} src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-12-100x100.jpg'} alt={props.title} className={'border-2 cursor-pointer p-2'}/>*/}
                                </>
                        }
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
                    {
                        isLoading ?
                            <Skeleton className={'h-[40px]'}/>
                            :
                            <h2 className={'shortcut text-base md:text-2xl lg:text-3xl font-bold'}>{props.title}</h2>
                    }
                    <div className={'flex items-center gap-4'}>
                        {
                            isLoading ?
                                <>
                                    <Skeleton className={'h-[30px] w-[50px]'}/>
                                    <Skeleton className={'h-[30px] w-[50px]'}/>
                                </>
                                :
                                <>
                                    <span className={'font-bold text-base md:text-2xl'}>{props.price.toLocaleString()}đ</span>
                                    <del className={'text-base text-gray-400 md:text-2xl'}>{props.priceOld.toLocaleString()}đ</del>
                                </>
                        }
                    </div>
                    {
                        isLoading ?
                            <>
                                <Skeleton count={2}/>
                            </>
                            :
                            <p className={'shortcut text-xs md:text-base text-gray-400'}>
                                {props.description || 'No description available'}
                            </p>
                    }
                    <hr className={'border-1 border-black text-black'}/>
                    <div className={'flex gap-4'}>
                        {
                            isLoading ?
                                <>
                                    <Skeleton className={'h-[40px] w-[50px]'}/>
                                    <Skeleton className={'h-[40px] w-[50px]'}/>
                                </>
                                :
                                <>
                                    <button onClick={()=>setSize('X')} className={`px-4 py-2 border-2 ${size === 'X' ? 'border-red-500 bg-red-500 text-white' : ' hover:border-red-500 hover:bg-red-500 hover:text-white'} font-bold`}>X</button>
                                    <button onClick={()=>setSize('XL')} className={`px-4 py-2 border-2 ${size === 'XL' ? 'border-red-500 bg-red-500 text-white' : 'hover:border-red-500 hover:bg-red-500 hover:text-white'} hover:border-red-500 hover:bg-red-500 hover:text-white font-bold`}>XL</button>
                                </>
                        }
                    </div>
                    <div className={'grid grid-cols-1 md:grid-cols-2 items-center gap-2'}>
                        <div className={'flex'}>
                            {
                                isLoading ?
                                    <>
                                        <Skeleton className={'w-[120px] h-[40px]'}/>
                                    </>
                                    :
                                    <>
                                        <button onClick={() => downCount()}  className={'border-2 px-4 py-2 hover:bg-red-500 hover:border-red-500 hover:text-white'}>-</button>
                                        <p className={'border-y-2 font-bold px-6 py-2'}>{count}</p>
                                        <button onClick={()=>riseCount()} className={'border-2 px-4 py-2 hover:bg-red-500 hover:border-red-500 hover:text-white'}>+</button>
                                    </>
                            }
                        </div>
                        <div>
                            {
                                isLoading ?
                                    <Skeleton className={'w-[100px] h-[40px]'}/>
                                    :
                                    <button className={'bg-black text-white px-4 py-2 hover:bg-red-500'}>Add to Cart</button>
                            }
                        </div>
                    </div>
                    <div className={'flex gap-4 items-center'}>
                        {
                            isLoading ?
                                <>
                                    <Skeleton className={'h-[30px] w-[30px]'}/>
                                    <Skeleton className={'h-[30px] w-[30px]'}/>
                                </>
                                :
                                <>
                                    <CiHeart className={`text-3xl ${props.like ? 'text-red-500' : ''} hover:text-red-500 cursor-pointer`} />
                                    <FaRegShareFromSquare className={`text-2xl hover:text-red-500 cursor-pointer`}/>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Description;
import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import { FreeMode, Pagination } from 'swiper/modules';
import {Avatar, Rate} from "antd";
import Skeleton from "react-loading-skeleton";
import Say from "./Say.tsx";

const ClientSay : React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [silde, setSlide] = useState<number>(3);

    const handleResize = () => {
        if( window.innerWidth < 640 ){
            setSlide(1)
        }
        else if( window.innerWidth < 768 ){
            setSlide(2)
        }else{
            setSlide(3)
        }
    };

    useEffect(() => {
        // Lắng nghe sự kiện khi kích thước thay đổi
        window.addEventListener('resize', handleResize);

        // Xóa bỏ sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={'py-10 px-[5%] mt-8 bg-white'}>
            <div className={'p-4 flex items-center flex-col gap-2 mb-4'}>
                <h2 className={'text-3xl font-bold'}>Client Says</h2>
                <p className={'text-xl text-gray-400 text-center'}>Lorem Ipsum to using making it look like readable English.</p>
            </div>
            <Swiper
                slidesPerView={silde}
                reponsize={true}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className={
                    'w-full px-4'
                }
            >
                <SwiperSlide>
                    <Say />
                </SwiperSlide>
                <SwiperSlide>
                    <Say />
                </SwiperSlide>
                <SwiperSlide>
                    <Say />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default ClientSay ;
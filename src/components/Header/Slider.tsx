
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import {useNavigate} from "react-router-dom";
const Slider = () => {

    const navigation = useNavigate();
    return (
        <>
            <Swiper spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]} className={'font-[18px] w-full h-[600px] flex justify-center items-center z-1'}>
                <SwiperSlide className={'relative'}>
                    <div className={'absolute z-[9] w-full h-full sm:p-[15%]'}>
                        <div className={'h-full'}>
                            <div className={'w-full flex justify-center flex-col gap-4 h-full items-center md:w-1/2 sm:items-start'}>
                                <h1 className={'font-bold text-center sm:text-start text-white text-4xl'}>
                                    Disney Collection Toy
                                    <br className={'hidden sm:block'}/>
                                    Buzz Lightyear
                                </h1>
                                <p className={'text-white text-center sm:text-start'}>
                                    There are many variations passages of available, but the majority
                                    <br  className={'hidden sm:block'}/>
                                    have suffered  alteration some form, by injected humour.
                                </p>
                                <button className={'w-[100px] bg-red-500 py-3 px-4 font-bold text-white'} onClick={ () => { scrollTo(0,0); navigation('/category')}}>Buy Now</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <img className={'w-full h-full object-cover'} src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/slider1.jpg'} alt={''}/>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={'absolute z-[9] w-full h-full sm:p-[15%]'}>
                        <div className={'h-full'}>
                            <div className={'w-full flex justify-center flex-col gap-4 h-full items-center md:w-1/2 sm:items-start'}>
                                <h1 className={'font-bold text-center sm:text-start text-white text-4xl'}>
                                    Disney Collection Toy
                                    <br className={'hidden sm:block'}/>
                                    Buzz Lightyear
                                </h1>
                                <p className={'text-white text-center sm:text-start'}>
                                    There are many variations passages of available, but the majority
                                    <br  className={'hidden sm:block'}/>
                                    have suffered  alteration some form, by injected humour.
                                </p>
                                <button className={'w-[100px] bg-red-500 py-3 px-4 font-bold text-white'} onClick={ () => { scrollTo(0,0); navigation('/category')}}>Buy Now</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <img className={'w-full h-full object-cover'} src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/slider2.jpg'} alt={''}/>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;
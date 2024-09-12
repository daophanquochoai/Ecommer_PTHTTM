
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
const Slider = () => {
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
                                <button className={'w-[100px] bg-red-500 py-3 px-4 font-bold text-white'}>Buy Now</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <img className={'w-full h-full object-cover'} src={'https://teddy.vn/wp-content/uploads/2019/04/dia-chi-ban-gau-bong-shin-cao-cap-tai-ha-noi-min.jpg'} alt={''}/>
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
                                <button className={'w-[100px] bg-red-500 py-3 px-4 font-bold text-white'}>Buy Now</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <img className={'w-full h-full object-cover'} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsvjEEzZb8l5L71sDi6z4_BJj3AZ37CvCkYw&s'} alt={''}/>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;
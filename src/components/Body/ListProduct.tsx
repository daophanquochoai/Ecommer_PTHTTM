import {FaCaretSquareLeft, FaCaretSquareRight, FaChevronRight, FaStar} from "react-icons/fa";
import {FaRegStarHalfStroke} from "react-icons/fa6";
import {CiHeart, CiSearch, CiShoppingCart, CiStar} from "react-icons/ci";
const props = {
    title : String
}
const ListProduct = (props) => {
    return (
        <div className={'mx-[10%] mt-8'}>
            <div className={'bg-white w-full py-4'}>
                <div>
                    <div className={'flex mx-7 border-b-1 border-gray-500 flex-col gap-y-5 md:flex-row md:justify-between items-center'}>
                        <div className={'border-b-4 border-red-500'}>
                            <p className={'text-2xl md:text-3xl font-bold py-4 px-2'}>{props.title}</p>
                        </div>
                        { props.title === 'Flash Deals' ?
                            <div className={'flex gap-2 items-center'}>
                                <p className={'text-sm text-gray-500 md:text-base font-bold'}>End In :</p>
                                <div className={'flex items-center gap-1'}>
                                    <div className={'bg-red-500 text-white p-1'}>10</div>
                                    <div className={'bg-red-500 text-white p-1'}>10</div>
                                    <div className={'bg-red-500 text-white p-1'}>10</div>
                                </div>
                            </div>
                            : <></>
                        }
                        <div className={'flex items-center gap-1 cursor-pointer'}>
                            <p className={'text-sm md:text-base'}>View All</p>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4'}>
                    <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                        <div className={'relative'}>
                            <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>-20%</span>
                            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg'} className={'w-full h-full object-center'} alt={''}/>
                            <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                                <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                                <CiHeart className={'text-2xl hover:text-red-500 cursor-pointer'} />
                                <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                            </div>
                        </div>
                        <div className={'p-2 z-10 relative bg-white'}>
                            <div>
                                <h4 className={'text-[11px] md:text-xl font-bold'}>Microsoft Xbox One S Controller – Gears 5 Kait Diaz</h4>
                            </div>
                            <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                                <div className={'flex'}>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaRegStarHalfStroke className={'text-[11px] sm:text-base'}/>
                                    <CiStar className={'text-[11px] sm:text-base'}/>
                                </div>
                                <p className={'text-[11px] sm:text-base text-gray-400'}>8 Sold</p>
                            </div>
                            <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                                <p className={'text-[11px] sm:text-base'}>$109.00</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>$139.00</del>
                            </div>
                        </div>
                    </div>
                    <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                        <div className={'relative'}>
                            <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>-20%</span>
                            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg'} className={'w-full h-full object-center'} alt={''}/>
                            <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                                <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                                <CiHeart className={'text-2xl hover:text-red-500 cursor-pointer'} />
                                <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                            </div>
                        </div>
                        <div className={'p-2 z-10 relative bg-white'}>
                            <div>
                                <h4 className={'text-[11px] md:text-xl font-bold'}>Microsoft Xbox One S Controller – Gears 5 Kait Diaz</h4>
                            </div>
                            <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                                <div className={'flex'}>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaRegStarHalfStroke className={'text-[11px] sm:text-base'}/>
                                    <CiStar className={'text-[11px] sm:text-base'}/>
                                </div>
                                <p className={'text-[11px] sm:text-base text-gray-400'}>8 Sold</p>
                            </div>
                            <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                                <p className={'text-[11px] sm:text-base'}>$109.00</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>$139.00</del>
                            </div>
                        </div>
                    </div>
                    <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                        <div className={'relative'}>
                            <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>-20%</span>
                            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg'} className={'w-full h-full object-center'} alt={''}/>
                            <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                                <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                                <CiHeart className={'text-2xl hover:text-red-500 cursor-pointer'} />
                                <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                            </div>
                        </div>
                        <div className={'p-2 z-10 relative bg-white'}>
                            <div>
                                <h4 className={'text-[11px] md:text-xl font-bold'}>Microsoft Xbox One S Controller – Gears 5 Kait Diaz</h4>
                            </div>
                            <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                                <div className={'flex'}>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaRegStarHalfStroke className={'text-[11px] sm:text-base'}/>
                                    <CiStar className={'text-[11px] sm:text-base'}/>
                                </div>
                                <p className={'text-[11px] sm:text-base text-gray-400'}>8 Sold</p>
                            </div>
                            <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                                <p className={'text-[11px] sm:text-base'}>$109.00</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>$139.00</del>
                            </div>
                        </div>
                    </div>
                    <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                        <div className={'relative'}>
                            <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>-20%</span>
                            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg'} className={'w-full h-full object-center'} alt={''}/>
                            <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                                <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                                <CiHeart className={'text-2xl hover:text-red-500 cursor-pointer'} />
                                <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                            </div>
                        </div>
                        <div className={'p-2 z-10 relative bg-white'}>
                            <div>
                                <h4 className={'text-[11px] md:text-xl font-bold'}>Microsoft Xbox One S Controller – Gears 5 Kait Diaz</h4>
                            </div>
                            <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                                <div className={'flex'}>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaRegStarHalfStroke className={'text-[11px] sm:text-base'}/>
                                    <CiStar className={'text-[11px] sm:text-base'}/>
                                </div>
                                <p className={'text-[11px] sm:text-base text-gray-400'}>8 Sold</p>
                            </div>
                            <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                                <p className={'text-[11px] sm:text-base'}>$109.00</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>$139.00</del>
                            </div>
                        </div>
                    </div>
                    <div className={'border hover:scale-105 transition-all duration-500 group cursor-pointer'}>
                        <div className={'relative'}>
                            <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>-20%</span>
                            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg'} className={'w-full h-full object-center'} alt={''}/>
                            <div className={'flex gap-4 justify-center items-center absolute bottom-[-60px] w-full bg-white p-2 group-hover:bottom-0 transition-all duration-300'}>
                                <CiShoppingCart className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" />
                                <CiHeart className={'text-2xl hover:text-red-500 cursor-pointer'} />
                                <CiSearch className={'text-2xl hover:text-red-500 cursor-pointer'} />
                            </div>
                        </div>
                        <div className={'p-2 z-10 relative bg-white'}>
                            <div>
                                <h4 className={'text-[11px] md:text-xl font-bold'}>Microsoft Xbox One S Controller – Gears 5 Kait Diaz</h4>
                            </div>
                            <div className={'mt-1 flex flex-col md:flex-row gap-y-2 items-center justify-between'}>
                                <div className={'flex'}>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaStar className={'text-[11px] sm:text-base'}/>
                                    <FaRegStarHalfStroke className={'text-[11px] sm:text-base'}/>
                                    <CiStar className={'text-[11px] sm:text-base'}/>
                                </div>
                                <p className={'text-[11px] sm:text-base text-gray-400'}>8 Sold</p>
                            </div>
                            <div className={'flex flex-col md:flex-row gap-y-1 items-center md:gap-5'}>
                                <p className={'text-[11px] sm:text-base'}>$109.00</p>
                                <del className={'text-[11px] sm:text-base text-gray-400'}>$139.00</del>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'flex items-center justify-end px-7'}>
                    <div className={'flex gap-3'}>
                        <FaCaretSquareLeft className={'text-2xl md:text-3xl cursor-pointer text-red-500'}/>
                        <FaCaretSquareRight className={'text-2xl md:text-3xl cursor-pointer text-red-500'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProduct;
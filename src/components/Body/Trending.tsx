import {FaRegStar} from "react-icons/fa";
import {GiClothes} from "react-icons/gi";
import {MdOutlineFastfood} from "react-icons/md";
import {useState} from "react";

const Trending = () => {

    const [filter, setFilter] = useState<string>('Hot Trending')
    return (
        <div className={'my-[40px]'}>
            <div className={'mx-[10%] bg-white'}>
                {/* top */}
                <div className={'flex gap-[5%] flex-col md:flex-row'}>
                    <div className={'p-2 text-center font-bold border-b-4 border-red-500 '}>
                        <p className={'text-2xl md:text-3xl'}>Search Trending</p>
                    </div>
                    <div className={'flex overflow-scroll w-full'}>
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
                    </div>
                </div>
                {/*  bottom  */}
                <div className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 md:gap-4 p-4 h-[100] overflow-y-scroll'}>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                    <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/cate1.jpg'} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
                        <p className={'font-bold py-2'}>Camera</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;
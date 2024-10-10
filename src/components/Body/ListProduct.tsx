import {FaCaretSquareLeft, FaCaretSquareRight, FaChevronRight, FaStar} from "react-icons/fa";
import Product from "./Product.tsx";
import {useNavigate} from "react-router-dom";
type Props = {
    title : string
}



const ListProduct = (props : Props) => {

    const navigation = useNavigate();
    const Props = {
        sale : 20,
        image : 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg',
        like : true,
        title : 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
        star : 4,
        price : 100,
        priceOld : 120,
        selled : 8
    }
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
                        <div className={'flex items-center gap-1 cursor-pointer'} onClick={ () => { scrollTo(0,0); navigation('/category')}}>
                            <p className={'text-sm md:text-base'}>View All</p>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
                <div className={'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4'}>
                    <Product {...Props}/>
                    <Product {...Props}/>
                    <Product {...Props}/>
                    <Product {...Props}/>
                    <Product {...Props}/>
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
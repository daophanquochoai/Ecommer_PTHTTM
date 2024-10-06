import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import BreadCrumb from "../components/Body/BreadCrumb.tsx";
import ListCategory from "../components/Product/ListCategory.tsx";
import TopRating from "../components/ProductDetail/TopRating.tsx";
import Description from "../components/ProductDetail/Description.tsx";
import Description_Rate from "../components/ProductDetail/Description_Rate.tsx";
import Policy from "../components/Body/Policy.tsx";
import {TbTableOptions} from "react-icons/tb";
type Props = {
    title : string
}
const ProductDetail : React.FC = () => {

    const [option, setOption] = useState<boolean>(false)

    const bread : object[] = [
        {
            title : <NavLink to={'/'}>HOME</NavLink>
        },
        {
            title : <NavLink to={'/category'}>PRODUCT</NavLink>
        },
        {
            title : <span className={'text-red-500'}>Hair Remover Shaver with Extra Replacement Head (Blue)</span>
        }
    ]

    const Props = {
        sale : 20,
        image : 'https://5.imimg.com/data5/SELLER/Default/2021/5/GD/KV/CW/106693272/sup-game-box-400-in-1.jpg',
        like : true,
        title : 'Microsoft Xbox One S Controller – Gears 5 Kait Diaz',
        star : 4,
        price : 100,
        priceOld : 120,
        selled : 8,
        sizre : [
            'X',
            'XL'
        ],
        description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor.\n' +
            'Ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi.\n' +
            '\n' +
            'It features deep integration with WooCommerce core plus several of the most popular extensions:\n' +
            '\n' +
            'Visual Composer\n' +
            'Slider Revolution\n' +
            'YITH WooCommerce Wishlist\n' +
            'YITH WooCompare\n' +
            'Trial & Dummy Data\n' +
            'Cras neque metus, consequat et blandit et, luctus a nunc. Etiam gravida vehicula tellus, in imperdiet ligula euismod eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam erat mi, rutrum at sollicitudin rhoncus, ultricies posuere erat. Duis convallis, arcu nec aliquam consequat, purus felis vehicula felis, a dapibus enim lorem nec augue. Nunc facilisis sagittis ullamcorper.',
        comments : {
            Hoai : {
                rate: 4,
                content : 'product very goood'
            }
        }
    }

    return (
        <div className={'mx-[5%] mt-3'}>
            <BreadCrumb bread={bread}/>
            <div className={'grid grid-cols-1 md:grid-cols-[1fr_3fr] mt-8 gap-6'}>
                <div>
                    <div onClick={()=>setOption(!option)} className={`flex md:hidden mb-4 items-center justify-center gap-2 px-4 py-2 border-2 ${option ? 'text-white bg-red-500' : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'}`}><TbTableOptions /> OPTION</div>
                    <div className={` ${option ? 'grid' : 'hidden'} md:grid grid-cols-1 gap-6`}>
                        <ListCategory />
                        <TopRating />
                    </div>
                </div>
                <div>
                    <Description {...Props}/>
                    <Description_Rate {...Props}/>
                </div>
            </div>
            <Policy />
        </div>
    );
};

export default ProductDetail;
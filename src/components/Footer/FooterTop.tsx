import {FaFacebook, FaGithub} from "react-icons/fa";
import {NavLink} from "react-router-dom";

const FooterTop = () => {
    return (
        <div className={'flex flex-col md:flex-row gap-8'}>
            <div className={'grid gap-2'}>
                <p className={'font-bold text-xl'}>Call To Order</p>
                <h2 className={'text-3xl text-red-500'}>(+084) 779-127-667</h2>
                <p className={'text-gray-400 text-base'}>There are many variations passages of available
                    <br className={'hidden md:block'}/>
                    but the majority have suffered alteration injected</p>
                <p className={'text-gray-400'}><span className={'font-bold text-base text-black'}>Address : </span> 139 Brook Drive South Richmond Hill, NY</p>
                <p className={'text-gray-400'}><span className={'font-bold text-base text-black'}>Email : </span>dpquochoai@gmail.com</p>
                <div className={'flex gap-2 items-center'}><span className={'text-black font-bold'}>Follow Us : </span>
                    <div className={'flex text-2xl gap-2 text-red-500'}>
                        <FaFacebook />
                        <FaGithub />
                    </div>
                </div>
            </div>
            <div className={'flex gap-6'}>
                <div>
                    <h5 className={'text-xl font-bold'}>Company Info</h5>
                    <ul>
                        <li><NavLink onClick={()=>scrollTo(0,0)} to={'/blogs'} className={'text-gray-400'}>Blogs</NavLink></li>
                        <li><NavLink onClick={()=>scrollTo(0,0)} to={'/about'} className={'text-gray-400'}>About Us</NavLink></li>
                        <li><NavLink onClick={()=>scrollTo(0,0)} to={'/contact'} className={'text-gray-400'}>Contact</NavLink></li>
                    </ul>
                </div>
                <div>
                    <h5 className={'text-xl font-bold'}>Mekog</h5>
                    <ul>
                        <li><NavLink onClick={()=>scrollTo(0,0)} to={'/product'} className={'text-gray-400'}>Product</NavLink></li>
                        <li><NavLink onClick={()=>scrollTo(0,0)} to={'/cart'} className={'text-gray-400'}>Cart</NavLink></li>
                        <li><NavLink onClick={()=>scrollTo(0,0)} to={'/wishlist'} className={'text-gray-400'}>WishList</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterTop;
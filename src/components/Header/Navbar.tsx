import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.tsx";
import {Link, NavLink} from "react-router-dom";
import {LuShoppingCart} from "react-icons/lu";
import {FaChevronLeft, FaRegHeart} from "react-icons/fa";
import {IoMenu} from "react-icons/io5";
import {IoMdClose} from "react-icons/io";

const Navbar = () => {
    const {logo} = useContext(AppContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <div>
            <div className={'bg-white flex justify-between px-[5%] py-2 items-center'}>
                {/* tab open when  small  screen*/}
                {/* logo */}
                <div>
                    <div className={'flex gap-4 items-center'}>
                        <div onClick={ () => setIsOpen(true)} className={'inline-block md:hidden text-2xl'}>{
                                <IoMenu />
                        }</div>
                        <Link to={'/'}>
                            <img className={'w-[100px]'} src={logo} alt={"logo"}/>
                        </Link>
                    </div>
                </div>
                {/*  link */}
                <ul className={'hidden md:flex w-2/4  gap-8 items-center justify-center'}>
                    <li><NavLink to={'/'} className={'text-base font-bold'}>HOME</NavLink></li>
                    <li><NavLink to={'/category'} className={'text-base font-bold'}>CATEGORY</NavLink></li>
                    <li><NavLink to={'/blogs'} className={'text-base font-bold'}>BLOGS</NavLink></li>
                    <li><NavLink to={'/about'} className={'text-base font-bold'}>ABOUT</NavLink></li>
                    <li><NavLink to={'/contact'} className={'text-base font-bold'}>CONTACT</NavLink></li>
                </ul>
                {/* util */}
                <div className={'flex justify-center gap-4 items-center'}>
                    <div className={'text-2xl'}>
                        <NavLink to={'/wishlist'}><FaRegHeart /></NavLink>
                    </div>
                    <div className={'text-3xl p-1 relative'}>
                        <span className={'absolute top-[-3px] text-center text-white right-[-8px] w-[20px] h-[20px] text-base bg-red-500 rounded-full leading-[20px]'}>0</span>
                        <NavLink to={'/cart'}><LuShoppingCart /></NavLink>
                    </div>
                </div>
            </div>
            <div className={`fixed z-[1000] ${ isOpen ? 'w-full' : 'w-0'} bg-white h-full top-0 left-0 transition-all duration-300 overflow-hidden`}>
                <div onClick={()=>setIsOpen(false)} className='flex items-center gap-4 p-3 cursor-pointer font-bold'>
                    <FaChevronLeft />
                    <p>Back</p>
                </div>
                <div className={`flex flex-col text-gray-600`}>
                    <NavLink className='py-2 pl-6 border cursor-pointer w-full text-center' onClick={()=>
                    {
                        setIsOpen(false);
                        scrollTo(0,0)
                    }} to='/'>HOME</NavLink>
                    <NavLink className='py-2 pl-6 border cursor-pointer w-full text-center' onClick={()=>{
                        setIsOpen(false);
                        scrollTo(0,0)
                    }} to='/category'>CATEGORY</NavLink>
                    <NavLink className='py-2 pl-6 border cursor-pointer w-full text-center' onClick={()=>{
                        setIsOpen(false);
                        scrollTo(0,0)
                    }} to='/blogs'>BLOGS</NavLink>
                    <NavLink className='py-2 pl-6 border cursor-pointer w-full text-center' onClick={()=>{
                        setIsOpen(false);
                        scrollTo(0,0)
                    }} to='/about'>ABOUT</NavLink>
                    <NavLink className='py-2 pl-6 border cursor-pointer  w-full text-center' onClick={()=>{
                        setIsOpen(false);
                        scrollTo(0,0)
                    }} to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
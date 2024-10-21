import {BiSupport} from "react-icons/bi";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {MdOutlineExpandMore} from "react-icons/md";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext.tsx";
import RightModal from "./RightModal.tsx";
import CartModel from "./CartModel.tsx";
import {setLogOut} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

const HeaderTop : React.FC = () => {
    // state
    const {isLogin, setIsLogin, info} = useContext(AppContext)
    const [openAccount, setOpenAccount] = useState<boolean>(false)
    const [openCart, setOpenCart] = useState<boolean>(false)
    const navigation = useNavigate();

    const handleLogOut = async  () => {
        const response = await setLogOut();
        if( response.code === "ERR_NETWORK"){
            toast.error("Log Out Fail!!")
            return;
        }
        if( response.data.code === 200 ){
            setIsLogin(false)
            localStorage.removeItem("accessToken")
            navigation('/login')
        }else {
            toast.error(response.data.message)
        }
    }
    // function
    return (
        <div className={'bg-white justify-end flex md:justify-between items-center px-[5%] pt-3 pb-1 border-b-2'}>
            <div className={'hidden md:flex'}>
                <p className={'text-gray-500 text-sm'}>Call Us : 0779 - 127 - 667</p>
                <p className={'ml-3 text-gray-500 text-sm'}>Email : dpquochoai@gmail.com</p>
            </div>
            <div className={'flex items-center gap-4'}>
                <NavLink to={'/service'} className={'flex items-center gap-2 text-red-500 font-bold cursor-pointer'}><BiSupport/> Support</NavLink>
                <div>{ !isLogin ? <p className={'text-red-500 cursor-pointer'} onClick={() => navigation('/login')}>Đăng nhập / Đăng ký</p> :
                    (
                        <div className={'flex items-center group'}>
                            <img src={ 'https://www.vlance.vn/uploads/portfolio/view/c4a875224357fa0f1dce59defcb7a42b3d6d2cab1.jpg'} className={'w-[36px] rounded-full'} alt={'avatar'}/>
                            {/* group down */}
                            <div className=' relative'>
                                <div><MdOutlineExpandMore /> </div>
                                <div className='group-hover:block hidden absolute z-[9] dropdown-menu right-0 pt-4'>
                                    <div className='flex flex-col gap-2 w-44 bg-slate-100 text-gray-500 rounded'>
                                        <p className='cursor-pointer hover:text-white px-4 py-2 hover:bg-red-500' onClick={ () => setOpenAccount(true)}>My Account</p>
                                        <p className='cursor-pointer hover:text-white px-4 py-2 hover:bg-red-500' onClick={()=> navigation('/myorder')}>My Order</p>
                                        <p className='cursor-pointer hover:text-white px-4 py-2 hover:bg-red-500' onClick={()=> setOpenCart(true)}>My Cart</p>
                                        <p className='cursor-pointer hover:text-white px-4 py-2 hover:bg-red-500' onClick={ () => handleLogOut()}>Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }</div>
            </div>
            {/*  right modal  */}
            <RightModal openAccount={openAccount} setOpenAccount = {setOpenAccount}/>
            <CartModel openCart={openCart} setOpenCart = {setOpenCart}/>
        </div>
    )
};

export default HeaderTop;
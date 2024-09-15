import {BiSupport} from "react-icons/bi";
import {Link} from "react-router-dom";
import {MdOutlineExpandMore} from "react-icons/md";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.tsx";

const HeaderTop = () => {
    const {isLogin} = useContext(AppContext)
    return (
        <div className={'bg-white justify-end flex md:justify-between items-center px-[5%] pt-3 pb-1 border-b-2'}>
            <div className={'hidden md:flex'}>
                <p className={'text-gray-500 text-sm'}>Call Us : 0779 - 127 - 667</p>
                <p className={'ml-3 text-gray-500 text-sm'}>Email : dpquochoai@gmail.com</p>
            </div>
            <div className={'flex items-center gap-4'}>
                <div className={'flex items-center gap-2 text-red-500 font-bold'}><BiSupport/> Support</div>
                <div>{ !isLogin ? 'Đăng nhập / Đăng ký' :
                    (
                        <div className={'flex items-center'}>
                            <img src={'https://www.vlance.vn/uploads/portfolio/view/c4a875224357fa0f1dce59defcb7a42b3d6d2cab1.jpg'} className={'w-[36px] rounded-full'} alt={'avatar'}/>
                            {/* group down */}
                            <div className='group relative'>
                                <Link to={'/login'} ><MdOutlineExpandMore /> </Link>
                                <div className='group-hover:block hidden absolute z-[9] dropdown-menu right-0 pt-4'>
                                    <div className='flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                        <p className='cursor-pointer hover:text-black'>My Account</p>
                                        <p className='cursor-pointer hover:text-black'>My Order</p>
                                        <p className='cursor-pointer hover:text-black'>Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }</div>
            </div>
        </div>
    )
};

export default HeaderTop;
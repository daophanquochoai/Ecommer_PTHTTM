import React, {useState} from 'react';
import SiderBar from "../components/DashBoard/SiderBar.tsx";
import {TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled} from "react-icons/tb";
import {MdOutlineExpandMore} from "react-icons/md";
import {Outlet} from "react-router-dom";
type Props = {
    collapsed : boolean,
}
const DashBoard : React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const props : Props = {
        collapsed : collapsed
    }
    return (
        <div className={'bg-primary'}>
            <div className={'flex'}>
                <SiderBar props={props}/>
                <div className={'w-full'}>
                    <div className={'bg-white flex items-center justify-between px-6 py-2'}>
                        <div>
                            {
                                !collapsed ?
                                    <TbLayoutSidebarLeftCollapseFilled className={'text-3xl'} onClick={()=>setCollapsed(true)}/>
                                    :
                                    <TbLayoutSidebarRightCollapseFilled className={'text-3xl'} onClick={()=>setCollapsed(false)}/>
                            }
                        </div>
                        <div className={'flex items-center gap-4'}>
                            <span>Dao Phan Quoc Hoai</span>
                            <div className={'flex items-center'}>
                                <img src={'https://www.vlance.vn/uploads/portfolio/view/c4a875224357fa0f1dce59defcb7a42b3d6d2cab1.jpg'} className={'w-[36px] rounded-full'} alt={'avatar'}/>
                                {/* group down */}
                                <div className='group relative'>
                                    <MdOutlineExpandMore />
                                    <div className='group-hover:block hidden absolute z-[9] dropdown-menu right-0 pt-4'>
                                        <div className='flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                            <p className='cursor-pointer hover:text-black'>My Account</p>
                                            <p className='cursor-pointer hover:text-black'>My Order</p>
                                            <p className='cursor-pointer hover:text-black'>Logout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'p-8 max-h-[90vh] w-full overflow-y-scroll'}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashBoard;
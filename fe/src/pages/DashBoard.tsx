import React, {useContext, useEffect, useState} from 'react';
import SiderBar from "../components/DashBoard/SiderBar.tsx";
import {TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled} from "react-icons/tb";
import {MdOutlineExpandMore} from "react-icons/md";
import {Outlet} from "react-router-dom";
import {NavLink} from "react-router-dom";
import RightModal from '../components/Header/RightModal.tsx';
import {AppContext} from "../context/AppContext.tsx";

type Props = {
    collapsed : boolean,
}
const DashBoard : React.FC = () => {
    const [openAccount, setOpenAccount] = useState<boolean>(false)
    const [collapsed, setCollapsed] = useState(false);
    const props : Props = {
        collapsed : collapsed
    }
    const {info} = useContext(AppContext);
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
                            <span>{ info.first_name + ' ' + info.last_name}</span>
                            <div className={'flex items-center group cursor-pointer'}>
                                <img src={info.image_url} className={'w-[36px] rounded-full'} alt={'avatar'}/>
                                {/* group down */}
                                <div className='relative'>
                                    <MdOutlineExpandMore />
                                    <div className='group-hover:block hidden absolute z-[9] dropdown-menu right-0 pt-4'>
                                        <div className='flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                            <p className='cursor-pointer hover:text-black' onClick={() => setOpenAccount(true)}>My Account</p>
                                            <NavLink to={'/login'}>
                                                <p className='cursor-pointer hover:text-black'>Logout</p>
                                            </NavLink>
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
            <RightModal openAccount={openAccount} setOpenAccount = {setOpenAccount}/>
        </div>
    )
};

export default DashBoard;
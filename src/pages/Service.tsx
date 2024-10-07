import React from 'react';
import {FaSearch} from "react-icons/fa";
import {Collapse, CollapseProps} from "antd";
import {IoCall} from "react-icons/io5";
import {NavLink, Outlet} from "react-router-dom";

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Thông tin chung',
        children: <div  className={'flex flex-col'}>
            <NavLink to={'/service/policy-term'} className={'cursor-pointer hover:text-red-500'}>Chính sách Mekog</NavLink>
            <NavLink to={'/service/safe-shopping'} className={'cursor-pointer hover:text-red-500'}>Mua sắm an toàn</NavLink>
        </div>
    },
    {
        key: '2',
        label: 'Đơn hàng & vận chuyển',
        children: <div className={'flex flex-col'}>
            <NavLink to={'/service/order'} className={'cursor-pointer hover:text-red-500'}>Đơn hàng</NavLink>
            <NavLink to={'/service/delivery'} className={'cursor-pointer hover:text-red-500'}>Vận chuyển</NavLink>
        </div>
    },
    
];


const Service : React.FC = () => {


    return (
        <div>
            <div className={'flex px-[5%] bg-red-500 p-4 justify-between items-center'}>
                <NavLink to={'/'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png'} alt={'logo'}/>
                </NavLink>
                <div>
                    <p className={'text-white text-xs md:text-base'}>Trung tâm trợ giúp Mekog VN</p>
                </div>
            </div>
            <div className={'flex items-center justify-center flex-col bg-black p-12 gap-14'}>
                <h2 className={'text-4xl text-white'}>Xin chào, Mekog có thể giúp gì cho bạn?</h2>
                <div className={'flex bg-white items-center gap-4'}>
                    <input className={'outline-0 text-xl w-[200px] md:w-[500px] px-3'} placeholder={"Nhập từ tìm kiếm"}/>
                    <div className={'bg-red-500 px-4 py-2'}>
                        <FaSearch className={'text-2xl md:text-3xl text-white'}/>
                    </div>
                </div>
            </div>
            <div className={'bg-red-500 px-[5%] p-12 flex'}>
                <div className={'w-1/3'}>
                    <Collapse items={items} expandIconPosition='end' />
                </div>
                <div className={'w-2/3 mx-5'}>
                    <Outlet />
                </div>
            </div>
            <div className={'flex items-center justify-center flex-col p-12 bg-gray-900 gap-8'}>
                <p className={'text-2xl text-white text-center'}>Bạn có muốn tìm thêm thông tin gì không?</p>
                <button className={'bg-primary p-4 flex items-center text-base md:text-xl gap-1 md:gap-4'} onClick="window.location.href='tel:0779127667'"><IoCall /> Contact to Mekog</button>
            </div>
            <div className={'bg-black grid grid-cols-1 justify-center items-center md:grid-cols-[1fr_2fr] px-[5%] py-6'}>
                <div className={'flex flex-col gap-2'}>
                    <div className={'flex text-white gap-4 text-xs'}>
                        <span>Shopee Policy</span>
                        <span>Privacy Policy</span>
                        <span>Service Requirement</span>
                    </div>
                    <div className={'text-xs text-white'}>© 2021 Mekog. Tất cả các quyền được bảo lưu.</div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Service;
import React, {useState} from 'react';
import {Dropdown, Modal} from "antd";
import type { MenuProps } from 'antd';
import {CiHeart} from "react-icons/ci";
import {NavLink} from "react-router-dom";
import {HeartOutlined} from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className='text-red-500'>
          Wishlist
        </p>
      ),
    },
];

const AddWishlist: React.FC = () => {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
        
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dropdown menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
                <CiHeart onClick={showModal} className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" />
            </Dropdown>
            <Modal
                open={open}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className={'flex flex-col items-center justify-center'}>
                    <HeartOutlined style={{ fontSize: '80px'}} />
                    <p className='text-gray-400 mt-5 text-xl'>Product added to Wishlist</p>
                    <NavLink to={'/wishlist'}>
                        <button onClick={handleOk} className='bg-black hover:bg-red-500 text-white py-2 px-4 mt-5'>
                            VIEW WISHLIST
                        </button>
                    </NavLink>
                </div>
            </Modal>
        </div>
    );
};

export default AddWishlist;
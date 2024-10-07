import React, {useState} from 'react';
import {Dropdown, Modal} from "antd";
import type { MenuProps } from 'antd';
import {CiShoppingCart} from "react-icons/ci";
import {NavLink} from "react-router-dom";
import {CheckCircleTwoTone} from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className='text-red-500'>
          Add to cart
        </p>
      ),
    },
];

const AddCart: React.FC = () => {
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
                <CiShoppingCart onClick={showModal} className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" />
            </Dropdown>
            <Modal
                open={open}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className={'flex flex-col items-center justify-center'}>
                    <CheckCircleTwoTone twoToneColor="#ff0000" style={{ fontSize: '100px'}} />
                    <p className='font-bold mt-5 text-2xl'>Item added to your cart</p>
                    <p className='text-gray-400 mt-2'>2 ITEMS IN THE CART <span className='text-gray-900'>($238.00)</span></p>
                    <div className={'flex gap-10 mt-7'}>
                        <button onClick={handleCancel} className='bg-red-500 hover:bg-black text-white py-2 px-4'>
                            CONTINUE SHOPPING
                        </button>
                        <NavLink to={'/cart'}>
                            <button onClick={handleOk} className='bg-black hover:bg-red-500 text-white py-2 px-4'>
                                GO TO THE CART
                            </button>
                        </NavLink>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddCart;
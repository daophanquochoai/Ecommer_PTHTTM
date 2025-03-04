import React, {useState} from 'react';
import {Dropdown, Modal} from "antd";
import type { MenuProps } from 'antd';
import {CiSearch} from "react-icons/ci";
import {NavLink} from "react-router-dom";
import {HeartOutlined} from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className='text-red-500'>
          Quick View
        </p>
      ),
    },
];
type Props = {
    sale : number,
    image : string,
    like : boolean,
    title : string,
    star : number,
    price : number,
    priceOld : number,
    selled : number
}

const QuickView: React.FC =  (props : Props ) => {
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
                <CiSearch onClick={showModal} className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top" />
            </Dropdown>
            <Modal
                open={open}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                width={900}
            >
                <div className={'grid grid-col-1 md:grid-col-2'}>
                    <div className={'relative'}>
                        <span className={'absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm'}>{props.sale}%</span>
                        <img src={props.image} className={'w-full h-full object-center'} alt={''}/>
                    </div>  
                </div>
            </Modal>
        </div>
    );
};

export default QuickView;
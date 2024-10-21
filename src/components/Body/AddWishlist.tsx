import React, {useEffect, useState} from 'react';
import {Dropdown, Modal} from "antd";
import type { MenuProps } from 'antd';
import {CiHeart} from "react-icons/ci";
import {NavLink, useNavigate} from "react-router-dom";
import {HeartOutlined, HeartTwoTone} from '@ant-design/icons';
import {addProductToWishlist} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

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

type Props = {
    id : number,
    sale : number | undefined,
    image : string | undefined,
    like : boolean | undefined,
    title : string | undefined,
    star : number | undefined,
    price : number | undefined,
    priceOld : number | undefined,
    selled : number | undefined,
    isLoading: boolean,
    setPrductData: Function,
    dataProduct: object
}



const AddWishlist: React.FC = (props: Props) => {

    const navigate = useNavigate();


    const [open, setOpen] = useState(false);
    const showModal = () => {
        const fetchApi = async () => {

            const response = await addProductToWishlist(props.id);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            };
            if(response.code === 200)
            {
                setOpen(true);
                if( props.dataProduct === undefined) return
                 const updateDataProduct = props.dataProduct.map(item => {
                    if(item.id === props.id)
                    {
                        return{
                            ...item,
                            like : !props.like
                        }
                    }
                    return item;
                });


                props.setPrductData(updateDataProduct);
            }else{
                toast.error(response.message)
            }
        }
        fetchApi();
    };
    const handleOk = () => {
        setOpen(false);
        navigate("/wishlist");
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        // console.log(props)
    }, []);

    return (
        <div>
            <Dropdown menu={{ items }} placement="top" arrow={{ pointAtCenter: true }}>
                {props.like ? <HeartTwoTone twoToneColor="#eb2f96" className={'text-2xl'} onClick={showModal} data-bs-toggle="tooltip" data-bs-placement="top"/> : <CiHeart onClick={showModal} className={'text-2xl hover:text-red-500 cursor-pointer'} data-bs-toggle="tooltip" data-bs-placement="top"/>}

            </Dropdown>
            <Modal
                open={open}
                footer={null}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className={'flex flex-col items-center justify-center'}>
                    {props.like ? <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '80px'}}/> : <HeartOutlined style={{ fontSize: '80px'}} />}
                    {/*<HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '80px'}}/>*/}
                    {!props.like ? <p className='text-gray-400 mt-5 text-xl'>Product removed from Wishlist</p> : <p className='text-gray-400 mt-5 text-xl'>Product added to Wishlist</p>}

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
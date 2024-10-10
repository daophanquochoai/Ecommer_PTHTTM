import React, {useContext, useState} from 'react';
import {FaStar} from "react-icons/fa";
import {Radio, Space} from "antd";
import {AppContext} from "../../context/AppContext.tsx";

const Star : React.FC = () => {

    const { rate, setRate, setPage} = useContext(AppContext);
    const checkBoxHandler = (e) => {
        setPage(0)
        setRate(e.target.value)
    }
    return (
        <div className={'bg-white mt-6 p-4'}>
            <div>
                <span className={'text-base md:text-2xl font-bold pb-2 border-red-500 border-b-2'}>Rate</span>
            </div>
            <div className={'mt-6'}>
                <Radio.Group onChange={(e) =>{checkBoxHandler(e)}} value={rate}>
                    <Space direction="vertical">
                        <Radio value={5}
                        >
                            <div className={'flex items-center gap-2 text-xs md:text-base'}>
                                5<FaStar className={'text-yellow-300'}/>
                            </div>
                        </Radio>
                        <Radio value={4}>
                            <div className={'flex items-center gap-2 text-xs md:text-base'}>
                                từ 4<FaStar className={'text-yellow-300'}/>
                            </div>
                        </Radio>
                        <Radio value={3}>
                            <div className={'flex items-center gap-2 text-xs md:text-base'}>
                                từ 3<FaStar className={'text-yellow-300'}/>
                            </div>
                        </Radio>
                        <Radio value={2}>
                            <div className={'flex items-center gap-2 text-xs md:text-base'}>
                                từ 2<FaStar className={'text-yellow-300'} />
                            </div>
                        </Radio>
                        <Radio value={1}>
                            <div className={'flex items-center gap-2 text-xs md:text-base'}>
                                từ 1<FaStar className={'text-yellow-300'}/>
                            </div>
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
        </div>
    );
};

export default Star;
import React from 'react';
import Estimate from "./ChartEstimate.tsx";
import {Select} from "antd";
import {MdCrisisAlert, MdOutlinePersonPinCircle} from "react-icons/md";
import {LiaPersonBoothSolid} from "react-icons/lia";
import {IoCellularOutline} from "react-icons/io5";

const OverView : React.FC = () => {
    const today = new Date();
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    }
    return (
        <div className={'flex flex-col gap-6'}>
            <div className={'bg-white p-6'}>
                <div className={'flex justify-between items-center'}>
                    <div className={'border px-4 py-1 bg-red-300 text-white'}>{today.getMonth()}-{today.getFullYear()}</div>
                    <Select
                        defaultValue="2024"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: '2024', label: '2024' },
                            { value: '2023', label: '2023' },
                            { value: '2022', label: '2022' }
                        ]}
                    />

                </div>
            </div>
            <div className={'bg-white p-6'}>
                <Estimate />
            </div>
            <div className={'bg-white p-6 grid grid-cols-4'}>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>18.4K <MdCrisisAlert className={'text-green-300'}/></div>
                    <p className={'text-gray-400'}>Revenue</p>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>12K<IoCellularOutline  className={'text-orange-300'}/></div>
                    <p className={'text-gray-400'}>Sold Products</p>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>10K<MdOutlinePersonPinCircle className={'text-red-300'}/></div>
                    <p className={'text-gray-400'}>Employee</p>
                </div>
                <div className={'flex flex-col justify-center items-center'}>
                    <div className={'text-3xl flex items-center'}>20<LiaPersonBoothSolid  className={'text-yellow-300'}/></div>
                    <p className={'text-gray-400'}>Customer</p>
                </div>
            </div>
        </div>
    );
};

export default OverView;
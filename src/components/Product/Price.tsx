import React, {useState} from 'react';
import {Slider} from "antd";
const Price : React.FC = () => {
    const [price, setPrice] = useState<number[]>([0,100])
    return (
        <div className={'bg-white mt-6 p-4'}>
            <div>
                <span className={'text-2xl font-bold pb-2 border-b-2 border-red-500'}>Price</span>
            </div>
            <div className={'mt-6'}>
                <Slider range={{ draggableTrack: true }} max={1000} defaultValue={price} onChange={(e) => setPrice(e)}
                        trackStyle={{ backgroundColor: "#ef4444" }}
                        handleStyle={{ boxShadow: "#ef4444" }}
                />
            </div>
            <p>Price : <span>${price[0]}</span> — <span>${price[1]}</span></p>
        </div>
    );
};

export default Price;
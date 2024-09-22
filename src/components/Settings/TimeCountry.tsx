import React, {useState} from 'react';
import {Select} from "antd";

const TimeCountry : React.FC = () => {
    const [filter1 , setFilter1] = useState<string>('GMT -7:00');

    const [filter2 , setFilter2] = useState<string>('USA');

    const filterHandler1 = (e) => {
        setFilter1(e)
    }
    const filterHandler2 = (e) => {
        setFilter2(e)
    }
    const item1: object[] = [
        { value: 'UTC-7', label: <div>UTC -7:00</div> },
        { value: 'UTC+7', label: <div>UTC +7:00</div> },
    ]
    const item2: object[] = [
        { value: 'USA', label: <div>USA</div> },
        { value: 'VN', label: <div>Vietnam</div> },
    ]
    return (
        <div className="mt-3">
            <p className="text-left text-2xl font-semibold text-gray-700 mb-4">Default time zone and country</p>
            <form className='border-l-2'>
                <div className="max-w-lg p-6">
                    <p className="block text-gray-700 font-bold mb-2">Default time zone</p>
                    <div>
                        <Select
                            style={{
                                width: '200px',
                                height : '40px'
                            }}
                            options={item1}
                            value={filter1}
                            status="error"
                            onChange={ (e)=> filterHandler1(e)}
                        />
                    </div>
                    <p className="block text-gray-700 font-bold mb-2">Default country</p>
                    <div>
                        <Select
                            style={{
                                width: '200px',
                                height : '40px'
                            }}
                            options={item2}
                            value={filter2}
                            status="error"
                            onChange={ (e)=> filterHandler2(e)}
                        />
                    </div>
                </div>
                <div className="flex justify-end w-4/5">
                    <button type="submit" className="w-auto p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TimeCountry;
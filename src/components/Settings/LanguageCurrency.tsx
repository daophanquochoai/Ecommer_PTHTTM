import React, {useState} from 'react';
import {Select} from "antd";

const LanguageCurrency : React.FC = () => {
    const [filter1 , setFilter1] = useState<string>('English');

    const [filter2 , setFilter2] = useState<string>('USD');

    const filterHandler1 = (e) => {
        setFilter1(e)
    }
    const filterHandler2 = (e) => {
        setFilter2(e)
    }
    const item1: object[] = [
        { value: 'English', label: <div>English</div> },
        { value: 'Vietnamese', label: <div>Tiếng Việt</div> },
    ]
    const item2: object[] = [
        { value: 'USD', label: <div>USD</div> },
        { value: 'VND', label: <div>VND</div> },
    ]
    return (
        <div className="mt-3">
            <p className="text-left text-2xl font-semibold text-gray-700 mb-4">Language and currency</p>
            <form className='border-l-2'>
                <div className="max-w-lg p-6">
                    <p className="block text-gray-700 font-bold mb-2">Language</p>
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
                    <p className="block text-gray-700 font-bold mb-2">Currency</p>
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

export default LanguageCurrency;
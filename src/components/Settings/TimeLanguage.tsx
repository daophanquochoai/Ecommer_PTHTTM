import React, {useState} from 'react';
import {Button, Select} from "antd";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";

const bread = [
    {
        title : <NavLink to={'/admin/settings'}>Settings</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Time & language</span>
    }
]

const TimeLanguage : React.FC = () => {
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };

    return (
        <div>
            <BreadCrumb bread={bread} />      
            <form>
                <p className='font-bold mt-5'>System time zones</p>
                <Select 
                    className='mt-2'
                    defaultValue="UTC -7:00"
                    style={{
                        width: '200px',
                        height : '40px'
                    }}
                    options={[
                        {
                            value: 'utc-7',
                            label: 'UTC -7:00',
                        },
                        {
                            value: 'utc+7',
                            label: 'UTC +7:00',
                        },
                        ]}
                />
                <p className='font-bold mt-5'>Preferred languages</p>
                <Select 
                    className='mt-2'
                    defaultValue="English"
                    style={{
                        width: '200px',
                        height : '40px'
                    }}
                    options={[
                        {
                            value: 'english',
                            label: 'English',
                        },
                        {
                            value: 'vietnamese',
                            label: 'Tiếng Việt',
                        },
                        ]}
                />
                <p className='font-bold mt-5'>Default country or region</p>
                <Select 
                    className='mt-2'
                    defaultValue="United States"
                    style={{
                        width: '200px',
                        height : '40px'
                    }}
                    options={[
                        {
                            value: 'usa',
                            label: 'United States',
                        },
                        {
                            value: 'vn',
                            label: 'Việt Nam',
                        },
                        ]}
                />
                <div>
                    <Button type="primary" onClick={start} loading={loading} className='mt-5 ml-2'>
                        Apply
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TimeLanguage;
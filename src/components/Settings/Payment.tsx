import React, {useState} from 'react';
import {Button, Select, Image} from "antd";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";

const bread = [
    {
        title : <NavLink to={'/admin/settings'}>Settings</NavLink>
    },
    {
        title : <span className={'text-red-500'}>Payment</span>
    }
]

const Payment : React.FC = () => {
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
            <p className='font-bold mt-5'>Currency</p>
                <Select 
                    className='mt-2'
                    defaultValue="USD"
                    style={{
                        width: '200px',
                        height : '40px'
                    }}
                    options={[
                        {
                            value: 'usd',
                            label: 'USD',
                        },
                        {
                            value: 'vnd',
                            label: 'VND',
                        },
                        ]}
                />
                <p className='font-bold mt-5'>Payment method</p>
                <div className='mt-5 flex'>
                    <Image
                        width={200}
                        height={50}
                        src="https://pngimg.com/uploads/paypal/paypal_PNG3.png"
                        preview={false}
                    />
                    <p className='mt-2 ml-6 text-2xl'>PayPal</p>
                </div>
                <div>
                    <Button type="primary" onClick={start} loading={loading} className='mt-5 ml-2'>
                        Apply
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Payment;
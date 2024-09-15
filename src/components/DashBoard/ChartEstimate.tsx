import { Column } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

const Estimate = () => {
    const config = {
        data: [
            { action: 'January', pv: 50000 },
            { action: 'February ', pv: 35000 },
            { action: 'March ', pv: 25000 },
            { action: 'April ', pv: 15000 },
            { action: 'May', pv: 8500 },
            { action: 'June', pv: 8500 },
            { action: 'July', pv: 8500 },
            { action: 'August', pv: 8500 },
            { action: 'September', pv: 8500 },
            { action: 'October', pv: 8500 },
            { action: 'November', pv: 8500 },
            { action: 'December ', pv: 8500 },
        ],
        xField: 'action',
        yField: 'pv',
        colorField: 'action',
    };
    return <Column {...config} className={'w-[100%]'}/>;
};

export default Estimate;

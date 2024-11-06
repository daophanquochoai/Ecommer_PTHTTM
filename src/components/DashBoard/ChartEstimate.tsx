import { Column } from '@ant-design/plots';
import React from 'react';
import ReactDOM from 'react-dom';

interface RevenueColumn {
    month : string;
    numberMonth : number;
    revenue : number;
}
type Props = {
    revenue : RevenueColumn[]
}
const Estimate = ( props : Props) => {
    const config = {
        data: props.revenue,
        xField: 'month',
        yField: 'revenue',
        colorField: 'month',
        tooltip : {
            channel : 'y',
            valueFormatter : (d) => d.toLocaleString() + 'đ'
        }
    };
    return <Column {...config} className={'w-[100%]'}/>;
};

export default Estimate;

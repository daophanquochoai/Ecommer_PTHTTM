import React from 'react';
import {Collapse, CollapseProps} from "antd";
import Review from '../Review';

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: '[Đơn hàng] Tại sao đơn hàng của tôi chưa cập nhật trạng thái?',
        children: 
        <div  className={'flex flex-col'}>
            <p>Với hoạt động vận chuyển hạn chế trong thời gian giãn cách và số lượng lớn đơn hàng cần xử lý, đội ngũ Mekog vẫn nỗ lực hỗ trợ để đảm bảo Người bán và các Đơn vị vận chuyển (ĐVVC) có đủ thời gian và nhân lực để chuẩn bị hàng cũng như giao hàng thành công.</p>
            <Review />
        </div>
    },
];
const Order: React.FC = () => {
    return (
        <div className='w-full'>
            <Collapse items={items} />
        </div>
    );
};

export default Order;
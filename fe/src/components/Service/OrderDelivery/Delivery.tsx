import React from 'react';
import {Collapse, CollapseProps} from "antd";
import Review from '../Review';

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: '[Vận chuyển] Mekog đang hỗ trợ những phương thức vận chuyển nào?',
        children:
        <div  className={'flex flex-col'}>
            <p>Hiện tại, Người mua có thể chọn 1 trong 4 Phương thức vận chuyển: Hỏa Tốc - Nhanh - Tiết Kiệm - Hàng Cồng kềnh khi mua một số sản phẩm trên Mekog, thay vì phải lựa chọn một Đơn vị vận chuyển cố định. Sau khi bạn đã lựa chọn phương thức vận chuyển mong muốn, hệ thống Mekog sẽ sắp xếp Đơn vị vận chuyển phù hợp nhất để tiến hành giao đơn hàng đến bạn.</p>
            <Review />
        </div>
    },
];
const Delivery: React.FC = () => {
    return (
        <div className='w-full'>
            <Collapse items={items} />
        </div>
    );
};

export default Delivery;
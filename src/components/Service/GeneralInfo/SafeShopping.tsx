import React from 'react';
import {Collapse, CollapseProps} from "antd";
import {WarningTwoTone} from "@ant-design/icons";
import Review from '../Review';

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: '[Cảnh báo lừa đảo] Mua sắm an toàn cùng Mekog',
        children: 
            <div className={'flex flex-col'}>
                <p>1. Chỉ thực hiện giao dịch trên trang web chính thức của Mekog</p>
                <p>2. Hãy cẩn trọng với những tin nhắn đáng ngờ</p>
                <p>3. Không bao giờ chia sẻ mã xác thực, mật khẩu của bạn</p>
                <p>4. Cẩn thận với các thông tin tuyển dụng</p>
                <p>5. Kiểm tra kỹ thông tin đơn hàng trước khi nhận</p>
                <p><WarningTwoTone twoToneColor="#ff6600" /> Lưu ý: Tuyệt đối <span className='font-bold'>KHÔNG</span> thực hiện những giao dịch sử dụng các hình thức thanh toán khác ngoài các phương thức thanh toán hiện có trên Mekog (kể cả khi Người bán đề nghị). Mekog sẽ có biện pháp xử lý nếu phát hiện hành vi gian lận hoặc giao dịch ngoài làm ảnh hưởng đến quyền lợi Người dùng trên Mekog.</p>
                <Review />
            </div>
    },
];
const SafeShopping: React.FC = () => {
    return (
        <div className='w-full'>
            <Collapse items={items} />
        </div>
    );
};

export default SafeShopping;
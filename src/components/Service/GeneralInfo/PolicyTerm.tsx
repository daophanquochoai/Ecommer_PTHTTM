import React from 'react';
import {Collapse, CollapseProps} from "antd";
import Review from '../Review';

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'Điều khoản Mekog',
        children: 
        <div  className={'flex flex-col'}>
            <p>Chào mừng bạn đến với Sàn Giao Dịch Thương Mại Điện Tử Mekog qua giao diện website hoặc ứng dụng di động (<span className='font-bold'>“Trang Mekog”</span> hoặc <span className='font-bold'>“Sàn Mekog”</span>). Trước khi sử dụng Trang Mekog hoặc tạo tài khoản Mekog (<span className='font-bold'>“Tài Khoản”</span>), vui lòng đọc kỹ các <span className='font-bold'>Điều Khoản Dịch Vụ</span> dưới đây và <span className='font-bold'>Quy Chế Hoạt Động Sàn Giao Dịch Thương Mại Điện Tử Mekog</span> để hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với Công ty TNHH Mekog và các công ty liên kết và công ty con của Mekog (sau đây được gọi riêng là “Mekog”, gọi chung là “chúng tôi”, “của chúng tôi”). “Dịch Vụ” chúng tôi cung cấp hoặc sẵn có bao gồm (a) Trang Mekog, (b) các dịch vụ được cung cấp bởi Trang Mekog và bởi phần mềm dành cho khách hàng của Mekog có sẵn trên Trang Mekog, và (c) tất cả các thông tin, đường dẫn, tính năng, dữ liệu, văn bản, hình ảnh, biểu đồ, âm nhạc, âm thanh, video (bao gồm cả các đoạn video được đăng tải trực tiếp theo thời gian thực (livestream)), tin nhắn, tags, nội dung, chương trình, phần mềm, ứng dụng dịch vụ (bao gồm bất kỳ ứng dụng dịch vụ di động nào) hoặc các tài liệu khác có sẵn trên Trang Mekog hoặc các dịch vụ liên quan đến Trang Mekog (<span className='font-bold'>“Nội Dung”</span>). Bất kỳ tính năng mới nào được bổ sung hoặc mở rộng đối với Dịch Vụ đều thuộc phạm vi điều chỉnh của Điều Khoản Dịch Vụ này. Điều Khoản Dịch Vụ này điều chỉnh việc bạn sử dụng Dịch Vụ cung cấp bởi Mekog.</p>
            <Review />
        </div>
    },
];
const PolicyTerm: React.FC = () => {
    return (
        <div className='w-full'>
            <Collapse items={items} />
        </div>
    );
};

export default PolicyTerm;
import React from 'react';
import {FaSearch} from "react-icons/fa";
import {Collapse, CollapseProps, Divider} from "antd";
import {IoCall} from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'GIỚI THIỆU',
        children: <p>Chào mừng bạn đến với Sàn Giao Dịch Thương Mại Điện Tử Mekog qua giao diện website hoặc ứng dụng di động (“Trang Mekog” hoặc “Sàn Mekog”). Trước khi sử dụng Trang Mekog hoặc tạo tài khoản Mekog (“Tài Khoản”), vui lòng đọc kỹ các Điều Khoản Dịch Vụ dưới đây và Quy Chế Hoạt Động Sàn Giao Dịch Thương Mại Điện Tử Mekog để hiểu rõ quyền lợi và nghĩa vụ hợp pháp của mình đối với Công ty TNHH Mekog và các công ty liên kết và công ty con của Mekog (sau đây được gọi riêng là “Mekog”, gọi chung là “chúng tôi”, “của chúng tôi”). “Dịch Vụ” chúng tôi cung cấp hoặc sẵn có bao gồm (a) Trang Mekog, (b) các dịch vụ được cung cấp bởi Trang Mekog và bởi phần mềm dành cho khách hàng của Mekog có sẵn trên Trang Mekog, và (c) tất cả các thông tin, đường dẫn, tính năng, dữ liệu, văn bản, hình ảnh, biểu đồ, âm nhạc, âm thanh, video (bao gồm cả các đoạn video được đăng tải trực tiếp theo thời gian thực (livestream)), tin nhắn, tags, nội dung, chương trình, phần mềm, ứng dụng dịch vụ (bao gồm bất kỳ ứng dụng dịch vụ di động nào) hoặc các tài liệu khác có sẵn trên Trang Mekog hoặc các dịch vụ liên quan đến Trang Mekog (“Nội Dung”). Bất kỳ tính năng mới nào được bổ sung hoặc mở rộng đối với Dịch Vụ đều thuộc phạm vi điều chỉnh của Điều Khoản Dịch Vụ này. Điều Khoản Dịch Vụ này điều chỉnh việc bạn sử dụng Dịch Vụ cung cấp bởi Mekog.</p>,
    },
    {
        key: '2',
        label: '[Đơn hàng] Tại sao đơn hàng của tôi chưa cập nhật trạng thái?',
        children: <p>Với hoạt động vận chuyển hạn chế trong thời gian giãn cách và số lượng lớn đơn hàng cần xử lý, đội ngũ Mekog vẫn nỗ lực hỗ trợ để đảm bảo Người bán và các Đơn vị vận chuyển (ĐVVC) có đủ thời gian và nhân lực để chuẩn bị hàng cũng như giao hàng thành công</p>,
    },
    {
        key: '3',
        label: '[Cảnh báo lừa đảo] Mua sắm an toàn cùng Mekog',
        children: <p>Lưu ý: Tuyệt đối KHÔNG thực hiện những giao dịch sử dụng các hình thức thanh toán khác ngoài các phương thức thanh toán hiện có trên Mekog (kể cả khi Người bán đề nghị). Mekog sẽ có biện pháp xử lý nếu phát hiện hành vi gian lận hoặc giao dịch ngoài làm ảnh hưởng đến quyền lợi Người dùng trên Mekog.
        </p>,
    }
];


const Service : React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className={'flex px-[5%] bg-red-500 p-4 justify-between items-center'}>
                <div className={'cursor-pointer'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png'} alt={'logo'} onClick={()=>navigate('/')}/>
                </div>
                <div>
                    <p className={'text-white text-xs md:text-base'}>Trung tâm trợ giúp Mekog VN</p>
                </div>
            </div>
            <div className={'flex items-center justify-center flex-col bg-black p-12 gap-14'}>
                <h2 className={'text-4xl text-white'}>Xin chào, Mokog có thể giúp gì cho bạn ?</h2>
                <div className={'flex bg-white items-center gap-4'}>
                    <input className={'outline-0 text-xl w-[200px] md:w-[500px] px-3'} placeholder={"Enter the content you want to search for"}/>
                    <div className={'bg-red-500 px-4 py-2'}>
                        <FaSearch className={'text-2xl md:text-3xl text-white'}/>
                    </div>
                </div>
            </div>
            <div className={'bg-red-500 px-[5%] p-12'}>
                <h2 className={'text-2xl text-white pb-4'}>Category</h2>
                <Collapse items={items} defaultActiveKey={['1']}/>;
            </div>
            <div className={'flex items-center justify-center flex-col p-12 bg-gray-900 gap-8'}>
                <p className={'text-2xl text-white text-center'}>Bạn có muốn tìm thêm thông tin gì không?</p>
                <button className={'bg-primary p-4 flex items-center text-base md:text-xl gap-1 md:gap-4'} onClick="window.location.href='tel:0779127667'"><IoCall /> Contact to Mekog</button>
            </div>
            <div className={'bg-black grid grid-cols-1 justify-center items-center md:grid-cols-[1fr_2fr] px-[5%] py-6'}>
                <div className={'flex flex-col gap-2'}>
                    <div className={'flex text-white gap-4 text-xs'}>
                        <span>Shopee Policy</span>
                        <span>Privacy Policy</span>
                        <span>Service Requirement</span>
                    </div>
                    <div className={'text-xs text-white'}>© 2021 Mekog. Tất cả các quyền được bảo lưu.</div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Service;
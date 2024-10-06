import React, {useState} from 'react';
import {Button, Divider, Modal, Form, Radio, Input} from "antd";
import type { RadioChangeEvent } from 'antd';
import CheckCircleOutlined from '@ant-design/icons';

const Review: React.FC = () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [display, setDisplay] = useState(true);
    const [value, setValue] = useState(0);
    
    const showModal1 = () => {
        setOpen1(true);
        setTimeout(() => {
            setOpen1(false);
        }, 2000);
    };
    const showModal2 = () => {
        setOpen2(true);
    };
    const handleOk = () => {
        setOpen2(false);
        showModal1();
        setValue(0);
        setDisplay(true);
    };
    const handleCancel = () => {
        setOpen2(false);
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        setDisplay(false);
    };
    
    return (
        <div className={'flex flex-col'}>
            <Divider />
            <h2 className='font-bold'>Bài viết có hữu ích cho bạn không?</h2>
            <div className='flex gap-10 mt-5'>
                <Button onClick={showModal1}>Có</Button>
                <Modal
                    open={open1}
                    footer={null}
                    centered
                    closable={false}
                >
                    <div className='flex justify-center'>
                        <CheckCircleOutlined />
                        <p className='text-green-500'>Cảm ơn bạn đã chia sẻ ý kiến!</p>
                    </div>
                </Modal>
                <Button onClick={showModal2}>Không</Button>
                <Modal
                    open={open2}
                    footer={null}
                    centered
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <div>
                        <p>Điều gì khiến bạn thấy bài viết chưa hữu ích?</p>
                        <Form layout="vertical">
                           <Form.Item>
                                <Radio.Group onChange={onChange} value={value}>
                                    <div className='flex flex-col'>
                                        <Radio value={1}>Nội dung bài viết khó hiểu</Radio>
                                        <Radio value={2}>Thông tin chưa đầy đủ</Radio>
                                        <Radio value={3}>Thông tin không hữu ích</Radio>
                                        <Radio value={4}>Liên kết trong bài viết bị lỗi</Radio>
                                    </div>
                                </Radio.Group>
                           </Form.Item>
                           <Form.Item>
                                <Input placeholder='Mekog cần cải thiện điều gì để có thể hỗ trợ bạn tốt hơn?'/>
                           </Form.Item>
                           <Form.Item className={'flex items-center justify-end'}>
                                <Button onClick={handleCancel} className='mr-10'>
                                    Hủy
                                </Button>
                                <Button type="primary" danger disabled={display} onClick={handleOk}>
                                    Confirm
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Review;
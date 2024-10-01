import React, {useState} from 'react';
import Comment from "./Comment.tsx";
import {Button, Form, Rate, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from '@ant-design/icons';
import RelateProduct from "./RelateProduct.tsx";
import Skeleton from "react-loading-skeleton";
type Props = {
    sale : number,
    image : string,
    like : boolean,
    title : string,
    star : number,
    price : number,
    priceOld : number,
    selled : number,
    sizre : string[],
    description : string,
    comments : object
}
const DescriptionRate : React.FC = ( props : Props) => {
    const [active, setActive] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className={'bg-white p-2'}>
            <div>
                <div className={'flex items-center justify-center p-4 gap-8 bg-[#f5f5f5]'}>
                    <div onClick={()=>setActive(true)} className={'group cursor-pointer flex flex-col gap-2'}>
                        <span className={`text-xs sm:text-base font-[500] ${active ? 'text-red-500' : 'group-hover:text-red-500' } transition-all duration-300`}>DESCRIPTION</span>
                        <div className={`border-b-2 border-red-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-500`}></div>
                    </div>
                    <div onClick={()=>setActive(false)} className={'group cursor-pointer'}>
                        <span className={`text-xs sm:text-base font-[500] ${!active ? 'text-red-500 ' : ' group-hover:text-red-500'} transition-all duration-300`}>REVIEWS({Object.keys(props.comments).length})</span>
                        <div className={`border-b-2 border-red-500 mt-2 ${!active ? 'w-full' : 'w-0 group-hover:w-full'} transition-all duration-500`}></div>
                    </div>
                </div>
                <div>
                    <div>
                        {
                            active ?
                                <>
                                    {
                                        isLoading ?
                                            <>
                                                <div className={'p-4'}></div>
                                                <Skeleton className={'w-full h-[20px]'} count={5}/>
                                                <div className={'p-4'}></div>
                                            </>
                                            :
                                            <div className={'p-4 text-gray-400'}>
                                                <p>{props.description}</p>
                                            </div>
                                    }
                                </> :
                                <>
                                    <div className={'grid grid-cols-2'}>
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                        <Comment />
                                    </div>
                                    <div className={'border p-4 m-4'}>
                                        <Form
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span: 14 }}
                                            layout="horizontal"
                                            style={{ maxWidth: 600 }}
                                        >
                                            <div className={'grid grid-cols-[3fr_2fr]'}>
                                                <div>
                                                    <Form.Item label="TextArea">
                                                        <TextArea rows={4} />
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <Form.Item label="Rate">
                                                        <Rate />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                                                <Upload action="/upload.do" listType="picture-card">
                                                    <button style={{ border: 0, background: 'none' }} type="button">
                                                        <PlusOutlined />
                                                        <div style={{ marginTop: 8 }}>Upload</div>
                                                    </button>
                                                </Upload>
                                            </Form.Item>
                                            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                                <Button danger  htmlType="submit">
                                                    Send
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </>
                        }
                        <div>
                            <RelateProduct />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptionRate;
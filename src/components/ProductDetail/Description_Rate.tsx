import React, {useContext, useEffect, useState} from 'react';
import Comment from "./Comment.tsx";
import {Button, Form, GetProp, Rate, Upload, UploadFile, UploadProps} from "antd";
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import RelateProduct from "./RelateProduct.tsx";
import Skeleton from "react-loading-skeleton";
import {data} from "autoprefixer";
import {postComment} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";
import {AppContext} from "../../context/AppContext.tsx";
type Props = {
    id: number,
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
    comments : object,
    commented: boolean,
    productData, object,
    setProductData
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const DescriptionRate : React.FC = ( props : Props) => {

    //bien
    const [active, setActive] = useState<boolean>(true);
    const [form] = Form.useForm();

    const {info} = useContext(AppContext)

    const [imageComment, setImageComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false)

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
    //function
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            // getBase64(info.file.originFileObj as FileType, (url) => {
            //     setLoading(false);
            //     setImageComment(url);
            // });
            setLoading(false)
            setImageComment(info.file.response)
        }
    };


    const onFinish = (values: { content: string; rate: number; image_url: string[] }) => {

        const dataToSave = {
            content: values.content,
            rate: values.rate,
            image_url: imageComment
        };
        const fetchApi = async () => {
            const response = await postComment(props.id, dataToSave);
            if( response.code === "ERR_NETWORK"){
                toast.error("Server Failt!!")
                return;
            }
            if(response.status === 200)
            {
                toast.success("Comment successfully!!")
                    props.setProductData(
                        {
                            ...props.productData,
                            commented: true,
                            comments : {
                                [info.email] : {
                                    avatar : info.image_url,
                                    content : dataToSave.content,
                                    first_name : info.first_name,
                                    last_name : info.last_name,
                                    rate : dataToSave.rate
                                },
                                ...Object.fromEntries(Object.entries(props.productData.comments).slice(1))
                            }
                        }
                    )

            }
        }

        fetchApi()
    };

    useEffect(() => {
        console.log(props.productData)
    }, [props.productData]);
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
                                    <div className={'p-4 text-gray-400'}>
                                        <p>{props.description}</p>
                                    </div>
                                </> :
                                <>
                                    <div className={'grid grid-cols-2'}>
                                        {
                                            Object.keys(props.comments).map((item, index) =>
                                                <Comment
                                                    key={index}
                                                    content={props.comments[item].content}
                                                    star={props.comments[item].rate}
                                                    image={props.comments[item].avatar}
                                                    name={props.comments[item].last_name + " " + props.comments[item].first_name}
                                                />
                                            )
                                        }
                                    </div>
                                    <div className={'border p-4 m-4'}>
                                        { !props.commented &&
                                            <>
                                                <Form
                                                    form={form}
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 14 }}
                                                    layout="horizontal"
                                                    style={{ maxWidth: 600 }}
                                                    onFinish={onFinish}
                                                >
                                                    <div className={'grid grid-cols-[3fr_2fr]'}>
                                                        <div>
                                                            <Form.Item label="Content :"  name="content">
                                                                <TextArea rows={4} />
                                                            </Form.Item>
                                                        </div>
                                                        <div>
                                                            <Form.Item label="Rate" name="rate">
                                                                <Rate />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    <Upload
                                                        name="image_url"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        action="http://localhost:3000/upload"
                                                        onChange={handleChange}
                                                    >
                                                        {imageComment ? <img src={imageComment} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                                    </Upload>
                                                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                                        <Button danger htmlType="submit">
                                                            Send
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </>
                                        }
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
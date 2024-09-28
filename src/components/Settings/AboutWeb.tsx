import React, {useState} from 'react';
import {Upload} from "antd";
import {GrUploadOption} from "react-icons/gr";
import BreadCrumb from "../Body/BreadCrumb.tsx";
import {NavLink} from "react-router-dom";
import { Image, Button} from 'antd';

const bread = [
    {
        title : <NavLink to={'/admin/settings'}>Settings</NavLink>
    },
    {
        title : <span className={'text-red-500'}>About website</span>
    }
]

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const AboutWeb : React.FC = () => {
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png',
        },
    ]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    return (
        <div>
            <BreadCrumb bread={bread} />
            <div className='mt-5 flex'>
                <Image
                    width={200}
                    src="https://demo-60.woovinapro.com/wp-content/uploads/2022/03/logo.png"
                    className='bg-white'
                />
                <p className='mt-2 ml-6 text-2xl'>Mekog E-commerce</p>
            </div>
            <form className='mt-5'>
                <p className='font-bold'>Website name</p>
                <input required placeholder='Mekog E-commerce' className='w-1/2 mt-2 p-2 outline-0 border-2 bg-white' />
                <p className='font-bold mt-5'>Website logo</p>
                <div className='w-1/2 mt-2 bg-white'>
                    <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        maxCount={1}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        <GrUploadOption />
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                </div>
                <Button type="primary" onClick={start} loading={loading} className='mt-5 ml-2'>
                    Apply
                </Button>
            </form>
        </div>
    );
};

export default AboutWeb;
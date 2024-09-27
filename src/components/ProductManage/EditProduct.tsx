import React, { useState }  from 'react';
import {Upload, DatePicker, Image, Select} from "antd";
import {GrUploadOption} from "react-icons/gr";
import dayjs from 'dayjs';

const dateFormat = 'DD/MM/YYYY';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

const EditProduct: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
        {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://demo-60.woovinapro.com/wp-content/uploads/2021/01/product-42.jpg',
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
            <p className='text-left text-2xl font-bold mb-4'>Add product</p>
            <form className='grid grid-cols-1 gap-9'>
                <div className='flex flex-col md:flex-row gap-9'>
                    <div className='flex-1'>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Product Name <span className='text-red-500'>*</span></label>
                            <input required placeholder='Microsoft Xbox One S Controller – Gears 5 Kait Diaz' className='p-2 outline-0 border-2' />
                        </div>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Description <span className='text-red-500'>*</span></label>
                            <input required placeholder='Lorem ipsum dolor sit amet, consetetur sadipscing elitr.' className='p-2 outline-0 border-2 h-36' />
                        </div>
                        <div className='flex gap-2 flex-col mb-4'>
                            <label className='text-2xl'>Category</label>
                            <Select 
                                defaultValue="Babies & Moms"
                                style={{
                                    width: '200px',
                                    height : '40px'
                                }}
                                options={[
                                    {
                                      value: 'computers-technologies',
                                      label: 'Computers & Technologies',
                                    },
                                    {
                                      value: 'babies-moms',
                                      label: 'Babies & Moms',
                                    },
                                    {
                                      value: 'sport-outdoor',
                                      label: 'Sport & Outdoor',
                                    },
                                    {
                                      value: 'books-office',
                                      label: 'Books & Office',
                                    },
                                  ]}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-9 justify-between'>
                            <div className='flex flex-col gap-2 flex-1'>
                                <label className='text-2xl'>Expire Date</label>
                                <DatePicker className='p-2 outline-0 border-2' defaultValue={dayjs('21/09/2077', dateFormat)} format={dateFormat} />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <label className='text-2xl'>Units In Stock <span className='text-red-500'>*</span></label>
                                <input required placeholder='500' className='p-2 outline-0 border-2' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <div>
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
                    </div>
                </div>
                <div>
                    <button type='submit' className={'w-full bg-black hover:bg-red-500 text-white py-2 px-4'}>UPDATE NOW</button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
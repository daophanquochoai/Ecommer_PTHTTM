import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {IoClose} from "react-icons/io5";
import {Cascader, CascaderProps, Spin, Table, Upload, UploadFile, UploadProps} from "antd";
import {AppContext} from "../../context/AppContext.tsx";
import {useNavigate} from "react-router-dom";
import {getDataCity} from "../../Utils/GetAddress.ts";
import {Column} from "@ant-design/plots";

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

type Props = {
    openAccount: boolean,
    setOpenAccount: ()=>void
}

interface DataType {
    key : React.Key,
    address : string
}

const RightModal : React.FC = ( props : Props) => {
    const {openAccount,setOpenAccount} = props;

    const data: DataType[] = [
        {
            key: '1',
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '3',
            address: 'New York No. 1 Lake Park',
        }
    ]


    const [image, setImage] = useState<UploadFile[]>([]);
    const [option, setOption] = useState<Option[]>([]);
    const [isLoadingCity, setIsLoadingCity] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>('Dao Phan');
    const [lastName, setLastName] = useState<string>('Quoc Hoai');
    const [phone, setPhone] = useState<string>('0779 127 667');
    const [address, setAddress] = useState<string>('Ben Tre - Thanh Phu - Thanh Hai');
    const [description, setDescription] = useState<string>('124/2 Thanh Hai');
    const [edit, setEdit] = useState<boolean>(true)

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setImage(newFileList)
    };
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const city = await getDataCity();
                const data:Option[] = [];
                city.data.forEach((city) => {
                    data.push({
                        value: city.name,
                        label: city.name,
                        children: city.data2 ? city.data2.map((provine) => ({
                            value: provine.name,
                            label: provine.name,
                            children: provine.data3 ? provine.data3.map((vin) => ({
                                value: vin.name,
                                label: vin.name,
                            })) : []
                        })) : []
                    });
                });
                setOption(data);
                setIsLoadingCity(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const onSelect: CascaderProps<Option>['onChange'] = (value) => {
        console.log(value);
    };


    return (
        <div className={`${!openAccount  ? 'right-[-400px]' : 'right-0'} transition-all duration-300 fixed bg-white z-20 h-[100vh] w-[400px] top-0 p-4 overflow-y-scroll`}>
            <div className={'flex justify-end text-3xl cursor-pointer'}>
                <IoClose onClick={() => setOpenAccount(false)}/>
            </div>
            <div className={'flex-1 overflow-y-scroll gap-4 flex flex-col'}>
                <Upload
                    listType="picture-card"
                    fileList={image}
                    onChange={onChange}
                    onPreview={onPreview}
                    disabled={edit}
                >
                    {!image.length && '+ Upload'}
                </Upload>
                <div className={'flex flex-col'}>
                    <label className={'text-red-500 font-bold'}>First Name :</label>
                    <input onChange={(e:ChangeEvent) => setDescription(e.target.value)} className={'py-2 outline-red-400 px-4'} value={firstName} disabled={edit}/>
                </div>
                <div className={'flex flex-col'}>
                    <label className={'text-red-500 font-bold'}>Last Name :</label>
                    <input onChange={(e:ChangeEvent) => setDescription(e.target.value)}  className={'py-2 outline-red-400 px-4'} disabled={edit} value={lastName}/>
                </div>
                <div className={'flex flex-col'}>
                    <label className={'text-red-500 font-bold'}>Phone Number :</label>
                    <input onChange={(e:ChangeEvent) => setDescription(e.target.value)} className={'py-2 outline-red-400 px-4'} value={phone} disabled={edit}/>
                </div>
                <div className={'flex flex-col'}>
                    <label className={'text-red-500 font-bold'}>Address :</label>
                    <Table<DataType> dataSource={data} pagination={false} scroll={{y:200}}
                                     virtual
                                     d
                    >
                        <Column title="Address" dataIndex="address" key="address"
                                render={(_: any, record: DataType) => (
                                    <p>{record.address}</p>
                                )}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(_: any, record: DataType) => (
                                <div className={'flex-col flex gap-2'}>
                                    <button disabled={edit} className={'bg-green-300 p-1 rounded-xl text-white'}>Set Default</button>
                                    <button disabled={edit} className={'text-white bg-red-500 p-1 rounded-xl'}>Delete</button>
                                </div>
                            )}
                        />
                    </Table>
                    <div className={'flex gap-4'}>
                        <div className={'flex gap-2 items-center flex-1'} >
                            <Cascader options={option} onChange={onSelect} placeholder={address} rootClassName={'w-[50%] flex-1'} disabled={isLoadingCity || edit}/>
                            {
                                isLoadingCity &&
                                <Spin />
                            }
                        </div>
                        <button disabled={edit} className={'text-white bg-red-500 px-2 rounded-xl'}>Add</button>
                    </div>
                </div>
                <button className={'p-2 bg-red-500 text-white text-xl'} onClick={ () => setEdit(!edit)}>{edit ? 'Edit' : 'Save'}</button>
            </div>
        </div>
    );
};

export default RightModal;
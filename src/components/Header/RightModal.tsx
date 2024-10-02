import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {IoClose} from "react-icons/io5";
import {Cascader, CascaderProps, Spin, Upload, UploadFile, UploadProps} from "antd";
import {AppContext} from "../../context/AppContext.tsx";
import {useNavigate} from "react-router-dom";
import {getDataCity} from "../../Utils/GetAddress.ts";

interface Option {
    value: string;
    label: string;
    children?: Option[];
}

type Props = {
    openAccount: boolean,
    setOpenAccount: ()=>void
}

const RightModal : React.FC = ( props : Props) => {
    const {openAccount,setOpenAccount} = props;

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
        <div className={`${!openAccount  ? 'right-[-400px]' : 'right-0'} transition-all duration-300 fixed bg-white z-20 h-[100vh] w-[400px] top-0 p-4`}>
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
                    <div className={'flex gap-2 flex-col'}>
                        <div className={'flex gap-2 items-center'}>
                            <Cascader options={option} onChange={onSelect} placeholder={address} rootClassName={'w-[50%]'} disabled={isLoadingCity || edit}/>
                            {
                                isLoadingCity &&
                                <Spin />
                            }
                        </div>
                        <input onChange={(e:ChangeEvent) => setDescription(e.target.value)} type={'text'} value={description} className={'py-2 outline-red-400 px-4'} disabled={edit}/>
                    </div>
                </div>
                <button className={'p-2 bg-red-500 text-white text-xl'} onClick={ () => setEdit(!edit)}>{edit ? 'Edit' : 'Save'}</button>
            </div>
        </div>
    );
};

export default RightModal;
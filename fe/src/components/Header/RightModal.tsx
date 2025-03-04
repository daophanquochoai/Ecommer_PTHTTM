import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import {IoClose} from "react-icons/io5";
import {Cascader, CascaderProps, Spin, Table, Upload, UploadFile, UploadProps} from "antd";
import {AppContext} from "../../context/AppContext.tsx";
import {useNavigate} from "react-router-dom";
import {getDataCity} from "../../Utils/GetAddress.ts";
import {Column} from "@ant-design/plots";
import {
    addAddress,
    DefaultAddressFunc,
    parseJwt,
    setDefaultAddress,
    updateAccount,
    updateInfoOfAmin
} from "../../Utils/Helper.tsx";
import {toast} from "react-toastify";

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
    key : number,
    address : string
}

const RightModal : React.FC = ( props : Props) => {
    const {openAccount,setOpenAccount} = props;


    const {info, setInfo} = useContext(AppContext)

    const [image, setImage] = useState<UploadFile[]>([]);
    const [option, setOption] = useState<Option[]>([]);
    const [isLoadingCity, setIsLoadingCity] = useState<boolean>(true);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [addressList, setAddressList] = useState<DataType[]>([]);
    const [edit, setEdit] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [defaultAddress, setDefaultAddress] = useState<number>(0);
    const [addressNew, setAddressNew] = useState<string>('')

    useEffect(() => {
        if( info == null) return;
        setAddressList(info.addresses.map(item => {
            if( item.default_address == 1 ) setDefaultAddress(item.address_id)
            const data:DataType = {
                key : item.address_id,
                address : item.address_name
            }
            return data;
        })  )
        setImage([{ uid: '-1', name: 'image.png', status: 'done', thumbUrl: info.image_url }]);
        setFirstName(info.first_name);
        setLastName(info.last_name);
        setPhone(info.phone)
    }, [info]);

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

    const handleSubmit = async () => {
        if( edit !== false) {
            setEdit(false)
            return;
        }
        setIsLoading(true);

        const dataObject = {
            image_url: image[0]["thumbUrl"],
            first_name: firstName,
            last_name: lastName,
            phone: phone
        }

        var response;
        if( info.role !== 'USER')
        {
            response = await updateInfoOfAmin(dataObject);
            console.log(response)
        }
        else{
            console.log(dataObject)
            response = await updateAccount(dataObject);
        }
        if( response.code === "ERR_NETWORK"){
            toast.error("Load Category Fail!!")
            return;
        }
        if(response.data.code === 200)
        {
            setIsLoading(false);
                const addresses = info.addresses;

                setInfo({
                    ...info,
                    ...dataObject,
                    addresses
                })
            setEdit(true);
                toast.success("UPDATE SUCCESS")
        }
        else
        {
            setIsLoading(false);
            toast.error(response.data.message)
            return;
        }

    }
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
        setAddressNew(value.join('-'))
    };

    const handleAddAddress = async () => {
        setIsLoading(true)
        const response = await addAddress(addressNew);
        setIsLoading(false)
        if( response.code === "ERR_NETWORK"){
            toast.error("Load Category Fail!!")
            return;
        }
        if(response.data.code === 200)
        {
            setInfo({
                ...info,
                addresses: response.data.data
            })
        }
        else
        {
            toast.error(response.data.message)
            return;
        }
    }

    const setDefault = async (key: number) => {
        setIsLoading(true)
        const response = await DefaultAddressFunc(key);
        setIsLoading(false)
        if( response.code === "ERR_NETWORK"){
            toast.error("Load Category Fail!!")
            return;
        }
        if(response.data.code === 200)
        {
            setInfo({
                ...info,
                addresses: response.data.data
            })
        }
        else
        {
            toast.error(response.data.message)
            return;
        }

    }
    const delAddress = async ( key : number) => {
        console.log(key)
    }

    return (
        <div className={`${!openAccount  ? 'right-[-400px]' : 'right-0'} transition-all duration-300 fixed bg-white z-20 h-[100vh] w-[400px] top-0 p-4 overflow-y-scroll`}>
            <div className={'flex justify-end text-3xl cursor-pointer'}>
                <IoClose onClick={() => setOpenAccount(false)}/>
            </div>
            <Spin tip={'Changing...'} spinning={isLoading}>
                <div className={'flex-1 overflow-y-scroll gap-4 flex flex-col'}>
                    <Upload
                        action={'http://localhost:3000/upload'}
                        listType="picture-card"
                        fileList={image}
                        onChange={onChange}
                        onPreview={onPreview}
                        disabled={edit}
                        name={'image_url'}
                    >
                        {!image.length && '+ Upload'}
                    </Upload>
                    <div className={'flex flex-col'}>
                        <label className={'text-red-500 font-bold'}>First Name :</label>
                        <input onChange={(e:ChangeEvent) => setFirstName(e.target.value)} className={'py-2 outline-red-400 px-4'} value={firstName} disabled={edit}/>
                    </div>
                    <div className={'flex flex-col'}>
                        <label className={'text-red-500 font-bold'}>Last Name :</label>
                        <input onChange={(e:ChangeEvent) => setLastName(e.target.value)}  className={'py-2 outline-red-400 px-4'} disabled={edit} value={lastName}/>
                    </div>
                    <div className={'flex flex-col'}>
                        <label className={'text-red-500 font-bold'}>Phone :</label>
                        <input onChange={(e:ChangeEvent) => setPhone(e.target.value)}  className={'py-2 outline-red-400 px-4'} disabled={edit} value={phone}/>
                    </div>
                    {info.role === 'USER' &&
                        <div className={'flex flex-col'}>
                            <label className={'text-red-500 font-bold'}>Address :</label>
                            <Table<DataType> dataSource={addressList} pagination={false} scroll={{y: 200}}
                                             virtual
                            >
                                <Column title="Address" dataIndex="address" key="address"
                                        render={(_: any, record: DataType) => (
                                            <p className={`${defaultAddress == record.key && 'text-red-500'}`}>{record.address}</p>
                                        )}
                                />
                                <Column
                                    title="Action"
                                    key="action"
                                    render={(_: any, record: DataType) => (
                                        <div className={'flex-col flex gap-2'}>
                                            <button disabled={edit}
                                                    className={`bg-green-300 p-1 rounded-xl text-white ${defaultAddress == record.key && 'hidden'}`}
                                                    onClick={() => setDefault(record.key)}>Set Default
                                            </button>
                                            <button disabled={edit}
                                                    className={`text-white bg-red-500 p-1 rounded-xl ${defaultAddress == record.key && 'hidden'}`}
                                                    onClick={() => delAddress(record.key)}>Delete
                                            </button>
                                        </div>
                                    )}
                                />
                            </Table>
                            <div className={'flex gap-4'}>
                                <div className={'flex gap-2 items-center flex-1'}>
                                    <Cascader options={option} onChange={onSelect} placeholder={'Add address'}
                                              rootClassName={'w-[50%] flex-1'} disabled={isLoadingCity || edit}/>
                                    {
                                        isLoadingCity &&
                                        <Spin/>
                                    }
                                </div>
                                <button onClick={() => handleAddAddress()} disabled={edit}
                                        className={'text-white bg-red-500 px-2 rounded-xl'}>Add
                                </button>
                            </div>
                        </div>}
                    <button className={'p-2 bg-red-500 text-white text-xl'} onClick={() => handleSubmit()}>{edit ? 'Edit' : 'Save'}</button>
                </div>
            </Spin>
        </div>
    );
};

export default RightModal;
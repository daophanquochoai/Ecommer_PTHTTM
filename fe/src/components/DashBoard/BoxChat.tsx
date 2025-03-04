import React from 'react';
import {GrUploadOption} from "react-icons/gr";
import {IoSend} from "react-icons/io5";
import {Avatar, Upload} from "antd";

const BoxChat : React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className={'w-full h-full flex flex-col border-2'}>
            <div className={'flex flex-1 max-h-[66vh] bg-red-100 p-8'}>
                <div className={'gap-4 flex flex-col-reverse w-full overflow-y-scroll'}>
                    <div className={'flex gap-2'}>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chao11 a </p>
                    </div>
                    <div className={'flex justify-end gap-2 w-full'}>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chao  </p>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </div>
                    <div className={'flex gap-2'}>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chaoa </p>
                    </div>
                    <div className={'flex justify-end gap-2 w-full'}>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chao  </p>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </div>
                    <div className={'flex gap-2'}>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chaoa </p>
                    </div>
                    <div className={'flex justify-end gap-2 w-full'}>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chao  </p>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </div>
                    <div className={'flex gap-2'}>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chaoa </p>
                    </div>
                    <div className={'flex justify-end gap-2 w-full'}>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chao  </p>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </div>
                    <div className={'flex gap-2'}>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                        <p className={'p-3 rounded-xl bg-white'}>Xin chaoa </p>
                    </div>
                </div>
            </div>
            <div>
                <form className={'flex border-t-2 py-2 px-8 gap-4 items-center'}>
                        <div>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                maxCount={1}
                                listType="picture-card"
                                onChange={(e)=>{console.log(e)}}
                            >
                                <GrUploadOption />
                            </Upload>
                        </div>
                        <input className={'border-2 border-red-200 outline-none flex flex-1 p-2'} name={'message'}/>
                        <IoSend className={'cursor-pointer text-red-200 text-2xl'}/>
                </form>
            </div>
        </div>
    );
};

export default BoxChat;
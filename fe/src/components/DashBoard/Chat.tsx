import React from 'react';
import {Avatar, Badge} from "antd";
import {TiUserOutline} from "react-icons/ti";
import BoxChat from "./BoxChat.tsx";

const Chat : React.FC = () => {
    return (
        <div className={'grid grid-cols-[1fr_5fr] bg-white h-[84vh]'}>
            <div className={'max-h-[80vh] overflow-y-scroll py-4 flex flex-col gap-2'}>
                <div className={'p-4 flex gap-4 items-center justify-center cursor-pointer group bg-primary bg-red-100'}>
                    <Badge dot>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </Badge>
                    <span className={'group-hover:text-red-500'}>Quoc Hoai</span>
                </div>
                <div className={'p-4 flex gap-4 items-center justify-center cursor-pointer group bg-primary hover:bg-red-100'}>
                    <Badge dot>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </Badge>
                    <span className={'group-hover:text-red-500'}>Quoc Hoai</span>
                </div>
                <div className={'p-4 flex gap-4 items-center justify-center cursor-pointer group bg-primary hover:bg-red-100'}>
                    <Badge dot>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </Badge>
                    <span className={'group-hover:text-red-500'}>Quoc Hoai</span>
                </div>
                <div className={'p-4 flex gap-4 items-center justify-center cursor-pointer group bg-primary hover:bg-red-100'}>
                    <Badge dot>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </Badge>
                    <span className={'group-hover:text-red-500'}>Quoc Hoai</span>
                </div>
                <div className={'p-4 flex gap-4 items-center justify-center cursor-pointer group bg-primary hover:bg-red-100'}>
                    <Badge dot>
                        <Avatar shape="square" src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" className={'group-hover:scale-105 transition-all duration-300 w-[40px] h-[40px]'}/>
                    </Badge>
                    <span className={'group-hover:text-red-500'}>Quoc Hoai</span>
                </div>

            </div>
            <div>
                <BoxChat />
            </div>
        </div>
    );
};

export default Chat;
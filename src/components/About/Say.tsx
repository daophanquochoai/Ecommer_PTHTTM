import React, {useState} from 'react';
import {Avatar, Rate} from "antd";
import Skeleton from "react-loading-skeleton";
const Say : React.FC= () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className={'p-4 bg-primary'}>
            <div className={'flex gap-2 items-center'}>
                <div className={'p-2'}>
                    {
                        isLoading ?
                            <Skeleton className={'w-[65px] h-[65px]'} circle/>
                            :
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                                    size={{ xs: 24, sm: 32, xl: 65 }}
                            />
                    }
                </div>
                <div>
                    {
                        isLoading ?
                            <>
                                <Skeleton count={3} className={'w-[200px]'}/>
                            </>
                            :
                            <>
                                <h6 className={'font-bold text-base'}>Quốc Hoài</h6>
                                <p className={'text-gray-400'}>Developer</p>
                                <Rate disabled defaultValue={4} />
                            </>
                    }
                </div>
            </div>
            <div>
                {
                    isLoading ?
                        <Skeleton />
                        :
                        <p className={'p-2 px-4 text-base font-[700] shortcut text-gray-400'}>Very Good</p>
                }
            </div>
        </div>
    );
};

export default Say;
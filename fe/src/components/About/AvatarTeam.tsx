import React, {useState} from 'react';
import {FaFacebook, FaGithub, FaLinkedin} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
const AvatarTeam : React.FC= () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    return (
        <div className={'flex flex-col items-center gap-2 cursor-pointer group'}>
            {
                isLoading ?
                    <Skeleton circle className={'w-[200px] h-[200px]'}/>
                    :
                    <>
                        <div className={'w-full rounded-full relative'}>
                            <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/team04.png'} className={'w-full h-auto rounded-full'} alt={''}/>
                            <div className={'hidden group-hover:flex transition-all duration-500 gap-2 text-3xl absolute top-0 left-0 z-20 w-full h-full items-center justify-center backdrop-blur-sm rounded-full'}>
                                <FaFacebook className={'cursor-pointer hover:text-red-500'}/>
                                <FaGithub  className={'cursor-pointer hover:text-red-500'}/>
                                <FaLinkedin  className={'cursor-pointer hover:text-red-500'}/>
                            </div>
                        </div>
                        <h4 className={'hover:text-red-500 transition-all duration-300 text-xs md:text-xl font-bold'}>Francis Zimmerman</h4>
                        <p className={'text-gray-400'}>CEO & Founder</p>
                    </>
            }
        </div>
    );
};

export default AvatarTeam;
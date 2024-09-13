import React from 'react';
import AvatarTeam from "./AvatarTeam.tsx";


const OurTeam : React.FC = () => {
    return (
        <div>
            <div className={'py-8'}>
                <div className={'p-4 flex items-center flex-col gap-2 mb-4'}>
                    <h2 className={'text-3xl font-bold'}>Our Team</h2>
                    <p className={'text-xl text-gray-400 text-center'}>Lorem Ipsum to using making it look like readable English.</p>
                </div>
                <div className={'grid grid-rows-2 sm:grid-cols-3 md:grid-cols-5 gap-6 pt-4'}>
                    <AvatarTeam />
                    <AvatarTeam />
                    <AvatarTeam />
                    <AvatarTeam />
                    <AvatarTeam />
                </div>
            </div>
        </div>
    );
};

export default OurTeam ;
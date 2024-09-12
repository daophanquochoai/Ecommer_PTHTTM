import React from 'react';

const TitleAbout : React.FC = () => {
    return (
        <div className={'flex flex-col mt-8'}>
            <div className={'flex flex-col items-center justify-center'}>
                <h2 className={'text-3xl font-bold'}>Call Us Or Visit Place</h2>
                <p className={'text-center text-base text-gray-400'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <div className={'mt-10 grid flex-col md:grid-cols-2 lg:grid-cols-4 gap-4'}>
                <div className={'flex items-center justify-center flex-col'}>
                    <h4 className={'text-2xl font-bold'}>Address</h4>
                    <p className={'text-base text-gray-400 text-center'}>
                        87 Timbercrest Road, Chisana,
                        <br className={'hidden md:block'}/>
                        Alaska Badalas United State
                    </p>
                </div>
                <div className={'flex items-center justify-center flex-col'}>
                    <h4 className={'text-2xl font-bold'}>Address</h4>
                    <p className={'text-base text-gray-400 text-center'}>
                        87 Timbercrest Road, Chisana,
                        <br className={'hidden md:block'}/>
                        Alaska Badalas United State
                    </p>
                </div>
                <div className={'flex items-center justify-center flex-col'}>
                    <h4 className={'text-2xl font-bold'}>Address</h4>
                    <p className={'text-base text-gray-400 text-center'}>
                        87 Timbercrest Road, Chisana,
                        <br className={'hidden md:block'}/>
                        Alaska Badalas United State
                    </p>
                </div>
                <div className={'flex items-center justify-center flex-col'}>
                    <h4 className={'text-2xl font-bold'}>Address</h4>
                    <p className={'text-base text-gray-400 text-center'}>
                        87 Timbercrest Road, Chisana,
                        <br className={'hidden md:block'}/>
                        Alaska Badalas United State
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TitleAbout;
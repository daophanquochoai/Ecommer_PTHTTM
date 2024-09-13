import React from 'react';

const Choose : React.FC = () => {
    return (
        <div className={'p-8'}>
            <div className={'p-4 flex items-center flex-col gap-2 mb-4'}>
                <h2 className={'text-3xl font-bold'}>Why Choose Us?</h2>
                <p className={'text-xl text-gray-400 text-center'}>Lorem Ipsum to using making it look like readable English</p>
            </div>
            <div className={'grid sm:grid-cols-2 md:grid-cols-4 gap-4'}>
                <div className={'flex flex-col items-center justify-center text-center gap-2'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/icon6.png'} alt={''}/>
                    <h4 className={'text-xl font-[500]'}>A Dedicated Smart-Dashboard</h4>
                    <p className={'text-gray-400'}>Manage donors, donations, send ‘thank you’ notes to well-wishers much more</p>
                </div>
                <div className={'flex flex-col items-center justify-center text-center gap-2'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/return.png'} alt={''}/>
                    <h4 className={'text-xl font-[500]'}>Withdraw Funds Instantly</h4>
                    <p className={'text-gray-400'}>Transfer donations instantly to your bank account, with just one click</p>
                </div>
                <div className={'flex flex-col items-center justify-center text-center gap-2'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/security.png'} alt={''}/>
                    <h4 className={'text-xl font-[500]'}>Intuitive User Experience</h4>
                    <p className={'text-gray-400'}>Designed to optimise donation flow, helping you reach your goal faster</p>
                </div>
                <div className={'flex flex-col items-center justify-center text-center gap-2'}>
                    <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/shipping.png'} alt={''}/>
                    <h4 className={'text-xl font-[500]'}>International Payment Support</h4>
                    <p className={'text-gray-400'}>Donors can use use payment modes such as PayTM, Tez, UPI, Debit Card, Credit,...</p>
                </div>
            </div>
        </div>
    );
};

export default Choose ;

const Policy = () => {
    return (
        <div className={'mx-[10%] mt-8 '}>
            <div className={'bg-white p-7 flex justify-center flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4'}>
                <div className={'flex gap-4'}>
                    <div className={'w-[40px] flex items-center justify-center'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/icon1.png'} className={'w-full'} alt={''}/>
                    </div>
                    <div>
                        <h4 className={'font-bold text-base'}>100% Genuine</h4>
                        <p className={'text-gray-400'}>For all oders over $99</p>
                    </div>
                </div>
                <div className={'flex gap-4'}>
                    <div className={'w-[40px] flex items-center justify-center'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/icon2.png'} className={'w-full'} alt={''}/>
                    </div>
                    <div>
                        <h4 className={'font-bold text-base'}>90 Days Return</h4>
                        <p className={'text-gray-400'}>If goods have problems</p>
                    </div>
                </div>
                <div className={'flex gap-4'}>
                    <div className={'w-[40px] flex items-center justify-center'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/icon3.png'} className={'w-full'} alt={''}/>
                    </div>
                    <div>
                        <h4 className={'font-bold text-base'}>Secure Payment</h4>
                        <p className={'text-gray-400'}>100% secure paymen</p>
                    </div>
                </div>
                <div className={'flex gap-4'}>
                    <div className={'w-[40px] flex items-center justify-center'}>
                        <img src={'https://demo-60.woovinapro.com/wp-content/uploads/2022/03/icon4.png'} className={'w-full'} alt={''}/>
                    </div>
                    <div>
                        <h4 className={'font-bold text-base'}>24/7 Support</h4>
                        <p className={'text-gray-400'}>Ready to support customers</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policy;
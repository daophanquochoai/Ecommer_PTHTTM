
const Sale = () => {
    return (
        <div className={'hidden sm:block mx-[10%]'}>
            <div className={'w-full bg-white grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] p-4 gap-4'}>
                <div className={'grid grid-cols-1 gap-4 grid-rows-2'}>
                    <div className={'bg-black flex-1 flex cursor-pointer hover:scale-105 transition-all duration-300'}>
                        <img src={'https://opencart.templatemela.com/OPC07/OPC070174/OPC8/image/catalog/sub-banner4.jpg'} className={'w-full'} alt={''}/>
                    </div>
                    <div className={'bg-red-500 flex flex-1 hover:scale-105 transition-all duration-300'}>
                        <img src={'https://opencart.templatemela.com/OPC07/OPC070174/OPC8/image/catalog/sub-banner5.jpg'} className={'w-full h-full object-center'} alt={''}/>
                    </div>
                </div>
                <div className={'flex-1 flex hover:scale-105 transition-all duration-300'}>
                    <img src={'https://opencart.templatemela.com/OPC07/OPC070174/OPC8/image/catalog/sub-banner6.jpg'} className={'w-full h-auto object-center'} alt={''}/>
                </div>
                <div className={'flex-1 flex hover:scale-105 transition-all duration-300'}>
                    <img src={'https://opencart.templatemela.com/OPC07/OPC070174/OPC8/image/catalog/sub-banner7.jpg'} className={'w-full h-auto object-center'} alt={''}/>
                </div>
            </div>
        </div>
    );
};

export default Sale;
import React from 'react';

const ListCategory : React.FC = () => {
    return (
        <div className={'bg-white p-4'}>
            <div className={'flex flex-col'}>
                <div>
                    <span className={'pb-2 border-b-2 border-red-500 text-base md:text-2xl font-bold'}>Product categories</span>
                </div>
                <ul className={'flex flex-col gap-4 mt-5 max-h-[500px] overflow-y-scroll'}>
                    <li className={'text-[14px] md:text-xl text-gray-400 cursor-pointer hover:text-red-500'}>Babies & Moms</li>
                </ul>
            </div>
        </div>
    );
};

export default ListCategory;
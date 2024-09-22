import React from 'react';;
import NameLogo from "./NameLogo.tsx";
import ContactChange from './ContactChange.tsx';
import LanguageCurrency from './LanguageCurrency.tsx';
import TimeCountry from './TimeCountry.tsx';

const ListSetting : React.FC = () => {
    return (
        <>
            <div className={'bg-white p-6 w-full h-full flex flex-col border-2'}>
                <NameLogo />
                <ContactChange />
                <LanguageCurrency />
                <TimeCountry />
            </div>
        </>
    );
};

export default ListSetting;
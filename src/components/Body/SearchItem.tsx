import React, {useState} from 'react';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
    image : string,
    name : string
}
const SearchItem : React.FC= ( props : Props) => {
    return (
        <div className={'bg-primary cursor-pointer flex items-center flex-col border-2 hover:border-red-500 hover:scale-110 transition-all duration-300 rounded-xl'}>
            <img src={props.image} className={'w-full h-auto object-cover p-2'} alt={'product'}/>
        </div>
    );
};

export default SearchItem;
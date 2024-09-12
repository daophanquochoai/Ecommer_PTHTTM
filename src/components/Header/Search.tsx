import {BsFillMenuButtonWideFill} from "react-icons/bs";
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io";
import {useState} from "react";
import {FaRegCircle} from "react-icons/fa";
import {IoSearchSharp} from "react-icons/io5";

const Search = () => {
    const [visible, setViible]  = useState<boolean>(false)
    return (
        <div className={'flex px-[5%] py-1 bg-red-500 justify-center md:justify-between items-center'}>
            {/* category*/}
            <div className={'hidden md:flex bg-red-400 p-2 items-center gap-4 text-white group relative cursor-pointer'}  onClick={() => setViible(!visible)}>
                <div>
                    <BsFillMenuButtonWideFill />
                </div>
                <div>ALL CATEGORYS</div>
                <div>
                    {
                        visible ?
                            <IoMdArrowDropup />
                            :
                            <IoMdArrowDropdown />
                    }
                </div>
                {
                    visible &&
                    <div  className={'flex flex-col absolute top-[53px] px-5 py-2 z-10 bg-white left-0'}>
                        <div className={'flex items-center gap-2 text-black text-xl hover:text-red-600 cursor-pointer transition-all duration-300'}><FaRegCircle className={'text-red-600 text-base'}/> Quần</div>
                    </div>
                }
            </div>
            {/* search */}
            <div className={'w-full  sm:w-3/4 md:w-2/4'}>
                <div className={'flex items-center bg-white p-1 md:p-2 justify-between'}>
                    <div className={'flex gap-2 items-center w-full'}>
                        <IoSearchSharp className={'text-red-500 text-xl'}/>
                        <input className={' flex-1 md:p-2 outline-0 p-1'}/>
                    </div>
                    <button className={'text-sm w-1/5 bg-red-500 text-white md:text-base p-1 md:py-2'}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default Search;